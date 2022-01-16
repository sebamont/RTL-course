import { Container, VStack } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./common/components/Navbar";
import Game from "./pages/game";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <VStack >
        <Container maxW='container.md' >
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="/play" element={<Game />} />
              </Route>
            </Routes>
            </Container>
      </VStack>
          </BrowserRouter>
  );
}

export default App;
