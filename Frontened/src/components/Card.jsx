import React from "react";

function Card({ image, onClick, isSelected, alt = 'assistant' }){
	return(
		<div
			onClick={onClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(); }}
			className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 bg-[#020220] ${isSelected ? 'ring-4 ring-[#66ffff] border-0' : 'border-2 border-[#0000ff66] hover:border-4 hover:border-white'}`}>
			{image ? (
				<img src={image} alt={alt} className="w-full h-full object-cover"/>
			) : (
				<div className="w-full h-full flex items-center justify-center text-white">No Image</div>
			)}
		</div>
	)
}

export default Card;