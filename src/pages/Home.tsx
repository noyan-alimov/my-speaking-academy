import React from 'react';
import { getUserRole } from '../firebase/db/userDb';
import firebase from '../firebase/initialize';
import HomeForStudent from './Home/HomeForStudent';
import HomeForTeacher from './Home/HomeForTeacher';

interface HomeProps {
	user: firebase.User | null;
	history: any;
}

const Home: React.FC<HomeProps> = ({ history, user }) => {
	const redirectToLogin = () => {
		history.push('/login');
	};

	const [userRole, setUserRole] = React.useState<string>('');

	const queryUserRole = async () => {
		if (user && user.email) {
			const role = await getUserRole(user.email);
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
		<main className='flex flex-wrap'>
			{userRole === 'teacher' ? (
				<HomeForTeacher redirectToLogin={redirectToLogin} user={user} />
			) : (
				<HomeForStudent user={user} />
			)}
		</main>
	);
};

export default Home;
