import { Keystore, AccountTools, registerAccount, VulcanHebe } from 'vulcan-api-js';
import fs from 'fs';

export let client: VulcanHebe;

let isInitialized = false;
export const initClient = async () => {
    const { TOKEN, SYMBOL, PIN } = process.env;
    if(client) return console.warn('Client already initialized');
    if(!fs.existsSync('keystore.json')) {
        const keystore = new Keystore();
    
    await keystore.init().then(() => {
        keystore.dumpToJsonFile("keystore.json");
    });
    }
    const keystore = new Keystore();
    keystore.loadFromJsonFile("keystore.json");
    if(!fs.existsSync('account.json')) {
    const account = await registerAccount(keystore, TOKEN!, SYMBOL!, PIN!);
    AccountTools.dumpToJsonFile(account, "account.json");
    }
    client = new VulcanHebe(keystore, AccountTools.loadFromJsonFile("account.json"));
    await client.selectStudent();
    isInitialized = true;
    console.log('Client initialized');
};