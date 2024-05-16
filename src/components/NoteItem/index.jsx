import {FiPlus,FiX} from 'react-icons/fi';
import { Container } from './style';

export function NoteItem({isNew,value,onClick,...rest}){
    return(
        <Container isNew={isNew}>{/**Passando o isNew para o styled component */}
            <input 
                type='text'
                value={value}
                readOnly={!isNew} 
                {...rest}
            />
            <button
                type='button'

                onClick={onClick}
            >
                {isNew ? <FiPlus/> : <FiX/>}
            </button>
        </Container>
    )
}