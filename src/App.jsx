import { useState } from 'react'
import './App.css'
import FCSignGroup from './FuncComps/FCSignGroup'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <FCSignGroup/>
   </>
  )
}

export default App
