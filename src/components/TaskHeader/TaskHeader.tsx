import styles from "./TaskHeader.module.css"

import logo from "../../assets/Logo.svg"

export function TaskHeader(){
    return(
        <header className={styles.header}>
            <img src={logo} alt="Logotipo" />
        </header>
    )
}