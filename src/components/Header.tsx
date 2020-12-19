import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../firebase/auth';
import firebase from '../firebase/initialize';

interface HeaderProps {
	user: firebase.User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
	const logout = async () => {
		await logoutUser();
	};

	return (
		<header className='h3 pt3 bg-dark-blue'>
			<nav className='flex justify-around'>
				{!user ? (
					<Link to='/login' className='white no-underline f3'>
						Login
					</Link>
				) : (
					<>
						<Link to='/' className='white no-underline f3'>
							Home
						</Link>
						<a href='#' className='white no-underline f3' onClick={logout}>
							Logout
						</a>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
