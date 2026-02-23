import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, pesan } = req.body;

  if (!email || !pesan) {
    return res.status(400).json({ message: 'Email dan pesan harus diisi.' });
  }

  // Konfigurasi SMTP Google Workspace
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Akan diambil dari Vercel Environment Variables
      pass: process.env.EMAIL_PASS, // Akan diambil dari Vercel Environment Variables
    },
  });

  try {
    // Proses pengiriman email
    await transporter.sendMail({
      from: `"Web SMPIT Thoriqul Jannah" <${process.env.EMAIL_USER}>`,
      to: 'info@smpit-thoriquljannah.sch.id', // GANTI DENGAN EMAIL SEKOLAH ANDA YANG BENAR
      replyTo: email,
      subject: `Pesan Baru dari Pengunjung Website (${email})`,
      text: pesan,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e3a8a;">Pesan Baru dari Website</h2>
          <p><strong>Dari (Email Pengunjung):</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${pesan}</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Email berhasil dikirim!' });
  } catch (error) {
    console.error('Error pengiriman email:', error);
    res.status(500).json({ message: 'Gagal mengirim email.', error: error.message });
  }
}
