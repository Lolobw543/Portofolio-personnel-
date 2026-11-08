import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, need } = body;

    if (!name || !email || !need) {
      return NextResponse.json(
        { error: "Tous les champs (nom, email, besoin) sont obligatoires." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_DESTINATION_EMAIL || "contact@laurentin.design";
    const resendApiKey = process.env.RESEND_API_KEY;

    // If Resend API key is provided, send real transactional email
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Laurentin <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `Nouveau message de contact : ${name}`,
          text: `Nom: ${name}\nEmail: ${email}\n\nBesoin:\n${need}`,
        }),
      });

      if (!resendResponse.ok) {
        console.error("Resend delivery failed:", await resendResponse.text());
      }
    } else {
      console.log(`[Contact Form Received] From: ${name} (${email}) | To: ${recipientEmail} | Need: ${need}`);
    }

    return NextResponse.json({ success: true, message: "Demande reçue avec succès." });
  } catch (error) {
    console.error("Erreur serveur contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement." },
      { status: 500 }
    );
  }
}
