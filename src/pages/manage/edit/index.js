import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import firebase from 'firebase';


export default function Edit({student}){
    const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
 const [time,settime] = useState(null);
 
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    const current = new Date();
    const timee = current.toLocaleTimeString("en-US");
    settime(timee)
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])


    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
const onSubmit = (data,e) => {
  console.log(data);
  firebase
  .firestore()
  .collection("student")
  .doc(student.id)
  .update(data)
  .then(function() {
    console.log("Document successfully updated!");
    reset()
    toast.success("Document updated ",{
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
  })
  .catch(function(error) {
    console.error("Error updating document: ", error);
    // console.error("Error adding document: ", error);
              toast.error('Error updating document',{
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
  });
}
console.log(student);
  return(
    <div>
      <div className='w-full'>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <div className='flex text-lg mb-10 flex-row items-center justify-between w-full'>
        <div>Edit Student</div>
        <div>{time}</div>
      </div>
      <div className='w-full'>
        <form className='w-full space-y-5 font-normal tracking-wider' >

          {/* Row 1 */}
          <div className='flex flex-row items-center justify-between space-x-5'>
            <div className='w-1/3'>
              <input defaultValue={student.firstName} placeholder='First Name' {...register("firstName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.firstName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.firstName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input defaultValue={student.middleName} placeholder='Middle Name' {...register("middleName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.middleName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.middleName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input defaultValue={student.lastName} placeholder='Last Name' {...register("lastName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.lastName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.lastName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>
          </div>

          {/* Row 2 */}
          <div className='flex flex-row space-x-5 items-center justify-between'>

          <div className='w-1/3'>
            <select defaultValue={student.class} placeholder='Select Class' {...register("class",{required: true,})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
              {/* <option >Select Class</option> */}
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
              <option value="1">4</option>
              <option value="1">5</option>
              <option value="1">6</option>
              <option value="1">7</option>
              <option value="1">8</option>
              <option value="1">9</option>
              <option value="1">10</option>
              <option value="1">11</option>
              <option value="1">12</option>
              
            </select>
            <p className='b-400'>{errors.class?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              
          </div>

          
          <div className='w-1/3'>
            <select defaultValue={student.devision} placeholder='Select Devision' {...register("devision",{required: true,})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
              {/* <option >Select Division</option> */}
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              
            </select>
            <p className='b-400'>{errors.devision?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              
          </div>

          
          <div className='w-1/3'>
            <input defaultValue={student.regno} placeholder='Enter roll number 0-99' type="number" className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" {...register("regno", { required: true,min: 0, max: 99 })} />
            <p className='b-400'>{errors.regno?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'min' && <p role="alert" className='text-sm pl-2'>Min  0</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'max' && <p role="alert" className='text-sm pl-2'>Max  99</p>}</p>
              
          </div>
          </div>

            <div className='h-10'></div>
          {/* /row 3 */}
          <div className='flex flex-row items-center space-x-5  justify-between'>
            <div className='w-1/2'>
              <input defaultValue={student.addressLine1} placeholder='Address Line 1 (0-50) letters' {...register("addressLine1", { required: true, maxLength: 50 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine1?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine1?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 1 is required</p>}</p>
              
            </div>

            <div className='w-1/2'>
              <input defaultValue={student.addressLine2} placeholder='Address Line 2 (0-50) letters' {...register("addressLine2", { required: true, maxLength: 50 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine2?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine2?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 2 is required</p>}</p>
              
            </div>
          </div>

          {/* row 4 */}
          <div className='flex space-x-5 flex-row items-center justify-between'>
            <div className='w-1/3'>
              <input defaultValue={student.landmark} placeholder='Landmark (0-20) letters' {...register("landmark", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.landmark?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.landmark?.type === 'required' && <p role="alert" className='text-sm pl-2'>Landmark is required</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input defaultValue={student.city} placeholder='City (0-20) letters' {...register("city", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.city?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.city?.type === 'required' && <p role="alert" className='text-sm pl-2'>City is required</p>}</p>
            
            </div>

            <div className='w-1/3'>
              <input defaultValue={student.pin} placeholder='Pin Code ' type={'number'} {...register("pin", { required: true, min: 0, max: 999999})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.pin?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.pin?.type === 'required' && <p role="alert" className='text-sm pl-2'>Pin Code is required</p>}</p>
            
            </div>
          </div>
          <input onClick={handleSubmit(onSubmit)} placeholder='Add Student' className='hover:bg-opacity-80 bg-[#F33823] rounded-md py-2 text-white px-16 ml-5' type={"submit"}></input>
        </form>
      

      </div>
    </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const entries = await firebase.firestore().collection("student").get();
  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data()
  }));
  let data=null;
  for(let i=0;i<entriesData.length;i++){
    if(entriesData[i].id == context.query.id){
      data = entriesData[i]
    }
  }
  console.log(context);
  return {
    props: {student: data}, // will be passed to the page component as props
  }
}