import { useState} from 'react'
import './App.css'
import HoverButton from './components/menu/HoverButton/HoverButton'
import { menu1 } from './components/menu/links'

function App() {

  return (
    <>
      <header>
          <h3>DashBoard</h3>
          <div className='menu'> 
            <HoverButton key={1} title='teste' texts={menu1}/>
            <HoverButton key={2}title='teste' texts={menu1}/>
            <HoverButton title='teste' texts={menu1}/>
            <HoverButton title='teste' texts={menu1}/>
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
