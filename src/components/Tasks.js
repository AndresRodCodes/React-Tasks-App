import React from 'react'

const tasks = [
    {
		id: 1,
		text: 'Doctors Appointment',
		day: 'Feb 5th at 2:30pm',
		reminder: true,
    },
	{
		id: 2,
		text: 'Meeting at School',
		day: 'Feb 6th at 1:30pm',
		reminder: true,
	},
	{
		id: 3,
		text: 'Food Shopping',
		day: 'Feb 7th at 2:30pm',
		reminder: false,
	}
];

const Tasks = () => {
    return (
        <div>
            {tasks.map((task) => (<h3>{task.text}</h3>))}
			<h2>Hello</h2>
        </div>
    )
}

export default Tasks