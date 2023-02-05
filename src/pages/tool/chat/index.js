import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import firebase from 'firebase';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai'
const api =process.env.NEXT_PUBLIC_OPENAI_API

export default function Edit({student,id}){
  const configuration = new Configuration({
    apiKey: api,
  });
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
  // console.log(process.env.NEXT_PUBLIC_OPENAI_API);
  // console.log(input);
const DEFAULT_PARAMS = {
  "model": "text-davinci-002",
  "temperature": 0.7,
  "max_tokens": 256,
  "top_p": 1,
  "frequency_penalty": 0,
  "presence_penalty": 0
}
const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(api)
    },
    body: JSON.stringify({
      'model': 'text-davinci-002',    
      'prompt': input,
          'temperature': 0.1,
          'max_tokens': 50,
          'top_p': 1,
          'frequency_penalty': 0,
          'presence_penalty': 0.5,
          'stop': ["\"\"\""],
        })
      
  };
  await fetch('https://api.openai.com/v1/completions', requestOptions)
  
  // await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: `${input}`,
  //     temperature: 0, // Higher values means the model will take more risks.
  //     max_tokens: 50, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
  //     top_p: 1, // alternative to sampling with temperature, called nucleus sampling
  //     frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
  //     presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
  //   })

  .then(function (response) {
    console.log("Summary: " + response.data.choices[0].text);
    setoutput(response.data.choices[0].text)
    setoutput('got')
  
  })
  .catch(function (error) {
    console.log('Server error'+error);
    setoutput('Error Occured')
  
  });

  setload("Get")

}

return(
    <div className='w-full h-full flex flex-col items-center justify-center space-y-4'>

    <div className='flex flex-row items-center justify-center space-x-3 w-full '>
      <input placeholder='Enter Short Text for Summarization' className='placeholder-gray-900 focus:border-[2px] focus:border-green-500 outline-0 p-2 w-5/12        text-gray-900 rounded-md h-[250px]'        onChange={(e)=>{setinput(e.target.value)}} ></input>
      <div  placeholder='Summarized text will appear here  ' className={`${load=='Get' && "border-[1px] border-green-600 text-gray-100"} placeholder-gray-100 outline-0 p-2 w-5/12  rounded-md h-[250px]`} >{output}</div>
    </div>
    <button onClick={onSubmit} className={` bg-green-600 rounded-sm text-gray-200 py-1 px-20 `}>{load}</button>
    </div>
  );
}

function Load(){
  return <div>Loading</div>
}