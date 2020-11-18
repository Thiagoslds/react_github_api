import React from 'react';
import {Switch, Route} from 'react-router-dom'

//importação das páginas
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

/*Exact: verificação de inclusão por padrão, com exact ele verifica se é extamente igual
Switch: Garante que apenas uma rota seja exibida */
const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={Dashboard} /> 
        <Route path='/repository' component={Repository} />
    </Switch>
)

export default Routes;