import './App.css';
import Stats from './components/stats/Stats';

function App() {
  return (
    <div className='container'>
      <h1>Population growth per country, 1950 to 2021</h1>
      <h3>Click on the legend below to filter by continent</h3>
      <div className='stats-wrap'>
        <Stats/>
      </div>
    </div>
  );
}

export default App;
