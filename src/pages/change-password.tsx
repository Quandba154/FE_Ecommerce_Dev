//** Import React and Next.js */
import { NextPage } from 'next'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import ChangePasswordPage from 'src/views/pages/change-password'

type TProps = {}

const ChangePassword: NextPage<TProps> = () => {
  return (
    <>
      <ChangePasswordPage />
    </>
  )
}

export default ChangePassword


ChangePassword.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

