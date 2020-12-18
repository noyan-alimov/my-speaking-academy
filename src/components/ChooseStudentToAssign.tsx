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
					assign: false,
					unAssign: false,
				}}
				onSubmit={async values => {
					if (values.assign === values.unAssign) {
						alert('Please choose whether to assign this student or not');
						return;
					}

					if (values.assign) {
						assignQuizToStudent(quizId, queriedStudent);
						alert('The user is assigned');
						return;
					}
					if (values.unAssign) {
						unAssignQuizToStudent(quizId, queriedStudent);
						alert('The user is unassigned');
						return;
					}
				}}
			>
				{({ values }) => (
					<Form className='db w-100 flex flex-wrap'>
						<div className='w-100 flex justify-center'>
							<label className='db w-30 flex justify-center items-center'>
								<Field type='checkbox' name='assign' className='db h2 w2' />
								<p className='db dark-blue ml3 f3'>ASSIGN</p>
							</label>
							<label className='db w-30 flex justify-center items-center'>
								<Field type='checkbox' name='unAssign' className='db h2 w2' />
								<p className='db dark-blue ml3 f3'>UNASSIGN</p>
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
