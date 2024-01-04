import './App.css';
import "./index.css";
import Navbar from './components/Navbar';
// import SearchableSelect from './components/SearchBarSelect';
import StockDataApp from './components/stock';

function App() {
  return (
    <div className="App">
      <Navbar />
      <StockDataApp />
    </div>
  );
}

export default App;
