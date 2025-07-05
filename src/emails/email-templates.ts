interface EmailTemplateOptions {
  title: string;
  previewText?: string;
  header?: {
    logoUrl?: string;
    logoAlt?: string;
    logoHeight?: number;
  };
  content: {
    greeting?: string;
    body: string;
    footer?: string;
  };
  primaryColor?: string;
  secondaryColor?: string;
  button?: {
    text: string;
    url: string;
    color?: string;
  };
  unsubscribeUrl?: string;
}

export function generateEmailTemplate(options: EmailTemplateOptions): string {
  const {
    title,
    previewText = '',
    header = {},
    content,
    primaryColor = '#4f46e5',
    secondaryColor = '#f9fafb',
    button,
    unsubscribeUrl,
  } = options;

  // Inline styles for email clients
  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
      
      body, html {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background-color: #f3f4f6;
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
      }
      
      .header {
        padding: 24px;
        text-align: center;
        background-color: ${primaryColor};
        color: white;
      }
      
      .logo {
        max-height: ${header.logoHeight || 40}px;
        width: auto;
      }
      
      .content {
        padding: 32px;
      }
      
      .greeting {
        font-size: 18px;
        margin-bottom: 24px;
      }
      
      .body {
        margin-bottom: 32px;
        line-height: 1.6;
      }
      
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: ${button?.color || primaryColor};
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin: 16px 0;
      }
      
      .footer {
        padding: 24px;
        text-align: center;
        font-size: 14px;
        color: #6b7280;
        background-color: ${secondaryColor};
        border-top: 1px solid #e5e7eb;
      }
      
      .unsubscribe {
        font-size: 12px;
        color: #9ca3af;
        margin-top: 24px;
        text-align: center;
      }
    </style>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${styles}
      <!--[if mso]>
        <style>
          .button {
            background: ${button?.color || primaryColor} !important;
          }
        </style>
      <![endif]-->
    </head>
    <body>
      <div class="email-container">
        ${
          header.logoUrl
            ? `
          <div class="header">
            <img src="${header.logoUrl}" alt="${header.logoAlt || 'Logo'}" class="logo">
          </div>
        `
            : ''
        }
        
        <div class="content">
          ${content.greeting ? `<div class="greeting">${content.greeting}</div>` : ''}
          
          <div class="body">
            ${content.body}
            
            ${
              button
                ? `
              <div style="text-align: center; margin: 32px 0;">
                <a href="${button.url}" class="button" style="color: white; text-decoration: none;">
                  ${button.text}
                </a>
              </div>
            `
                : ''
            }
          </div>
        </div>
        
        <div class="footer">
          <p>${content.footer || '© ' + new Date().getFullYear() + ' ' + (process.env.NEXT_PUBLIC_APP_NAME || 'Your Company')}. All rights reserved.</p>
          
          ${
            unsubscribeUrl
              ? `
            <div class="unsubscribe">
              <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> 
              if you no longer wish to receive these emails.
            </div>
          `
              : ''
          }
        </div>
      </div>
    </body>
    </html>
  `;
}

// Example usage in your route:
export function generateContactReplyEmail(options: {
  recipientName: string;
  senderName: string;
  message: string;
  reply: string;
  replySubject: string;
  websiteUrl: string;
  logoUrl?: string;
}) {
  const { recipientName, senderName, message, reply, replySubject, websiteUrl, logoUrl } = options;

  return generateEmailTemplate({
    title: replySubject,
    previewText: `Reply to your message from ${senderName}`,
    header: {
      logoUrl,
      logoAlt: 'Logo',
      logoHeight: 40,
    },
    content: {
      greeting: `Hello ${recipientName},`,
      body: `
        <p>Thank you for reaching out to us. Here's our response to your message:</p>
        
        <div style="background: #f9fafb; padding: 16px; border-left: 4px solid #e5e7eb; margin: 16px 0; font-style: italic;">
          <p><strong>Your message:</strong><br>${message}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 16px; border-left: 4px solid #0ea5e9; margin: 16px 0;">
          <p><strong>Our response:</strong><br>${reply}</p>
        </div>
        
        <p>If you have any further questions, please don't hesitate to reply to this email.</p>
      `,
      footer: `${senderName} | ${websiteUrl}`,
    },
    primaryColor: '#0ea5e9',
    button: {
      text: 'View on Website',
      url: websiteUrl,
      color: '#0ea5e9',
    },
  });
}
