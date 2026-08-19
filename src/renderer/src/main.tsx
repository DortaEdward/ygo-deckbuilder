import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { HashRouter, Routes, Route } from "react-router"
import DefaultLayout from './Layouts'
import Homepage from './Pages/Home'
import Deckbuilder from './Pages/Deckbuilder'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path='deckbuilder' element={<Deckbuilder />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
)
