import React from 'react';
import { Formik } from 'formik';
import { loginUser } from '../firebase/auth';

interface LoginFormProps {
	redirectToHomePage: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectToHomePage }) => {
	return (
		<div className='flex flex-wrap'>
			<h1 className='db w-100 tc'>Login</h1>
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={values => {
					const errors: any = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address';
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
					const error = await loginUser(values.email, values.password);
					if (error) {
						if (error.code.includes('user-not-found')) {
							setErrors({ email: error.message });
						} else if (error.code.includes('wrong-password')) {
							setErrors({ password: error.message });
						}
						return;
					}

					setSubmitting(false);
					resetForm({ values: { email: '', password: '' } });
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
						<div className='w-100 flex justify-center mv2'>
							<button
								type='submit'
								disabled={isSubmitting}
								className='bn pa3 f3 dim b bg-dark-blue near-white br2 pointer'
							>
								LOGIN
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default LoginForm;
