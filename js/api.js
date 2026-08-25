export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      name,
      email,
      phone,
      service,
      message
    } = req.body || {};

    // Basic validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        error: "Please complete all required fields."
      });
    }

    // Send email through Resend
    let emailRes;

    try {
      emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.resendkey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "All Exclusive Artistry Co. <onboarding@resend.dev>",
          to: ["dikeledireeks@outlook.com"],
          subject: `New Enquiry: ${service}`,
          html: `
            <h2>New Contact Form Enquiry</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone / WhatsApp:</strong> ${phone || "Not provided"}</p>

            <p><strong>Service:</strong> ${service}</p>

            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        })
      });
    } catch (err) {
      console.error("Resend request crashed:", err);

      return res.status(500).json({
        error: "Unable to contact email service."
      });
    }

    const emailText = await emailRes.text();

    if (!emailRes.ok) {
      console.error("Resend error:", emailText);

      return res.status(500).json({
        error: "Email failed."
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (err) {
    console.error("FULL CRASH:", err);

    return res.status(500).json({
      error: "Server crashed."
    });
  }
}
