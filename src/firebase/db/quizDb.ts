import { db } from '../initialize';

export const createQuiz = async (
	creatorEmail: string,
	name: string
): Promise<string | void> => {
	try {
		const quiz = db.collection('quizzes').doc();
		quiz.set({ creatorEmail, name });
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
