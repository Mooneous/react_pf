import { useEffect } from 'react';

function Pop({ children, setOpen }) {
	useEffect(() => {
		document.body.style.overflowY = 'hidden';

		return () => {
			document.body.style.overflowY = 'auto';
		};
	}, []);

	return (
		<aside className='pop'>
			<div className='con'>{children}</div>
			<span className='close' onClick={() => setOpen(false)}>
				close
			</span>
		</aside>
	);
}

export default Pop;
