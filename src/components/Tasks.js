import React from 'react'

const Tasks = (props) => {
	return (
        <div>
            {props.tasks.map((task) => (<h3>{task.text}</h3>))}
        </div>
    )
}

export default Tasks