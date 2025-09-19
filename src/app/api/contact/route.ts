import { createContactEmailTemplate } from "@/lib/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create HTML email template
    const htmlContent = createContactEmailTemplate({
      name,
      email,
      phone,
      service,
      message,
    });

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Contact Form Submission - Byte Studio

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service || "Not specified"}

Message:
${message}

---
Sent from Byte Studio contact form
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Byte Studio <delivered@resend.dev>",
      to: ["admin@byteandbitemedia.com"],
      subject: `🎯 New Contact Form Submission from ${name}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
