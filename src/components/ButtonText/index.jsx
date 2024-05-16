import { Container } from './styles'

export function ButtonText({title,isActive=false,...rest}){
    return(
        <Container
            {...rest}
            type="button"
            isactive = {isActive}
         >
            {title}
        </Container>
    );
}