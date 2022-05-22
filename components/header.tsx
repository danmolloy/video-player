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
      ? <button className='flex items-center justify-center text-yellow-200 hover:text-yellow-400 active:text-yellow-200 text-2xl  w-12 h-12 p-1 m-2' onClick={() => handleDark('light')}>
          <MdOutlineDarkMode />
        </button>
      :   <button className='flex items-center justify-center text-slate-800 hover:text-slate-600 active:text-slate-800 text-2xl  w-12 h-12 p-1 m-2' onClick={() => handleDark('dark')}>
          <MdDarkMode />
        </button>
      }
    </div>
  )
}