import React, { useState, useContext } from 'react'
import bg from '../assets/authBg.png'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function Signin() {
	const [showPassword, setShowPassword] = useState(false)
	const {serverUrl,userData, setUserData}=useContext(userDataContext)
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("")
	const[errorMessage,setErrorMessage]=useState("")

	const handleSignin = async (e) => {
		e.preventDefault();
		setErrorMessage("");
    setLoading(true);
		try {
			const result = await axios.post(`${serverUrl}/api/auth/login`, {
				email,
				password
			}, { withCredentials: true });
			
			if (result.data) {
				console.log('Signin successful:', result.data);
				navigate('/'); // Redirect to home page after successful signin
        setLoading(false);
		setUserData(result.data.user);
		navigate("/home")
			}
		} catch (error) {
			console.error('Signin error:', error.response?.data || error.message);
        setLoading(false);
		setUserData(null);
			setErrorMessage(error.response?.data?.message || 'Failed to sign in. Please try again.');
		}
	}
	return (
		<div className='w-full h-screen bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }} >
			<form className="w-[90%] h-[660px] max-w-[500px] bg-[#00000065] backdrop-blur shadow-lg shadow-black flex flex-col justify-center items-center gap-5 px-5" onSubmit={handleSignin}>
				<h1 className='text-white text-[30px] font-semibold mb-7'>Sign In to <span className='text-blue-400'>Virtual assistant</span></h1>
						<input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />

				<div className='w-full h-[60px] border-2 border-white bg-transparent text-white  rounded-full text-[18px] relative cursor-pointer'>
					<input
						type={showPassword ? "text" : "password"}
						placeholder='password'
						className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5 py-2.5' required onChange={(e)=>setPassword(e.target.value)} value={password}
					/>

					<button
						type="button"
						aria-label={showPassword ? "Hide password" : "Show password"}
						className='absolute top-3 right-4 text-white cursor-pointer'
						onClick={() => setShowPassword(s => !s)}
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
				{errorMessage.length>0 && <p className='text-red-500 text-[17px]'>*{errorMessage}</p>}
				<button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white rounded-full' disabled ={loading} >{loading?"Loading...":"SignIn"}</button>
				<p className='text-white text-[18px] cursor-pointer' onClick={() => navigate('/signup')}>Want to create a new account ? <span className='text-[blue]'>Sign up</span></p>
			</form>
		</div>
	)
}

export default Signin