'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter()
  const [data, setData] = useState('nothing')

  const getUserDetails = async () => {
    try {
      const response = await axios.post('/api/users/me')
      console.log(response.data)
  
      setData(response.data.data._id)
    } catch (error: any) {
      console.log({message: error.message})
      toast.error(error.message)
    }
  }
  
  const logOut = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Success!')
      router.push('/login')
    } catch (error: any) {
      console.log({message: error.message})
      toast.error(error.message)
    }
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data == 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logOut}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black'
      >
        Get User Details
      </button>
    </div>
  );
}

export default page;
