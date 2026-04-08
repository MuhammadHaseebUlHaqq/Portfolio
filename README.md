# Portfolio (React + Vite)

Personal portfolio website built with React, Vite, GSAP, and EmailJS for the contact form.

## Setup

1. Install dependencies:
   - `npm install`
2. Create `.env` in the project root using `.env.example`:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. Run locally:
   - `npm run dev`

## Contact Form (EmailJS)

The contact form uses `@emailjs/browser` and sends via:
- `emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)`

If you see this error:
- `Invalid grant. Please reconnect your Gmail account`

It means the connected Gmail account/token in EmailJS has expired or been revoked. Fix it from EmailJS dashboard:
1. Open EmailJS dashboard -> `Email Services`
2. Reconnect the Gmail service used by your `VITE_EMAILJS_SERVICE_ID`
3. Confirm the template ID and public key still match your `.env`
4. Restart the dev server after `.env` changes
