//** Import React and Next.js */
import { NextPage } from 'next'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <RegisterPage />
    </>
  )
}

export default Index


Index.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

