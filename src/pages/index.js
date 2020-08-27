import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { pathname } = router.pathname;
  
  useEffect(() => {
    let user = localStorage.getItem("login");
    let supplierId = localStorage.getItem('supplierId');
    console.log("The user data is", user);
    console.log("The router pathname is", pathname);
  console.log("The router query name is", id);
  if(!supplierId) {
    let string = `http://dukandar.io`;
        window.open(string, "_self");
  }
  else{
        router.push(`/${supplierId}`)
  }
    
    
  }, [])

  return <p>Redirecting...</p>
}