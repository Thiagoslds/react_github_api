import React, { useState, useEffect } from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import logoImg from '../../assets/logo_github.svg'
import { Header, RepositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RepositoryParams{
    repositoryname: string;
}

interface RepositoryI{
    full_name: string;
    description: string;
    stargazers_count: number;
    open_issues_count: number;
    forks_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue{
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

/*atributo params dentro do useroutematch, dentro dele possui o nome do projeto, que foi
passado dentro da rota, em Route. Necessário interface, para definir o tipo de parametragem */
const Repository: React.FC = () => {
    const [repository, setRepository] = useState<RepositoryI | null>(null); /*estado inicial pode 
    ser nulo, ao invés de iniciar com um objeto vazio */
    const [issues, setIssues] = useState<Issue[]>([]); /*Issues abertas por outros usuários, estado
    para controla-las*/

    const {params} = useRouteMatch<RepositoryParams>();

    /*Efeito colateral
    utilização em cima do params com o nome do repositorio*/
    useEffect(()=>{
        api.get(`repos/${params.repositoryname}`).then((response) => {
            setRepository(response.data);
        });

        api.get(`repos/${params.repositoryname}/issues`).then((response) => {
            setIssues(response.data);
        });
    }, [params.repositoryname])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronsLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && <RepositoryInfo> {/* if necessario, pode ser nulo o repository */}
                {/* Se tiver uma mudança de conteudo na vertical, cria uma div */}
                <header>
                    <img 
                        src={repository.owner.avatar_url} 
                        alt={repository.owner.login}/>
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>}

            <Issues>
                {issues.map((issue) => (
                <a key={issue.id} href={issue.html_url}>
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>
                    <FiChevronsRight size={20}/>
                </a>))}
            </Issues>
        </>
    );
};

export default Repository;