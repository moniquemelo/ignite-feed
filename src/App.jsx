import { Post } from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

import './global.css'
import './App.module.css'

import styles from './App.module.css'

export function App() {

  return (
    <div className="App">
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>   
          <Post />   
          <Post />       
        </main>
      </div>
    </div>
  )
}


