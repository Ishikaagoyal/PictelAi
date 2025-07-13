
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function POST(req: NextRequest) {
  try {
    const { userEmail, userName } = await req.json();

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (existingUser.length === 0) {
      const insertResult = await db
        .insert(usersTable)
        .values({
          name: userName,
          email: userEmail,
          credits: 5,
        })
        .returning();

      return NextResponse.json(insertResult[0]);
    }

    // If user already exists, return the existing user
    return NextResponse.json(existingUser[0]);

  } catch (error) {
    console.error("User insert failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", detail: error },
      { status: 500 }
    );
  }
}
export async function GET(req:NextRequest){
  const requrl= req.url;
  const {searchParams}= new URL(requrl);
  //const uid= searchParams?.get('uid');
  const email= searchParams?.get('email')
  if(email){
     const result= await db.select().from(usersTable)
  .where(eq(usersTable.email,email));

  return NextResponse.json(result[0]);


  }
  
 
}
