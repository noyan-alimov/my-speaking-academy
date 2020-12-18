import firebase, { db } from '../initialize';

export const createQuiz = async (
	creatorEmail: string,
	name: string
): Promise<string | void> => {
	try {
		const quiz = db.collection('quizzes').doc();
		quiz.set({ creatorEmail, name, createdAt: new Date() });
		return quiz.id;
	} catch (error) {
		console.error(error);
	}
};

export const getQuizzes = async (
	creatorEmail: string
): Promise<any[] | void> => {
	try {
		let quizzes: any[] = [];

		const snapshot = await db
			.collection('quizzes')
			.where('creatorEmail', '==', creatorEmail)
			.orderBy('createdAt', 'desc')
			.get();

		snapshot.forEach(doc => {
			quizzes.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return quizzes;
	} catch (error) {
		console.error(error);
	}
};

// export const getQuiz = async (quizId: string): Promise<{}> => {
// 	const docRef = await db.collection('quizzes').doc(quizId).get();

// 	return {
// 		id: docRef.id,
// 		...docRef.data(),
// 	};
// };

export const deleteQuiz = async (id: string): Promise<void> => {
	try {
		await db.collection('quizzes').doc(id).delete();
	} catch (error) {
		console.error(error);
	}
};

export const assignQuizToStudent = async (
	id: string,
	studentEmail: string
): Promise<void> => {
	try {
		await db
			.collection('quizzes')
			.doc(id)
			.update({
				assignedToStudents: firebase.firestore.FieldValue.arrayUnion(
					studentEmail
				),
			});
	} catch (error) {
		console.error(error);
	}
};

export const unAssignQuizToStudent = async (
	id: string,
	studentEmail: string
): Promise<void> => {
	try {
		await db
			.collection('quizzes')
			.doc(id)
			.update({
				assignedToStudents: firebase.firestore.FieldValue.arrayRemove(
					studentEmail
				),
			});
	} catch (error) {
		console.error(error);
	}
};
