import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthContext from './context/Auth-context';
import MainNav from './components/navbar/MainNav';
import ProfilePage from './pages/profilePage/ProfilePage';
import LandingPage from './pages/homePage/Landing';
import ExplorePage from './pages/explorePage/ExplorePage';
import Logout from './components/navbar/Logout';
import ChatPage from './pages/chatPage/ChatPage';
import Footer from './components/footer/Footer';
import SettingsPage from './pages/settingsPage/SettingsPage';
import AuthPage from './pages/authPage/AuthPage';
import GigPage from './pages/gigPage/GigPage';
import ProductPage from './pages/productPage/ProductPage';
import AuthLogin from './pages/authPage/AuthLogin';
import AuthJoin from './pages/authPage/AuthJoin';
import AuthForgotPassword from './pages/authPage/AuthForgotPassword';
import AccountData from './pages/settingsPage/settingsAccount/AccountData';
import SecurityIndex from './pages/settingsPage/settingsSecurity/SecurityIndex';
import NotificationIndex from './pages/settingsPage/settingsNotification/NotificationIndex';

const userObj = JSON.parse(localStorage.getItem('user'));

const authComponents = [
  { auth_type: "login", component: <AuthLogin /> },
  { auth_type: "verify_email", component: <AuthLogin verifiedEmail={true} /> },
  { auth_type: "join", component: <AuthJoin /> },
  { auth_type: "forgot_password", component: <AuthForgotPassword /> },
  { auth_type: "forgot_password/:token", component: <AuthForgotPassword /> }
]

const settingsComponents = [
  { section: "account", component: <AccountData /> },
  { section: "security", component: <SecurityIndex /> },
  { section: "notifications", component: <NotificationIndex /> },
]


class App extends Component {
  state = { user: userObj || null };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) localStorage.setItem('user', JSON.stringify(this.state.user))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AuthContext.Provider value={{ user: this.state.user, setUser: data => this.setState({ user: data }), logout: () => this.setState({ user: null }) }}>
            <MainNav />
            <Route exact path="/" ><LandingPage /></Route>
            <Route path="/homepage/:page"><LandingPage /></Route>
            {authComponents.map(elem => <Route key={elem.auth_type} path={`/auth/${elem.auth_type}`}>
              <AuthPage auth_type={elem.auth_type}>{elem.component}</AuthPage></Route>)}
            <Switch>
              {settingsComponents.map(elem => <Route key={elem.section} path={`/settings/${elem.section}`}>
                <SettingsPage section={elem.section}>{elem.component}</SettingsPage></Route>)}
              <Route path="/explore" component={ExplorePage} />
              <Route path="/filter/:section/:category" component={ExplorePage} />
              <Route path="/profile/:username/:section" component={ProfilePage} />
              <Route path="/view-gigs-item/:id" component={GigPage} />
              <Route path="/view-portfolio-item/:id" component={ProductPage} />
              <Route exact path="/messages" component={ChatPage} />
              <Route path="/logout" component={Logout} />
            </Switch>
            <Footer />
          </AuthContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;


