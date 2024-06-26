
import { Container, Links,Content } from './styles'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

import { api } from '../../services/api'

import { useState,useEffect } from 'react'

import { useParams,useNavigate } from 'react-router-dom' //buscar os parâmtros que existem na rota

export  function Details(){
  const [data,setData] = useState(null);

  const params = useParams();///pega o id que está na rota
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1)//fazendo retornar a página anterior
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if(confirm){
        await api.delete(`/notes/${params.id}`);//esse id é passado aqui para a ação deletar
        handleBack();
    }
  }

  useEffect(()=>{
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();

  },[])


  return(
    <Container>
      <Header/>
      { data && 
        <main>
          <Content>
      
            <ButtonText title="Excluir nota" onClick={handleRemove}/>
              <h1>{data.title}</h1>
              <p>{data.description}</p>

              {
                data.links && 
                <Section title="Links úteis">
                  <Links>
                  {
                    data.links.map(link => (
                      <li key={link.id}>
                          <a href={link.url} target='_blank'>
                              {link.url}
                          </a>
                      </li>
                    ))
                  }
              
                  </Links>
                </Section>
              }
              { data.tags &&
                  <Section title="Marcadores">
                       {
                        data.tags.map(tag =>
                          <Tag
                            key = {tag.id}
                            title = {tag.name}
                          />
                        )
                       }
                  </Section>
              }
            <Button 
              title="voltar"
              onClick = {handleBack}
            />
                
            </Content>
        </main>
      }
    </Container>
  )
}