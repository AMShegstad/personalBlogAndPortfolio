import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from '@/components/ui/provider'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Provider>
      <div as h1> App </div>
    </Provider>
  )
}

export default App
