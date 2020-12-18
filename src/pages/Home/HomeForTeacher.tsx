import React from 'react';
import { createQuiz, getQuizzes } from '../../firebase/db/quizDb';
import firebase from '../../firebase/initialize';
import Quiz from '../../components/Quiz';
import { Formik } from 'formik';

interface HomeForTeacherProps {
	user: firebase.User | null;
	redirectToLogin: () => void;
}

const HomeForTeacher: React.FC<HomeForTeacherProps> = ({
	redirectToLogin,
	user,
}) => {
	const [quizzes, setQuizzes] = React.useState<any[]>([]);

	const queryQuizzes = async (userEmail: any): Promise<void> => {
		const quizzesData = await getQuizzes(userEmail);
		if (quizzesData) {
			setQuizzes(quizzesData);
		}
	};

	React.useEffect(() => {
		if (user) {
			queryQuizzes(user.email);
		}
	}, [user]);

	return (
		<section className='w-100 flex flex-wrap'>
			<h1 className='db w-100 tc'>Quizzes</h1>
			<Formik
				initialValues={{ quizName: '' }}
				validate={values => {
					const errors: any = {};
					if (values.quizName.length === 0) {
						errors.quizName = 'Please provide a quiz name';
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					if (user) {
						if (user.email) {
							await createQuiz(user.email, values.quizName);
							queryQuizzes(user.email);
						}
					} else {
						redirectToLogin();
					}

					setSubmitting(false);
					resetForm({ values: { quizName: '' } });
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
						<div className='w-100 flex flex-wrap justify-center mv2'>
							<input
								type='text'
								name='quizName'
								placeholder='Quiz Name'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.quizName}
								className='w-100 pa2 mh4 f4 dark-blue'
							/>
							<div className='red'>
								{errors.quizName && touched.quizName && errors.quizName}
							</div>
						</div>
						<div className='w-100 flex justify-center mv2'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								CREATE QUIZ
							</button>
						</div>
					</form>
				)}
			</Formik>
			<div className='w-100 flex flex-wrap'>
				{quizzes &&
					quizzes.map(quiz => (
						<Quiz
							key={quiz.id}
							id={quiz.id}
							name={quiz.name}
							creatorEmail={quiz.creatorEmail}
							queryQuizzes={queryQuizzes}
						/>
					))}
			</div>
		</section>
	);
};

export default HomeForTeacher;
