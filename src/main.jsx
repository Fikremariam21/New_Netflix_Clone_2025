
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import {HashRouter} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter basename="/New_Netflix_Clone_2025"> 
  {/* <HashRouter> */}
  <App />
  </BrowserRouter>
  {/* </HashRouter> */}
    
  </>
)
