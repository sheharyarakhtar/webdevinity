# Professional Landing Page Template

A modern, responsive, and fully customizable landing page template with Google Forms integration. Perfect for businesses, consultants, agencies, and service providers.

## 🚀 Features

- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Easy Customization** - All content, colors, and settings in one `config.json` file
- **Google Forms Integration** - Collect leads without backend setup
- **Professional Design** - Clean, corporate aesthetic that builds trust
- **Fast & Lightweight** - Vanilla JavaScript, no dependencies
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards included
- **UTM Tracking** - Automatic capture of traffic sources
- **WhatsApp Integration** - Direct messaging fallback
- **Netlify Ready** - Deploy in minutes

## 📁 File Structure

```
template_site/
├── index.html          # Main landing page
├── thankyou.html       # Thank you page after form submission
├── style.css           # All styles (fully responsive)
├── script.js           # Dynamic content loading & form handling
├── config.json         # ⭐ All customizable settings
├── assets/
│   ├── logo.svg        # Your logo (replace this)
│   └── icons/          # Service card icons
│       ├── consulting.svg
│       ├── solutions.svg
│       └── support.svg
└── README.md           # This file
```

## ⚙️ Quick Setup (5 Minutes)

### Step 1: Customize Your Content

Edit `config.json` with your business information:

```json
{
  "businessName": "Your Business Name",
  "tagline": "Your tagline here",
  "heroHeadline": "Your main headline",
  "heroSubheadline": "Your supporting text",
  "whatsapp": "923001234567",  // Your WhatsApp number
  "email": "contact@yourbusiness.com"
}
```

### Step 2: Set Up Google Form

1. **Create a Google Form** at [forms.google.com](https://forms.google.com)
2. Add these fields (in order):
   - Name (Short answer, required)
   - Email (Short answer, required)
   - Phone (Short answer, optional)
   - Message (Paragraph, optional)
   - Source (Short answer, hidden - for UTM tracking)
   - Referrer (Short answer, hidden - for referrer tracking)

3. **Get the Form Action URL:**
   - Click "Send" → Click the `<>` (embed) icon
   - Copy the URL from `src="..."` in the iframe code
   - Change `/viewform` to `/formResponse` at the end
   - Example: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

4. **Get Entry IDs for Each Field:**
   - Open your form in preview mode
   - Right-click on each input field → Inspect
   - Find the `name` attribute (e.g., `entry.1234567890`)
   - Copy each entry ID

5. **Update config.json:**

```json
{
  "formAction": "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
  "formFields": {
    "name": "entry.1930747673",
    "email": "entry.683428092",
    "phone": "entry.712257613",
    "message": "entry.434884089"
  }
}
```

### Step 3: Customize Services

Edit the `services` array in `config.json`:

```json
{
  "services": [
    {
      "icon": "assets/icons/consulting.svg",
      "title": "Your Service 1",
      "description": "Description of your service"
    },
    {
      "icon": "assets/icons/solutions.svg",
      "title": "Your Service 2",
      "description": "Description of your service"
    },
    {
      "icon": "assets/icons/support.svg",
      "title": "Your Service 3",
      "description": "Description of your service"
    }
  ]
}
```

### Step 4: Replace Assets

- Replace `assets/logo.svg` with your logo
- Replace service icons in `assets/icons/` (keep same filenames or update config.json)
- Update `heroImage` URL in config.json to your own image

### Step 5: Customize Colors (Optional)

```json
{
  "colors": {
    "primary": "#2c3e8f",
    "primaryDark": "#1e2a5f",
    "accent": "#4f3cc9",
    "accentDark": "#392fa6"
  }
}
```

## 🚀 Deployment to Netlify

### Option 1: Drag & Drop (Easiest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire `template_site` folder to Netlify
3. Done! Your site is live

### Option 2: Git Deployment

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Connect your repo to Netlify
4. Deploy!

### Custom Domain Setup

1. In Netlify, go to Domain Settings
2. Add your custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Netlify)

## 📊 UTM Tracking

The template automatically captures traffic sources. Use these URL parameters:

- `?utm_source=whatsapp` - Track WhatsApp traffic
- `?utm_source=linkedin` - Track LinkedIn traffic
- `?utm_source=facebook` - Track Facebook traffic
- `?source=instagram` - Alternative parameter
- `?ref=email` - Another alternative

Example: `https://yoursite.com?utm_source=whatsapp`

The source is automatically saved in your Google Form responses.

## 🎨 Customization Guide

### Changing Colors

All colors are CSS custom properties in `style.css`:

```css
:root {
  --color-primary: #2c3e8f;
  --color-accent: #4f3cc9;
  /* etc. */
}
```

Or use `config.json` (recommended):

```json
{
  "colors": {
    "primary": "#YOUR_COLOR"
  }
}
```

### Adding More Services

Just add more objects to the `services` array in `config.json`. The layout automatically adjusts.

### Changing Hero Image

Update the `heroImage` URL in `config.json`:

```json
{
  "heroImage": "https://images.unsplash.com/photo-YOUR_IMAGE?w=1200"
}
```

Or use a local image:

```json
{
  "heroImage": "assets/hero.jpg"
}
```

### Adding Social Links

```json
{
  "social": {
    "linkedin": "https://linkedin.com/company/yourcompany",
    "twitter": "https://twitter.com/yourcompany",
    "facebook": "https://facebook.com/yourcompany"
  }
}
```

## 🔧 Testing

### Test Locally

1. Open `index.html` in a browser, OR
2. Use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```
3. Visit `http://localhost:8000`

### Test Form Submission

1. Fill out and submit the form
2. Check your Google Form responses
3. Verify you're redirected to `thankyou.html`
4. Check that UTM source is captured

### Test Responsiveness

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes

## 🐛 Troubleshooting

### Form Not Submitting

- ✅ Check that `formAction` URL ends with `/formResponse`
- ✅ Verify all `entry.XXXXX` IDs match your Google Form
- ✅ Make sure form is set to "Accept responses"
- ✅ Check browser console for errors (F12)

### Config Not Loading

- ✅ Make sure `config.json` is valid JSON (use [jsonlint.com](https://jsonlint.com))
- ✅ Check browser console for errors
- ✅ Ensure file is named exactly `config.json`

### Styles Not Showing

- ✅ Verify `style.css` is in the same folder as `index.html`
- ✅ Clear browser cache (Ctrl+Shift+R)
- ✅ Check for CSS syntax errors

### Images Not Loading

- ✅ Check file paths are correct
- ✅ Ensure images exist in `assets/` folder
- ✅ Verify image URLs are accessible

## 📱 WhatsApp Integration

The template includes WhatsApp integration for direct messaging:

1. Set your WhatsApp number in `config.json` (include country code, no + or spaces)
   ```json
   {
     "whatsapp": "923001234567"
   }
   ```

2. Users can click WhatsApp links on:
   - Contact section
   - Thank you page
   - Fallback modal (if form fails)

## 🎯 Best Practices

### For Sales/Quick Deployment

1. **Test everything** before sending to client
2. **Use UTM parameters** in all your outreach links
3. **Monitor Google Form responses** regularly
4. **Keep a template copy** for future clients
5. **Document any customizations** you make

### For SEO

1. Update all meta tags in `config.json` under `seo`
2. Use descriptive, keyword-rich content
3. Add alt text to all images
4. Keep page load time fast (< 3 seconds)

### For Conversions

1. Keep hero headline clear and benefit-focused
2. Use strong CTAs ("Get Started", "Contact Us Now")
3. Make form fields minimal (name + email minimum)
4. Add social proof if available (testimonials, logos)

## 📦 Delivery Package

When selling this template, include:

1. ✅ All files in `template_site/` folder
2. ✅ This README.md with instructions
3. ✅ Pre-filled `config.json` with client's info
4. ✅ Deployed Netlify link (if offering deployment)
5. ✅ Quick start guide (1-page PDF)

## 🔐 Security Notes

- ✅ Never put API keys or secrets in `config.json`
- ✅ Only public information (phone, email, form URLs)
- ✅ Google Form handles spam protection
- ✅ No backend = no security vulnerabilities

## 📈 Analytics (Optional)

To add Google Analytics:

1. Get your GA4 measurement ID
2. Add to `<head>` in `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 💡 Tips for Selling

- **Price**: $50-$200 depending on customization
- **Delivery time**: 24-48 hours
- **Upsells**: Custom domain setup, SEO optimization, content writing
- **Support**: Offer 1 week of free adjustments
- **Portfolio**: Use deployed versions as portfolio pieces

## 📞 Support

For issues or questions:
- Check the Troubleshooting section above
- Review `config.json` for typos
- Test in incognito mode (clears cache issues)
- Check browser console for error messages

## 📄 License

This template is for commercial use. You can:
- ✅ Sell to unlimited clients
- ✅ Modify and customize freely
- ✅ Use for your own projects
- ✅ Include in your portfolio

## 🎉 You're All Set!

Your professional landing page is ready to deploy. Good luck with your sales!

---

**Need help?** Check the troubleshooting section or review the code comments in each file.

