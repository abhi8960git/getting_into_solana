import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from "@solana/web3.js"
const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState(false)

  const addressSubmittedHandler = (address: string) => {
    setAddress(address);
    const key = new Web3.PublicKey(address);
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    connection.getAccountInfo(key).then((e)=>{
      setIsExecutable(e!.executable)
    })
    connection.getBalance(key).then((balance) => {
      setBalance(balance / Web3.LAMPORTS_PER_SOL)
    })
  }



  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable: ${isExecutable ? "YEP":"NOPE"} `}</p>
      </header>
    </div>
  )
}

export default Home
