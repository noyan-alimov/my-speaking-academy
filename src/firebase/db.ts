import { db } from './initialize';
import { QuerySnapshot } from '../types/QuerySnapshot';

export const createQuiz = async (
	creatorEmail: string,
	name: string
): Promise<string> => {
	const quiz = db.collection('quizzes').doc();
	quiz.set({ creatorEmail, name });
	return quiz.id;
};

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

export const getQuestions = (quizId: string): any[] => {
	let questions: any[] = [];
	db.collection('quizzes')
		.doc(quizId)
		.collection('questions')
		.onSnapshot(querySnapshot => {
			querySnapshot.forEach(question => {
				questions.push(question.data());
			});
		});
	return questions;
};

export const getQuizzes = (creatorEmail: string) => {
	let quizzes: any[] = [];
	db.collection('quizzes')
		.where('creatorEmail', '==', creatorEmail)
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(function (doc) {
				console.log(doc.data());
			});
		});
	return quizzes;
};
