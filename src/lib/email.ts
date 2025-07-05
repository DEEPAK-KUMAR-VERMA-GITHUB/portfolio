import nodemailer from 'nodemailer';
import { config } from './config';

// Create a test account for development
const createTestAccount = async () => {
  if (process.env.NODE_ENV === 'development') {
    const testAccount = await nodemailer.createTestAccount();
    return {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
  }
  return null;
};

// Create transporter
const createTransporter = async () => {
  const testAccountConfig = await createTestAccount();
  
  return nodemailer.createTransport(testAccountConfig || {
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
      user: config.email.auth.user,
      pass: config.email.auth.pass,
    },
  });
};

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: config.email.from,
      to,
      subject,
      html,
      replyTo: replyTo || config.email.replyTo,
    });

    // Log the preview URL for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email' 
    };
  }
}

// For React components, they should be pre-rendered before being passed to sendEmail
export async function sendReactEmail({
  to,
  subject,
  reactComponent,
  replyTo,
}: {
  to: string;
  subject: string;
  reactComponent: string; // Pre-rendered HTML string of the React component
  replyTo?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        ${reactComponent}
      </body>
    </html>
  `;

  return sendEmail({
    to,
    subject,
    html,
    replyTo,
  });
}
