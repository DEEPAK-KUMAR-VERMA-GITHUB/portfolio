export const config = {
  email: {
    host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER || 'user@example.com',
      pass: process.env.EMAIL_SERVER_PASSWORD || 'password',
    },
    from: process.env.EMAIL_FROM || 'Deepak Kumar Verma <noreply@example.com>',
    replyTo: process.env.EMAIL_REPLY_TO || 'Deepak Kumar Verma <contact@example.com>',
    senderName: process.env.EMAIL_SENDER_NAME || 'Deepak Kumar Verma',
  },
  app: {
    name: 'Deepak Kumar Verma || Portfolio',
    url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
} as const;
