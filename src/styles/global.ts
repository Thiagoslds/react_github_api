import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/github_background.svg'


export default createGlobalStyle `
    /*padrão se inicia zerado*/
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    /*para inserir a imagem usa templates $ */
    body {
        background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
    }

    input, button , body {
        font: 16px, sans-serif;
    }

    /*root é o id da div principal do html*/
    #root{
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button {
        cursor: pointer;
    }

`;