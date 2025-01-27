import { HomeWrapper } from './Home.styled'
import { useDocumentTitle } from '@/hooks'

const Home = () => {
    useDocumentTitle('Finex | Home');

    return (
        <>
            <HomeWrapper>
                Home Page
            </HomeWrapper>
        </>
    )
}

export default Home;