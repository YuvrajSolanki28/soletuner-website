import { connect } from '../../../../dbConfig/dbConfig'
import User from '../../../../models/userModels'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '../../../../helpers/DataFromToken'

connect()
//
export async function POST(request){
   const userId = await getDataFromToken(request)
   User.findOne({_id: userId}).select("-password")
//
return NextResponse.json({
    message:"User found",
    data: user
})

}