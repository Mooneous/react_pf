import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Gallery() {
	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const method = 'flickr.people.getPhotos';
	const num = 10;
	const id = '164021883@N04';
	const url = `https://www.flickr.com/services/rest/?method=${method}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${id}`;

	const [Items, setItems] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				{Items.map((pic, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={pic.title}
									/>
								</div>
								<h2>{pic.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
