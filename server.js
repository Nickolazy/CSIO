import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/send-email', (req, res) => {
  const { course, formOfEducation, trainingType, name, phone, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Ваш email
    to: process.env.EMAIL_USER,  // Куда отправляем email (тоже ваш email)
    subject: 'New Training Request',
    text: `
      Курс: ${course}
      Форма обучения: ${formOfEducation}
      Вид обучения: ${trainingType}
      Имя: ${name}
      Телефон: ${phone}
      Email: ${email}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
