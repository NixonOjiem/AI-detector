import './App.css';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import DashboardContainer from './components/DashboardContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBox /> 
      <DashboardContainer /> 
    </div>
  );
}

export default App;
