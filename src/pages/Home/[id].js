import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const { pathname } = router.pathname;
  
  useEffect(() => {
      router.push('/${id}'); 
  }, [])

  return <p>Redirecting...</p>
}