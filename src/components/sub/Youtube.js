import Layout from '../common/Layout';
import Pop from '../common/Pop';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Youtube() {
	const dispatch = useDispatch();
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);
	const Vids = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => (
					<article key={vid.id}>
						<h2>
							{vid.snippet.title.length > 20
								? vid.snippet.title.substr(0, 20) + '...'
								: vid.snippet.title}
						</h2>
						<div className='txt'>
							<p>
								{vid.snippet.description.length > 200
									? vid.snippet.description.substr(0, 200) + '...'
									: vid.snippet.description}
							</p>
							<span>{vid.snippet.publishedAt.split('T')[0]}</span>
						</div>

						<div className='pic'>
							<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
							<FontAwesomeIcon
								icon={faYoutube}
								onClick={() => {
									setIndex(idx);
									pop.current.open();
								}}
							/>
						</div>
					</article>
				))}
			</Layout>

			<Pop ref={pop}>
				{Vids.length !== 0 && (
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				)}
			</Pop>
		</>
	);
}

export default Youtube;

/*구글 API key = "AIzaSyB5JZfJTpMHm2WfEEIid2Dt443MfKM9XAU";*/
