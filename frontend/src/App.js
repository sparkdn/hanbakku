import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Map from "./pages/Map";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/articles" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
