import Header from '../../utils/Header'
import BigBox from '../../utils/BigBox'
import Usuarios from '../../components/Usuarios'

export default function UsuariosPage() {
    return (
        <div>
            <Header title="Usuarios" />
            <BigBox>
                <Usuarios />
            </BigBox>
        </div>
    )
}