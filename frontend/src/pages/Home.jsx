import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<div className='container'>
			<h1 className='title'>Welcome to Todo App</h1>
			<div className='button-group'>
				<Link to='/login' className='button'>
					Login
				</Link>{' '}
				<Link to='/register' className='button'>
					Register
				</Link>
			</div>
		</div>
	)
}
