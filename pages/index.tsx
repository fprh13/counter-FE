import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const myAddress = useAddress();
  const contractAddress = '0x55267045Ad5C2581386F33b0533e062362aAE280';
  const { contract } = useContract(contractAddress);
  const [counter, setCounter] = useState<string | undefined>();

  async function getCounter() {
    if (!contract) return;
    const counter = await contract.call('getCounter');
    setCounter(counter.toString());
  }
  getCounter();

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>My Counter DApp</h1>
        <p className={styles.description}>
          Contract address: {contractAddress} <br />
          Your address: {myAddress}
        </p>
        <h2 className={styles.title}>{counter}</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call('decrementCounter')}
            >
              <h1>-</h1>
              <p>Decrease</p>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh</h1>
            </Web3Button>
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call('incrementCounter')}
            >
              <h1>+</h1>
              <p>Increase</p>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
