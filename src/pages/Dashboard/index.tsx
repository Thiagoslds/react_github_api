import React, {useState, FormEvent} from 'react';
import {FiChevronRight} from 'react-icons/fi' //icone de seta para direita
import api from '../../services/api' //importa a api do github

import logoImg from '../../assets/logo_github.svg'

import {Title, Formu, Repositories, Error} from './styles' //importação dos estilos

/*Interface com todos os campos que serão utilizados da Api do github*/
interface Repository{
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

/*A dashboard é a página principal deste projeto */
const Dashboard: React.FC = () => {

    /*Primeira variavel é a opção padrão e a segunda uma função para atualizar*/
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]); /*Utilização da interface
    como declaração de tipo */

    /*Função é disparada quando é submitido um valor no formulário*/
    async function handleAddRepository(
        event: FormEvent<HTMLFormElement> //Permite utilização de formulários
    ): Promise<void> {
        event.preventDefault(); /*Previne o comportamento padrão (no caso atualização automatica
        do campo para um campo vazio)*/

        //Caso o formulario seja enviado vazio
        if(!newRepo){
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        //Captura o erro
        try{
            const response = await api.get<Repository>(`repos/${newRepo}`); /*retorna o conteudo
            da api, especificado pelo caminho api.github.com/repos/
            o newRepo contem o valor digitado e capturado pelo formulario */

            const repository = response.data; //apenas o campo data

            setRepositories([...repositories, repository]); //adiiciona no vetor
            setNewRepo(''); //limpar o conteudo do formulario apos o envio
            setInputError(''); //limpar o valor de erro
        } catch (err){
            setInputError('Erro na busca por esse repositório');
        }
    }


    return (
        <>
            <img src={logoImg} alt="Github Explorer"/>
            <Title> Explore repositórios no Github </Title>

            {/* haserror: atributo declarado na interface em styles, passado como 
            parametro na exportação do formulario. Dupla exclamação converte para booleano.
            OnSubmit chama a função handle */}
            <Formu hasError={!!inputError} onSubmit={handleAddRepository}>
                <input 
                value={newRepo} //contem o valor que foi escrito no formulario
                onChange={(e) => {
                    setNewRepo(e.target.value)}} /*cada mudança que ocorre no campo do
                formulario é capturado pelo e.target, como cada letra adicionada. O valor é a palavra 
                final digitada, que é enviada para o array com os repositorios que são gerados */
                placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Formu>

            {/* Caso ocorra um erro, o input fica true e é mostrado seu conteudo, no caso 
            a frase com o erro, como um estilo span*/}
            {inputError && <Error>{inputError}</Error>}


            <Repositories> 
                {/*Para cada repositorio que foi salvo, monta a estrutura em html com o estilo css
                definido em styles. */}
                {repositories.map((repository)=>(
                <a key={repository.full_name} href="teste">
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>

                    <FiChevronRight size={20}/>
                </a>
                )
                )
                }             
            </Repositories>

        </>
    )
}

export default Dashboard;