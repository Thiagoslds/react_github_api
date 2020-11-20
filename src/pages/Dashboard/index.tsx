import React, {useState, FormEvent, useEffect} from 'react';
import {FiChevronRight} from 'react-icons/fi' //icone de seta para direita
import api from '../../services/api' //importa a api do github
import {Link} from 'react-router-dom' //utilização para navegação entre páginas

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
    const [newRepo, setNewRepo] = useState(''); /*maneira tradicional para armazenar os dados do 
    formulario*/
    const [inputError, setInputError] = useState(''); /*usa o estado para verificar o erro, utilização
    de string no input*/
    const [repositories, setRepositories] = useState<Repository[]>(()=>{
        //Puxa os item que serão salvos no repositorio
        const storagedRepositories = localStorage.getItem('@GitHubExplorer:repositories');
        //se nao tiver vazio, converte a string de volta para um array
        if(storagedRepositories) return JSON.parse(storagedRepositories);

        return [];
    }); /*Utilização da interface como declaração de tipo, pois o typescript exige
     quando se tem um objeto ou array, ja que o tipo padrão é 'never';
    Alteração do valor padrão inicial (array vazio) para uma função */

    /*Salva no localstorage, para permanecer os dados
    useeffect dispara uma função sempre que uma variável mudar */
    useEffect(()=>{
        localStorage.setItem(
            '@GitHubExplorer:repositories', //Nome para informação salva, para não conflitar
            JSON.stringify(repositories)  //Converte o vetor em string json
        );
    }, [repositories]);

    /*Função é disparada quando é submitido um valor no formulário
    Adição de um novo repositorio, consumir a api do github, salvar novo repositorio no estado*/
    async function handleAddRepository(
        event: FormEvent<HTMLFormElement> /*evento de submissão (ou outros) de formulário, precisa ter como
        parametro de tipagem o htmlformelement*/
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
            o newRepo contem o valor digitado e capturado pelo formulario; 
            o parametro de tipagem Repository é do typescript, permite que ao usar o data
            ele saiba que é do tipo Repository, com todos os valores utilizados da interface*/

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
            parametro na exportação do formulario. Serve para estilização, passando propiedades;
            no caso a borda vermelha;
            Dupla exclamação converte para booleano (Boolean(inputError)).
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

            {/* Forma simplificada de if 
            Caso ocorra um erro, o input fica true e é mostrado seu conteudo, no caso 
            a frase com o erro, como um estilo span*/}
            {inputError && <Error>{inputError}</Error>}


            <Repositories> 
                {/*Para cada repositorio que foi salvo, monta a estrutura em html com o estilo css
                definido em styles. */}
                {repositories.map((repository)=>(
                    /*Link ao invés do 'a', pois o mesmo sempre recarrega a página e pesa
                    Deve usar o to=, com o caminho desejado, em javascript */
                <Link key={repository.full_name} to={`/repositories/${repository.full_name} `} > {/*primeiro elemento deve ser uma key unica*/}
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>

                    <FiChevronRight size={20}/>
                </Link>
                )
                )
                }             
            </Repositories>

            
        </>
    )
}

export default Dashboard;