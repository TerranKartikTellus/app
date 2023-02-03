import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';

import Link from 'next/link';
export default function SideNav(){
    const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  console.log(router.asPath)
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
     <div className='bg-transparent  w-3/12 h-screen space-y-3  pt-20'>
        <div className={!router.asPath.includes('add')  ? 'w-full bg-gray-200 hover:bg-[#F33823] hover:text-gray-50  mx-7 rounded-md py-3 ': 'w-full hover:bg-gray-200 hover:text-black bg-[#F33823] text-gray-50  mx-7 rounded-md py-3 '}>
          <Link  legacyBehavior href="/add">
            <a  className='flex flex-row items-center group justify-center space-x-7'>
              <div><img className='group-hover:invert' src="/user.svg"></img></div>
              <div>Add Student</div>
            </a>
          </Link>
        </div>
       
       <div className={!router.asPath.includes('/manage') ? 'w-full bg-gray-200 hover:bg-[#F33823] hover:text-gray-50  mx-7 rounded-md py-3 ': 'w-full hover:bg-gray-200 hover:text-black bg-[#F33823] text-gray-50  mx-7 rounded-md py-3 '}>
          <Link  legacyBehavior href="/manage">
            <a  className='flex flex-row items-center group justify-center space-x-7'>
              <div><img className='group-hover:invert' src="/manage.svg"></img></div>
              <div>Manage Student</div>
            </a>
          </Link>
        </div>
        {authUser && <div className='w-full bg-gray-200 hover:bg-[#F33823] hover:text-gray-50 text-center  mx-7 rounded-md py-3 '>
          <button  legacyBehavior onClick={signOut}>
            <a  className='flex flex-row items-center group justify-center space-x-7'>
              <div><img className='group-hover:invert' src="/logout.svg"></img></div>
              <div>Logout</div>
            </a>
          </button>
        </div>}
        {!authUser &&<div className='w-full bg-gray-200 hover:bg-[#F33823] hover:text-gray-50 text-center  mx-7 rounded-md py-3 '>
          <Link  legacyBehavior href="/">
            <a  className='flex flex-row items-center group justify-center space-x-7'>
              <div><img className='group-hover:invert' src="/login.svg"></img></div>
              <div>Login </div>
            </a>
          </Link>
        </div>}

      </div>  
  );
}