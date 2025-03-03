import client from '../db.js'
import { hashPassword } from '../utils/hash.js'
import { jsonResponse } from '../utils/response.js'

export const register = async (req, res, body) => {
	const { username, password } = JSON.parse(body)

	if (!username || !password) {
		return jsonResponse(res, 400, {
			error: 'Username and password are required',
		})
	}

	const hashedPassword = hashPassword(password)

	try {
		await client.query(
			'INSERT INTO users (username, password) VALUES ($1, $2)',
			[username, hashedPassword]
		)
		jsonResponse(res, 201, { message: 'User registered successfully' })
	} catch (error) {
		jsonResponse(res, 500, { error: 'User already exists or database error' })
	}
}

export const login = async (req, res, body) => {
	const { username, password } = JSON.parse(body)

	if (!username || !password) {
		return jsonResponse(res, 400, {
			error: 'Username and password are required',
		})
	}

	const hashedPassword = hashPassword(password)

	try {
		const result = await client.query(
			'SELECT * FROM users WHERE username = $1 AND password = $2',
			[username, hashedPassword]
		)
		if (result.rows.length > 0) {
			jsonResponse(res, 200, { message: 'Login successful' })
		} else {
			jsonResponse(res, 401, { error: 'Invalid username or password' })
		}
	} catch (error) {
		jsonResponse(res, 500, { error: 'Database error' })
	}
}
