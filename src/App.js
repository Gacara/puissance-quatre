import logo from './logo.svg';
import './App.css';
import Tableau from './components/tableau'

function App() {
  return (
    <div className="App">
<h1 className="animated fadeInRightBig">Puissance 4</h1>
<div className="circles">
  <div className="circle red-sm"></div>
  <div className="circle yellow-sm"></div>
  <div className="circle red-sm"></div>
  <div className="circle yellow-sm"></div>
  <div className="circle red-sm"></div>
  <div className="circle yellow-sm"></div>
  <div className="circle red-sm"></div>
  <div className="circle yellow-sm"></div>
</div>
<div id="main">
  <Tableau />
</div>
    </div>
  );
}

export default App;
