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
		questionDoc.set({ question, createdAt: new Date() });
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
			.orderBy('createdAt', 'desc')
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

export const getQuestion = async (
	quizId: string,
	questionId: string
): Promise<{} | void> => {
	try {
		const docRef = await db
			.collection('quizzes')
			.doc(quizId)
			.collection('questions')
			.doc(questionId)
			.get();

		return {
			id: docRef.id,
			...docRef.data(),
		};
	} catch (error) {
		console.error(error);
	}
};

export const answerQuestion = async (
	quizId: string,
	questionId: string,
	answer: string
): Promise<void> => {
	try {
		const docRef = db
			.collection('quizzes')
			.doc(quizId)
			.collection('questions')
			.doc(questionId);

		await docRef.update({ answer });
	} catch (error) {
		console.error(error);
	}
};

export const checkAnswer = async (
	quizId: string,
	questionId: string,
	isCorrectAnswer: boolean,
	commentsOnAnswer: string = ''
): Promise<void> => {
	try {
		const docRef = db
			.collection('quizzes')
			.doc(quizId)
			.collection('questions')
			.doc(questionId);

		await docRef.update({
			isCorrectAnswer,
			commentsOnAnswer,
			checkedAnswer: true,
		});
	} catch (error) {
		console.error(error);
	}
};
