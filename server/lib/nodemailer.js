import nodemailer from "nodemailer"

/** email verification */

const sendEmailVerification = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'juniorbeast177@gmail.com',
            pass: process.env.GOOGLE_PASSWORD
        }
    });

    /** mail options */
    const mailOptions = {
        from: 'storemart.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click the following to verify your email: http://localhost:${process.env.PORT}/api/auth/verify/${verificationToken}`
    }

    /**send email */
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}

export default sendEmailVerification;