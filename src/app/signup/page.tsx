'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoadingState(true);

      const response = await axios.post('/api/users/signup', user);

      console.log('Sign Up Success...', response.data);

      router.push('/login');
    } catch (error) {
      console.log('Sign Up Failed!');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <div className='border border-white flex flex-col px-10 py-5 rounded font-semibold'>
        <h1 className='text-center font-bold text-2xl pb-4'>
          {loadingState ? 'Processing' : 'Sign Up'}
        </h1>

        <label htmlFor='username'>Username</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          id='username'
          value={user.username}
          onChange={(event) =>
            setUser({ ...user, username: event.target.value })
          }
          placeholder='username'
          type='text'
        />

        <label htmlFor='email'>Email</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          id='email'
          type='text'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
        />

        <label htmlFor='password'>Password</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
        />

        <div className='pt-5 text-center flex flex-col'>
          <button
            onClick={onSignUp}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          >
            {loadingState ? 'Processing' : (buttonDisabled ? 'Please fill the form' : 'SignUp')}
          </button>
          <Link className='underline' href={'/login'}>Visit Login Page</Link>
        </div>
      </div>
    </div>
  );
}
