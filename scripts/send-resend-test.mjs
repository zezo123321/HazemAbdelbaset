import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const to = process.env.RESEND_TEST_TO || 'zakiziad9001_sd@med.bsu.edu.eg';

if (!apiKey || apiKey === 're_xxxxxxxxx') {
  console.error('Missing RESEND_API_KEY. Replace re_xxxxxxxxx with your real Resend API key in .env.local or Vercel.');
  process.exit(1);
}

const resend = new Resend(apiKey);

const result = await resend.emails.send({
  from: process.env.RESEND_TEST_FROM || 'onboarding@resend.dev',
  to,
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});

if (result.error) {
  console.error('Resend test failed:', result.error);
  process.exit(1);
}

console.log('Resend test email sent:', result.data);

