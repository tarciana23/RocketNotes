import { Container,Form,Avatar } from "./styles";

import {FiArrowLeft, FiUser, FiMail, FiLock,FiCamera} from 'react-icons/fi';

import {Input} from '../../components/Input'
import {Button} from '../../components/Button'
import { api } from "../../services/api"

import placeholderImg from '../../assets/avatar_placeholder.svg'

import {useAuth} from '../../hooks/auth'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile (){

    const {user,updateProfile} = useAuth();

    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [passwordOld,setPasswordOld] = useState();
    const [passwordNew,setPasswordNew] = useState();

    const navigate = useNavigate();

    //esse código faz uma busca no bd, para verificar se o usuário possui uma foto de avatar
    //caso ele não tenha, uma avatar genérico é utilizado
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`: placeholderImg

    const [avatar,setAvatar] = useState(avatarUrl);//exibir o avatar
    const [avatarFile, setAvatarFile] = useState(null);//guardar o arquivo

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password:passwordNew,
            old_password : passwordOld
        };

        //o user que pegamos o contexto terá seus argumentos sobrescritos, caso esses
        //sejam atualizados.
        const userUpdated = Object.assign(user,updated);
   

        await updateProfile({user: userUpdated,avatarFile})
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        //essa url é criada para atualizar p set avatar
        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft/>
                </button>
            </header>
            <Form>
                <Avatar>
                    <img 
                        src={avatar}
                        alt="Foto do usuário"
                    />
                    <label htmlFor="avatar">
                        <FiCamera/>
                    </label>
                    <input
                        id="avatar"
                        type="file"
                        onChange={handleChangeAvatar}
                    >
                    
                    </input>
                </Avatar>
                <Input
                    placeholder =""
                    type = "text"
                    icon = {FiUser}
                    value = {name}
                    onChange={e => setName(e.target.value)}
                
                />
                <Input
                    placeholder =""
                    type = "email"
                    icon = {FiMail}
                    value = {email}
                    onChange={e => setEmail(e.target.value)}

                />
                <Input
                    placeholder ="Senha atual"
                    type = "password"
                    icon = {FiLock}
                    value = {passwordOld}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                 <Input
                    placeholder ="Nova atual"
                    type = "password"
                    icon = {FiLock}
                    value = {passwordNew}
                    onChange={e => setPasswordNew(e.target.value)}

                />

                <Button title = "Salvar" onClick={handleUpdate}/>
            </Form>

        </Container>
    )

}