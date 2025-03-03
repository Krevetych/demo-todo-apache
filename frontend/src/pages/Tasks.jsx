import { useState, useEffect } from 'react'

export default function Tasks() {
	const [tasks, setTasks] = useState([])
	const [newTask, setNewTask] = useState('')
	const [editingTask, setEditingTask] = useState(null)
	const [editText, setEditText] = useState('')

	useEffect(() => {
		fetch('http://localhost:8080/tasks')
			.then(res => res.json())
			.then(data => setTasks(data))
	}, [])

	const addTask = async () => {
		const res = await fetch('http://localhost:8080/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user_id: 1, title: newTask }),
		})

		if (res.ok) {
			setNewTask('')
			refreshTasks()
		}
	}

	const deleteTask = async id => {
		const res = await fetch('http://localhost:8080/tasks', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
		})

		if (res.ok) {
			refreshTasks()
		}
	}

	const startEditing = task => {
		setEditingTask(task.id)
		setEditText(task.title)
	}

	const updateTask = async id => {
		const res = await fetch('http://localhost:8080/tasks', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, title: editText }),
		})

		if (res.ok) {
			setEditingTask(null)
			refreshTasks()
		}
	}

	const refreshTasks = () => {
		fetch('http://localhost:8080/tasks')
			.then(res => res.json())
			.then(data => setTasks(data))
	}

	return (
		<div className='container'>
			<h2 className='title'>Tasks</h2>
			<ul className='task-list'>
				{tasks.map(task => (
					<li key={task.id} className='task-item'>
						{editingTask === task.id ? (
							<>
								<input
									type='text'
									value={editText}
									onChange={e => setEditText(e.target.value)}
								/>
								<div
									onClick={() => updateTask(task.id)}
									className='save-button'
								>
									Save
								</div>
							</>
						) : (
							<>
								<div>{task.title}</div>
								<div className='action-buttons'>
									<div
										onClick={() => startEditing(task)}
										className='button-edit'
									>
										✏️
									</div>
									<div
										onClick={() => deleteTask(task.id)}
										className='button-red'
									>
										🗑️
									</div>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
			<input
				type='text'
				value={newTask}
				onChange={e => setNewTask(e.target.value)}
			/>
			<button onClick={addTask}>Add Task</button>
		</div>
	)
}
