export const createContactEmailTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) => {
  const { name, email, phone, service, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #b65c25 0%, #d97316 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px 20px;
        }
        
        .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #b65c25;
        }
        
        .field-label {
            font-weight: 600;
            color: #b65c25;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .field-value {
            font-size: 16px;
            color: #333;
            word-break: break-word;
        }
        
        .message-field {
            background-color: #fff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;
        }
        
        .footer {
            background-color: #1a1a1a;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .footer p {
            font-size: 14px;
            opacity: 0.8;
        }
        
        .logo {
            width: 40px;
            height: 20px;
            margin-bottom: 10px;
        }
        
        .service-badge {
            display: inline-block;
            background-color: #b65c25;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 5px;
                border-radius: 6px;
            }
            
            .header {
                padding: 15px 10px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .header p {
                font-size: 14px;
            }
            
            .content {
                padding: 15px 10px;
            }
            
            .field {
                padding: 10px;
                margin-bottom: 15px;
            }
            
            .field-label {
                font-size: 12px;
            }
            
            .field-value {
                font-size: 14px;
            }
            
            .message-field {
                padding: 15px;
            }
            
            .footer {
                padding: 15px 10px;
            }
            
            .footer p {
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>Byte Studio - Contact Form</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value">${email}</div>
            </div>
            
            ${
              phone
                ? `
            <div class="field">
                <div class="field-label">📱 Phone</div>
                <div class="field-value">${phone}</div>
            </div>
            `
                : ""
            }
            
            ${
              service
                ? `
            <div class="field">
                <div class="field-label">🎯 Service</div>
                <div class="field-value">
                    <span class="service-badge">${service}</span>
                </div>
            </div>
            `
                : ""
            }
            
            <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="field-value">
                    <div class="message-field">${message.replace(
                      /\n/g,
                      "<br>"
                    )}</div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>📧 admin@byteandbitemedia.com</p>
            <p>🌐 www.byteandbitemedia.com</p>
            <p style="margin-top: 10px; font-size: 12px; opacity: 0.6;">
                This email was sent from the Byte Studio contact form
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
};
