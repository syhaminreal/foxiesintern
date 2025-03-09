import { useCallback, useState } from 'react'
import "tailwindcss";


function App() {
const [length, setlength] =  useState(8)
const [numberAllowed,  setnumberAllowed] = useState(false)
const [charAllowed,  setcharAllowed] = useState(false)
const [password, setPassword] = useState("")

const passwordGenerator = useCallback({}
  , [length, numberAllowed,charAllowed,setPassword])

  return (
    <>
    <h1 className='text-4xl text-center'> Password genrator</h1>
     </>
  )
}

export default App
