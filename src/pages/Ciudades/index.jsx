import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Ciudades from '../../components/Ciudades'

export default function CiudadesPage() {
    return (
        <div>
            <Header title="Ciudades" />
            <BigBox>
                <Ciudades />
            </BigBox>
        </div>
    )
}