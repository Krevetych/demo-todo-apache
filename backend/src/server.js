import http from 'http'
import url from 'url'
import { register, login } from './routes/auth.js'
import { createTask, deleteTask, getTasks, updateTask } from './routes/tasks.js'
import { jsonResponse } from './utils/response.js'

const PORT = 8080

const setCors = res => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const handleRequest = (req, res) => {
	const parseUrl = url.parse(req.url, true)
	const { pathname } = parseUrl
	setCors(res)

	if (req.method === 'OPTIONS') {
		res.writeHead(204)
		return res.end()
	}

	if (req.method === 'POST' && pathname === '/register') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => register(req, res, body))
	} else if (req.method === 'POST' && pathname === '/login') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => login(req, res, body))
	} else if (req.method === 'GET' && pathname === '/tasks') {
		getTasks(req, res)
	} else if (req.method === 'POST' && pathname === '/tasks') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => createTask(req, res, body))
	} else if (req.method === 'PUT' && pathname === '/tasks') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => updateTask(req, res, body))
	} else if (req.method === 'DELETE' && pathname === '/tasks') {
		let body = ''
		req.on('data', chunk => (body += chunk.toString()))
		req.on('end', () => deleteTask(req, res, body))
	} else {
		jsonResponse(res, 404, { error: 'Route not found' })
	}
}

const server = http.createServer(handleRequest)

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
