# Email OTP Setup Instructions

## Backend Server Setup

### 1. Install Server Dependencies
```bash
# Copy server package.json to server directory
cp server-package.json server-package.json
npm install express nodemailer cors
```

### 2. Configure Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Update `server.js` with your credentials:
   ```javascript
   auth: {
     user: 'your-email@gmail.com',     // Your Gmail address
     pass: 'your-generated-app-password' // Your app password (not regular password)
   }
   ```

### 3. Start the Email Server
```bash
node server.js
```
The server will run on `http://localhost:3001`

## Alternative Email Services

### SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: toEmail,
  from: 'your-email@example.com',
  subject: subject,
  html: emailTemplate
};
await sgMail.send(msg);
```

### AWS SES
```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

const params = {
  Destination: { ToAddresses: [toEmail] },
  Message: {
    Body: { Html: { Data: emailTemplate } },
    Subject: { Data: subject }
  },
  Source: 'your-email@example.com'
};
await ses.sendEmail(params).promise();
```

### Mailgun
```javascript
const mailgun = require('mailgun-js')({ 
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN 
});

const data = {
  from: 'your-email@your-domain.com',
  to: toEmail,
  subject: subject,
  html: emailTemplate
};
await mailgun.messages().send(data);
```

## Security Notes

1. **Never commit credentials to version control**
2. Use environment variables for sensitive data:
   ```javascript
   require('dotenv').config();
   
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });
   ```
3. Create `.env` file:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
4. Add `.env` to `.gitignore`

## Testing

1. Start the backend server
2. Start the React app
3. Fill out the booking form with a real email
4. Click "Send OTP"
5. Check your email for the verification code
6. Enter the code to verify

## Production Deployment

For production, consider:
- Using a proper email service (SendGrid, AWS SES, Mailgun)
- Implementing rate limiting
- Adding OTP expiration
- Using HTTPS
- Environment-specific configurations
