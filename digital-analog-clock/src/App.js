import './App.css';
import './CSS-Theme/clock.css'
import DigitalAnalogHome from './Digital-Analog-Clock/DigitalAnalogHome';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{paddingTop:"20px", paddingBottom:"20px", fontSize:"30px" ,fontWeight:"800"}}>
        {"Digital ~ Analog clock conversion"}
      </header>
      <DigitalAnalogHome></DigitalAnalogHome>
    </div>
  );
}

export default App;
