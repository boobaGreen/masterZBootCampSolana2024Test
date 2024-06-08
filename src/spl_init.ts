import { Keypair, Connection } from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "../wallet.json";

// questo metodo ci permette di creare una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
// e' un istanza con proprietà e metodi che ci permettono di firmare le transazioni nel nostro ese,pio wallet.json contiene la chiave privata del nostro wallet
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// creiamo una nuova connessione con il cluster di devnet di Solana
// la connessione ci permette di interagire con la blockchain di Solana
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// CREATING A NEW MINT
// funzione asincrona che ci permette di creare una nuova mint
// prende come argomenti :
// la connessione,
// la chiave PRIVATA del wallet che deve firmare la transazione,
// la chiave PUBBLICA del wallet che deve firmare la transazione,
// l'autorità di freeze,
// il numero di decimali
(async () => {
  const mint = await createMint(
    connection, // connessione
    keypair, // chiave privata
    keypair.publicKey, // chiave pubblica
    null, // autorità di freeze
    6 // numero di decimali
  );

  // // stampiamo l'indirizzo della mint
  console.log("Mint Address:", mint.toBase58());
})();
