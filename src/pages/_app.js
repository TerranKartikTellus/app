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

  return <div className={router.asPath.includes('tool') ? 'bg-gray-900 text-gray-100 w-full h-full overflow-y-hidden' : 'w-full h-full overflow-y-hidden '}>
    <AuthUserProvider className="">
    <Nav></Nav>
    <div className='flex flex-row h-full items-start justify-between font-sans font-medium'> 
     {!router.asPath.includes('tool') && <SideNav></SideNav>}
      <div className='p-16  w-full '>
        <Component {...pageProps} />
      </div>
    </div>
  </AuthUserProvider>
  </div>
}

export default MyApp