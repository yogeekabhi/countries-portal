import womanIllustration from '../assets/woman_illustration.svg';
export default function IllustrationPanel() {
	return (
		<div className='illustration-panel'>
			{/* <img src='/assets/key.svg' alt='key' className='key-icon' /> */}
			<img
				src={womanIllustration}
				alt='illustration'
				className='illustration'
			/>
		</div>
	);
}
