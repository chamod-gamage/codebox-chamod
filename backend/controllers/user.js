import { UserModel } from '../models';
import nodemailer from 'nodemailer';
import axios from 'axios';

export const saveUserInfo = async (req, res) => {
  const user = new UserModel(req.body);
  try {
    let userDoc = await user.save();
    let welcomeEmail = await sendMail({
      from: 'CodeBox <chamodgamage26@gmail.com>',
      to: user.email,
      subject: 'Welcome to CodeBox',
      text: 'Thank you for expressing your interest in CodeBox!',
      html: '<h1>Thank you for expressing your interest in CodeBox!</h1>',
    });
    let founderEmail = await sendMail({
      from: 'CodeBox <chamodgamage26@gmail.com>',
      to: process.env.FOUNDER_EMAIL,
      subject: `User Interest Submission: ${user.name} (${user.email})`,
      text: `A user has submitted their information on the CodeBox landing page. Here is their information: 
      {
        Name: ${user.name},
        Email: ${user.email},
        Favourite Source Control Tool: ${user.tool},
        Team Size: ${user.teamSize}
      }`,
      html: `<h1>A user has submitted their information on the CodeBox landing page. Here is their information:</h1>
      <ul>
        <li>Name: ${user.name}</li>
        <li>Email: ${user.email}</li>
        <li>Favourite Source Control Tool: ${user.tool}</li>
        <li>Team Size: ${user.teamSize}</li>
      </ul>`,
    });
    let slackResponse = await sendSlack({
      channel: process.env.SLACK_CHANNEL,
      text: `A user has submitted their information on the CodeBox landing page. Here is their information:
      - Name: ${user.name}
      - Email: ${user.email}
      - Favourite Source Control Tool: ${user.tool}
      - Team Size: ${user.teamSize}`,
    });
    res.status(200).json({
      user: userDoc,
      welcomeEmail: welcomeEmail,
      founderEmail: founderEmail,
      slackResponse: slackResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMail = async ({ from, to, subject, text, html }) => {
  let account = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let info = await transporter.sendMail({ from, to, subject, text, html });
  return info.messageId;
};

const sendSlack = async ({ channel, text }) => {
  const url = 'https://slack.com/api/chat.postMessage';
  const res = await axios.post(
    url,
    {
      channel,
      text,
    },
    { headers: { authorization: `Bearer ${process.env.SLACK_TOKEN}` } }
  );
  return res.data;
};
