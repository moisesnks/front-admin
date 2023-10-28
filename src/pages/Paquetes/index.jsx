import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Paquetes from '../../components/Paquetes'

export default function PaquetesPage() {
    return (
        <div>
            <Header title="Paquetes" />
            <BigBox>
                <Paquetes />
            </BigBox>
        </div>
    )
}