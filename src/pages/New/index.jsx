import {Container,Form} from './styled'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import {Section} from '../../components/Section'
import {ButtonText} from '../../components/ButtonText'
import {Button} from '../../components/Button'


import { useState } from 'react'

import { api } from '../../services/api'

import { useNavigate } from 'react-router-dom'

export function New(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    const [links, setLinks] = useState([]);//aonde fica todos os links
    const [newLink,setNewLink] = useState("");//o link que vai ser adicionado no momento
   
    const [tags, setTags] = useState([]);
    const [newTag,setNewTag] = useState("");

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState,newLink]);
        setNewLink("");//estado resetado
    }
    
    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
        //Remove o link recebido pela função.
    }

    function handleAddTag(){
        setTags(prevState => [...prevState,newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote(){
        if(!title){
            return alert("Insira um título para sua nota!")
        }
        if(newTag){
            return alert("Você deixou uma tag no campo adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio.")
        }
        if(newLink){
            return alert("Você deixou uma tag no campo adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio.")
        }
        await api.post("/notes",{
            title,
            description,
            tags,
            links
        });
        alert("Nota criada com sucesso!");
        navigate(-1);
    }


    return(
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title="Voltar" onClick = {handleBack}/>
                    </header>

                    <Input 
                        placeholder = "Título"
                        value = {title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <Textarea 
                        placeholder="Observações"
                        value={description}
                        onChange = {e => setDescription(e.target.value)}
                    />
                    
                    <Section title="Links úteis">

                    {/*Se o array de links tiver algum link ele irá exibi-lo */}
                       {
                         links ? links.map((link,index)=>(
                            <NoteItem 
                                key={index}
                                value = {link}
                                onClick={()=>{handleRemoveLink(link)}}//essa forma é utilizada para passar um argumento para essa função
                            />
                         )): ""
                       }
                        <NoteItem 
                            isNew
                            value={newLink}
                            onChange = {e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag,index)=>(
                                    <NoteItem 
                                        key = {index}
                                        value={tag}
                                        onClick={()=> handleRemoveTag(tag)}
                                />
                                ))
                            }
                  
                        <NoteItem 
                            isNew 
                            placeholder="Nova tag"
                            onChange = {e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}

                        />
                        </div>
                    </Section>
                    <Button 
                        title= "Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}