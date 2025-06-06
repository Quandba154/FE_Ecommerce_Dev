//** Import React and Next.js */
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

// ** views
import UserListPage from 'src/views/pages/system/user/UserList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <UserListPage></UserListPage>
    </>
  )
}

Index.permission = [PERMISSIONS.SYSTEM.USER.VIEW]
export default Index



// Register.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
// Register.guestGuard = true
