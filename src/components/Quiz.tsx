import React from 'react';
import { Link } from 'react-router-dom';
import { deleteQuiz } from '../firebase/db/quizDb';

interface QuizProps {
	id: string;
	name: string;
	creatorEmail: string;
}

const Quiz: React.FC<QuizProps> = ({ id, name, creatorEmail }) => {
	const removeQuiz = async () => {
		await deleteQuiz(id);
	};

	return (
		<div className='w-50 w-25-ns pa3'>
			<div className='bg-washed-yellow pa2 br2'>
				<h4 className='db tc'>{name}</h4>
				<div className='flex justify-around'>
					<Link to={`/quiz/${id}/${name}`}>
						<button className='bn br2 pa2 bg-dark-blue near-white dim pointer'>
							EDIT
						</button>
					</Link>
					<button
						className='bn br2 pa2 bg-red near-white dim pointer'
						onClick={removeQuiz}
					>
						DELETE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
