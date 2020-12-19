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
import { getUserRole } from './firebase/db/userDb';
import { UserRole } from './types/UserRole';

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

	const [userRole, setUserRole] = React.useState<UserRole>('student');

	const queryUserRole = async () => {
		if (user && user.email) {
			const role = await getUserRole(user.email);
			console.log(role);
			if (role) {
				setUserRole(role);
			}
		}
	};

	React.useEffect(() => {
		if (user) {
			queryUserRole();
		}
	}, [user]);

	return (
		<>
			<BrowserRouter>
				<Header user={user} />
				<Route
					exact
					path='/'
					render={props => <Home user={user} userRole={userRole} {...props} />}
				/>
				<Route exact path='/login' component={Login} />
				<Route
					exact
					path='/quiz/:id/:name'
					render={props => (
						<QuizPage user={user} userRole={userRole} {...props} />
					)}
				/>
				<Route
					exact
					path='/quiz/:id/:name/question/:questionId'
					render={props => (
						<QuestionPage user={user} userRole={userRole} {...props} />
					)}
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
