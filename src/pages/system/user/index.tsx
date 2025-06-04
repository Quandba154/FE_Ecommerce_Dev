//** Import React and Next.js */
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <h1>User</h1>
    </>
  )
}

Index.permission = [PERMISSIONS.SYSTEM.USER.VIEW]
export default Index



// Register.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
// Register.guestGuard = true
