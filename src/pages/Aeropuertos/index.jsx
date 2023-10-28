import Aeropuertos from '../../components/Aeropuertos'
import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'

export default function AeropuertosPage() {
    return (
        <div>
            <Header title="Aeropuertos" />
            <BigBox>
                <Aeropuertos />
            </BigBox>

        </div>
    )
}