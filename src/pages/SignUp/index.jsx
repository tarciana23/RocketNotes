import {Input} from '../../components/Input'

import { Button } from '../../components/Button'
import { FiUser,FiMail,FiLock } from 'react-icons/fi'

import { Container,Form,Background } from './styles'

import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { api } from "../../services/api"

export function SignUp(){

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){//verificando se estão todos preenchidos
           return alert("Preencha todos os campos");
        }

        /*o then só é executado se o cadastro der certo,
        se não der ele vai direto para o catch.

        */
        api.post("/users",{name,email,password}).then(()=>{
            alert("Usuário cadastrado com sucesso!");
            navigate("/");
        })
        .catch(error =>{
            if(error.response){
                alert(error.response.data.message)//mensagem do back
            }else{
                alert("Não foi possível cadastrar");
            }
        })
    }

    return(
        <Container>
            <Background/>
                <Form>
                    <h1>RocketNote</h1>
                    <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                    <h2>Crie sua conta</h2>
                    <Input
                        placeholder = "name"
                        type= "text"
                        icon={FiUser}
                        onChange={e=>setName(e.target.value)}
                    />
                    <Input
                        placeholder = "E-mail"
                        type= "text"
                        icon={FiMail}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <Input
                        placeholder = "password"
                        type= "password"
                        icon={FiLock}
                        onChange={e=>setPassword(e.target.value)}

                    />
                    <Button title="Cadastrar" onClick={handleSignUp}/>
                    
                    <Link to="/">Voltar para o login</Link>
                    
                </Form>
        </Container>
    )
}