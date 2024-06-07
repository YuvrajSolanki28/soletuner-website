import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'
connect()

export async function POST(request: NextRequest){

    try {
        const reqBody =await request.json()
        const {username, eamil, password}= reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if (user){
            return NextResponse.json({error: "User alredy exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            eamil,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType: "VERFIY", userId: savedUser._id})

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            savedUser
        })



    } catch (error) {
     return NextResponse.json({error: error.message},
    {status: 500})
    }
}