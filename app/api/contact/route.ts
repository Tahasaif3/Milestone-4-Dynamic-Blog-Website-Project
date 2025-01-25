import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

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
      from: process.env.EMAIL_USER,
      to: 'tahasaif454@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <div style="font-family: 'Arial', sans-serif; color: #333; background-color: #f7f7f7; padding: 20px 0; width: 100%; max-width: 600px; margin: 0 auto;">
          <!-- Header Section -->
          <div style="background: linear-gradient(90deg, #FF7F50, #FF4500); padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h1 style="margin: 0; font-size: 32px; color: white; font-weight: 600;">New Contact Form Submission</h1>
          </div>
    
          <!-- Main Content Section -->
          <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); margin-top: 20px;">
            <p style="font-size: 18px; line-height: 1.6; color: #333;"><strong>Name:</strong> <span style="color: #FF4500;">${name}</span></p>
            <p style="font-size: 18px; line-height: 1.6; color: #333;"><strong>Email:</strong> <span style="color: #FF4500;">${email}</span></p>
            <p style="font-size: 18px; line-height: 1.6; color: #333;"><strong>Phone:</strong> <span style="color: #FF4500;">${phone}</span></p>
            <p style="font-size: 18px; line-height: 1.6; color: #333;"><strong>Message:</strong> <span style="color: #FF4500;">${message}</span></p>
          </div>
    
          <!-- Footer Section with Action Link -->
          <div style="text-align: center; margin-top: 25px;">
            <a href="https://techvistasite.vercel.app/contact" style="background-color: #FF4500; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-size: 16px; font-weight: bold; transition: background-color 0.3s ease;">
              Go Back to Contact Form
            </a>
          </div>
        </div>
    
        <!-- Email Footer -->
        <div style="text-align: center; padding: 10px 0; background-color: #f7f7f7; font-size: 14px; color: #777;">
          <p style="margin: 0;">&copy; 2025 TechVista Blog. All rights reserved.</p>
        </div>
      `,
    });
    
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}