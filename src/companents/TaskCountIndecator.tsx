import React from 'react';
import { DisplayedTasksType, TodoType } from "./Todo";
import { Spin } from "antd"; 

interface TaskCountIndicatorProps {
    displayedTasks: DisplayedTasksType,
    todos?: TodoType[]
}

export const TaskCountIndicator: React.FC<TaskCountIndicatorProps> = ({ displayedTasks, todos }) => {
    const getContent = () => {
        let content;
        switch (displayedTasks) {
            case "All":
            case "Active":
                content = `${todos?.filter(item => !item.done).length} items left`;
                break;
            case "Complited": 
                content = `${todos?.filter(item => item.done).length} already done`;
                break;
        }
        return <span data-testid="countIndicator">{content}</span>
    } 
    return (
        <div className="task-count-indicator">
            { todos ? getContent() : <Spin/> }
        </div>
    )
}