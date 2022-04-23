import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Movie from './SingleMovie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movie/:id" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
