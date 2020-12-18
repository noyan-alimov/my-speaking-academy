import { auth } from './initialize';
import { addUser } from './db/userDb';

type ErrorResponse = {
	code: string;
	message: string;
};

export const registerUser = async (
	email: string,
	password: string
): Promise<ErrorResponse | undefined> => {
	try {
		const user = await auth.createUserWithEmailAndPassword(email, password);
		await addUser(user);
		return undefined;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const loginUser = async (
	email: string,
	password: string
): Promise<ErrorResponse | undefined> => {
	try {
		await auth.signInWithEmailAndPassword(email, password);
		return undefined;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const logoutUser = async (): Promise<ErrorResponse | undefined> => {
	try {
		await auth.signOut();
		return undefined;
	} catch (error) {
		console.error(error);
		return error;
	}
};
