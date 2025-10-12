# 🎯 Contact Form & Resume Download Setup Guide

This guide covers all the new features added to your CRT TV Portfolio:

## ✨ Features Added

### 1. ✅ Social Media Links (Channel 5)
- LinkedIn, GitHub, X (Twitter), and Email links with Font Awesome icons
- Clickable buttons that open in new tabs
- Professional brand colors

### 2. 📧 Contact Form with Backend (Channel 5)
- Form submission with Nodemailer backend
- Email notifications to your inbox
- Loading states and success/error messages
- Changed "CALL NOW" to "SUBMIT MESSAGE"

### 3. 📥 Downloadable Resume (Channel 4)
- One-click PDF download functionality
- Customizable filename
- Easy to update with your actual resume

---

## 🚀 Quick Setup

### Step 1: Update Social Media Links

Open `src/components/Channels/Channel5.jsx` and update the `socialLinks` object (around line 14):

```javascript
const socialLinks = {
  LinkedIn: 'https://www.linkedin.com/in/YOUR-PROFILE',
  GitHub: 'https://github.com/YOUR-USERNAME',
  'X (Twitter)': 'https://twitter.com/YOUR-HANDLE',
  Email: 'mailto:your.email@example.com'
};
```

### Step 2: Add Your Resume PDF

1. Place your resume PDF file in the `public` folder
2. Name it `resume.pdf` (or update the filename in Channel4.jsx)
3. The download button will automatically work!

To customize the downloaded filename, edit `src/components/Channels/Channel4.jsx` (line ~143):

```javascript
download="YourName_Resume.pdf"  // Change to your preferred filename
```

### Step 3: Setup Backend Server

1. **Navigate to server folder:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure email (Choose one method):**

#### Method A: Gmail with App Password (Recommended)
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Update `server/.env`:
```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
PORT=3001
```

#### Method B: Other Email Services
Update `server/server.js` (line 14-19):
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail', // or 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

4. **Start the backend server:**
```bash
npm run dev
```

You should see:
```
✅ Server is running on http://localhost:3001
📧 Email service configured for: your.email@gmail.com
```

### Step 4: Test Everything

1. **Start frontend (in main project folder):**
```bash
npm run dev
```

2. **Navigate to Channel 5 (Contact)**
3. **Test social links** - Click each icon to verify links work
4. **Test contact form** - Submit a test message
5. **Check your email** - You should receive the message

6. **Navigate to Channel 4 (Resume)**
7. **Test download button** - Click to download your resume

---

## 📁 File Structure

```
crt-tv-portfolio/
├── public/
│   └── resume.pdf              # Your resume PDF (ADD THIS!)
├── server/
│   ├── .env                    # Email credentials (CONFIGURE THIS!)
│   ├── .env.example            # Example configuration
│   ├── server.js               # Backend server
│   ├── package.json            # Server dependencies
│   └── README.md               # Detailed server setup guide
└── src/
    └── components/
        └── Channels/
            ├── Channel4.jsx    # Resume with download button
            └── Channel5.jsx    # Contact form with social links
```

---

## 🔧 Customization

### Change Email Template
Edit `server/server.js` (lines 39-64) to customize the email HTML template.

### Add More Social Links
Edit `src/components/Channels/Channel5.jsx` (around line 134):
```javascript
{ icon: 'fab fa-discord', label: 'Discord', color: 'bg-indigo-600', link: 'https://discord.gg/your-server' }
```

### Update Resume Location
If your resume is in a different location, update Channel4.jsx:
```javascript
href="/path/to/your/resume.pdf"
```

### Change Form Fields
Edit Channel5.jsx to add/remove form fields (phone number, company, etc.)

---

## 🐛 Troubleshooting

### Contact form shows "Failed to send"
- ✅ Check if backend server is running on port 3001
- ✅ Verify `.env` credentials are correct
- ✅ Check console for error messages
- ✅ Try testing the server: `curl http://localhost:3001/api/health`

### Resume download not working
- ✅ Verify `resume.pdf` is in the `public` folder
- ✅ Check the filename matches in Channel4.jsx
- ✅ Clear browser cache and try again

### Social links not working
- ✅ Verify URLs in Channel5.jsx `socialLinks` object
- ✅ Check if Font Awesome icons are loading
- ✅ Look for console errors

### Gmail authentication fails
- ✅ Use App Password, not regular password
- ✅ Enable 2-Step Verification first
- ✅ Make sure EMAIL_USER matches the account
- ✅ Try "Less Secure App Access" as fallback

---

## 🚀 Production Deployment

### Backend Deployment Options:
1. **Heroku** - Easy deployment with environment variables
2. **Vercel** - Serverless functions
3. **Railway** - Simple deployment
4. **AWS/Google Cloud** - More control

### Important for Production:
1. Update CORS settings to allow only your domain
2. Add rate limiting to prevent spam
3. Use environment variables (never commit `.env`)
4. Consider using SendGrid/Mailgun for better email deliverability
5. Add SSL/HTTPS

---

## 📊 Testing Checklist

- [ ] Social media links open correct profiles
- [ ] Email link opens default mail client
- [ ] Contact form shows loading state
- [ ] Form shows success message after submission
- [ ] Email received in inbox with correct formatting
- [ ] Form clears after successful submission
- [ ] Download button downloads resume
- [ ] Resume has correct filename
- [ ] Backend server starts without errors
- [ ] Health endpoint returns success

---

## 🎉 You're All Set!

Your CRT TV Portfolio now has:
- ✅ Working social media links with Font Awesome icons
- ✅ Functional contact form with email notifications
- ✅ Downloadable resume feature
- ✅ Professional error handling and user feedback

Need help? Check:
- `server/README.md` - Detailed backend guide
- Console logs - For debugging errors
- Browser DevTools - Network tab for API calls

Happy portfolio building! 📺✨
