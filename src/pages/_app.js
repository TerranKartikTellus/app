import '@/styles/globals.css'
import Link from 'next/link';
import { AuthUserProvider } from "/src/lib/useAuth";
import { useAuth } from '/src/lib/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SideNav from '@/components/sideNav';
import Nav from '@/components/nav';
function MyApp({ Component, pageProps }) {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])
  console.log(authUser);
  return <AuthUserProvider>
    <Nav></Nav>
    <div className='flex flex-row h-full items-start justify-between font-sans font-medium'> 
      <SideNav></SideNav>
      <div className='p-16  w-full '>
        <Component {...pageProps} />
      </div>
    </div>
  </AuthUserProvider>
}

export default MyApp