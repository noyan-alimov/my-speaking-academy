import React from 'react';
import Quiz from '../../components/Quiz';
import { getQuizzesForAssignedUser } from '../../firebase/db/quizDb';
import firebase from '../../firebase/initialize';

interface HomeForStudentProps {
	user: firebase.User | null;
}

const HomeForStudent: React.FC<HomeForStudentProps> = ({ user }) => {
	const [quizzes, setQuizzes] = React.useState<any[]>([]);

	const queryQuizzes = async () => {
		if (user && user.email) {
			const quizzesData = await getQuizzesForAssignedUser(user.email);
			if (quizzesData) {
				setQuizzes(quizzesData);
			}
		}
	};

	React.useEffect(() => {
		if (user) {
			queryQuizzes();
		}
	}, [user]);

	return (
		<section className='w-100 flex flex-wrap'>
			{quizzes.map(quiz => (
				<Quiz key={quiz.id} id={quiz.id} name={quiz.name} />
			))}
		</section>
	);
};

export default HomeForStudent;
