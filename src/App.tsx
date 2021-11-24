import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Home from './component/home'
import Mypage from './component/mypage'
import Product from './component/product'
import SelfDiagnosis from './component/selfDiagnosis'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/service" component={Home} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/product" component={Product} />
        <Route path="/self" component={SelfDiagnosis} />
      </Router>
    </div>
  )
}

export default App
