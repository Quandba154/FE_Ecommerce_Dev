//** Import React and Next.js */
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'
import PaymentTypeListPage from 'src/views/pages/settings/payment-type/PaymentTypeList'


type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <>
      <PaymentTypeListPage />
    </>
  )
}

export default Index


Index.permission = [PERMISSIONS.SETTING.PAYMENT_TYPE.VIEW]


