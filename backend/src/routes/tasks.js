import client from '../db.js'
import { jsonResponse } from '../utils/response.js'

export const getTasks = async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM tasks')
		jsonResponse(res, 200, result.rows)
	} catch (error) {
		jsonResponse(res, 500, { error: 'Database error' })
	}
}

export const createTask = async (req, res, body) => {
	const { user_id, title } = JSON.parse(body)
	if (!user_id || !title) {
		return jsonResponse(res, 400, { error: 'user_id and title are required' })
	}

	try {
		await client.query('INSERT INTO tasks (user_id, title) VALUES ($1, $2)', [
			user_id,
			title,
		])
		jsonResponse(res, 201, { message: 'Task created successfully' })
	} catch (error) {
		jsonResponse(res, 500, { error: 'Database error' })
	}
}

export const updateTask = async (req, res, body) => {
	const { id, title, completed } = JSON.parse(body)

	if (!id) {
		return jsonResponse(res, 400, { error: 'Task ID is required' })
	}

	try {
		await client.query(
			'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3',
			[title, completed, id]
		)
		jsonResponse(res, 200, { message: 'Task updated successfully' })
	} catch (error) {
		jsonResponse(res, 500, { error: 'Database error' })
	}
}

export const deleteTask = async (req, res, body) => {
	const { id } = JSON.parse(body)

	if (!id) {
		return jsonResponse(res, 400, { error: 'Task ID is required' })
	}

	try {
		await client.query('DELETE FROM tasks WHERE id = $1', [id])
		jsonResponse(res, 200, { message: 'Task delete successfully' })
	} catch (error) {
		jsonResponse(res, 500, { error: 'Database error' })
	}
}
