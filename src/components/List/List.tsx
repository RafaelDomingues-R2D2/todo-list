import { v4 as uuidv4 } from "uuid" 

import { Card } from "../Card/Card"

import { PlusCircle } from "phosphor-react"

import { ChangeEvent, FormEvent, useState } from "react"

import clipboard from "../../assets/Clipboard.svg"

import styles from "./List.module.css"

export function List(){
    const [cards, setCards] = useState([])

    const [newCardInput, setNewCardInput] = useState("")

    const [completedCards, setCompletedCards] = useState(0)

    function handleCreateNewCard(event: FormEvent){
        event.preventDefault()

        const newCard = {
            "id": uuidv4(),
            "title": newCardInput,
            "isComplet": false 
        }

        setCards([...cards, newCard])

        setNewCardInput("")
    }

    function handleNewCardChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity("")
        
        setNewCardInput(event.target.value)
    }

    function deleteCard(cardToDelete: string){
        const cardWithoutDeleteOne = cards.filter(card => {
            return card.id !== cardToDelete
        })

        setCards(cardWithoutDeleteOne)

        checkStatusCards(cardWithoutDeleteOne)
    }

    function updateStatusCard(cardToCompleted: string){
        cards.forEach(card => {
            if(cardToCompleted === card.id){
                card.isComplet = card.isComplet ? false : true
            }
        })

        checkStatusCards(cards)
    }

    function checkStatusCards(cards){
        const listCompletedCards = cards.filter(card => {
            return card.isComplet === true
        })

        setCompletedCards(listCompletedCards.length)
    }


    const totalCards = cards.length

    return (
        <div className={styles.list}>
            <form onSubmit={handleCreateNewCard} className={styles.newTask}>
                <input 
                    type="text"
                    placeholder={"Adicione uma nova tarefa"}
                    value={newCardInput}
                    onChange={handleNewCardChange}
                    required
                />
                <button type="submit">
                    Criar <PlusCircle size={20}/>
                </button>
            </form>
            <header className={styles.header}>
                <strong>Tarefas criadas <span>{totalCards}</span></strong>
                <strong>Concluídas <span>{completedCards !== 0 ? `${completedCards} de ${totalCards}`: 0}</span></strong>   
            </header>
            {
                totalCards !== 0 
                ?
                    <div className={styles.listTask}>
                        <div className={styles.listBox}>
                            {cards.map(card => {
                                return (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        onDeleteCard={deleteCard}
                                        onUpdateStatusCard={updateStatusCard}
                                    />
                                )
                            })}
                        </div>
                    </div>
                :
                    <div className={styles.listNoneTask}>
                        <img src={clipboard} alt="Não tem tarefas"/>
                        <p>Você ainda não tem tarefas cadastradas</p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
            }
        </div>
    )
}