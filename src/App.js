import './App.css';


import Header from './components/Header';
import SearchBox from './components/SearchBox';
import DashboardContainer from './components/DashboardContainer';
import ArtificialInteligenceCheck from './components/ArtificialInteligenceCheck';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <div className="App">
        <Header />
        <ArtificialInteligenceCheck />
        {/* <LoadingSpinner /> */}
    </div>
  );
}

export default App;
