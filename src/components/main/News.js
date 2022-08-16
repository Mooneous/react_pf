import { useState, useEffect } from 'react';

function News() {
	const [Posts, setPosts] = useState([]);

	useEffect(() => {
		let data = localStorage.getItem('post');
		data = JSON.parse(data);
		setPosts(data);
	}, []);

	return (
		<section id='news'>
			<h1>News</h1>
			{Posts.map((post, idx) => {
				if (idx >= 3) return;

				return (
					<article key={idx}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
