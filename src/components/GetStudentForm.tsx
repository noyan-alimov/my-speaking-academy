import { Formik } from 'formik';
import React from 'react';
import { getStudents } from '../firebase/db/userDb';

interface GetStudentFormProps {
	setQueriedStudent: (student: string) => void;
}

const GetStudentForm: React.FC<GetStudentFormProps> = ({
	setQueriedStudent,
}) => {
	return (
		<section className='w-100 flex flex-wrap'>
			<h1 className='db w-100 tc'>Search Student</h1>
			<Formik
				initialValues={{ studentEmail: '' }}
				validate={values => {
					const errors: any = {};
					if (values.studentEmail.length === 0) {
						errors.studentEmail = 'Please provide a student email';
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					const students = await getStudents(values.studentEmail);
					if (students) {
						setQueriedStudent(students[0].email);
					}

					setSubmitting(false);
					resetForm({ values: { studentEmail: '' } });
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
								type='email'
								name='studentEmail'
								placeholder='Student Email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.studentEmail}
								className='w-100 pa2 mh4 f4 dark-blue'
							/>
							<div className='red'>
								{errors.studentEmail &&
									touched.studentEmail &&
									errors.studentEmail}
							</div>
						</div>
						<div className='w-100 flex justify-center mv2'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								SEARCH
							</button>
						</div>
					</form>
				)}
			</Formik>
		</section>
	);
};

export default GetStudentForm;
