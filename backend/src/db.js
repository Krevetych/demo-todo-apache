import pg from 'pg'

const { Client } = pg

const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	database: 'todo',
	port: 5432,
})

await client
	.connect()
	.then(() => console.log('Connected to PG'))
	.catch(err => console.error('Connection error', err))

export default client
