//* Axios
import axios from "axios";
//** */ config 
import { BASE_URL, API_ENDPOINT } from "src/configs/api";
// helper
import { clearLocalUserData, clearTemporaryToken, getLocalUserData, getTemporaryToken, setLocalUserData, setTemporaryToken } from "../storage";
// ** jwt
import { jwtDecode } from "jwt-decode"
import { FC } from "react";
import { NextRouter, useRouter } from "next/router";
// type
import { UserDataType } from "src/contexts/types";
// ** hook
import { useAuth } from "src/hooks/useAuth";

type TAxiosInterceptor = {
    children: React.ReactNode
}


const instanceAxios = axios.create({ baseURL: BASE_URL })

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
    if (router.asPath !== "/") {
        router.replace({
            pathname: "/login",
            query: { returnUrl: router.asPath }
        })
    } else {
        router.replace("/login")
    }
    setUser(null)
    clearLocalUserData()
    clearTemporaryToken()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
    const router = useRouter()
    const { accessToken, refreshToken } = getLocalUserData()
    const { temporaryToken } = getTemporaryToken()
    const { setUser, user } = useAuth()

    instanceAxios.interceptors.request.use(async config => {
        // cái config là để khi chạy qua thì gán token vào luôn
        // console.log("config", { config });

        if (accessToken || temporaryToken) {
            let decodeAccessToken: any = {}
            if (accessToken) {
                decodeAccessToken = jwtDecode(accessToken)
            } else if (temporaryToken) {
                decodeAccessToken = jwtDecode(temporaryToken)
            }

            if (decodeAccessToken?.exp < Date.now() / 1000) {
                config.headers["Authorization"] = `Bearer ${accessToken ? accessToken : temporaryToken}`
            } else {
                if (refreshToken) {
                    const decodeRefreshToken: any = jwtDecode(refreshToken)
                    if (decodeRefreshToken?.exp > Date.now() / 1000) {
                        await axios.post(`${API_ENDPOINT.AUTH.INDEX}/refresh-token`, {}, {
                            headers: {
                                Authorization: `$Bearer ${refreshToken}`
                            }
                        }).then((res) => {
                            const newAccessToken = res?.data?.data?.access_token
                            if (newAccessToken) {
                                config.headers["Authorization"] = `Bearer ${newAccessToken}`
                                if (accessToken) {
                                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                                }
                            } else {
                                handleRedirectLogin(router, setUser)
                            }
                            // console.log("res", { res });
                        }).catch((e) => {
                            handleRedirectLogin(router, setUser)
                        })
                    } else {
                        handleRedirectLogin(router, setUser)
                    }
                } else {
                    handleRedirectLogin(router, setUser)
                }
            }
        } else {
            handleRedirectLogin(router, setUser)
        }
        return config
    })

    instanceAxios.interceptors.response.use(response => {
        return response
    })

    return <>{children}</>
}


export default instanceAxios
export { AxiosInterceptor }