import './App.css';
import AllPoses from './AllPoses';
import { Routes, Link, Route } from 'react-router-dom';
import Home from './Home';
import AddPose from './AddPose';


function App() {
  return ( 
    <div className="App">
      <header>
        <h1> Yoga Poses </h1>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <Link to="/"> Home </Link>
                  </div>
                  <div>
                      <Link to="/allPoses"> View Asanas </Link>
                  </div>
                  <div>
                      <Link to="/pose/create"> Create Asanas </Link>
                  </div>

          </nav>
        <Routes>
          <Route path="/allPoses" element={<AllPoses />} />
          <Route path="/" element={<Home />} />
          <Route path="/pose/create" element={<AddPose />} />
        </Routes>
      </header>
    </div>
   );
}

export default App;