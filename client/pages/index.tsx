import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import App from './components/App'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <App />
    </div>
  )
}

export default Home
