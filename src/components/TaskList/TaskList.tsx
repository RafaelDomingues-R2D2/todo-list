import styles from "./TaskList.module.css"

import { TaskCard } from "../TaskCard/TaskCard"

import clipboard from "../../assets/Clipboard.svg"

export function TaskList({ tasks, deleteTask, updateStatusTask }){
    if(tasks.length == 0 ){
        return (
            <div className={styles.listNoneTask}>
            <img src={clipboard} alt="Não tem tarefas"/>
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
        )
    }
    return (
        <div className={styles.listTask}>
            <div className={styles.listBox}>
                {tasks.map(task => {
                    return (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDeleteTask={deleteTask}
                            onUpdateStatusTask={updateStatusTask}
                        />
                    )
                })}
            </div>
        </div>
    )
}