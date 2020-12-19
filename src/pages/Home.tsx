import React from 'react';
import firebase from '../firebase/initialize';
import HomeForStudent from './Home/HomeForStudent';
import HomeForTeacher from './Home/HomeForTeacher';
import { UserRole } from '../types/UserRole';
import { Redirect } from 'react-router-dom';
import { renderPageIfLoggedIn } from '../utils/renderPageIfLoggedIn';

interface HomeProps {
	user: firebase.User | null;
	history: any;
	userRole: UserRole;
}

const Home: React.FC<HomeProps> = ({ history, user, userRole }) => {
	const redirectToLogin = () => {
		history.push('/login');
	};

	return renderPageIfLoggedIn(
		<main className='flex flex-wrap'>
			{userRole === 'teacher' ? (
				<HomeForTeacher redirectToLogin={redirectToLogin} user={user} />
			) : (
				<HomeForStudent user={user} />
			)}
		</main>,
		user
	);
};

export default Home;
