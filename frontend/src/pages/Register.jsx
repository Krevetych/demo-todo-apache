import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleRegister = async () => {
		const res = await fetch('http://localhost:8080/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		})
		const data = await res.json()
		if (res.ok) {
			navigate('/login')
		} else {
			alert(data.error)
		}
	}

	return (
		<div className='container'>
			<h2 className='title'>Register</h2>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={handleRegister} className='button button-green'>
				Register
			</button>
		</div>
	)
}
