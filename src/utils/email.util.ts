export const sendResetPasswordEmail = async (email: string, token: string) => {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
}