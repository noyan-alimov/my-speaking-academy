import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
	assignQuizToStudent,
	unAssignQuizToStudent,
} from '../firebase/db/quizDb';

interface ChooseStudentToAssignProps {
	queriedStudent: string;
	quizId: string;
}

const ChooseStudentToAssign: React.FC<ChooseStudentToAssignProps> = ({
	queriedStudent,
	quizId,
}) => {
	return (
		<section className='w-100 flex flex-wrap'>
			<h2 className='db w-100 tc dark-blue'>
				Assign {queriedStudent} to this Quiz?
			</h2>
			<Formik
				initialValues={{
					toggle: false,
				}}
				onSubmit={async values => {
					if (values.toggle) {
						assignQuizToStudent(quizId, queriedStudent);
						alert('The user is assigned');
					} else {
						unAssignQuizToStudent(quizId, queriedStudent);
						alert('The user is unassigned');
					}
				}}
			>
				{({ values }) => (
					<Form className='db w-100 flex flex-wrap'>
						<div className='w-100 flex justify-center'>
							<label className='db w-30 flex justify-center items-center'>
								<Field type='checkbox' name='toggle' className='db h2 w2' />
								<p className='db dark-blue ml3 f3'>
									{values.toggle ? 'YES' : 'NO'}
								</p>
							</label>
						</div>

						<div className='w-100 flex justify-center'>
							<button
								type='submit'
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								SUBMIT
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</section>
	);
};

export default ChooseStudentToAssign;
