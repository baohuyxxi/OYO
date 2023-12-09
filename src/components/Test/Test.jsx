//App.js 

import React, { useState, useEffect, useRef } from 'react'; 
import './Test.scss'; 

function App() { 
	const [captchaText, setCaptchaText] = useState(''); 
	const [userInput, setUserInput] = useState(''); 
	const canvasRef = useRef(null); 

	useEffect(() => { 
		const canvas = canvasRef.current; 
		const ctx = canvas.getContext('2d'); 
		initializeCaptcha(ctx); 
	}, []); 

	const generateRandomChar = (min, max) => 
		String.fromCharCode(Math.floor 
			(Math.random() * (max - min + 1) + min)); 

	const generateCaptchaText = () => { 
		let captcha = ''; 
		for (let i = 0; i < 3; i++) { 
			captcha += generateRandomChar(65, 90); 
			captcha += generateRandomChar(97, 122); 
			captcha += generateRandomChar(48, 57); 
		} 
		return captcha.split('').sort( 
			() => Math.random() - 0.5).join(''); 
	}; 

	const drawCaptchaOnCanvas = (ctx, captcha) => { 
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
		const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)']; 
		const letterSpace = 150 / captcha.length; 
		for (let i = 0; i < captcha.length; i++) { 
			const xInitialSpace = 25; 
			ctx.font = '20px Roboto Mono'; 
			ctx.fillStyle = textColors[Math.floor( 
				Math.random() * 2)]; 
			ctx.fillText( 
				captcha[i], 
				xInitialSpace + i * letterSpace, 
				
				// Randomize Y position slightly 
				Math.floor(Math.random() * 16 + 25), 
				100 
			); 
		} 
	}; 

	const initializeCaptcha = (ctx) => { 
		setUserInput(''); 
		const newCaptcha = generateCaptchaText(); 
		setCaptchaText(newCaptcha); 
		drawCaptchaOnCanvas(ctx, newCaptcha); 
	}; 

	const handleUserInputChange = (e) => { 
		setUserInput(e.target.value); 
	}; 

	const handleCaptchaSubmit = () => { 
		if (userInput === captchaText) { 
			alert('Success'); 
		} else { 
			alert('Incorrect'); 
			const canvas = canvasRef.current; 
			const ctx = canvas.getContext('2d'); 
			initializeCaptcha(ctx); 
		} 
	}; 

	return ( 
		<div> 
			<h2 className="heading"> 
				Captcha Generator Using React 
			</h2> 
			<div className="container"> 
				<div className="wrapper"> 
					<canvas ref={canvasRef} 
						width="200"
						height="70"> 

					</canvas> 
					<button id="reload-button" onClick={ 
						() => initializeCaptcha( 
							canvasRef.current.getContext('2d'))}> 
						Reload 
					</button> 
				</div> 
				<input 
					type="text"
					id="user-input"
					placeholder="Enter the text in the image"
					value={userInput} 
					onChange={handleUserInputChange}/> 
					
				<button id="submit-button"
					onClick={handleCaptchaSubmit}> 
					Submit 
				</button> 
			</div> 
		</div> 
	); 
} 

export default App;
