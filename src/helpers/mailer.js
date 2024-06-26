import nodemailer from 'nodemailer'
import User from '../models/userModels';
import bcryptjs from 'bcryptjs'
export const sendEmail = async({email, emailType, userId}) =>
    {
        try {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)
            if(emailType === "VERIFY"){
              await User.findByIdAndUpdate(userId, {$set:{
                  verifyToken: hashedToken,
                  verifyTokenEpiry: new Date(Date.now() + 3600000)
                }
              });
              console.log("Updated User for VERIFY", updateduser);
              
            } else if(emailType === "RESET"){
              await User.findByIdAndUpdate(userId, { 
                $set:{
                  forgotPasswordToken: hashedToken, 
                  forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
            }

            var transport = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "738c670d97b317",
                pass: "2a561ae8d1d09b"
              }
            });

              const mailOptions = {
                from: 'yuvrajsolanki2809@gmail.com', 
                to: email, 
                subject: emailType = "verify your email" ,
                html: `<p>Click <a href="/${process.env.DOMAIN} verifyemail${hashedToken}">here</a> to ${emailType =  "verify your email"} or copy and paste the link below in your browser.<br>
                ${process.env.DOMAIN}/verfiyemail?token=${hashedToken}
                </p>`, 
              }

              const maliResponse = await transport.sendMail(mailOptions)
              return maliResponse
              
        } catch (error) {
            throw new Error(error.message)
        }
    }