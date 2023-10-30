import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Facturas from '../../components/Facturas'


export default function FacturasPage() {
    return (
        <div>
            <Header title="Facturas" />
            <BigBox>
                <Facturas />
            </BigBox>
        </div>
    )
}