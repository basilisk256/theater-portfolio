import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContactSocials from './components/ContactSocials.jsx'
import BiographyPage from './components/BiographyPage.jsx'
import PostersPage from './components/PostersPage.jsx'
import CommercialPage from './components/CommercialPage.jsx'
import NowShowingPage from './components/NowShowingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactSocials />} />
        <Route path="/biography" element={<BiographyPage />} />
        <Route path="/posters" element={<PostersPage />} />
        <Route path="/commercial" element={<CommercialPage />} />
        <Route path="/now-showing" element={<NowShowingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
