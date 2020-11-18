import styled, {css} from 'styled-components';
import {shade} from 'polished';

interface FormProps{
    hasError: boolean;
}

export const Title = styled.h1 `
    font-size: 48px;
    color: #3a3a3a;
    max-width: 450px; /*restrição de largura*/
    line-height: 56px; /*altura da linha do texto*/
    margin-top: 80px; /*altura superior da margem em relação a logo*/
`;

/*personaliza o campo de digitar o repositorio e o botao*/
export const Formu = styled.form<FormProps> ` 
    margin-top: 40px;
    max-width: 700px;

    display: flex;

    /*personaliza apenas o campo de texto*/
    input {
        flex: 1;
        height: 70px;
        padding: 0 24px; /*posição do texto interno*/
        border-radius: 5px 0 0 5px; /*borda em volta da caixa toda*/
        color: #3a3a3a;
        border: 2px solid #fff;
        border-right: 0;

        ${(props) => props.hasError && css ` 
            border-color: #c53030;
        `

        }

        /*comando para mudar apenas o texto interno*/
        &::placeholder{
            color: #a8a8b3;
        }
    }

    button{
        width: 210px;
        height: 70px;
        background: #04d361;
        border-radius: 0px 5px 5px 0px;
        border: 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s; /*transição entre a mudança do hover e o normal*/

        /*apenas o sombreamento, utilizando o polished; 20%*/
        &:hover{
            background: ${shade(0.2, '#04d361')};
        }
    }
`


export const Error = styled.span ` 
    display: block;
    color: #c53030;
    margin-top: 8px;
`

export const Repositories = styled.div ` 
    margin-top: 80px;
    max-width: 700px;

    a{
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block; /*tira o inline por padrão*/ 
        text-decoration: none; /*tirar underline em volta de texto*/
        display: flex; /*fica lado a lado a imagem e o texto*/
        align-items: center; /*alinhar o texto centralmente*/

        img{
            width: 64px;
            height: 64px;
            border-radius: 50%; /*deixa a imagem redonda*/ 
        }

        div{
            margin-left: 16px; 

            strong{
                font-size: 20px;
                color: #3d3d4d;
            }

            p{
                font-size: 18px;
                color: #a8a8a3;
                margin-top: 4px;       
            }
        }

        svg {
            margin-left: auto;
            color: #cbcbd6;
        }
    }
`