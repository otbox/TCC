import { useState } from 'react'
import './App.css'
import HoverButton from './components/menu/HoverButton'

function App() {
  return (
    <>
      <header>
          <h3>DashBoard</h3>
          <div> 
            <HoverButton title='teste' texts={["a","b"]}/>
            <button>teste</button>
          </div>
      </header>
      <hr />
      <div>
        <p>testeaaaaaaaaaaaa</p>
      </div>
    </>
  )
}

export default App
