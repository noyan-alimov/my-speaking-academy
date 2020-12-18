import React from 'react';
import firebase from '../firebase/initialize';
import HomeForTeacher from './Home/HomeForTeacher';

interface HomeProps {
	user: firebase.User | null;
	history: any;
}

const Home: React.FC<HomeProps> = ({ history, user }) => {
	const redirectToLogin = () => {
		history.push('/login');
	};

	return (
		<main className='flex flex-wrap'>
			<HomeForTeacher redirectToLogin={redirectToLogin} user={user} />
		</main>
	);
};

export default Home;
