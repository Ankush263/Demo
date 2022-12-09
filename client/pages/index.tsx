import React, {useState, useEffect} from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import ABI from "../utils/CustomeERC20.json"
import {ethers} from "ethers"

const Home: NextPage = () => {
  const deployedAddress = "0xDBAb1AA3FB6A08E7d662cc039958A2cF8cE39496"
  const [connected, setConnected] = useState(false)
  const [balance, setBalance] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(0)
  const [sendAddress, setSendAddress] = useState('')

  const addAsset = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const tokenSymbol = "STK"
        const tokenDecimals = 18
        const wasAdded = window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: deployedAddress,
              symbol: tokenSymbol, 
              decimals: tokenDecimals,
            },
          },
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connect = async () => {
    setConnected(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      addAsset()
    } catch (error) {
      console.log(error)
    }
  }

  const Faucet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const abi = ABI.abi;
        const contract = new ethers.Contract(deployedAddress, abi, signer)
        const transaction = await contract.tokenFaucet()
        await transaction.wait()
        alert("You claimed 10 tokens")
      }
    } catch (error) {
      console.log(error)
      alert("Don't be greedy")
    }
  }

  const showBalance = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const abi = ABI.abi;
        const contract = new ethers.Contract(deployedAddress, abi, signer)
        const balance = await contract.showBalance()
        setBalance(balance.toString())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sendToken = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const abi = ABI.abi;
        const contract = new ethers.Contract(deployedAddress, abi, signer)
        console.log(tokenAmount, sendAddress)
        const transaction = await contract.transferToken(sendAddress, tokenAmount)
        await transaction.wait()
        alert("Transaction successfull")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <button disabled={connected} onClick={connect}>Connect Wallet</button>
      <hr />
      <button disabled={!connected} onClick={Faucet}>Faucet</button>
      <span>--------(This faucet only works if you have less then 10 STK Tokens)</span>
      <br />
      <button disabled={!connected} onClick={showBalance}>Show Balance</button>
      <span>Your Balance is: {balance}</span>
      <hr />
      <input 
        type="text" 
        placeholder='enter address' 
        onChange={(e) => setSendAddress(e.target.value)}
        value={sendAddress}
      />
      <br />
      <input 
        type="number" 
        placeholder='enter amount' 
        onChange={(e) => setTokenAmount(Number(e.target.value))}
        value={tokenAmount}
      />
      <br />
      <button disabled={!connected} onClick={sendToken}>Send</button>

    </div>
  )
}

export default Home
