import { connectDB } from '@/dbConfig/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connectDB();

export async function POST(request: NextRequest) {
  // Here we will extract _id from token generated while logging in, then we use that id to search user in db and then we fetch and display his details
  const userId = await getDataFromToken(request);
  const user = await User.findById({ _id: userId }).select('-password');

  return NextResponse.json({
    message: 'User Found...',
    data: user,
  });
}
