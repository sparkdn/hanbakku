import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./pages/Map";
import Nav from "./components/Nav";
import PowerBI from "./pages/Home/Powerbi";
import News from "./pages/Article/news";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="contentWrapper">
          <Nav />
          <Routes>
            <Route path="/" element={<PowerBI />} />
            <Route path="/map" element={<Map />} />
            <Route path="/articles" element={<News />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
