import { createContext,useContext,useState,useEffect } from "react";

import { api } from '../services/api'

export const AuthContext = createContext({});

function AuthProvider({children}){

  //aqui dentro do data tem todos os dados do usuário: id, nome,email, token,avatar
    const [data,setData] = useState({});

    async function signIn({email,password}){
  
      try{
        const response = await api.post("/sessions",{email,password});
        const{ user, token} = response.data

        localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
        localStorage.setItem("@rocketnotes:token",token);


        //colocando o token por padrão no cabeçalho da rota da api
        //assim todas as próximas requisições vão está autenticadas por esse token
        api.defaults.headers.common[`authorization`] = `Bearer ${token}`

        setData({user,token})

      }catch(error){
        if(error.response){
            alert(error.response.data.message)
        }else{
            alert("Não foi possível entrar.")
        }
      }
    }

    function signOut(){
      localStorage.removeItem("@rocketnotes:token");
      localStorage.removeItem("@rocketnotes:user");

      setData({});
    }

    async function updateProfile({user,avatarFile}){
      try{

        if(avatarFile){
          const fileUploadForm = new FormData();
          fileUploadForm.append("avatar",avatarFile);

          const response = await api.patch("/users/avatar",fileUploadForm);
          user.avatar = response.data.avatar;
          
        }

        await api.put("/users",user);
        localStorage.setItem("@rocketnotes:user",JSON.stringify(user))//aqui é atualizado a info do usuário

        setData({user,token:data.token});//atualizando o token novo
        alert("Perfil atualizado!");

      }catch (error){
        if(error.response){
          alert(error.response.data.message);
        }else {
          alert("Não foi possível atualizar o perfil.");
        }
      }
    }

    useEffect(()=>{

      const user = localStorage.getItem("@rocketnotes:user");
      const token = localStorage.getItem("@rocketnotes:token");

      //caso eles tenham sido localizados vamos atualizar o token
      //na url da api

      if(token && user){
        api.defaults.headers.common[`authorization`] = `Bearer ${token}`

        setData({
          token,
          user: JSON.parse(user)
        })
      }

    },[])
    //quando o array está vazio, significa que será carregado uma vez após
    //a redenrização

    return(
        <AuthContext.Provider value = {{
          signIn,
          user: data.user,
          signOut,
          updateProfile
          }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const dataContext = useContext(AuthContext);

    return dataContext;
}

export { AuthProvider, useAuth}