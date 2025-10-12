# Backend Server Setup Guide

This backend server handles contact form submissions from your CRT TV Portfolio using Nodemailer to send emails.

## 📋 Prerequisites

- Node.js installed (v14 or higher)
- A Gmail account (or other email service)
- Gmail App Password (if using Gmail with 2-factor authentication)

## 🚀 Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure your email credentials:
   - Copy `.env.example` to `.env`
   - Update `.env` with your email credentials

## 📧 Gmail Setup (Recommended)

### Option 1: Using Gmail with App Password (Most Secure)

1. Enable 2-Step Verification on your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. Generate an App Password:
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Copy the 16-character password

3. Update your `.env` file:
```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # The 16-character app password
PORT=3001
```

### Option 2: Using Less Secure App Access (Not Recommended)

If you don't want to enable 2-Step Verification:
1. Go to https://myaccount.google.com/lesssecureapps
2. Enable "Less secure app access"
3. Use your regular Gmail password in `.env`

## 🔧 Other Email Services

### Outlook/Hotmail
```javascript
service: 'hotmail'
```

### Yahoo
```javascript
service: 'yahoo'
```

### Custom SMTP
```javascript
host: 'smtp.example.com',
port: 587,
secure: false, // true for 465, false for other ports
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

## ▶️ Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

## 🧪 Testing

Test if the server is running:
```bash
curl http://localhost:3001/api/health
```

You should see: `{"status":"Server is running!"}`

## 📝 API Endpoints

### POST /api/contact
Send a contact form submission

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

### GET /api/health
Check server status

**Response:**
```json
{
  "status": "Server is running!"
}
```

## 🔒 Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use App Passwords** - More secure than regular passwords
3. **Enable CORS carefully** - Currently allows all origins in development
4. **Rate limiting** - Consider adding rate limiting in production
5. **Input validation** - Basic validation is included, enhance as needed

## 🚀 Production Deployment

For production deployment:

1. **Use environment variables** - Set them in your hosting platform
2. **Update CORS settings** - Restrict to your domain only
3. **Add rate limiting**:
```bash
npm install express-rate-limit
```

4. **Use HTTPS** - Always use SSL in production
5. **Consider using a service** - SendGrid, Mailgun, or AWS SES for better deliverability

## 🐛 Troubleshooting

### "Invalid login" error
- Check if 2-Step Verification is enabled
- Make sure you're using an App Password, not your regular password
- Verify EMAIL_USER matches the account that generated the App Password

### "Connection timeout"
- Check your firewall settings
- Verify your internet connection
- Try a different email service

### Emails not being received
- Check spam/junk folder
- Verify EMAIL_USER in .env is correct
- Test with curl to check if the API works

### CORS errors
- Make sure the backend server is running on port 3001
- Check that frontend is making requests to correct URL
- Verify CORS is enabled in server.js

## 📦 Dependencies

- **express** - Web framework
- **nodemailer** - Email sending library
- **cors** - Enable Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemon** (dev) - Auto-restart server on changes

## 📞 Support

If you encounter issues:
1. Check the console output for error messages
2. Verify your .env configuration
3. Test the health endpoint
4. Check Gmail/email service status

## 🎉 Success!

Once configured, your contact form will:
- ✅ Accept submissions from the frontend
- ✅ Validate input data
- ✅ Send formatted emails to your inbox
- ✅ Include sender's email for easy replies
- ✅ Show success/error messages to users

Happy coding! 🚀
