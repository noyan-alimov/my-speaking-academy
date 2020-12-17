export type Question = {
	id: string;
	question: string;
	answer?: string;
	isCorrectAnswer?: boolean;
	commentsOnAnswer?: string;
};
