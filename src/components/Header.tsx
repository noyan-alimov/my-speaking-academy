import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<header className='h3 pt3 bg-dark-blue'>
			<nav className='flex justify-around'>
				<Link to='/' className='white no-underline f3'>
					Home
				</Link>
				<Link to='/login' className='white no-underline f3'>
					Login
				</Link>
			</nav>
		</header>
	);
};

export default Header;
