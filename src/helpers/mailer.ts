import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = bcrypt.hash(userId.toString(), 10);

    // TODO: configure mail for usage
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '6fec4e00f86f66', // ❌
        pass: '01038d594f961d', // ❌
      },
    });

    const mailOptions = {
      from: 'anuj@anuj.ai',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifymail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email.' : 'reset your password.'
      } or copy paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifymail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
