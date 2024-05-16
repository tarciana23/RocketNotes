import { RiShutDownLine } from 'react-icons/ri'
import { Container,Profile,Logout} from './styles'

import { useAuth } from '../../hooks/auth'
import {api} from '../../services/api'
import placeholderImg from '../../assets/avatar_placeholder.svg'
import { useNavigate } from 'react-router-dom'

export function Header(){

    //tem que chamar dentro das {}
    const {signOut,user} = useAuth();
    const navigate = useNavigate();

    function HandleSignOut(){
        navigate("/");
        signOut();
    }
    
    //esse código faz uma busca no bd, para verificar se o usuário possui uma foto de avatar
    //caso ele não tenha, uma avatar genérico é utilizado
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`: placeholderImg


    return(
        <Container>
            <Profile to="/profile">
                <img 
                    src={avatarUrl}
                    alt = {user.avatar}
                />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={HandleSignOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}