import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const DEFAULT_TO = 'info@hazemabdelbaset.studio';
const DEFAULT_FROM = 'Hazem Abdelbaset <info@hazemabdelbaset.studio>';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const expectedToken = process.env.EMAIL_TEST_TOKEN;
  const token = searchParams.get('token');

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, error: 'RESEND_API_KEY is missing' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = searchParams.get('to') || DEFAULT_TO;
  const from = process.env.CLIENT_FROM_EMAIL || DEFAULT_FROM;

  const result = await resend.emails.send({
    from,
    to,
    subject: 'Production Resend Test',
    html: '<p>This email was sent from the deployed website environment.</p>',
  });

  if (result.error) {
    console.error('[Debug Resend] Failed', result.error);
    return NextResponse.json({ ok: false, error: result.error.message }, { status: 500 });
  }

  console.log('[Debug Resend] Sent', result.data);
  return NextResponse.json({ ok: true, id: result.data?.id, from, to });
}

