import React from 'react';
import {BrowserRouter} from 'react-router-dom'; //permite a utilização no browser através de barras (/) 

import Routes from './routes';
import GlobalStyles from './styles/global'

/*utilização de arrow function e definição do tipo Function COmponent
Dentro se utiliza as tags do browser e a rota determinada no arquivo routes
Global styles pode ser utilizado do lado de fora, mas dentro de alguma tag (fragment)*/
const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes/> 
    </BrowserRouter>
    <GlobalStyles/>
  </>
)

export default App;
