import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '/src/lib/useAuth';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();
      // const { authUser, loading, signOut } = useAuth();
  // const router = useRouter();
      const { authUser, loading, signOut } = useAuth();
  // const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  const onSubmit = event => {
    setError(null)
    signInWithEmailAndPassword(email, password)
    .then(authUser => {
      console.log("Success. The user is created in firebase")
      router.push('/manage');
    })
    .catch(error => {
      setError(error.message)
    });
    event.preventDefault();
  };

  return (
    <div className=' w-full bg-r h-full'>

      {!authUser ? <Form onSubmit={onSubmit} className="text-sm">
          { error && <Alert color="danger">{error}</Alert>}
            <FormGroup row className='flex flex-row item-center justify-start space-x-12 p-2 '>
              <Label for="loginEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input className='outline-0 border-b-[1px] focus:border-[#F33823]'
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row className='flex flex-row item-center justify-start space-x-5 p-2'>
              <Label for="loginPassword" sm={4}>Password</Label>
              <Col sm={8} >
                <Input className='outline-0 border-b-[1px] focus:border-[#F33823]'
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row className='flex flex-row item-center justify-start space-x-5 p-2'>
             <Col>
               <Button className='border-[1px] border-[#F33823] py-2 px-16 rounded-md mx-5 hover:bg-[#F33823] hover:text-white'>Login</Button>
             </Col>
           </FormGroup>
           <FormGroup row>
            <Col>
              No account? <Link href="/sign_up">Create one</Link>
            </Col>
          </FormGroup>
          </Form>
          : <div className=''>
              Add student: <Link legacyBehavior href="/add"><a className='underline'>here</a></Link>
              <br></br>
              Manage student list: <Link legacyBehavior href="/manage"><a className='underline'>here</a></Link>

          </div>
          }
    </div>
  )
}