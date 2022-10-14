import { Keystore, AccountTools, registerAccount, VulcanHebe } from 'vulcan-api-js';
import fs from 'fs';

export let client: VulcanHebe;

let isInitialized = false;
const { TOKEN, SYMBOL, PIN } = process.env;
export const initClient = async () => {
    if(client) return console.warn('Client already initialized');
    if(!fs.existsSync('keystore.json')) {
        const keystore = new Keystore();
    
    keystore.init().then(() => {
        keystore.dumpToJsonFile("keystore.json");
    });
    }
    const keystore = new Keystore();
    keystore.loadFromJsonFile("keystore.json");
    if(!fs.existsSync('account.json')) {
    registerAccount(keystore, TOKEN!, SYMBOL!, PIN!).then(account => {
        AccountTools.dumpToJsonFile(account, "account.json");
    });
    }
    client = new VulcanHebe(keystore, AccountTools.loadFromJsonFile("account.json"));
    await client.selectStudent();
    isInitialized = true;
    console.log('Client initialized');
};