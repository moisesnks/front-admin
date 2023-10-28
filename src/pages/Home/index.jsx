import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Home from '../../components/Home'

export default function HomePage() {
    return (
        <div>
            <Header title="Admin View" />
            <BigBox>
                <Home />
            </BigBox>

        </div>
    )
}