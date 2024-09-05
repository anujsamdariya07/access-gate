import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'User does not exists...' },
        { status: 500 }
      );
    }

    console.log('User exists...');

    // Matchiong password
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      return NextResponse.json(
        { message: 'Incorrect Password! Check your credentials...' },
        { status: 400 }
      );
    }

    // Creating token
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'Logged In Successfully',
      success: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
