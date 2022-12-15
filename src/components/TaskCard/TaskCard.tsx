import styles from "./TaskCard.module.css"

import {Trash, Circle, Check} from "phosphor-react"
import { useState } from "react"
import classNames from "classnames"

export interface TaskProps {
    id: string
    title: string
    isComplet: boolean
}

interface TaskCardProps {
    task: TaskProps
    onDeleteTask: (task: string) => void
    onUpdateStatusTask: (task: string) => void
}

export function TaskCard({ task, onDeleteTask, onUpdateStatusTask }: TaskCardProps){
    const [icon, setIcon] = useState(<Circle size={20} />)

    function handleDeleteTask(){
        onDeleteTask(task.id)
    }

    function handleUpdateStatusTask(){
        onUpdateStatusTask(task.id)

        task.isComplet ? setIcon(<Check  size={13} />) : setIcon(<Circle size={20} />)
    }

    const label = classNames(
        styles.title,
        {
            [styles.crossed] : task.isComplet
        }
    )

    const iconStyle = classNames(
        styles.circle,
        {
            [styles.checkCircle] : task.isComplet
        }
    )

    return (
        <main className={styles.list}>
            <div className={styles.card}>
                <input id="card" type="checkbox"/>
                <span 
                    className={iconStyle}
                    onMouseDown={handleUpdateStatusTask}
                >
                    {icon}
                </span>
                <div className={styles.titleBox}>
                    <label
                        className={label}
                        htmlFor="card"
                    >
                        {task.title}
                    </label>
                </div>
                <button 
                    onClick={handleDeleteTask}>
                    <Trash size={20} />
                </button>
            </div>
        </main>
    )
}