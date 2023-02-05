import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';

import Link from 'next/link';

export default function Nav(){
    const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    <div className={`${router.asPath.includes('tool') ? "bg-gray-900" :"bg-slate-100/30"} py-5 h-full px-5 top-0 flex flex-row items-center justify-between left-0 w-full bg-gen-400 h`}>
      <img className={router.asPath.includes('tool') && 'invert'} src="/logo.svg"></img>
      <Link href={authUser?.email ? "/manage" : "/signup"} legacyBehavior>
      <a  className={`border-[1px] ${router.asPath.includes('tool') ? "border-gray-100" : "border-gray-700"} flex flex-row items-center justify-between space-x-3 py-3 px-10 rounded-md`}>
        <div><img className={router.asPath.includes('tool') && 'invert'} src="/user.svg"></img></div>
        {   authUser ? <div>{authUser?.email}</div> : "" 
              
          }  
      </a>
      </Link>
    </div>
  );
}