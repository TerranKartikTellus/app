import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/src/lib/useAuth';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import firebase from 'firebase';
import Link from 'next/link';



const LoggedIn = ({students}) => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  const [time,settime] = useState(null);
  const [edit,setEdit] = useState({
    view: false,
    data: null,
    newEdit: null
  })
  const [student,setStudent] = useState(null);
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const onSubmitUpdate = (data,e) => {
  console.log(data);
  preventDefault(e)
  firebase
  .firestore()
  .collection("student")
  .doc(edit.data.id)
  .update({data})
  .then(function() {
    console.log("Document successfully updated!");
    toast.success("Document successfully updated!",{
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
    toast.error('Deleted Item',{
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
  });
  // reset();
}


  const [blog,setBlog] = useState({
    view: false,
    data: null
  });

  console.log(students);
  useEffect(() => {
   
    const current = new Date();
    const timee = current.toLocaleTimeString("en-US");
    settime(timee)
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  function deleteId(id){
    console.log('delete start');
      firebase
        .firestore()
        .collection("student")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
          toast.success("Deleted idem.",{
                icon: '👏',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
          
          Router.reload(window.location.pathname)
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
          toast.error('Deleted Item',{
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
  return (
   <div > 

{blog.view && <div className='z-50 flex flex-col items-center justify-center fixed top-0 left-0 w-full h-screen bg-gray-100'>
      <div className=' w-8/12 h-4/6'>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <div className='flex text-lg mb-10 flex-row items-center justify-between w-full'>
        <div>View Student Info</div>
        <div>{time}</div>
      </div>
      <div className='w-full'>
        <form className='w-full space-y-5 font-normal tracking-wider' >

          {/* Row 1 */}
          <div className='flex flex-row items-center justify-between space-x-5'>
            <div className='w-1/3'>
              <input disabled defaultValue={student.firstName} placeholder='First Name' {...register("firstName", { required: true, maxLength: 20 })} className="bg-white disabled:bg-gray-500 disabled:text-white/80 w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.firstName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.firstName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input disabled defaultValue={student.middleName} placeholder='Middle Name' {...register("middleName", { required: true, maxLength: 20 })} className="bg-white disabled:bg-gray-500 disabled:text-white/80 w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.middleName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.middleName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input disabled defaultValue={student.lastName} placeholder='Last Name' {...register("lastName", { required: true, maxLength: 20 })} className="bg-white w-full disabled:bg-gray-500 disabled:text-white/80 py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.lastName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.lastName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>
          </div>

          {/* Row 2 */}
          <div className='flex flex-row space-x-5 items-center justify-between'>

          <div className='w-1/3'>
            <select disabled defaultValue={student.class} placeholder='Select Class' {...register("class",{required: true,})} className="bg-white w-full py-2 px-5 disabled:bg-gray-500 disabled:text-white/80 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
              {/* <option >Select Class</option> */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              
            </select>
            <p className='b-400'>{errors.class?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              
          </div>

          
          <div className='w-1/3'>
            <select disabled defaultValue={student.devision} placeholder='Select Devision' {...register("devision",{required: true,})} className="bg-white w-full py-2 px-5 disabled:bg-gray-500 disabled:text-white/80 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
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
            <input disabled defaultValue={student.regno} placeholder='Enter roll number 0-99' type="number" className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] disabled:bg-gray-500 disabled:text-white/80 outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" {...register("regno", { required: true,min: 0, max: 99 })} />
            <p className='b-400'>{errors.regno?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'min' && <p role="alert" className='text-sm pl-2'>Min  0</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'max' && <p role="alert" className='text-sm pl-2'>Max  99</p>}</p>
              
          </div>
          </div>

            <div className='h-10'></div>
          {/* /row 3 */}
          <div className='flex flex-row items-center space-x-5  justify-between'>
            <div className='w-1/2'>
              <input disabled defaultValue={student.addressLine1} placeholder='Address Line 1 (0-50) letters' {...register("addressLine1", { required: true, maxLength: 50 })} className="bg-white disabled:bg-gray-500 disabled:text-white/80 w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine1?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine1?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 1 is required</p>}</p>
              
            </div>

            <div className='w-1/2'>
              <input disabled defaultValue={student.addressLine2} placeholder='Address Line 2 (0-50) letters' {...register("addressLine2", { required: true, maxLength: 50 })} className="bg-white disabled:bg-gray-500 disabled:text-white/80 w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine2?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine2?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 2 is required</p>}</p>
              
            </div>
          </div>

          {/* row 4 */}
          <div className='flex space-x-5 flex-row items-center justify-between'>
            <div className='w-1/3'>
              <input disabled defaultValue={student.landmark} placeholder='Landmark (0-20) letters' {...register("landmark", { required: true, maxLength: 20 })} className="bg-white disabled:bg-gray-500 disabled:text-white/80 w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.landmark?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.landmark?.type === 'required' && <p role="alert" className='text-sm pl-2'>Landmark is required</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input disabled defaultValue={student.city} placeholder='City (0-20) letters' {...register("city", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 disabled:bg-gray-500 disabled:text-white/80 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.city?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.city?.type === 'required' && <p role="alert" className='text-sm pl-2'>City is required</p>}</p>
            
            </div>

            <div className='w-1/3'>
              <input disabled defaultValue={student.pin} placeholder='Pin Code ' type={'number'} {...register("pin", { required: true, min: 0, max: 999999})} className="bg-white w-full py-2 px-5 disabled:bg-gray-500 disabled:text-white/80 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.pin?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.pin?.type === 'required' && <p role="alert" className='text-sm pl-2'>Pin Code is required</p>}</p>
            
            </div>
          </div>
        </form>
      
      <button onClick={()=>{
        setBlog({...blog,view:!blog.view})
      }} className='bg-[#F33823] rounded-md py-2 px-20  text-gray-200  w-full  my-20'>Close</button>

      </div>
    </div>
    </div>
 
}
         <div className='flex flex-row items-center justify-between px-3 text-lg'> 
          <div>Manage Students</div>
          <div>{time}</div>
         </div>
         <div className='mx-5'> 
          <div className='space-x-[3px]  text-gray-50 flex flex-row items-start rounded-md my-2  justify-start'>
            <div className='bg-[#F33823] rounded p-2 w-3/12 text-center tracking-wide'>Name</div>
            <div className='bg-[#F33823] rounded p-2 w-3/12 text-centertracking-wide'>Class</div>
            <div className='bg-[#F33823] rounded p-2 w-3/12 text-center tracking-wide'>Roll No.</div>
            <div className='bg-[#F33823] rounded p-2 w-3/12 text-center tracking-wide'>View/Edit/Delete</div>
          </div>
          <div className=''>
          {students ? students.map((i,index)=>(
            <div key={index} className='space-x-[3px]  text-gray-800 flex flex-row items-start rounded-md my-2  justify-start even:bg-gray-red-500 '>
              <div className=' text-center rounded p-2 w-3/12  tracking-wide'>{i.firstName}</div>
              <div className=' text-center rounded p-2 w-3/12  tracking-wide'>{i.class}</div>
              <div className=' text-center rounded p-2 w-3/12  tracking-wide'>{i.regno}</div>
              <div className=' text-center flex flex-row items-center justify-center space-x-5   rounded p-2 w-3/12  tracking-wide'>
                  <button onClick={()=>{
                    setBlog(
                      {...blog,data:i,view:!blog.view}
                    );
                    setStudent(i);
                  }}>
                    <div className='bg-[#F33823] rounded-full p-1 hover:bg-opacity-80'>
                    <img src="/view.svg" className='w-5 h-5  invert'></img>
                    </div>
                  </button>

                  <Link href={`/manage/edit?id=${i.id}`}>
                    <div className='bg-[#F33823]  rounded-full p-1 hover:bg-opacity-80'>
                    <img src="/edit.svg" className='w-5 h-5  invert'></img>
                    </div>
                  </Link>

                  <button onClick={
                    () => { 
                      if (window.confirm('Are you sure you wish to delete this item ?')) {
                            deleteId(i.id)
                      }
                    } 
                  }>
                    <div className='bg-[#F33823]  rounded-full p-1 hover:bg-opacity-80'>
                    <img src="/delete.svg" className='w-5 h-5  invert'></img>
                    </div>
                  </button>

              </div>
          </div>
          )): "No Data found"
        }
           </div>
         </div>
   </div>
  )
}

export default LoggedIn;


export async function getServerSideProps(context) {
  const entries = await firebase.firestore().collection("student").get();
  const entriesData = entries.docs.map((entry) => ({
    id: entry.id,
    ...entry.data()
  }))
  
  console.log(entriesData);
  return {
    props: {students: entriesData}, // will be passed to the page component as props
  }
}