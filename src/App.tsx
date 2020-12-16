import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={Login} />
			<Footer />
		</BrowserRouter>
	);
};

export default App;
