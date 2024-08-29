'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { LoginFooter } from '@/components/login-footer';

export default function SignUp(): JSX.Element {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');

    if (!username || !displayName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/petversedata/user.php', {
        operation: 'signup',
        data: {
          username,
          displayName,
          email,
          password,
        },
      });

      if (response.data.success) {
        localStorage.setItem('displayName', response.data.displayName);
        setError('<span class="text-[#F19125]">Signed up successfully!</span>');

        setTimeout(() => {
          router.push('/signin');
        }, 2000);
      } else {
        setError(response.data.error || 'Registration failed.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
      console.error('Error during registration: ', error);
    }
  };

  return (
    <>
      <main className='grid lg:grid-cols-[45vw,1fr] font-twitter-chirp'>
        <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
          <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-heavy lg:max-w-none lg:gap-16'>
            {/* <Image
              src='/assets/peticon.png'
              alt='PetVerse Icon'
              width={100}
              height={100}
              className='mx-auto lg:mx-0'
            /> */}
            <h1
              className='text-3xl text-black before:content-["Join_us_now_in_PetVerse"] 
                       lg:text-5xl lg:before:content-[""]'
            />
            <h2 className='hidden text-xl text-black lg:block lg:text-3xl'>
              Sign up to PetVerse
            </h2>
          </div>
          <div className='w-full max-w-xs'>
            <div className='mb-4 text-black '>
              <Label htmlFor="username" className="block mb-2 font-bold">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="HugotWave username"
                className="w-full text-black"
              />
            </div>
            <div className='mb-4 text-black '>
              <Label htmlFor="displayName" className="block mb-2 font-bold">
                Display Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="HugotWave display name"
                className="w-full text-black"
              />
            </div>
            <div className='mb-4 text-black '>
              <Label htmlFor="email" className="block mb-2 font-bold">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="HugotWave email"
                className="w-full text-black"
              />
            </div>
            <div className='mb-4 text-black'>
              <Label htmlFor="password" className="block mb-2 font-bold">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="HugotWave password"
                  className="w-full text-black"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-password"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="show-password" className="ml-2 text-black">Show</Label>
                </div>
              </div>
            </div>
            <div className='mb-4 text-black'>
              <Label htmlFor="confirmPassword" className="block mb-2 font-bold">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full text-black"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className='grid gap-3 '>
              <Button
                onClick={handleSignUp}
                className='bg-[#F19125] text-white transition hover:brightness-90
                          focus-visible:!ring-[#2BA4F4]/80 focus-visible:brightness-90 active:brightness-75 font-twitter-chirp '
              >
                Sign up
              </Button>
              <p className='text-center mt-6 text-s text-light-secondary dark:text-dark-secondary font-twitter-chirp'>
                Already have a PetVerse account?{' '}
                <span
                  className='text-[#F19125] cursor-pointer hover:underline font-bold'
                  onClick={() => router.push('/signin')}
                >
                  Sign in.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='relative hidden items-center justify-center lg:flex' style={{ height: '94vh' }}>
          <Image
            src='/assets/petverse-banner.jpg'
            alt='PetVerse banner'
            fill
            className="object-cover"
          />
        </div>
      </main>
      <LoginFooter />
    </>
  );
}
