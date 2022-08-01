import ToolBar from "./components/ToolBar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 } from 'uuid';
import "./styles/app.scss";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/:id' element={
            <>
            <ToolBar/>
            <SettingsBar/>
            <Canvas/>
            </>
          } />
          <Route path="*" element={<Navigate to={'/' + v4()}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;
