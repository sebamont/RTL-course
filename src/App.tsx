import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, useDisclosure } from "@chakra-ui/react";

import Footer from "./common/components/Footer";
import Nav from "./common/components/Navbar";
import { Home } from "./pages/Home";
import Game from "./pages/game";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <BrowserRouter>
      <Nav
        isHelpDialogOpen={isOpen}
        onOpenHelpDialog={onOpen}
        onCloseHelpDialog={onClose}
      />
      <Container maxW="container.md" minH={"calc(100vh - 64px)"} pb={10}>
        <Routes>
          <Route path="/">
            <Route index element={<Home onOpenHelpDialog={onOpen} />} />
            <Route path="/play" element={<Game />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
