import { useState } from "react";
import { GiphyItem } from "./Components/GiphyItem";
import { Navbar } from "./Components/Navbar";

const App = () => {
  const [mode,setMode] = useState('light');
  const toggle = () => {
    setMode(mode === 'dark' ? 'white' : "dark");
    if(mode === 'dark')
      document.body.style.backgroundColor = 'white';
    else document.body.style.backgroundColor = 'black';
  }
  return (
    <div className="container mt-3 text-center">
      <Navbar mode= {mode} toggle = {toggle}/>
      <div className="mt-3">
        <GiphyItem mode= {mode}/>
      </div>
  </div>
  )
}

export default App;
