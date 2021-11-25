import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Codi from './component/codi'
import Footer from './component/layout/footer'
import Header from './component/layout/header'
import Login from './component/login'
import Mypage from './component/mypage'
import Product from './component/product'
import SelfDiagnosis from './component/selfDiagnosis'
import Signup from './component/signup'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route exact path="/" component={Product} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/self" component={SelfDiagnosis} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/codi" component={Codi} />
      </Router>
      <Footer />
    </div>
  )
}

export default App
