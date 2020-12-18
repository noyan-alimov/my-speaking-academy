import React from 'react';
import { match } from 'react-router-dom';
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

	return <main></main>;
};

export default AssignQuizToStudents;
