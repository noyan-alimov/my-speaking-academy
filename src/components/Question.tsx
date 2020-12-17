import React from 'react';

type QuestionType = {
	id: string;
	question: string;
};

interface QuestionProps {
	question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
	return (
		<div className='w-100 w-50-ns pa3'>
			<div className='bg-washed-yellow pa2 br2'>
				<p>{question.question}</p>
				<div className='flex justify-between'>
					<button className='bn br2 pa2 bg-dark-blue near-white dim pointer'>
						EDIT
					</button>
					<button className='bn br2 pa2 bg-red near-white dim pointer'>
						DELETE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Question;
