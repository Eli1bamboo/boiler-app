import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ContentDetails from './components/content/ContentDetails';
import CreateContent from './components/content/CreateContent';
import UsersList from './components/users/UsersList';
import UserDetails from './components/users/UserDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

class App extends Component {
	render() {
		const { authConfig } = this.props;
		
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route path="/users" component={UsersList} />
						<Route path="/user/:id" component={UserDetails} />
						<Route path="/content/:id" component={ContentDetails} />
						<Route path="/create" component={CreateContent} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
