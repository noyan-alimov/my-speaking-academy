import { db } from '../initialize';

export const addQuestion = async (
	quizId: string,
	question: string
): Promise<void> => {
	try {
		db.collection('quizzes').doc(`${quizId}`).collection('questions').add({
			question,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getQuestions = async (quizId: string) => {
	const snapshot = await db
		.collection('quizzes')
		.doc(quizId)
		.collection('questions')
		.get();

	const questions = snapshot.docs;
	const questionsData = questions.map(question => {
		return {
			id: question.id,
			...question.data(),
		};
	});
	return questionsData;
};

export const deleteQuestion = async (id: string) => {};
