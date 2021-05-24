import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

	const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks()
			setTasks(tasksFromServer)
		}
		
		getTasks()

	}, [])

	// Fetch Tasks
	const fetchTasks = async () => {
		const result = await fetch('http://localhost:5000/tasks')
		const data = await result.json()

		return data
	}

	// Fetch Task
	const fetchTask = async (id) => {
		const result = await fetch(`http://localhost:5000/tasks/${id}`)
		const data = await result.json()

		return data
	}

	// Add new Task
	const addTask = async (task) => {
		const result = await fetch('http://localhost:5000/tasks',
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json', 
				},
				body: JSON.stringify(task),
			})
		
		const data = await result.json()

		setTasks([...tasks, data])

		// const id = Math.floor(Math.random() * 10000) + 1
		// const newTask = {id, ...task}
		// setTasks([...tasks, newTask])
	}

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE',})

		setTasks(tasks.filter((task) => task.id !== id ))
	}

	// Toggle the boolean reminder
	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id)
		const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

		const result = await fetch(`http://localhost:5000/tasks/${id}`,
			{
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(updatedTask)
			})

			const data = await result.json()

			setTasks(...tasks, data)

		setTasks(
			tasks.map((task) => 
				task.id === id ? {...task, reminder: 
					data.reminder } : task)
		)
	}

    return (
        <div className='container'>
            <Header 
				title='Tasker' 
				onAdd={() => setShowAddTask(!showAddTask)}
				showAdd={showAddTask}
			/>

			{showAddTask && <AddTask onAddTask={addTask}/>}
			
            {tasks.length > 0 
				? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
				: 'No Tasks To Show'}
        </div>
    )
}

export default App