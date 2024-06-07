import { connect } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'


connect()
export async function GET(request: NextRequest){
    try {
        const respone = NextResponse.json({
            message: "Logout successfully",
            success: true
        })

        respone.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        })

        return respone

    } catch (error) {
        return NextResponse.json({error: error.message},{status:500})
    }
}