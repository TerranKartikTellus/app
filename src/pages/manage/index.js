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
{
  edit.view && <div className='fixed flex flex-col items-center justify-center  top-0 bg-gray-100/95 left-0 h-screen w-screen overflow-hidden'>
    <div className='w-10/12 h-5/6'>
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
              <input defaultValue={edit.data.firstName} placeholder='First Name' {...register("firstName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.firstName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.firstName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input defaultValue={edit.data.middleName} placeholder='Middle Name' {...register("middleName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.lastName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.lastName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input  defaultValue={edit.data.lastName} placeholder='Last Name' {...register("lastName", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.lastName?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              <p className='b-400'>{errors.lastName?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              
            </div>
          </div>

          {/* Row 2 */}
          <div className='flex flex-row space-x-5 items-center justify-between'>

          <div className='w-1/3'>
            <select  defaultValue={edit.data.class} placeholder='Select Class' {...register("class",{required: true,})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
              {/* <option >Select Class</option> */}
              <option value="VI-A">VI-A</option>
              <option value="VI-B">VI-B</option>
              <option value="VI-C">VI-C</option>
            </select>
            <p className='b-400'>{errors.class?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              
          </div>

          
          <div className='w-1/3'>
            <select  defaultValue={edit.data.devision} placeholder='Select Devision' {...register("devision",{required: true,})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30">
              {/* <option >Select Division</option> */}
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
            </select>
            <p className='b-400'>{errors.devision?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
              
          </div>

          
          <div className='w-1/3'>
            <input  defaultValue={edit.data.regno} placeholder='Enter roll number 0-99999' type="number" className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" {...register("regno", { required: true,min: 0, max: 99999 })} />
            <p className='b-400'>{errors.regno?.type === 'required' && <p role="alert" className='text-sm pl-2'>First name is required</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'min' && <p role="alert" className='text-sm pl-2'>Min  0</p>}</p>
            <p className='b-400'>{errors.regno?.type === 'max' && <p role="alert" className='text-sm pl-2'>Max  99999</p>}</p>
              
          </div>
          </div>

            <div className='h-10'></div>
          {/* /row 3 */}
          <div className='flex flex-row items-center space-x-5  justify-between'>
            <div className='w-1/2'>
              <input  defaultValue={edit.data.addressLine1} placeholder='Address Line 1 (0-50) letters' {...register("addressLine1", { required: true, maxLength: 50 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine1?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine1?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 1 is required</p>}</p>
              
            </div>

            <div className='w-1/2'>
              <input  defaultValue={edit.data.addressLine2} placeholder='Address Line 2 (0-50) letters' {...register("addressLine2", { required: true, maxLength: 50 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.addressLine2?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.addressLine2?.type === 'required' && <p role="alert" className='text-sm pl-2'>Address Line 2 is required</p>}</p>
              
            </div>
          </div>

          {/* row 4 */}
          <div className='flex space-x-5 flex-row items-center justify-between'>
            <div className='w-1/3'>
              <input  defaultValue={edit.data.landmark} placeholder='Landmark (0-20) letters' {...register("landmark", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
              <p className='b-400'>{errors.landmark?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.landmark?.type === 'required' && <p role="alert" className='text-sm pl-2'>Landmark is required</p>}</p>
              
            </div>

            <div className='w-1/3'>
              <input  defaultValue={edit.data.city} placeholder='City (0-20) letters' {...register("city", { required: true, maxLength: 20 })} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.city?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.city?.type === 'required' && <p role="alert" className='text-sm pl-2'>City is required</p>}</p>
            
            </div>

            <div className='w-1/3'>
              <input  defaultValue={edit.data.pin} placeholder='Pin Code ' type={'number'} {...register("pin", { required: true, min: 0, max: 99999})} className="bg-white w-full py-2 px-5 rounded-md border-[1px] focus:border-[#F33823] outline-none text-gray-600 placeholder-gray-600 border-[#F33823]/30" />
                <p className='b-400'>{errors.pin?.type === 'maxLength' && <p role="alert" className='text-sm pl-2'>Max length 20</p>}</p>
              <p className='b-400'>{errors.pin?.type === 'required' && <p role="alert" className='text-sm pl-2'>Pin Code is required</p>}</p>
            
            </div>
          </div>
          <input onClick={()=>{
            handleSubmit(onSubmitUpdate)
            reset()
          }} placeholder='Edit Student' className='hover:bg-opacity-80 bg-[#F33823] rounded-md py-2 text-white px-16 ml-5' type={"submit"}></input>
        </form>
      

      </div>
    </div>
 
  </div>
}
{blog.view && <div className='fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-100/60 z-50'>
          <div className='shadow-2xl bg-gray-100 text-lg space-y-10 rounded-t-md  w-4/6 h-4/6 p-10'>
            <div className=' flex flex-row items-center justify-between space-x-5'>
              <div>First Name: {blog.data.firstName}</div>
              <div>Middle Name: {blog.data.middleName}</div>
              <div>Last Name: {blog.data.lastName}</div>
            </div>

            <div className='flex flex-row items-center justify-between space-x-5'>
              <div>Class: {blog.data.class}</div>
              <div>Division: 
                {blog.data.devision==1 && 'First' }
                {blog.data.devision==2 && 'Second' }
                {blog.data.devision==3 && 'Third' }
              </div>
              <div>Last Name: {blog.data.regno}</div>
            </div>

            <div className='flex flex-row items-center justify-between space-x-5'>
              <div>First Name: {blog.data.addressLine1}</div>
              <div>Middle Name: {blog.data.addressLine2}</div>
           </div>

            
            <div className='flex flex-row items-center justify-between space-x-5'>
              <div>Landmark: {blog.data.landmark}</div>
              <div>City: {blog.data.city}</div>
              <div>Pin Code: {blog.data.pin}</div>
            </div>

            
          </div>
          <button className='bg-[#F33823] rounded-b-md text-white p-2 w-4/6 ' onClick={()=>{
              setBlog({...blog,view:!blog.view})
            }} >Close</button>
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