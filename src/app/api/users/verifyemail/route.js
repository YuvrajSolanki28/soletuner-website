import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        await User.findOne({verifyToken: token, verifuTokenEpiry: {$gt: Date.now()}})

        if (!User) {
            return NextResponse.json({error: "Invalid token"},{status:400})
        }
        console.log(User);

        User.isVerifiyed = true
        User.verifyToken = undefined
        User.verifuTokenEpiry = undefined

        await User.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true

        }, {status:500})


    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}