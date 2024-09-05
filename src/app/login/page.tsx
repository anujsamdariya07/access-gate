'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter()
  
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoadingState(true);

      const response = await axios.post('/api/users/login', user);

      console.log('Login Success...', response.data);

      router.push('/profile');
    } catch (error) {
      console.log('Sign Up Failed!');
    }
  };
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <div className='border border-white flex flex-col px-10 py-5 rounded font-semibold'>
        <h1 className='text-center font-bold text-2xl pb-4'>
          {loadingState ? 'Processing' : 'Login'}
        </h1>

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
          <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
            {buttonDisabled ? 'Please fill the form' : 'Log In'}
          </button>
          <Link className='underline' href={'/signup'}>
            Visit Sign Up Page
          </Link>
        </div>
      </div>
    </div>
  );
}
