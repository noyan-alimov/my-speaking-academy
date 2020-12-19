import React from 'react';
import { match, Redirect } from 'react-router-dom';
import AnswerForm from '../components/AnswerForm';
import firebase from '../firebase/initialize';
import { getQuestion } from '../firebase/db/questionDb';
import CheckAnswerForm from '../components/CheckAnswerForm';
import { UserRole } from '../types/UserRole';
import { renderPageIfLoggedIn } from '../utils/renderPageIfLoggedIn';

interface QuestionPageProps {
	user: firebase.User;
	match: match<any>;
	userRole: UserRole;
}

const QuestionPage: React.FC<QuestionPageProps> = ({
	user,
	match,
	userRole,
}) => {
	const quizId = match.params.id;
	const questionId = match.params.questionId;

	const [question, setQuestion] = React.useState<any>();

	const queryQuestion = async () => {
		const questionData = await getQuestion(quizId, questionId);
		if (questionData) {
			setQuestion(questionData);
		}
	};

	React.useEffect(() => {
		if (user) {
			queryQuestion();
		}
	}, [user]);

	const renderCheckAnswerFormOrNot = () => {
		if (userRole === 'teacher') {
			return (
				<CheckAnswerForm
					quizId={quizId}
					questionId={questionId}
					queryQuestion={queryQuestion}
				/>
			);
		}

		return <div></div>;
	};

	const renderAnswerFormOrNot = () => {
		if (userRole === 'student') {
			return (
				<AnswerForm
					quizId={quizId}
					questionId={questionId}
					queryQuestion={queryQuestion}
				/>
			);
		}

		return <div></div>;
	};

	return renderPageIfLoggedIn(
		<main className='flex flex-wrap'>
			{question && (
				<div className='w-100 dark-blue pa5'>
					<p className='f3'>Question: {question.question}</p>
				</div>
			)}
			{question?.answer ? (
				<>
					<div className='w-100 dark-blue pa5'>
						<p className='f3'>Answer: {question.answer}</p>
					</div>
					{question.checkedAnswer ? (
						<div className='w-100 flex flex-column justify-center items-center'>
							{question.isCorrectAnswer ? (
								<p className='f3 dark-blue'>Correct</p>
							) : (
								<p className='f3 dark-blue'>Not Correct</p>
							)}{' '}
							<p className='f3 dark-blue'>{question.commentsOnAnswer}</p>
						</div>
					) : (
						renderCheckAnswerFormOrNot()
					)}
				</>
			) : (
				renderAnswerFormOrNot()
			)}
		</main>,
		user
	);
};

export default QuestionPage;
