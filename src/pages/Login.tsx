import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
	return (
		<main className='bg-near-white dark-blue flex flex-wrap ph3 vh-100'>
			<section className='w-100 w-50-ns'>
				<LoginForm />
			</section>
			<section className='w-100 w-50-ns'>
				<RegisterForm />
			</section>
		</main>
	);
};

export default Login;
