import React from 'react';
import { DisplayedTasksType, TodoType } from "./Todo";
import { Spin } from "antd"; 

interface TaskCountIndicatorProps {
    displayedTasks: DisplayedTasksType,
    tasks?: TodoType[]
}

export const TaskCountIndicator: React.FC<TaskCountIndicatorProps> = ({ displayedTasks, tasks }) => {
    const getContent = () => {
        switch (displayedTasks) {
            case "All":
            case "Active":
                const itemsLeft = tasks?.filter(item => !item.done).length;
                return `${itemsLeft} items left`;
            case "Complited": 
                const alreadyDone = tasks?.filter(item => item.done).length;
                return `${alreadyDone} already done`;
        }
    } 
    return (
        <div className="task-count-indicator">
            { tasks ? getContent() : <Spin/> }
        </div>
    )
}