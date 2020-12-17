import { Formik } from 'formik';
import React from 'react';
import { answerQuestion } from '../firebase/db/questionDb';

interface AnswerFormProps {
	quizId: string;
	questionId: string;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ quizId, questionId }) => {
	return (
		<section className='w-100 mb4'>
			<Formik
				initialValues={{ answer: '' }}
				validate={values => {
					const errors: any = {};
					if (values.answer.length === 0) {
						errors.answer = 'Answer should not be blank';
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					await answerQuestion(quizId, questionId, values.answer);

					setSubmitting(false);
					resetForm({ values: { answer: '' } });
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
							<textarea
								placeholder='Enter an answer...'
								rows={4}
								cols={50}
								name='answer'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.answer}
								className='w-100 pa2 mh4 f4 dark-blue'
							></textarea>
							<div className='red'>
								{errors.answer && touched.answer && errors.answer}
							</div>
						</div>
						<div className='w-100 flex justify-around'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								ANSWER
							</button>
						</div>
					</form>
				)}
			</Formik>
		</section>
	);
};

export default AnswerForm;
