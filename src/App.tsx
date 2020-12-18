import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import QuizPage from './pages/QuizPage';
import { auth } from './firebase/initialize';
import QuestionPage from './pages/QuestionPage';
import AssignQuizToStudents from './pages/AssignQuizToStudents';

const App = () => {
	const [user, setUser] = React.useState<any>(null);

	React.useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

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
				<Route
					exact
					path='/quiz/:id/:name'
					render={props => <QuizPage user={user} {...props} />}
				/>
				<Route
					exact
					path='/quiz/:id/:name/question/:questionId'
					render={props => <QuestionPage user={user} {...props} />}
				/>
				<Route
					exact
					path='/quiz/:id/:name/assign-to-students'
					render={props => <AssignQuizToStudents user={user} {...props} />}
				/>
				{/* <Footer /> */}
			</BrowserRouter>
		</>
	);
};

export default App;
