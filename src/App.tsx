import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './component/home'
import Mypage from './component/mypage'
import Product from './component/product'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/service" component={Home} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/product" component={Product} />
      </Router>
    </div>
  )
}

export default App
