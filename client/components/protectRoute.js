import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '@/context/fakeAuthContext'

function ProtectRoute({children}){
const {isAuthenticated}=useAuth()
const router=useRouter()

useEffect(function(){
    if(!isAuthenticated){
    router.push('/login')
    }
    },[isAuthenticated, router])

    return isAuthenticated ? children : null;
}
export default ProtectRoute;

