import { Field, Formik } from 'formik';
import React from 'react';
import { checkAnswer } from '../firebase/db/questionDb';

interface CheckAnswerFormProps {
	quizId: string;
	questionId: string;
	queryQuestion: () => void;
}

const returnIsCorrectAnswer = (
	correctAnswer: boolean,
	inCorrectAnswer: boolean
): boolean | string => {
	if (correctAnswer) {
		return true;
	}

	if (inCorrectAnswer) {
		return false;
	}

	return 'Please choose input correctly';
};

const CheckAnswerForm: React.FC<CheckAnswerFormProps> = ({
	quizId,
	questionId,
	queryQuestion,
}) => {
	return (
		<section className='w-100 mb4'>
			<Formik
				initialValues={{
					correctAnswer: false,
					inCorrectAnswer: false,
					commentsOnAnswer: '',
				}}
				validate={values => {
					// const errors: any = {};
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					if (values.correctAnswer === values.inCorrectAnswer) {
						alert('Please choose the answer is correct or not');
						return;
					}

					const isCorrectAnswer = returnIsCorrectAnswer(
						values.correctAnswer,
						values.inCorrectAnswer
					);

					if (typeof isCorrectAnswer === 'string') {
						alert(isCorrectAnswer);
						return;
					}

					await checkAnswer(
						quizId,
						questionId,
						isCorrectAnswer,
						values.commentsOnAnswer
					);

					queryQuestion();
					setSubmitting(false);
					resetForm({
						values: {
							correctAnswer: false,
							inCorrectAnswer: false,
							commentsOnAnswer: '',
						},
					});
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
							<div className='w-100 flex justify-center'>
								<label className='db w-30 flex justify-center items-center'>
									<Field
										type='checkbox'
										name='correctAnswer'
										className='db h2 w2'
									/>
									<p className='db dark-blue ml3 f3'>CORRECT</p>
								</label>
								<label className='db w-30 flex justify-center items-center'>
									<Field
										type='checkbox'
										name='inCorrectAnswer'
										className='db h2 w2'
									/>
									<p className='db dark-blue ml3 f3'>INCORRECT</p>
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
