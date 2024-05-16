import {Container, Brand, Menu, Search, Content, NewNote} from './styles'

import { Header } from '../../components/Header'
import {ButtonText} from '../../components/ButtonText'
import {Input} from '../../components/Input'
import {Section} from '../../components/Section'
import {Note} from '../../components/Note'

import { FiPlus, FiSearch } from "react-icons/fi";

import { useState,useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home(){

    const [tags,setTags] = useState([]);
    const [tagsSelected,setTagsSelected] = useState([]);

    const [search, setSearch] = useState("");
    const [notes,setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName){

        if(tagName === "all"){
            setTagsSelected([]);
            return
        }


        //verificando se a tag passada está incluida no array de tags selecionadas
        const alredySelected = tagsSelected.includes(tagName);
        //se está selecionado retorna true, senão retorna false
        //Com base nisso irei verificar, caso não esteja é adicionado
        //ao arrei alredySelected

        if(alredySelected){
            const filterestTags = tagsSelected.filter(tag => tag!== tagName)
            setTagsSelected(filterestTags) //passando todas as tags menos a tagName
        }else{
            setTagsSelected(prevState => [...prevState,tagName]);
        }   
    }
    
    function handleDetails(id){
        navigate(`/details/${id}`);
    }
   useEffect(()=>{
        async function fetchTags(){
            const response = await  api.get("/tags");//buscando as tags
            setTags(response.data)
        }
        fetchTags();
   },[])

   useEffect(()=> {

    async function fetchNotes(){
        const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
        setNotes(response.data)
    }

    fetchNotes();

   },[tagsSelected,search])

    return(
        <Container>
            <Brand><h1>RocketNotes</h1></Brand>
            <Header/>
            <Menu>
                <li>
                    <ButtonText 
                        title="Todos"
                        onClick = {() => handleTagSelected("all")}
                        isActive= {tagsSelected.length === 0}
                    />
                </li>

                {
                    tags && tags.map((tag)=>(
                        <li key = {tag.id}>
                            <ButtonText 
                                title={tag.name}
                                onClick = {() => handleTagSelected(tag.name)}
                                isActive= {tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                   
                }
                
                
            </Menu>
            <Search>
                <Input 
                   icon={FiSearch}
                    placeholder = "Pesquisar pelo título"
                    onChange = {e => setSearch(e.target.value)}

                />
            </Search>
            <Content>
                <Section title="Minhas Notas">
                  {  
                    notes.map(note => (
                        <Note
                            key = {String(note.id)}
                            data = {note}
                            onClick = { () => handleDetails(note.id)}
                        />
                    ))
                  }
                </Section>
            </Content>
            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>
        </Container>
    );
}