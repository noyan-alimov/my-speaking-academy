import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<footer className='h3 bg-dark-blue near-white flex justify-center items-center'>
			© MSA
		</footer>
	);
};

export default Footer;
