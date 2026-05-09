import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark' })

export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    try { localStorage.removeItem('hz-theme') } catch {}
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
