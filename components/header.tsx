import { useState } from 'react'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

  const handleDark = (e: string) => {
    if (e === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }
  
  return (
    <div className='header-div'>
      {darkMode
      ? <button className='self-end text-yellow-200 hover:text-yellow-400 active:text-yellow-200 text-2xl' onClick={() => handleDark('light')}>
          <MdOutlineDarkMode />
        </button>
      :   <button className='self-end text-slate-800 hover:text-slate-600 active:text-slate-800 text-2xl' onClick={() => handleDark('dark')}>
          <MdDarkMode />
        </button>
      }
    </div>
  )
}