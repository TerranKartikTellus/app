import { useRouter } from "next/router";
import firebase from 'firebase';

export default function View(){
//  const router = useRouter()
//   const { id } = router.query
// console.log(id);
  return(
    <div>
{/* {id} */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const snapshot = await firebase.firestore().collectionGroup('student').get();
  const paths = snapshot.docs.map(
            doc=>{
                  return{
                    params: {
                      id       }
                  };
           }
          )
  console.log(paths);
  return {
    props: {student: paths}, // will be passed to the page component as props
  }
}
