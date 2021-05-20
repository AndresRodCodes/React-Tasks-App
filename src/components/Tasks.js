import React from 'react'
import Task from './Task.js'

const Tasks = (props) => {
	return (
        <div>
            {props.tasks.map((task) => (
			<Task key={task.id} task={task}/>
			))}
        </div>
    )
}

export default Tasks