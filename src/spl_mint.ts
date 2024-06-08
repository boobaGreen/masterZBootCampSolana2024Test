import { Keypair, Connection, PublicKey } from "@solana/web3.js";

import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); //  import the wallet con la potenziale chiave privata di firma
const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // Connect to the devnet
const mint = new PublicKey("22p9mLsGFr48tZrtZcuZqQF3BM4t4PoTMmWAPuCJkCpZ"); // The mint address

(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, // connection
    keypair, // keypair of the wallet chi paga la transazione
    mint, // mint address pubblica
    keypair.publicKey // owner of the account ma come public key
  );

  const ata = tokenAccount.address; // associated token account address
  console.log("Associated Token Account: ", ata.toBase58()); // print the associated token account address

  const amount = 20e6; // 20 TOKEN

  // mint 10 SOL to the associated token account parametri: connection, keypair, mint, ata, owner, amount
  await mintTo(connection, keypair, mint, ata, keypair.publicKey, amount); // mint 20  TOKEN  to the associated token account

  console.log("Minted", amount, "to", ata.toBase58()); // print the minted amount
})();
