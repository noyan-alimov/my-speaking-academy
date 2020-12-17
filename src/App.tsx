import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import firebase, { auth } from './firebase/initialize';

const App = () => {
	const [user, setUser] = React.useState<firebase.User | null>(null);

	auth.onAuthStateChanged(user => {
		if (user) {
			setUser(user);
		} else {
			setUser(null);
		}
	});

	return (
		<>
			<BrowserRouter>
				<Header user={user} />
				<Route
					exact
					path='/'
					render={props => <Home user={user} {...props} />}
				/>
				<Route exact path='/login' component={Login} />
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
