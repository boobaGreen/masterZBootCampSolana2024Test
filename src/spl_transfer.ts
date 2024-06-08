import { Keypair, Connection, PublicKey } from "@solana/web3.js";

import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); // import the wallet con la potenziale chiave privata di firma
const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // Connect to the devnet
const mint = new PublicKey("22p9mLsGFr48tZrtZcuZqQF3BM4t4PoTMmWAPuCJkCpZ"); //   The mint address
const fromAta = new PublicKey("EFBrJnfcVijB3fLa9bq3kaGhGoAinLRpBrwWzKvHZHEc"); // The associated token account address sender

console.log("From: ", fromAta.toBase58());

// Print the balance of the sender before tx
(async () => {
  try {
    console.log(
      "wallet sender balance before tx ",
      await connection.getTokenAccountBalance(fromAta)
    );
  } catch (error) {
    console.error("Error: ", error);
  }
})();

const to = Keypair.generate(); // The receiver keypair generate a new keypair
console.log("To public address wallet destination: ", to.publicKey.toBase58()); // Print the receiver public key

// Print the balance of the receiver
(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to.publicKey
  );

  const toAta = tokenAccount.address; // The associated token account address receiver
  console.log(
    "Associated Token Account wallet destination : ",
    toAta.toBase58()
  ); // Print the associated token account address receiver

  const amount = 10e5; // 1 TOKEN

  await transfer(connection, keypair, fromAta, toAta, keypair, amount); // Transfer 1 TOKEN from the sender to the receiver
  // Print the balance of the receiver
  console.log(
    "destination wallet token : ",
    await connection.getTokenAccountBalance(toAta)
  );
  // Print the balance of the sender
  // Print the balance of the sender before tx
  (async () => {
    try {
      console.log(
        "wallet sender balance after tx ",
        await connection.getTokenAccountBalance(fromAta)
      );
    } catch (error) {
      console.error("Error: ", error);
    }
  })();
  // resume the transfer
  console.log(
    "Transferred",
    amount,
    "from ata 1 : ",
    fromAta.toBase58(),
    "to ata 2",
    toAta.toBase58()
  );
})();
