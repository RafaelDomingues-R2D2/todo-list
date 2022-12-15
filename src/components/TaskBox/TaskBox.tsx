import { v4 as uuidv4 } from "uuid" 

import { PlusCircle } from "phosphor-react"

import { ChangeEvent, FormEvent, useState } from "react"

import styles from "./TaskBox.module.css"
import { TaskList } from "../TaskList/TaskList"

export function TaskBox(){
    const [tasks, setTasks] = useState([])

    const [newTaskInput, setNewTaskInput] = useState("")

    const [completedTasks, setCompletedTasks] = useState(0)

    function handleCreateNewTask(event: FormEvent){
        event.preventDefault()

        const newTask = {
            "id": uuidv4(),
            "title": newTaskInput,
            "isComplet": false 
        }

        setTasks([...tasks, newTask])

        setNewTaskInput("")
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("")
        
        setNewTaskInput(event.target.value)
    }

    function deleteTask(taskToDelete: string){
        const taskWithoutDeleteOne = tasks.filter(task => {
            return task.id !== taskToDelete
        })

        setTasks(taskWithoutDeleteOne)

        checkStatusTasks(taskWithoutDeleteOne)
    }

    function updateStatusTask(taskToCompleted: string){
        tasks.forEach(task => {
            if(taskToCompleted === task.id){
                task.isComplet = task.isComplet ? false : true
            }
        })

        checkStatusTasks(tasks)
    }

    function checkStatusTasks(tasks){
        const listCompletedTasks = tasks.filter(task => {
            return task.isComplet === true
        })

        setCompletedTasks(listCompletedTasks.length)
    }

    const totalTasks = tasks.length

    return (
        <main className={styles.list}>
            <div className={styles.newTask}>
                <form onSubmit={handleCreateNewTask} className={styles.form}>
                    <input 
                        type="text"
                        placeholder={"Adicione uma nova tarefa"}
                        value={newTaskInput}
                        onChange={handleNewTaskChange}
                        required
                    />
                    <button type="submit">
                        Criar <PlusCircle size={20}/>
                    </button>
                </form>
            </div>
            <div className={styles.listTaskCounter}>
                <header className={styles.header}>
                    <div className={styles.taskCounter}>
                        <strong>Tarefas criadas </strong>
                        <span>{totalTasks}</span>
                    </div>
                    <div className={styles.taskCounter}>
                        <strong>Concluídas </strong>
                        <span>{completedTasks !== 0 ? `${completedTasks} de ${totalTasks}`: 0}</span>
                    </div>
                </header>
            </div>

            <TaskList 
                tasks={tasks}
                deleteTask={deleteTask}
                updateStatusTask={updateStatusTask}
            />
        </main>
    )
}