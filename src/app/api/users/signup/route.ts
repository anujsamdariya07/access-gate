import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Validation

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists...' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(`Hashed Password: ${hashedPassword}`)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`New User Password: ${newUser.password}`)

    const savedUser = await newUser.save();
    console.log(savedUser._id.toString());

    // Send verification mail
    await sendEmail({ email: email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'User Registered Successfully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
