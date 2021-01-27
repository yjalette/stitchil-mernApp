import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import AuthContext from './context/Auth-context';
import MainNav from './components/navbar/MainNav';
import ProfilePage from './pages/profilePage/ProfilePage';
import LandingPage from './pages/homePage/Landing';
import ExplorePage from './pages/explorePage/ExplorePage';
import MeasurementsPage from './pages/measurements/Measurements';
import Logout from './components/navbar/Logout';
import Contact from './components/contact/Contact';
import ChatPage from './pages/chatPage/ChatPage';
import Footer from './components/footer/Footer';
import SettingsPage from './pages/settingsPage/SettingsPage';
import AuthPage from './pages/authPage/AuthPage';
import GigPage from './pages/gigPage/GigPage';
import ProductPage from './pages/productPage/ProductPage';

const userObj = JSON.parse(localStorage.getItem('user'));

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
            <Route exact path="/" component={LandingPage} />
            <Route path="/homepage/:page" component={LandingPage} />
            <Route path="/auth/:authType" component={AuthPage} />
            <Route path="/auth/:authType/:token" component={AuthPage} />
            {/* <Route path="/confirm/:confirmType" component={ConfirmCreds} /> */}
            <Switch>
              <Route path="/explore" component={ExplorePage} />
              <Route path="/settings/:section" component={SettingsPage} />
              {/* <Route path="/update/:section/:token" component={Settings} /> */}
              <Route path="/measurements" component={MeasurementsPage} />
              <Route path="/filter/:section/:category" component={ExplorePage} />
              <Route path="/profile/:username/:section" component={ProfilePage} />
              <Route path="/view-gigs-item/:id" component={GigPage} />
              <Route path="/view-portfolio-item/:id" component={ProductPage} />
              <Route exact path="/messages" component={ChatPage} />
              <Route path="/support" component={Contact} />
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


