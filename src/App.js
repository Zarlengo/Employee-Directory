import logo from './logo.svg';
import './App.css';
import Table from './components/table';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Table { ...props }/>
    </div>
  );
}

export default App;
