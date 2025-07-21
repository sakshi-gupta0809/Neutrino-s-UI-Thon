
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselPage from './App.tsx';
import CardDetail from './cardDetails';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Router>
    <Routes>
      <Route index path="/" element={<CarouselPage />} />
      <Route path="/details/:id" element={<CardDetail />} />
    </Routes>
  </Router>
);

