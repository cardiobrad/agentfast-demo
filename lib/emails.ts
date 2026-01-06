import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
  await resend.emails.send({
    from: 'AI-Fast <onboarding@resend.dev>',
    to: email,
    subject: 'Welcome to AI-Fast Boilerplate!',
    html: `<h1>Welcome, ${name}!</h1><p>Thanks for joining AI-Fast. You can now start building your AI apps.</p>`,
  });
};
