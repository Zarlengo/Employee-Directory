import './App.css';
import Table from './components/table';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        Employee Directory
      </header>
      <Table { ...props }/>
    </div>
  );
}

export default App;
