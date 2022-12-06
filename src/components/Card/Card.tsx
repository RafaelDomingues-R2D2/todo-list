import styles from "./Card.module.css"

import {Trash, Circle, Check} from "phosphor-react"
import { useState } from "react"
import classNames from "classnames"

interface Card {
    id: string
    title: string
    isComplet: boolean
}

interface CardProps {
    card: Card
    onDeleteCard: (card: string) => void
    onUpdateStatusCard: (card: string) => void
}

export function Card({card, onDeleteCard, onUpdateStatusCard}: CardProps){
    const [icon, setIcon] = useState(<Circle size={20} />)

    function handleDeleteCard(){
        onDeleteCard(card.id)
    }

    function handleUpdateStatusCard(){
        onUpdateStatusCard(card.id)

        card.isComplet ? setIcon(<Check  size={13} />) : setIcon(<Circle size={20} />)
    }

    const label = classNames(
        styles.title,
        {
            [styles.crossed] : card.isComplet
        }
    )

    const iconStyle = classNames(
        styles.circle,
        {
            [styles.checkCircle] : card.isComplet
        }
    )

    return (
        <div className={styles.card}>
            <input id="card" type="checkbox"/>
            <span 
                className={iconStyle}
                onMouseDown={handleUpdateStatusCard}
            >
                {icon}
            </span>
            <label
                className={label}
                htmlFor="card"
            >
                {card.title}
            </label>
            <button 
                onClick={handleDeleteCard}>
                <Trash size={20} />
            </button>
        </div>
    )
}