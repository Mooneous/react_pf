import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Department() {
	const path = process.env.PUBLIC_URL;
	const [Members, setMembers] = useState([]);
	useEffect(() => {
		axios.get(path + '/DB/members.json').then((json) => {
			console.log(json.data.members);
			setMembers(json.data.members);
		});
	});

	useEffect(() => {
		console.log(Members);
	}, [Members]);

	return (
		<Layout name={'Department'}>
			{Members.map((member, idx) => (
				<article key={idx}>
					<div className='inner'>
						<div className='picFrame'>
							<div className='reflect'>
								<img
									src={`${path}/img/${member.pic}`}
									alt={member.name}
								/>
							</div>
							<div className='pic'>
								<img
									src={`${path}/img/${member.pic}`}
									alt={member.name}
								/>
							</div>
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</div>
				</article>
			))}
			<p>Department</p>
		</Layout>
	);
}

export default Department;

/*<article>
	<div className='inner'>
		<div className='pic'>
			<img src='' alt='' />
		</div>

		<h2>멤버 이름</h2>
		<p>멤버 직책</p>
	</div>
</article>;*/
