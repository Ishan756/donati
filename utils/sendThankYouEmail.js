import nodemailer from "nodemailer";

export async function sendThankYouEmail({ to, name, amount }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Donati <${process.env.EMAIL_USER}>`,
    to,
    subject: "Thank You for Your Contribution!",
    html: `
      <div style="background:#18181b;color:#e0e7ef;padding:2rem;border-radius:8px;font-family:sans-serif;">
        <h2 style="color:#3b82f6;">Thank You, ${name}!</h2>
        <p>We appreciate your generous contribution of <b>₹${amount}</b> to Donati.</p>
        <p>Your support helps us empower more lives and make a real difference.</p>
        <br>
        <p>With gratitude,<br>Donati Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
