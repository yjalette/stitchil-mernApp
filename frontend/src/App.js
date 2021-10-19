import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthContext from './context/Auth-context';
import MainNav from './components/navbar/MainNav';
import ProfilePage from './pages/profilePage/ProfilePage';
import LandingPage from './pages/homePage/Landing';
import ExplorePage from './pages/explorePage/ExplorePage';
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
import GigDraft from './components/gig/GigDraft';
import ProfileItemPage from './pages/profileItemPage/ProfileItemPage';
import ChatRoomsPage from './pages/chatRoomsPage/ChatRoomsPage';
import ProductDraft from './components/product/ProductDraft';
import GigView from './components/gig/GigView';
import OrderPage from './pages/orderPage/OrderPage';
import OrderCreate from './pages/orderPage/OrderCreate';
import OrderConfirm from './components/order/OrderConfirm';
import DashboardPage from './pages/dashboardPage/DashboardPage';
import ProjectPage from './pages/projectPage/ProjectPage';
import MessengerPage from './pages/messengerPage/MessengerPage';
import GigDraftPage from './pages/gigDraftPage/GigDraftPage';
import ListingDraftPage from './pages/listingDraftPage/ListingDraftPage';
import GigUpdate from './components/gig/GigUpdate';

const userObj = JSON.parse(localStorage.getItem('user'));

const authComponents = [
  { auth_type: "login", children: <AuthLogin auth_type="login" /> },
  { auth_type: "verify_email", children: <AuthLogin auth_type="verify_email" verifiedEmail={true} /> },
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
  { path: "/profile/:username/:section", children: <ProfileData /> }
]

const profileItemComponents = [
  { path: "/profile-item/gig/draft/:itemId/:currForm/", children: <GigDraft /> },
  { path: "/profile-item/gigs/view/:itemId/", children: <GigView /> },
  { path: "/profile-item/product/draft/:itemId/:currForm/", children: <ProductDraft /> },
]

const orderComponents = [
  { path: "/order-create/:itemId/", children: <OrderCreate /> },
  { path: "/order/pending/:orderId/", children: <OrderConfirm /> },
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
            <Route path="/homepage/:section/" component={LandingPage} />
            <Route path="/explore" component={ExplorePage} />
            <Route path="/explore/:filter/" component={ExplorePage} />
            <Route exact path="/chat-rooms/" component={ChatRoomsPage} />
            <Route path="/messages/:chatId/" component={MessengerPage} />
            <Route path="/dashboard/" component={DashboardPage} />
            <Route path="/logout/" component={AuthLogout} />
            <Route path="/listing/type-make/:listingId/" component={GigDraftPage} />
            <Route path="/listing/draft/type-make/:listingId/" component={() => (
              <ListingDraftPage>
                <GigUpdate />
              </ListingDraftPage>
            )} />

            <Route path="/order/active/:orderId" component={ProjectPage} />
            {authComponents.map((elem, i) => (
              <Route
                key={i}
                path={`/auth/${elem.auth_type}/`}
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

              {orderComponents.map((elem, i) => (
                <Route key={i} path={elem.path} component={() => (
                  <OrderPage>{elem.children}</OrderPage>
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


