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
                {blog.data.devision}
              </div>
              <div>Last Name: {blog.data.regno}</div>
            </div>

            <div className='flex flex-row items-center justify-between space-x-5'>
              <div>Address Line 1: {blog.data.addressLine1}</div>
              <div>Address Line 2: {blog.data.addressLine2}</div>
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