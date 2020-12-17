import React from 'react';
import CreateQuestionForm from '../components/CreateQuestionForm';
import { createQuiz, getQuizzes } from '../firebase/db';
import firebase from '../firebase/initialize';
import { Quiz } from '../types/Quiz';

interface HomeProps {
	user: firebase.User | null;
	history: any;
}

const Home: React.FC<HomeProps> = ({ user, history }) => {
	const [isCreatingQuiz, setIsCreatingQuiz] = React.useState<boolean>(false);
	const [quizId, setQuizId] = React.useState<string>('');
	const [quizName, setQuizName] = React.useState<string>('');
	const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);

	React.useEffect(() => {
		console.log(user);
		if (user && user.email) {
			const quizzes = getQuizzes(user.email);
			// setQuizzes([ ...quizzes,  ]);
			console.log(quizzes[0]);
		}
	}, [user]);

	const createQuizSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsCreatingQuiz(true);
		if (user) {
			if (user.email) {
				const id: string = await createQuiz(user.email, quizName);
				setQuizId(id);
			}
		} else {
			history.push('/login');
		}
	};

	// console.log(user);
	console.log(quizzes[0]);

	return (
		<main className='vh-100 flex flex-wrap'>
			{!isCreatingQuiz ? (
				<div className='w-100 flex flex-wrap'>
					<div className='w-100'>
						{quizzes.map(quiz => (
							<div key={quiz.name}>{quiz.name}</div>
						))}
					</div>
					<form onSubmit={createQuizSubmit} className='w-100 pv5'>
						<div className='w-100 ph4 ph7-ns'>
							<input
								type='text'
								placeholder='Name'
								name='quizName'
								value={quizName}
								onChange={e => {
									setQuizName(e.target.value);
								}}
								className='w-100 pa2 f4 dark-blue'
							/>
						</div>
						<div className='w-100 ph5 mt4 ph7-ns flex justify-center'>
							<button
								type='submit'
								className='w-100 w-50-ns bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								CREATE QUIZ
							</button>
						</div>
					</form>
				</div>
			) : (
				<CreateQuestionForm quizId={quizId} />
			)}
		</main>
	);
};

export default Home;
