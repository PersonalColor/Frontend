import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './component/home'
import Mypage from './component/mypage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/service" component={Home} />
        <Route path="/mypage" component={Mypage} />
      </Router>
    </div>
  )
}

export default App
