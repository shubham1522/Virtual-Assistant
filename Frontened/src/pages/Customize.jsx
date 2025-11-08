import React, { useState, useRef, useEffect } from "react";
import { MdImage } from "react-icons/md";

import Card from "../components/Card.jsx"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"

function Customize() {
	const images = [image1, image2, image3, image4, image5, image6, image7];
	const [selected, setSelected] = useState(null);
	const [customImage, setCustomImage] = useState(null);
	const fileInputRef = useRef(null);

	// Revoke previous object URL when customImage changes/unmount
	useEffect(() => {
		return () => {
			if (customImage && typeof customImage === 'string' && customImage.startsWith('blob:')) {
				URL.revokeObjectURL(customImage);
			}
		};
	}, [customImage]);

	const handleCardClick = (img) => {
		setSelected(img);
	};

	const handlePlaceholderClick = () => {
		fileInputRef.current && fileInputRef.current.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		// revoke old one
		if (customImage && typeof customImage === 'string' && customImage.startsWith('blob:')) {
			URL.revokeObjectURL(customImage);
		}
		setCustomImage(url);
		setSelected(url);
	};

	return (
		<div className="w-full min-h-screen bg-[#000033] flex justify-center items-center flex-col p-[20px]">
			<h1 className="text-white mb-[30px] text-[30px] font-bold text-center">Select Your Assistant Image</h1>
			<div className="w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-6">
				{images.map((img, idx) => (
					<Card key={idx} image={img} onClick={() => handleCardClick(img)} isSelected={selected === img} />
				))}

				{customImage ? (
					<Card image={customImage} onClick={() => handleCardClick(customImage)} isSelected={selected === customImage} alt="custom upload" />
				) : (
					<div
						onClick={handlePlaceholderClick}
						className="w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center"
						role="button"
						tabIndex={0}
						onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlaceholderClick(); }}
					>
						<MdImage className="w-[25px] h-[25px] text-white text-8xl flex justify-center items-center" />
					</div>
				)}

				<input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileChange} />
			</div>

			<button disabled={!selected} className={`min-w-[150px] h-[60px] mt-[30px] font-semibold text-[19px] rounded-full ${selected ? 'bg-white text-black' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`} onClick={()=>{ if(selected) console.log('Selected image:', selected); }}>
				Next
			</button>
		</div>
	)
}
export default Customize;
