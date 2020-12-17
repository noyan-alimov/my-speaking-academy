import React from 'react';
import { createQuiz, getQuizzes } from '../firebase/db/quizDb';
import firebase from '../firebase/initialize';
import Quiz from '../components/Quiz';

interface HomeProps {
	user: firebase.User | null;
	history: any;
}

const Home: React.FC<HomeProps> = ({ history, user }) => {
	const [quizName, setQuizName] = React.useState<string>('');
	const [quizzes, setQuizzes] = React.useState<any[]>([]);

	const queryQuizzes = async (userEmail: any): Promise<void> => {
		const quizzesData = await getQuizzes(userEmail);
		if (quizzesData) {
			setQuizzes(quizzesData);
		}
	};

	React.useEffect(() => {
		if (user) {
			queryQuizzes(user.email);
		}
	}, [user, setQuizName]);

	const createQuizSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!quizName) {
			alert('Please provide a quiz name');
			return;
		}

		if (user) {
			if (user.email) {
				const id: string | void = await createQuiz(user.email, quizName);
				setQuizName('');
			}
		} else {
			history.push('/login');
		}
	};

	return (
		<main className='flex flex-wrap'>
			<div className='w-100 flex flex-wrap'>
				<form onSubmit={createQuizSubmit} className='w-100 pv4'>
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
				<div className='w-100 flex flex-wrap'>
					{quizzes.map(quiz => (
						<Quiz
							key={quiz.id}
							id={quiz.id}
							name={quiz.name}
							creatorEmail={quiz.creatorEmail}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default Home;
