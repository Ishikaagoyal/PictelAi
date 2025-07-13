import { usersTable, wireframeTocode } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    const {description, imageurl, model, uid, email}= await req.json();
    const creditresult= await db.select().from(usersTable)
    .where(eq(usersTable.email, email))
    if(creditresult[0]?.credits&&creditresult[0]?.credits>0 ){
        const result= await db.insert(wireframeTocode).values({
        uid: uid,
        description: description,
        imageurl:imageurl,
        model: model,
        createdby: email

    }).returning({id:wireframeTocode.id});
    const data= await db.update(usersTable).set({
        credits:creditresult[0]?.credits-1
    }).where(eq(usersTable.email,email))
    return NextResponse.json(result);

    } else{
        return NextResponse.json({'error':'not enough credits'})
    }
    
}
export async function GET(req: NextRequest){
    const requrl= req.url;
    const {searchParams}=  new URL(requrl);
    const uid= searchParams?.get('uid')
    const email= searchParams?.get('email');
    if(uid){
        const result= await db.select()
        .from(wireframeTocode)
        .where(eq(wireframeTocode.uid,uid));
        return NextResponse.json(result[0] || {});
    }
    else if(email){
        const result= await db.select()
        .from(wireframeTocode)
        .where(eq(wireframeTocode.createdby,email));
        return NextResponse.json(result);
        
    }
    return NextResponse.json({error: "no record found"})

}
export async function PUT(req:NextRequest){
    const {uid, coderesp}= await req.json();
    const result= await db.update(wireframeTocode)
    .set({
        code:coderesp
    }).where(eq(wireframeTocode.uid,uid))
    .returning({uid:wireframeTocode.uid})

    return NextResponse.json(result);


}