import React from 'react';
import { match } from 'react-router-dom';
import CreateQuestionForm from '../components/CreateQuestionForm';
import Question from '../components/Question';
import { getQuestions } from '../firebase/db/questionDb';

interface QuizPageProps {
	match: match<any>;
	history: any;
}

const QuizPage: React.FC<QuizPageProps> = ({ match, history }) => {
	const [questions, setQuestions] = React.useState<any[]>([]);

	const quizId = match.params.id;
	const quizName = match.params.name;

	// const refreshPage = () => {
	// 	history.push(`${quizId}`);
	// };

	const queryQuestions = async () => {
		const questionsData = await getQuestions(quizId);
		setQuestions(questionsData);
	};

	React.useEffect(() => {
		queryQuestions();
	}, [quizId, getQuestions]);

	return (
		<main className='flex flex-wrap'>
			<h2 className='db w-100 tc dark-blue'>{quizName}</h2>
			<section className='w-100 flex flex-wrap'>
				{questions.map(question => (
					<Question key={question.id} question={question} />
				))}
			</section>
			<CreateQuestionForm quizId={quizId} />
		</main>
	);
};

export default QuizPage;
