import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/mail', async (req, res) => {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: process.env.SMTP_PASSWORD,
      user: process.env.SMTP_EMAIL,
    },
    service: 'gmail',
  });

  const { city, email, message, name, phone, subject } = req.body;

  const userData = `
    Dados do usuario:\n
    Nome: ${name || ''}\n
    Email: ${email || ''}\n
    Telefone: ${phone || ''}\n
    Cidade: ${city || ''}\n`;

  const emailText = `${userData}\nMensagem:\n ${message}`;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    subject: subject || 'Sem titulo',
    text: emailText || 'Email vazio, culpe danlimax',
    to: process.env.SMTP_EMAIL,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.send({
        error: 'Erro ao enviar email',
      });
    } else {
      res.send({
        message: 'Email enviado com sucesso',
      });
    }
  });
});

export default router;
