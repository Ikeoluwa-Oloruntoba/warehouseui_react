import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './components/pages/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
