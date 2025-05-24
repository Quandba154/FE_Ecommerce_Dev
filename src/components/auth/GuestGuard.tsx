// ** Next Imports
import { useRouter } from 'next/router'
// ** React Import
import { ReactNode, ReactElement, useEffect } from 'react'
// ** Config
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
// ** hook
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  //** auth
  const authContext = useAuth();
  console.log("authContext>>", authContext);

  // ** router
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(USER_DATA)) {
      router.replace("/")
    }
  }, [router.route])

  if (authContext.loading || (!authContext.loading && authContext.user !== null)) {
    // có thông tin đăng nhập ròi mà chứ có authContext thì cứ loading
    return fallback
  }
  return <>{children}</>
}

export default GuestGuard
