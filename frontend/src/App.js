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
import AuthLogin from './pages/authPage/AuthLogin';
import AuthJoin from './pages/authPage/AuthJoin';
import AuthForgotPassword from './pages/authPage/AuthForgotPassword';
import AccountData from './pages/settingsPage/settingsAccount/AccountData';
import SecurityIndex from './pages/settingsPage/settingsSecurity/SecurityIndex';
import NotificationIndex from './pages/settingsPage/settingsNotification/NotificationIndex';
import ItemPage from './pages/itemPage/ItemPage';
import ItemCreate from './components/items/ItemCreate';

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

const itemComponents = [
  { path: `/item/gigs/:itemId`, children: null },
  { path: `/item/portfolio/:itemId`, children: null },
  { path: "/create-item/:section", children: <ItemCreate /> },
]


class App extends Component {
  state = { user: userObj || null };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      localStorage.setItem('user', JSON.stringify(this.state.user))
    }
  }

  render() {
    const authValues = {
      user: this.state.user,
      setUser: data => this.setState({ user: data }),
      logout: () => this.setState({ user: null })
    }

    return (
      <div className="App">
        <Router>
          <AuthContext.Provider value={authValues}>
            <MainNav />
            <Route exact path="/" component={LandingPage} />
            <Route path="/explore" component={ExplorePage} />
            <Route path="/explore/:filter" component={ExplorePage} />
            {authComponents.map(elem => (
              <Route key={elem.auth_type} path={`/auth/${elem.auth_type}`} component={() => (
                <AuthPage auth_type={elem.auth_type}>
                  {elem.component}
                </AuthPage>
              )}>
              </Route>
            ))}
            <Switch>
              {settingsComponents.map(elem => (
                <Route key={elem.section} path={`/settings/${elem.section}`}>
                  <SettingsPage section={elem.section}>
                    {elem.component}
                  </SettingsPage>
                </Route>
              ))}
              {itemComponents.map((elem, i) => (
                <Route key={i} path={elem.path} component={() => (
                  <ItemPage >{elem.children}</ItemPage>
                )}>
                </Route>
              ))}

              <Route path="/homepage/:section" component={LandingPage} />
              <Route path="/profile/:username/:section" component={ProfilePage} />
              <Route exact path="/chats/" component={ChatPage} />
              <Route path="/messages/:username" component={ChatPage} />
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


