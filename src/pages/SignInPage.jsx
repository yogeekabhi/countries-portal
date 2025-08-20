import { Container } from 'react-bootstrap';
import SignInForm from '../components/SignInForm';
import IllustrationSpace from '../components/IllustrationSpace';

export default function SignInPage() {
	return (
		<div className='page-bg'>
			<Container className='auth-wrap'>
				<div className='auth-card'>
					<div className='auth-left'>
						<SignInForm />
					</div>
					<div className='auth-right'>
						<IllustrationSpace />
					</div>
				</div>
			</Container>
		</div>
	);
}
