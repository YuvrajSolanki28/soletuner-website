import { connect } from '../../../../dbConfig/dbConfig'
import User from '../../../../models/userModels'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()
export async function POST(request){
    try {

        const reqBody =await request.json()
        const {eamil, password}= reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "User Does Not Exists"},{status:500})
        }
        console.log("User Exits");
        const validPassword = await bcryptjs.compare(password, user.password)
        
        if (!validPassword) {
            return NextResponse.json({error: "Check your credentials"},{status:500})
        }

        const tokneData = {
            id: user._id,
            username: user.username,
            eamil: user.eamil
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })

        const respone = NextResponse.json({
            message: "Logged In Success",
            success: true
        })

        respone.cookies.set("token", token, {
            httpOnly: true
        })
        return respone

    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}