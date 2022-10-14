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
const express_1 = __importDefault(require("express"));
const client_1 = require("./util/client");
const lessons_1 = __importDefault(require("./routes/lessons"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
require('dotenv').config();
const privateKey = fs_1.default.existsSync('./cert/key.pem') ? fs_1.default.readFileSync('./cert/key.pem') : undefined;
const certificate = fs_1.default.existsSync('./cert/cert.pem') ? fs_1.default.readFileSync('./cert/cert.pem') : undefined;
const { TOKEN, SYMBOL, PIN } = process.env;
if (!TOKEN || !SYMBOL || !PIN) {
    throw new Error('Missing environment variables');
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const logRequests = process.env.LOG_REQUESTS === 'true' || false;
const creds = { key: privateKey, cert: certificate };
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100 // limit each IP to 100 requests per windowMs
});
http_1.default.createServer(app).listen(Number(port) + 1, () => {
    console.log(`HTTP Server running on port ${Number(port) + 1}`);
});
if (privateKey && certificate) {
    https_1.default.globalAgent.options.ca = require('ssl-root-cas').create();
    https_1.default.createServer(creds, app).listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server listening on port ${port}`);
    }));
}
(0, client_1.initClient)();
app.use(limiter);
app.use('/lessons', lessons_1.default);
if (logRequests)
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
