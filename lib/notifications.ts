import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export async function sendEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: 'no-reply@property-portal.com',
    subject,
    html,
  };
  return sgMail.send(msg);
}

export async function sendSMS(to: string, body: string) {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER as string,
  });
}
