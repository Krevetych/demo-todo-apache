import pg from 'pg'

const { Client } = pg

const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: '172.18.0.2',
	database: 'todo',
})

await client
	.connect()
	.then(() => console.log('Connected to PG'))
	.catch(err => console.error('Connection error', err))

export default client
