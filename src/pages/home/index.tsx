//** Import React and Next.js */
import { NextPage } from 'next'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import HomePage from "src/views/pages/home"

type TProps = {}

const Home: NextPage<TProps> = () => {
    return (
        <>
            <HomePage />
        </>
    )
}

export default HomePage

HomePage.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

