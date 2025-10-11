import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import PatientList from "./components/PatientList";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     {/* <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //     <div className="bg-gray-50 min-h-screen">
  //       <PatientList />
  //     </div> */}

  //   </>
  // );
  
  const [view, setView] = useState("patients");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSelect={setView} />
      <div className="flex flex-col flex-1">
        <Topbar />
        {view === "patients" ? <Dashboard /> : <Analytics />}
      </div>
    </div>
  );
}

export default App
