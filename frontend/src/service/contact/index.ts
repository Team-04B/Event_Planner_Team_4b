"use client";

export const sendContactMail = async ({
  name,
  subject,
  html,
}: {
  name: string;
  subject: string;
  html: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/sendMail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: name,
        to: "your-receiving-email@example.com",
        subject: subject || "Message from Website",
        html,
      }),
    });

    return res.json();
  } catch (error: any) {
    console.error("Mail send error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
