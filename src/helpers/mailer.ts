import nodemailer from 'nodemailer'
import User from '../models/userModels';
import bcryptjs from 'bcryptjs'
export const sendEmail = async({email, emailType, userId}) =>
    {
        try {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)
            if(emailType === "VERIFY"){
              await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenEpiry: Date.now() + 3600000})
            } else if(emailType === "RESET"){
              await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
            }

            var transport = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "e4f4979de8af61",
                pass: "a517dbeaa19298"
              }
            });


              const mailOptions = {
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: email, 
                subject: emailType === 'VERIFY' ? "verify your email" : "reset your password",
                html: `<p>CLick <a href="${process.env.DOMAIN}/ verifymeail?token=${hashedToken}">here</a> to ${emailType === "VERFIY" ? "verify your email": "reset your password"} or copy and paste the link below in your browser.<br>
                ${process.env.DOMAIN}/verfiyemail?token=${hashedToken}
                </p>`, 
              }

              const maliResponse = await transport.sendMail(mailOptions)
              return maliResponse
              
        } catch (error) {
            throw new Error(error.message)
        }
    }