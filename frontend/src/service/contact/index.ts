"use server";

export const sendContactMail = async ({
  name,
  subject,
  message,
  email,
}: {
  name: string;
  subject: string;
  message: string;
  email: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/sendMail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        subject,
        message,
      }),
    });

    return res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, error: error.message || "Unknown error" };
  }
};
