import React from 'react';
import { Link, match } from 'react-router-dom';
import CreateQuestionForm from '../components/CreateQuestionForm';
import Question from '../components/Question';
import { getQuestions } from '../firebase/db/questionDb';
import firebase from '../firebase/initialize';
import { UserRole } from '../types/UserRole';
import { renderPageIfLoggedIn } from '../utils/renderPageIfLoggedIn';

interface QuizPageProps {
	match: match<any>;
	history: any;
	user: firebase.User;
	userRole: UserRole;
}

const QuizPage: React.FC<QuizPageProps> = ({ match, user, userRole }) => {
	const [questions, setQuestions] = React.useState<any[]>([]);

	const quizId = match.params.id;
	const quizName = match.params.name;

	const queryQuestions = async () => {
		const questionsData = await getQuestions(quizId);
		if (questionsData) {
			setQuestions(questionsData);
		}
	};

	React.useEffect(() => {
		if (user) {
			queryQuestions();
		}
	}, [user]);

	return renderPageIfLoggedIn(
		<main className='flex flex-wrap pb3'>
			<h2 className='db w-100 tc dark-blue'>{quizName}</h2>
			<section className='w-100 flex flex-wrap'>
				{questions.map(question => (
					<Question
						key={question.id}
						question={question}
						quizId={quizId}
						quizName={quizName}
						queryQuestions={queryQuestions}
						userRole={userRole}
					/>
				))}
			</section>
			{userRole === 'teacher' && (
				<>
					<CreateQuestionForm quizId={quizId} queryQuestions={queryQuestions} />
					<div className='w-100 flex justify-center items-center'>
						<Link to={`/quiz/${quizId}/${quizName}/assign-to-students`}>
							<button className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'>
								ASSIGN TO STUDENTS
							</button>
						</Link>
					</div>
				</>
			)}
		</main>,
		user
	);
};

export default QuizPage;
