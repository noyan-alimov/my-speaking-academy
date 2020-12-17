import { Formik } from 'formik';
import React from 'react';
import { checkAnswer } from '../firebase/db/questionDb';

interface CheckAnswerFormProps {
	quizId: string;
	questionId: string;
}

const CheckAnswerForm: React.FC<CheckAnswerFormProps> = ({
	quizId,
	questionId,
}) => {
	return (
		<section className='w-100 mb4'>
			<Formik
				initialValues={{ isCorrectAnswer: '', commentsOnAnswer: '' }}
				validate={values => {
					// const errors: any = {};
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const isCorrectAnswer = !values.isCorrectAnswer ? false : true;
					await checkAnswer(
						quizId,
						questionId,
						isCorrectAnswer,
						values.commentsOnAnswer
					);

					setSubmitting(false);
					resetForm({ values: { isCorrectAnswer: '', commentsOnAnswer: '' } });
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit} className='w-100 flex flex-wrap'>
						<div className='w-100 flex flex-wrap justify-center mv5'>
							<div className='w-100 flex flex-wrap justify-center items-center mb2 pa3'>
								<input
									className='db w-10 h2'
									type='checkbox'
									name='isCorrectAnswer'
									value={values.isCorrectAnswer}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<label
									className='db w-30 f4 dark-blue'
									htmlFor='isCorrectAnswer'
								>
									Correct
								</label>
							</div>
							<textarea
								placeholder='Enter a comment...'
								rows={4}
								cols={50}
								name='commentsOnAnswer'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.commentsOnAnswer}
								className='w-100 pa2 mh4 f4 dark-blue'
							></textarea>
							<div className='red'>
								{errors.commentsOnAnswer &&
									touched.commentsOnAnswer &&
									errors.commentsOnAnswer}
							</div>
						</div>
						<div className='w-100 flex justify-around'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								COMMENT
							</button>
						</div>
					</form>
				)}
			</Formik>
		</section>
	);
};

export default CheckAnswerForm;
