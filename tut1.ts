import * as web3 from '@solana/web3.js'
import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey = new PublicKey('AbhiisMbe6FY6khcrNxY1rCgygDonRi9vEkBxC1c59g5')
getBalanceUsingWeb3(publicKey).then(balance => {
    console.log(balance / LAMPORTS_PER_SOL + " SOL");
})

async function getBalanceUsingJSONRPC(address: string): Promise<number> {
    const url = clusterApiUrl('devnet');
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "getBalance",
            "params": [
                address
            ]
        })
    })
    .then(response => response.json())
    .then(json => {
        if (json.error) {
            throw json.error;
        }
        return json; // Return the entire response JSON
    })
    .catch(error => {
        throw error;
    });
}

getBalanceUsingJSONRPC(publicKey.toBase58())
    .then((responseJson) => {
        console.log("Response JSON:", responseJson); // Print the entire response JSON
    })
    .catch(error => {
        console.error("Error:", error);
    });

