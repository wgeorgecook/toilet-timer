import { Grommet } from 'grommet';
import PageHeader from './components/pageHeader'
import TimersContainer from './components/timersContainer';

function App() {
  return (
    <div className="App">
      <PageHeader />
      <Grommet>
        <TimersContainer />
      </Grommet>
    </div>
  );
}

export default App;
