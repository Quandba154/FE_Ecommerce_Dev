//** Import React and Next.js */
import { NextPage } from 'next'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyProfilePage from 'src/views/pages/my-profile'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <MyProfilePage />
    </>
  )
}

export default Index


Index.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

