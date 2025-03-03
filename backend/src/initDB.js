import client from './db.js'

const createTables = async () => {
	try {
		await client.query(`
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				username VARCHAR(50) UNIQUE NOT NULL,
				password TEXT NOT NULL
			);

			CREATE TABLE IF NOT EXISTS tasks (
				id SERIAL PRIMARY KEY,
				user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
				title TEXT NOT NULL,
				completed BOOLEAN DEFAULT false
			);
		`)

		console.log('Tables created successfully')
	} catch (error) {
		console.error('Error creating tables: ', error)
	} finally {
		await client.end()
	}
}

await createTables()
