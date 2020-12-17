import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface LoginProps {
	history: any;
}

const Login: React.FC<LoginProps> = ({ history }) => {
	const redirectToHomePage = (): void => {
		history.push('/');
	};

	return (
		<main className='bg-near-white dark-blue flex flex-wrap ph3 vh-100'>
			<section className='w-100 w-50-ns'>
				<LoginForm redirectToHomePage={redirectToHomePage} />
			</section>
			<section className='w-100 w-50-ns'>
				<RegisterForm redirectToHomePage={redirectToHomePage} />
			</section>
		</main>
	);
};

export default Login;
