import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '/src/lib/useAuth';

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if(passwordOne === passwordTwo)
      createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log("Success. The user is created in Firebase")
        router.push("/add");
      })
      .catch(error => {
        // An error occurred. Set error message to be displayed to user
        setError(error.message)
      });
    else
      setError("Password do not match")
    event.preventDefault();
  };

  return (
   <Form 
            className="custom-form text-sm"
            onSubmit={onSubmit}>
          { error && <Alert color="danger">{error}</Alert>}
            <FormGroup row className='flex flex-row item-center justify-start space-x-12 p-2 '>
              <Label for="signUpEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input  className='outline-0 border-b-[1px] focus:border-[#F33823]'
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row className='flex flex-row item-center justify-start space-x-12 p-2 '>
              <Label for="signUpPassword" sm={4}>Password</Label>
              <Col sm={8}>
                <Input  className='outline-0 border-b-[1px] focus:border-[#F33823]'
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row className='flex flex-row item-center justify-start space-x-12 p-2 '>
              <Label for="signUpPassword2" sm={4}>Confirm Password</Label>
              <Col sm={8}>
                <Input  className='outline-0 border-b-[1px] focus:border-[#F33823]'
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
             <Col>
               <Button className='border-[1px] border-[#F33823] py-2 px-16 rounded-md mx-5 hover:bg-[#F33823] hover:text-white mt-3'>Sign Up</Button>
             </Col>
           </FormGroup>
          </Form>
      
  )
}

export default SignUp;