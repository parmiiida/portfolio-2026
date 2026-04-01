type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const RECEIVER_EMAIL = "parmida.shoeibzade4@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  const { name, email, message } = (req.body || {}) as ContactPayload;

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: "Missing required fields" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, message: "Invalid email address" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    res.status(500).json({ success: false, message: "Email service is not configured" });
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [RECEIVER_EMAIL],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${String(message).replace(/\n/g, "<br />")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(502).json({
        success: false,
        message: "Failed to send email",
        details: errorText,
      });
      return;
    }

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Unexpected server error" });
  }
}
