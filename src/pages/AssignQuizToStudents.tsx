import React from 'react';
import { match } from 'react-router-dom';
import ChooseStudentToAssign from '../components/ChooseStudentToAssign';
import GetStudentForm from '../components/GetStudentForm';
import firebase from '../firebase/initialize';

interface AssignQuizToStudentsProps {
	user: firebase.User;
	match: match<any>;
}

const AssignQuizToStudents: React.FC<AssignQuizToStudentsProps> = ({
	user,
	match,
}) => {
	const quizId = match.params.id;
	const quizName = match.params.name;

	const [queriedStudent, setQueriedStudent] = React.useState<string>(''); // student email

	return (
		<main className='flex flex-wrap mb3'>
			<h1 className='db w-100 tc dark-blue'>{quizName}</h1>
			<GetStudentForm setQueriedStudent={setQueriedStudent} />
			{queriedStudent.length > 0 && (
				<ChooseStudentToAssign
					quizId={quizId}
					queriedStudent={queriedStudent}
				/>
			)}
		</main>
	);
};

export default AssignQuizToStudents;
