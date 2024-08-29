'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function LoginMain(): JSX.Element {
  const router = useRouter();

  return (
    <main className='grid lg:grid-cols-[45vw,1fr] font-twitter-chirp'>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-heavy lg:max-w-none lg:gap-16'>
          <Image
            src='/assets/peticon.png'
            alt='PetVerse Icon'
            width={100}
            height={100}
            className='mx-auto lg:mx-0'
          />
          <h1
            className='text-3xl text-black before:content-["Join_us_now_in_PetVerse"] 
                       lg:text-5xl lg:before:content-["Ultimate_destination_for_seamless_pet_management"]'
          />
          <h2 className='hidden text-xl text-black lg:block lg:text-3xl'>
            Join PetVerse Now!
          </h2>
        </div>

        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            <Button
              onClick={() => router.push('/signup')}
              className='bg-[#F19125] text-black transition hover:brightness-90
                        focus-visible:!ring-[#2BA4F4]/80 focus-visible:brightness-90 active:brightness-75 font-twitter-chirp'
            >
              Sign up with email or username
            </Button>
            <p
              className='text-center text-xs text-light-secondary dark:text-dark-secondary font-twitter-chirp'
            >
              <span className="text-black">By signing up, you agree to the</span>{' '}
              <a
                href='https://www.google.com'
                target='_blank'
                rel='noreferrer'
                className='text-[#F19125]'
              >
                Terms of Service
              </a>{' '}
              <span className="text-black">and</span>{' '}
              <a
                href='https://www.google.com'
                target='_blank'
                rel='noreferrer'
                className='text-[#F19125]'
              >
                Privacy Policy
              </a>
              , <span className="text-black">including</span>{' '}
              <a
                href='https://www.google.com'
                target='_blank'
                rel='noreferrer'
                className='text-[#F19125]'
              >
                Cookie Use
              </a>
              .
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-bold text-white font-twitter-chirp'>Already have an account? </p>
            <Button
              onClick={() => router.push('/signin')}
              className='border border-light-line-reply font-bold text-black hover:bg-[#F19125]/10
                        focus-visible:bg-[#F19125]/10 focus-visible:!ring-[#F19125]/80 active:bg-[#F19125]/20
                        dark:border-light-secondary font-twitter-chirp'
            >
              Sign in
            </Button>
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
  );
}
