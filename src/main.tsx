import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AIvsAI from './pages/AIvsAI.tsx';
import Layout from './Layout.tsx'; // ✅ Yeni Layout

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="ai-vs-ai" element={<AIvsAI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
