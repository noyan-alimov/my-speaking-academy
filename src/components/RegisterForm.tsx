import React from 'react';
import { Formik } from 'formik';
import { registerUser } from '../firebase/auth';

interface RegisterFormProps {
	redirectToHomePage: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ redirectToHomePage }) => {
	return (
		<div className='flex flex-wrap'>
			<h1 className='db w-100 tc'>Register</h1>
			<Formik
				initialValues={{ email: '', password: '', confirmPassword: '' }}
				validate={values => {
					const errors: any = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address';
					} else if (!values.password) {
						errors.password = 'Required';
					} else if (!values.confirmPassword) {
						errors.confirmPassword = 'Required';
					} else if (values.password !== values.confirmPassword) {
						errors.confirmPassword = 'Passwords must match';
					}

					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
					const error = await registerUser(values.email, values.password);
					if (error) {
						if (error.code.includes('email-already-in-use')) {
							setErrors({ email: error.message });
						} else if (error.code.includes('weak-password')) {
							setErrors({ password: error.message });
						}
						return;
					}

					setSubmitting(false);
					resetForm({
						values: { email: '', password: '', confirmPassword: '' },
					});
					redirectToHomePage();
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
								name='email'
								placeholder='Email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								className='w-100 pa2 mh4 f4 dark-blue'
							/>
							<div className='red'>
								{errors.email && touched.email && errors.email}
							</div>
						</div>
						<div className='w-100 flex flex-wrap justify-center mv2'>
							<input
								type='password'
								name='password'
								placeholder='Password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								className='w-100 pa2 mh4 f4 dark-blue'
							/>
							<div className='red'>
								{errors.password && touched.password && errors.password}
							</div>
						</div>
						<div className='w-100 flex flex-wrap justify-center mv2'>
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmPassword}
								className='w-100 pa2 mh4 f4 dark-blue'
							/>
							<div className='red'>
								{errors.confirmPassword &&
									touched.confirmPassword &&
									errors.confirmPassword}
							</div>
						</div>
						<div className='w-100 flex justify-center mv2'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								REGISTER
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default RegisterForm;
