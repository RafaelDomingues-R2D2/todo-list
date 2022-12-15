import { TaskHeader } from "./components/TaskHeader/TaskHeader"
import { TaskBox } from "./components/TaskBox/TaskBox"

import "./global.css"

export function App() {
  return (
    <div>
      <TaskHeader />
      <div>
        <main>
          <TaskBox />
        </main>
      </div>
    </div>
  )
}