import {Switch, Route} from 'react-router-dom';
import Move from "./components/User/Move"
import Login from "./components/User/Login";
import Register from "./components/User/Register"
import Home from "./components/Individual/Home"
import Profile from './components/Individual/Profile';
import Chat from "./components/Chat/Chat"
import Ranking from "./components/Ranking/Ranking"

function App() {
  return (
      <Switch>
        <Route exact path = "/" component={Move}></Route>
        <Route exact path = "/login" component={Login}></Route>
        <Route exact path = "/register" component={Register}></Route>
        <Route exact path = "/individual/:username" component={Home}></Route>
        <Route exact path = "/profile/:username" component={Profile}></Route>
        <Route exact path = "/chat/:username" component={Chat}></Route>
        <Route exact path = "/ranking/:username" component={Ranking}></Route>
      </Switch>
  );
}

export default App;
