import { Facebook, Twitter, Linkedin, Instagram, Aperture } from 'lucide-react';

export default function SMediaRow() {
	return (
		<div className='social-row d-flex gap-3 mt-3'>
			<div className='social-circle'>
				<Aperture size={18} />
			</div>
			<div className='social-circle'>
				<Facebook size={18} />
			</div>
			<div className='social-circle'>
				<Linkedin size={18} />
			</div>
			<div className='social-circle'>
				<Twitter size={18} />
			</div>
		</div>
	);
}
