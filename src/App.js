import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ContentDetails from './components/content/ContentDetails'
import CreateContent from './components/content/CreateContent'
import Users from './components/users/Users'
import UserDetails from './components/users/UserDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ContentWall from './components/content/ContentWall'

class App extends Component {
	render() {
		const { authConfig } = this.props

		return (
			<BrowserRouter>
				<div className="App">
					<div className="flex-layout">
						<div className="top">
							<Navbar />
						</div>
						<div className="body">
							<Switch>
								<Route exact path="/" component={Dashboard} />
								<Route path="/users" component={Users} />
								<Route path="/user/:id" component={UserDetails} />
								<Route path="/content/:id" component={ContentDetails} />
								<Route path="/create" component={CreateContent} />
								<Route path="/wall" component={ContentWall} />
								<Route
									path="/signin"
									render={(props) => <SignIn {...props} authConfig={authConfig} />}
								/>
								<Route path="/signup" component={SignUp} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
