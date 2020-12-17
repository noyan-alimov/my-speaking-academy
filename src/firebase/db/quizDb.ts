import { db } from '../initialize';

export const createQuiz = async (
	creatorEmail: string,
	name: string
): Promise<string> => {
	const quiz = db.collection('quizzes').doc();
	quiz.set({ creatorEmail, name });
	return quiz.id;
};

export const getQuizzes = async (creatorEmail: string) => {
	const snapshot = await db
		.collection('quizzes')
		.where('creatorEmail', '==', creatorEmail)
		.get();

	const quizzes = snapshot.docs;
	const quizzesData = quizzes.map(quiz => {
		return {
			id: quiz.id,
			...quiz.data(),
		};
	});
	return quizzesData;
};

export const deleteQuiz = async (id: string): Promise<void> => {
	try {
		await db.collection('quizzes').doc(id).delete();
	} catch (error) {
		console.error(error);
	}
};
