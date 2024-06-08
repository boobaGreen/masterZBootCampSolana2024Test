import { Keypair } from "@solana/web3.js";

// Andiamo a generare una nuova Keypair
const keypair = Keypair.generate();

// Ora Console.logghiamo l'indirizzo del wallet e la chiave privata in modo da poterli salvare in un file
console.log(
  `Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${
    keypair.secretKey
  }]`
);

/* 
    
    Siccome abbiamo settato il nostro package.json con uno script che esegue il comando "ts-node", possiamo eseguire il nostro script con il comando "yarn keygen" 

    Salva la chiave privata in un file chiamato "test.json" e ricordati di non condividerla con nessuno e non caricarla su GitHub (usare .gitignore)
    
*/
