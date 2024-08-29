'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { LoginFooter } from '@/components/login-footer';

export default function Login(): JSX.Element {
  const [identifier, setIdentifier] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying sign-in status
  const [messageColor, setMessageColor] = useState(''); // For setting text color
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!identifier || !password) {
      setMessage('Please fill in all fields.');
      setMessageColor('text-red-500');
      return;
    }

    try {
      const response = await axios.post('http://localhost/petversedata/login.php', {
        identifier,  // Pass either username or email
        password,
      });

      if (response.data.status === 'success') {
        // Store displayName and userId in local storage
        localStorage.setItem('displayName', response.data.displayName);
        localStorage.setItem('userId', response.data.userId);

        setMessage('Login successful!');
        setMessageColor('text-[#F19125]');

        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); // 2-second delay before redirecting
      } else {
        setMessage(`Login failed: ${response.data.message}`);
        setMessageColor('text-red-500');
      }
    } catch (error) {
      setMessage('An error occurred during login.');
      setMessageColor('text-red-500');
      console.error('Error during login: ', error);
    }
  };

  return (
    <>
      <main className='grid lg:grid-cols-[45vw,1fr] font-twitter-chirp'>
        <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
          <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-heavy lg:max-w-none lg:gap-5'>
            <Image
              src='/assets/peticon.png'
              alt='PetVerse Icon'
              width={100}
              height={100}
              className='mx-auto lg:mx-0'
            />
            <h1
               className='text-3xl text-black before:content-["Join_us_now_in_PetVerse"] 
                       lg:text-5xl lg:before:content-[""]'
            />
            <h2 className='hidden text-xl text-black lg:block lg:text-5xl'>
              Sign in to PetVerse
            </h2>
          </div>
          <div className='w-full max-w-xs'>
            <div className='mb-4 text-black '>
              <Label htmlFor="identifier" className="block mb-2 font-bold">
                Username or Email
              </Label>
              <Input
                id="identifier"
                ref={identifierRef}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="PetVerse username or email"
                className="w-full text-black"
              />
            </div>
            <div className='mb-6 text-black '>
              <Label htmlFor="password" className="block mb-2 font-bold">
                Password
              </Label>
              <Input
                id="password"
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PetVerse password"
                className="w-full text-black"
              />
            </div>
            <div className='grid gap-3 font-bold'>
              <Button
                onClick={handleSignIn}
                className='bg-[#F19125] text-black transition hover:brightness-90
                          focus-visible:!ring-[#F19125]/80 focus-visible:brightness-90 active:brightness-75 font-twitter-chirp font-bold'
              >
                Sign in
              </Button>
              {/* Display sign-in status message */}
              {message && <p className={`mt-4 ${messageColor}`}>{message}</p>}
            </div>
            {/* Sign Up Link */}
            {/* <p className='text-center mt-6 text-s text-light-secondary dark:text-dark-secondary font-twitter-chirp'>
            Don&apos;t have an PetVerse account?{' '}
              <span
                className='text-[#F19125] cursor-pointer hover:underline font-bold'
                onClick={() => router.push('/signup')}
              >
                Sign Up.
              </span>
            </p> */}
          </div>
        </div>
        <div className='relative hidden items-center justify-center lg:flex' style={{ height: '94vh' }}>
          <Image
            src='/assets/petverse-banner.jpg'
            alt='HugotWave banner'
            fill
            className="object-cover"
          />
        </div>
      </main>
      <LoginFooter /> {/* Include the footer here */}
    </>
  );
}
