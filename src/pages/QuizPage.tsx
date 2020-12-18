import React from 'react';
import { Link, match } from 'react-router-dom';
import CreateQuestionForm from '../components/CreateQuestionForm';
import Question from '../components/Question';
import { getQuestions } from '../firebase/db/questionDb';
import firebase from '../firebase/initialize';

interface QuizPageProps {
	match: match<any>;
	history: any;
	user: firebase.User;
}

const QuizPage: React.FC<QuizPageProps> = ({ match, user }) => {
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

	return (
		<main className='flex flex-wrap'>
			<h2 className='db w-100 tc dark-blue'>{quizName}</h2>
			<section className='w-100 flex flex-wrap'>
				{questions.map(question => (
					<Question
						key={question.id}
						question={question}
						quizId={quizId}
						quizName={quizName}
						queryQuestions={queryQuestions}
					/>
				))}
			</section>
			<CreateQuestionForm quizId={quizId} queryQuestions={queryQuestions} />
			<Link to={`/quiz/${quizId}/${quizName}/assign-to-students`}>
				<button>ASSIGN TO STUDENTS</button>
			</Link>
		</main>
	);
};

export default QuizPage;
