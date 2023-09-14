import { useEffect, useState} from 'react'
import './App.css'
import HoverButton from './components/menu/HoverButton/HoverButton'
import { menu1 } from './components/menu/links'
import axios from 'axios'

function App() {

  const address = 'https://otboxserver.000webhostapp.com/Connect.php?Operation=getEmpresa'
  const address1 = 'https://otboxserver.000webhostapp.com/teste.php'

  useEffect(() => {
    //axios.get(address).then((result) => {console.log(result.data)})
    axios.post(address1, {
      Nome: '1',
    }).then((e) => {console.log(e.data)}).catch((err) => {console.log(err)})
  }, [])
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
      <div className='DashBoard-Container'>
        <p>Ultima Atualização:</p>
      </div>
    </>
  )
}

export default App
