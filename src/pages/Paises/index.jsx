import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Paises from '../../components/Paises'

export default function PaisesPage() {
    return (
        <div>
            <Header title="Paises" />
            <BigBox>
                <Paises />
            </BigBox>
        </div>
    )
}