import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './component/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/service" component={Home} />
      </Router>
    </div>
  )
}

export default App
