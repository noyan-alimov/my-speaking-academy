import React from 'react';
import { Link } from 'react-router-dom';
import { deleteQuestion } from '../firebase/db/questionDb';

type QuestionType = {
	id: string;
	question: string;
};

interface QuestionProps {
	question: QuestionType;
	quizId: string;
	quizName: string;
	queryQuestions: () => void;
}

const Question: React.FC<QuestionProps> = ({
	question,
	quizId,
	quizName,
	queryQuestions,
}) => {
	const removeQuestion = async () => {
		await deleteQuestion(quizId, question.id);
		queryQuestions();
	};

	return (
		<div className='w-100 w-50-ns pa3'>
			<div className='bg-washed-yellow pa2 br2'>
				<p>{question.question}</p>
				<div className='flex justify-between'>
					<Link to={`/quiz/${quizId}/${quizName}/question/${question.id}`}>
						<button className='bn br2 pa2 bg-dark-blue near-white dim pointer'>
							ANSWER
						</button>
					</Link>
					<button
						className='bn br2 pa2 bg-red near-white dim pointer'
						onClick={removeQuestion}
					>
						DELETE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Question;
