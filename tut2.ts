import { Keypair, Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Connection, clusterApiUrl } from "@solana/web3.js";
import * as fs from 'fs';

const secret = JSON.parse(fs.readFileSync("wallet3.json").toString()) as number[]
const secretKey = Uint8Array.from(secret)
const ownerKeyPair= Keypair.fromSecretKey(secretKey)

// const ownerKeyPair = Keypair.generate();
// const publicKey = ownerKeyPair.publicKey;
console.log("this is public key", ownerKeyPair.publicKey.toBase58());

// ownerKeyPair.secretKey;

console.log("this is secrect key pair",  ownerKeyPair.secretKey.toString())




async function main() {
    const transaction = new Transaction()

    const recipient = new PublicKey("AbhiisMbe6FY6khcrNxY1rCgygDonRi9vEkBxC1c59g5")

    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: ownerKeyPair.publicKey,
        toPubkey: recipient,
        lamports: LAMPORTS_PER_SOL * 0.1
    })

    transaction.add(sendSolInstruction)

    const connection = new Connection(clusterApiUrl("devnet"))

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [ownerKeyPair]
    )
    console.log( "this is signature",signature);


}
main();