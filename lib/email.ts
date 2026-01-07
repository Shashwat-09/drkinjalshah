export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    console.log(`
  ===========================================
  [MOCK EMAIL SENT]
  To: ${to}
  Subject: ${subject}
  
  ${html}
  ===========================================
  `);
    return true;
}
