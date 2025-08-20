import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SMediaRow from './SMediaRow';

export default function SignInForm() {
	const navigate = useNavigate();
	const [isValid, setIsValid] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});

	// const getCountriesByRegion = async () => {
	// 	try {
	// 		const response = await fetch(
	// 			'https://restcountries.com/v2/all?fields=name,region,flag'
	// 		);
	// 		const data = await response.json();
	// 		return data;
	// 	} catch (error) {
	// 		console.error('Error fetching countries:', error);
	// 		return [];
	// 	}
	// };

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
		return passwordRegex.test(password);
	};

	const handleInputChange = (event) => {
		console.log(event, '^^^^^^^^^^^^^^1');
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));

		// Clear password error when user starts typing
		if (name === 'password' && passwordError) {
			setPasswordError('');
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		setIsSubmitted(true);

		const form = event.currentTarget;
		const password = form.validationPassword.value;
		const username = form.validationUsername.value;

		// Reset password error
		setPasswordError('');

		// Validate password with custom regex
		let isPasswordValid = true;
		if (!!password && !validatePassword(password)) {
			setPasswordError(
				'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol.'
			);
			isPasswordValid = false;
		}

		// Check form validity and custom password validation
		const isFormValid = form.checkValidity() && isPasswordValid;
		setIsValid(isFormValid);

		if (isFormValid) {
			console.log('Form submitted successfully', {
				username: username,
				password: password
			});
			// getCountriesByRegion()
			// 	.then((countries) => {
			// 		// Dispatch action to update country list in the store
			// 		dispatch(updateAllCountryListData(countries));
			// 	})
			// 	.catch((error) => {
			// 		console.error('Error fetching countries:', error);
			// 	});
			navigate('/dashboard'); // Redirect to dashboard on successful login
		}
	};

	return (
		<div className='signin-form-wrap'>
			<h2 className='signin-title'>Sign In</h2>
			<div className='small-copy'>
				New user?{' '}
				<a href='#' className='link-create'>
					Create an account
				</a>
			</div>
			<Form
				autoComplete='off'
				className='mt-4'
				noValidate
				validated={isValid}
				onSubmit={handleSubmit}
			>
				<Form.Group as={Col} className='mb-3' controlId='validationUsername'>
					<Form.Control
						required
						type='text'
						name='username'
						className='input-plain'
						placeholder='Username or email'
						value={formData.username}
						onChange={handleInputChange}
						isInvalid={isSubmitted && !formData.username.trim()}
					/>
					<Form.Control.Feedback type='invalid'>
						Username is required.
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group as={Col} className='mb-3' controlId='validationPassword'>
					<Form.Control
						required
						className='input-plain'
						placeholder='Password'
						type='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						isInvalid={isSubmitted && (!formData.password || passwordError)}
					/>
					<Form.Control.Feedback type='invalid'>
						{passwordError || 'Password is required.'}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group
					className='mb-3 d-flex align-items-center'
					controlId='validationKeepSigned'
				>
					<Form.Check
						id='keep-signed'
						// name='keep_signed'
						// onChange={handleInputChange}
						label='Keep me signed in'
						feedbackType='invalid'
					/>
				</Form.Group>

				<div className='mb-3'>
					<Button className='btn-dark-rect w-100' type='submit'>
						Sign In
					</Button>
				</div>

				<div className='separator'>
					<span className='separator-text'>Or Sign In With</span>
				</div>
				<SMediaRow />
			</Form>
		</div>
	);
}
