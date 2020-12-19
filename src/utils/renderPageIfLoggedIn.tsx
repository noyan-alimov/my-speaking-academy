import { Redirect } from 'react-router-dom';

export const renderPageIfLoggedIn = (component: any, user: any) => {
	if (user) {
		return component;
	}

	return <Redirect to='/login'></Redirect>;
};
