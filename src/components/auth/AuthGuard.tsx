// ** Next Imports
import { useRouter } from 'next/router'
// ** React Import
import { ReactNode, ReactElement, useEffect } from 'react'
// ** Config
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
// ** Helper
import { clearLocalUserData, getTemporaryToken } from 'src/helpers/storage'
// ** Hook
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props

  // ** auth
  const authContext = useAuth();
  // ** router
  const router = useRouter();
  // console.log(">>>", router);

  useEffect(() => {
    const { temporaryToken } = getTemporaryToken();
    if (!router.isReady) { // bằng false là chưa first render xong
      return
    }
    if (authContext.user === null && !window.localStorage.getItem(ACCESS_TOKEN) && !window.localStorage.getItem(USER_DATA) && !temporaryToken) {
      if (router.asPath !== "/" && router.asPath !== "/login") { // nếu hết hạn token thì login lại vẩn vào trang gần nhất
        router.replace({
          pathname: "/login",
          query: { returnUrl: router.asPath } // ghi nhớ đg dẩn đoạn ch đăng nhập sau đăng nhập lấy cái này đăng nhập vào đg dẩn này
        })
      } else {
        router.replace("/login")
      }
      authContext.setUser(null)
      clearLocalUserData() // sang trang mới login lại
    }
  }, [router.route])

  useEffect(() => {
    const handleUnload = () => {
      clearLocalUserData(); // khi user null thì xóa localStorage
      // if (authContext.user === null) {
      // }
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      }
    }
  }, [])

  if (authContext.loading || authContext.user === null) {
    return fallback;
  }

  return <>{children}</>
}

export default AuthGuard
