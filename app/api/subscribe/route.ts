import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"TechVista Blog" <your-email@example.com>',
      to: 'tahasaif454@gmail.com',
      subject: 'New Newsletter Subscription',
      text: `You have a new subscriber: ${email}`,
      html: `<p>You have a new subscriber:</p><p><strong>${email}</strong></p>`,
    });

    await transporter.sendMail({
      from: '"TechVista Blog" <your-email@example.com>',
      to: email,
      subject: 'Subscription Successful!',
      text: `Thank you for subscribing to TechVista Blog!`,
      html: `<p>Thank you for subscribing to TechVista Blog! We are excited to have you onboard.</p>`,
    });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
