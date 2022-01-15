import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Game from "./pages/Game";
import { Home } from "./pages/Home";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/">
          <Route index element={<Home />} />
          <Route path="/play" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
