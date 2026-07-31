import React from 'react'

const TaskItem = ({title,  category}) => {
  return (
  <div className="task-item">
      <div className="task-left">
        <input type="checkbox" />

        <div>
          <h3>{title}</h3>
          <p>{category}</p>
        </div>
      </div>
    </div>  )
}

export default TaskItem
