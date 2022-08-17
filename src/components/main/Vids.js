import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Vids() {
	return (
		<section id='vids' className='myScroll'>
			<Swiper>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
			</Swiper>
		</section>
	);
}

export default Vids;
