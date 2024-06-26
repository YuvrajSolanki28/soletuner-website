import { connect } from '../../../../dbConfig/dbConfig'
import User from '../../../../models/userModels'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenEpiry: {$gt: Date.now()}})

        if (!user) {
            return NextResponse.json({error: "Invalid token"},{status:400})
        }
        console.log(User);

        user.isVerifiyed = true
        user.verifyToken = undefined
        user.verifuTokenEpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true

        }, {status:500})


    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}