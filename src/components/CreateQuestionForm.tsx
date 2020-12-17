import { Formik } from 'formik';
import React from 'react';
import { addQuestion } from '../firebase/db/questionDb';

interface CreateQuestionFormProps {
	quizId: string;
}

const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({ quizId }) => {
	return (
		<section className='w-100 mb4'>
			<Formik
				initialValues={{ question: '' }}
				validate={values => {
					// const errors: any = {};
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					if (!quizId) {
						return;
					}

					await addQuestion(quizId, values.question);
					setSubmitting(false);
					resetForm({ values: { question: '' } });
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
								placeholder='Enter a question...'
								rows={4}
								cols={50}
								name='question'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.question}
								className='w-100 pa2 mh4 f4 dark-blue'
							></textarea>
							<div className='red'>
								{errors.question && touched.question && errors.question}
							</div>
						</div>
						<div className='w-100 flex justify-around'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								ADD
							</button>
						</div>
					</form>
				)}
			</Formik>
		</section>
	);
};

export default CreateQuestionForm;
