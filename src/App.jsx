import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Layout from './components/Layout';
import Details from './pages/Details';
import NewCommunity from './pages/NewCommunity';

function App() {
  return (

    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:id" element={<Details />} />
          <Route path="/nova-comunidade" element={<NewCommunity />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
