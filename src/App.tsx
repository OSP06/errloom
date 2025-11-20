import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { ScenarioList } from './pages/ScenarioList';
import { ScenarioPlayer } from './components/ScenarioPlayer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:level" element={<ScenarioList />} />
        <Route path="/:level/:scenarioId" element={<ScenarioPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
