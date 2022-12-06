import { Header } from "./components/Header/Header"
import { List } from "./components/List/List"

import "./global.css"

export function App() {
  return (
    <div>
      <Header />
      <div>
        <main>
          <List />
        </main>
      </div>
    </div>
  )
}