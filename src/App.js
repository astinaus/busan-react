import Counter from "pages/Counter";
import Main from "pages/Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/counter/:seq" element={<Counter />}></Route>
        <Route path={"*"} element={<div>페이지가 없습니다.</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
