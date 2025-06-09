import { PERMISSIONS } from 'src/configs/permission'
import { useAuth } from './useAuth'
import { use, useEffect, useState } from 'react'

type TActions = 'CREATE' | 'VIEW' | 'UPDATE' | 'DELETE'

export const usePermission = (key: string, actions: TActions[]) => {
  const { user } = useAuth()
  const defaultValues = {
    VIEW: false,
    CREATE: false,
    UPDATE: false,
    DELETE: false
  }

  const getObjectValue = (obj: any, key: string) => {
    const keys = key.split('.')
    let result = obj
    if (key && !!key.length) {
      for (const k of keys) {
        if (k in result) {
          result = result[k]
        } else {
          return undefined
        }
      }
    }
    console.log('resu', { result })
    return result
  }
  const userPermission = user?.role?.permissions
  //   const userPermission = ["SYSTEM.ROLE.CREATE"]

  const [permission, setPermission] = useState(defaultValues)

  useEffect(() => {
    const mapPermission = getObjectValue(PERMISSIONS, key)
    actions.forEach(mode => {
      if (userPermission?.includes(PERMISSIONS.ADMIN)) {
        defaultValues[mode] = true
      } else if (userPermission?.includes(mapPermission[mode])) {
        defaultValues[mode] = true
      } else {
        defaultValues[mode] = false
      }
    })
    setPermission(defaultValues)
  }, [user?.role])

  return permission
}
