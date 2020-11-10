import "./App.css";
import Header from "./component/Header";
import Checkout from "./component/Checkout";
import Main from "./component/Main";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Productdetail from "./component/Productdetail";



function App() {


  return (
    <Router>
      
      <div className="app">
        <Header />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/productdetail">
            <Productdetail />
          </Route>

          <Route path="/">
            <Main />
          </Route>
        </Switch>
        <Footer />

      </div>
     
    </Router>
  );
}

export default App;
