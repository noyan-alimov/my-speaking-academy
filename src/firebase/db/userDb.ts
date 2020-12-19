import { db } from '../initialize';
import { UserRole } from '../../types/UserRole';

export const addUser = async (email: string) => {
	try {
		await db.collection('users').doc(email).set({
			email,
			createdAt: new Date(),
			role: 'student',
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUserRole = async (email: string): Promise<UserRole | void> => {
	try {
		const userRef = await db.collection('users').doc(email).get();
		const userDoc = userRef.data();

		console.log(userDoc);
		if (userDoc!.role === 'teacher') {
			return 'teacher';
		}

		return 'student';
	} catch (error) {
		console.error(error);
	}
};

export const getStudents = async (
	studentEmail: string
): Promise<any[] | void> => {
	try {
		let students: any[] = [];

		const snapshot = await db
			.collection('users')
			.where('email', '==', studentEmail)
			.get();
		snapshot.forEach(doc => {
			students.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return students;
	} catch (error) {
		console.error(error);
	}
};
