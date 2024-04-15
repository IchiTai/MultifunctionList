import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UIProvider, extendTheme } from "@yamada-ui/react"

const customTheme=extendTheme({
  spaces:{
    xs:"1rem",
    sm:"1.25rem",
    md:"1.5rem",
    normal:"2rem",
    lg:"2.5rem",
    xl:"3rem",
  },
  colors: {
    primary: "blue.500",
    secondary: "violet.500",
    info: "blue.500",
    success: "green.500",
    warning: "orange.500",
    danger: "red.500",
    link: "blue.500",
  },
  colorSchemes: {
    primary: "blue",
    secondary: "violet",
    info: "blue",
    success: "green",
    warning: "orange",
    danger: "red",
    link: "blue",
  },
})()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UIProvider theme={customTheme}>
      <App />
    </UIProvider>
  </React.StrictMode>,
)
