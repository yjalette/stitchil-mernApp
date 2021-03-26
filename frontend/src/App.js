import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthContext from './context/Auth-context';
import MainNav from './components/navbar/MainNav';
import ProfilePage from './pages/profilePage/ProfilePage';
import LandingPage from './pages/homePage/Landing';
import ExplorePage from './pages/explorePage/ExplorePage';
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
import AuthLogout from './pages/authPage/AuthLogout';
import ProfileData from './pages/profilePage/ProfileData';
import ProfileNewItem from './pages/profilePage/ProfileNewItem';
import GigDraft from './components/gig/GigDraft';
import GigUpdate from './components/gig/GigUpdate';
import ProfileItemPage from './pages/profileItemPage/ProfileItemPage';

const userObj = JSON.parse(localStorage.getItem('user'));

const authComponents = [
  { auth_type: "login", children: <AuthLogin /> },
  { auth_type: "verify_email", children: <AuthLogin verifiedEmail={true} /> },
  { auth_type: "join", children: <AuthJoin /> },
  { auth_type: "forgot_password", children: <AuthForgotPassword /> },
  { auth_type: "forgot_password/:token", children: <AuthForgotPassword /> }
]

const settingsComponents = [
  { section: "account", children: <AccountData /> },
  { section: "security", children: <SecurityIndex /> },
  { section: "notifications", children: <NotificationIndex /> },
]

const profileComponents = [
  { path: "/profile/:username/:section", children: <ProfileData /> },
  { path: "/profile-item/:group/create/", children: <ProfileNewItem /> },
]

const profileItemComponents = [
  // { path: "/:group/create/portfolio-item/", children: <ProductCreate /> },
  // { path: "/update/portfolio-item/:itemId/", children: <ProductUpdate /> },
  { path: "/profile-gigs-item/update/:itemId/:currForm/", children: <GigUpdate /> },
  { path: "/profile-gigs-item/draft/:itemId/:currForm/", children: <GigDraft /> },
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
            <Route path="/homepage/:section" component={LandingPage} />
            <Route path="/explore" component={ExplorePage} />
            <Route path="/explore/:filter" component={ExplorePage} />
            {/* <Route path="/profile/:username/:section" component={() => (
              <ProfilePage><ProfileData /></ProfilePage>
            )} /> */}
            <Route exact path="/chats/" component={ChatPage} />
            <Route path="/messages/:username" component={ChatPage} />
            <Route path="/logout" component={AuthLogout} />
            {authComponents.map((elem, i) => (
              <Route
                key={i}
                path={`/auth/${elem.auth_type}`}
                component={() => (
                  <AuthPage auth_type={elem.auth_type}>
                    {elem.children}
                  </AuthPage>
                )}>
              </Route>
            ))}
            <Switch>
              {settingsComponents.map((elem, i) => (
                <Route
                  key={i}
                  path={`/settings/${elem.section}`}
                  component={() => (
                    <SettingsPage section={elem.section}>
                      {elem.children}
                    </SettingsPage>
                  )}
                >
                </Route>
              ))}
              {profileComponents.map((elem, i) => (
                <Route key={i} path={elem.path} component={() => (
                  <ProfilePage>{elem.children}</ProfilePage>
                )}>
                </Route>
              ))}

              {profileItemComponents.map((elem, i) => (
                <Route key={i} path={elem.path} component={() => (
                  <ProfileItemPage>{elem.children}</ProfileItemPage>
                )}>
                </Route>
              ))}

            </Switch>
            <Footer />
          </AuthContext.Provider>
        </Router>
      </div >
    );
  }
}

export default App;


