import './App.css';

import Header from './components/Header';
import SearchBox from './components/SearchBox';
import DashboardContainer from './components/DashboardContainer';
import ArtificialInteligenceCheck from './components/ArtificialInteligenceCheck';

function App() {
  return (
    <div className="App">
        <Header />
        <ArtificialInteligenceCheck />
        {/* <SearchBox />  */}
        {/* <DashboardContainer /> */}
    </div>
  );
}

export default App;
