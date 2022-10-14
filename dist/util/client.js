"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initClient = exports.client = void 0;
const vulcan_api_js_1 = require("vulcan-api-js");
const fs_1 = __importDefault(require("fs"));
let isInitialized = false;
const initClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const { TOKEN, SYMBOL, PIN } = process.env;
    if (exports.client)
        return console.warn('Client already initialized');
    if (!fs_1.default.existsSync('keystore.json')) {
        const keystore = new vulcan_api_js_1.Keystore();
        yield keystore.init().then(() => {
            keystore.dumpToJsonFile("keystore.json");
        });
    }
    const keystore = new vulcan_api_js_1.Keystore();
    keystore.loadFromJsonFile("keystore.json");
    if (!fs_1.default.existsSync('account.json')) {
        const account = yield (0, vulcan_api_js_1.registerAccount)(keystore, TOKEN, SYMBOL, PIN);
        vulcan_api_js_1.AccountTools.dumpToJsonFile(account, "account.json");
    }
    exports.client = new vulcan_api_js_1.VulcanHebe(keystore, vulcan_api_js_1.AccountTools.loadFromJsonFile("account.json"));
    yield exports.client.selectStudent();
    isInitialized = true;
    console.log('Server initialized');
});
exports.initClient = initClient;
