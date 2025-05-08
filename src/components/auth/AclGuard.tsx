// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, type AppAbility } from 'src/configs/acl'

import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from "src/pages/401"
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from '../acl/Can'


interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  const auth = useAuth()
  const permissionUser = auth.user?.role.permissions ?? []
  const router = useRouter()

  let ability: AppAbility

  if (auth.user && !ability) { // đã đăng nhập rồi và ko có khả năng
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }

  // Đây là guest or ko yêu cầu guard or page error
  if (guestGuard || router.route === "/500" || router.route === "/404" || !authGuard) {
    // đăng nhập rồi có và ability
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else { //  chưa đăng nhập
      return children
    }
  }

  // cái value={ability} ẩn đi cái nào ko mong muôn

  // check the access of current user (là đăng nhập rồi xong giờ mình chất rode)
  if (auth.user && ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }



  // return <>{children}</>
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )

}

export default AclGuard
