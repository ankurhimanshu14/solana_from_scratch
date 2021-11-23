const web3 = require("@solana/web3.js");
const { BN } = require("bn.js");

const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
const programId = new web3.PublicKey("4jwVnZdr8XPrK1tr8HYB1ADvs7U1tehPLyQmbWLj2DJ8");

const key = Uint8Array.from([201,73,51,213,79,88,173,161,18,213,97,234,241,27,224,63,145,
    190,31,171,174,11,194,127,116,224,234,1,130,62,159,143,56,245,215,156,75,123,243,112,
    104,81,166,241,234,100,175,184,18,135,247,198,112,22,80,131,189,197,159,214,43,128,57,228]);

async function main() {
    const signer = web3.Keypair.fromSecretKey(key);

    const data = Buffer.from(Uint8Array.of(0, ...new BN(44).toArray("le", 8)));

    const transaction = new web3.Transaction().add(
        new web3.TransactionInstruction({
            keys: [],
            programId,
            data
        })
    );

    await web3.sendAndConfirmTransaction(connection, transaction, [signer])
    .then(sig => {
        console.log("sig: ", sig);
    })
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });