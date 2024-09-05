import { connectDB } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Logged Out Successfully!',
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
