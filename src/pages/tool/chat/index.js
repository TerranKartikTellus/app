import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import firebase from 'firebase';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai'
// import openai
const api =process.env.NEXT_PUBLIC_OPENAI_API
const org =process.env.NEXT_PUBLIC_OPENAI_ORG
// const openai = require("openai");
export default function Edit({student,id}){
  const configuration = new Configuration({
    apiKey: api,
  });
  console.log(api)
  const openai = new OpenAIApi(configuration);

    const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
 
  const [input,setinput] = useState('');
  const [output,setoutput] = useState(null);
  const [load,setload] = useState('Get');
  
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

async function onSubmit(){
  setload(<Load></Load>)

 const configuration = new Configuration({
    organization: org,
    apiKey: api,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createCompletion({
  model: "text-davinci-002",
  prompt: "'"+input+"'"+" summarise this in 100 words",
  max_tokens : 1000,
});
console.log(completion.data.choices[0].text);
completion.data && setoutput(completion.data.choices[0].text && completion.data.choices[0].text);

  setload("Get")

}

return(
    <div className='w-full  flex flex-col items-center justify-center space-y-4 h-screen'>

    <div className='flex flex-row items-center justify-center space-x-3 w-full '>
      <textarea placeholder='Enter Short Text for Summarization' className='overflow-clip  text-ellipsis placeholder-gray-900 focus:border-[2px] focus:border-green-500 outline-0 p-2 w-5/12        text-gray-900 rounded-md h-[250px]'        onChange={(e)=>{setinput(e.target.value)}} ></textarea>
      
      <div  placeholder='Summarized text will appear here  ' className={`${load=='Get' && "border-[1px] border-green-600 text-gray-100"} placeholder-gray-100 outline-0 p-2 w-5/12  rounded-md h-[250px]`} >{output}</div>
    </div>
    <button onClick={onSubmit} className={` bg-green-600 rounded-sm text-gray-200 py-1 px-20 `}>{load}</button>
    </div>
  );
}

function Load(){
  return <div>Loading</div>
}
