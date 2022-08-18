import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'orange' };

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			const wid = window.innerWidth;
			if (wid >= 1280) setOpen(false);
		});
	}, []);

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobileGnb'
					onClick={() => setOpen(!Open)}
					initial={{ opacity: 0, x: -320 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -320, transition: { duration: 0.5 } }}>
					<h1>
						<Link to='/'>
							<img src={process.env.PUBLIC_URL + '/img/logo_w.png'} alt='logo' />
						</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeStyle={active}>
								DEPARTMENT
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								COMMUNITY
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								GALLERY
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								YOUTUBE
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								LOCATION
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								MEMBERS
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
