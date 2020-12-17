import { db } from '../initialize';

export const addQuestion = async (
	quizId: string,
	question: string
): Promise<void | string> => {
	try {
		const questionDoc = db
			.collection('quizzes')
			.doc(`${quizId}`)
			.collection('questions')
			.doc();
		questionDoc.set({ question });
		return questionDoc.id;
	} catch (error) {
		console.error(error);
	}
};

export const getQuestions = async (quizId: string): Promise<any[] | void> => {
	try {
		let questions: any[] = [];

		const snapshot = await db
			.collection('quizzes')
			.doc(quizId)
			.collection('questions')
			.get();

		snapshot.forEach(doc => {
			questions.push({
				id: doc.id,
				...doc.data(),
			});
		});
		return questions;
	} catch (error) {
		console.error(error);
	}
};

export const deleteQuestion = async (
	quizId: string,
	questionId: string
): Promise<void> => {
	try {
		await db
			.collection('quizzes')
			.doc(quizId)
			.collection('questions')
			.doc(questionId)
			.delete();
	} catch (error) {
		console.error(error);
	}
};
