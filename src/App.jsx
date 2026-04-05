import React from 'react'
import Navbar from './components/shared/Navbar'
import Dashboard from './page/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Transaction from './page/Transaction'
import Insights from './page/Insights'

function App() {
  return (
    <div>
      <Navbar />
      <div className="z-0 pt-20 px-10">
        <Routes>
          <Route path="/*" element={<Dashboard />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/transaction" element={<Transaction />}></Route>
          <Route path="/insights" element={<Insights />}></Route>
        </Routes>
      </div>
    </div >
  )
}

export default App
