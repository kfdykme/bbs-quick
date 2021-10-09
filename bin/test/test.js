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
const index_1 = require("../src/index");
const md5_1 = __importDefault(require("md5"));
const KnictBBSContants_1 = require("../src/knict/KnictBBSContants");
function appHash() {
    const KEY_APP_BY_ME = "appbyme_key";
    let time = new Date().getTime().toString();
    let authkey = KEY_APP_BY_ME;
    let authString = time.substring(0, 5) + authkey;
    let hashkey = md5_1.default(authString);
    let appHashValue = hashkey.substring(8, 16);
    return appHashValue;
}
;
let user = {};
let currentPage = 1;
let currentTag = '';
const handleHomeTag = () => {
    return Promise.resolve(0).then(() => {
        if (currentTag === KnictBBSContants_1.CLIV.choiceHomeReply) {
            return index_1.BBSService.newReply(currentPage, appHash(), user.secret, user.token);
        }
        else if (currentTag === KnictBBSContants_1.CLIV.choiceHomePost) {
            return index_1.BBSService.newPost(currentPage, appHash(), user.secret, user.token);
        }
        else if (currentTag === KnictBBSContants_1.CLIV.choiceHomeHot) {
            return index_1.BBSService.getTodayHot(currentPage, appHash(), user.secret, user.token);
        }
        else {
            return Promise.resolve(new Error('currentTag error: ' + currentTag));
        }
    })
        .then(res => res.data)
        .then((data) => {
        console.info(data);
        const showData = data.list.map((i) => {
            return {
                title: i.title
            };
        });
        console.info({
            currentPage,
            currentTag,
            showData
        });
        return index_1.knictCliService.afterHomeTag();
    })
        .then(res => res.afterHomeTag)
        .then((choice) => {
        if (choice === KnictBBSContants_1.CLIV.choiceAfterHomeBack) {
            currentPage = 1;
            return home();
        }
        else if (choice === KnictBBSContants_1.CLIV.choiceAfterHomeNext) {
            currentPage++;
            return handleHomeTag();
        }
        else if (choice === KnictBBSContants_1.CLIV.choiceAfterHomePre) {
            if (currentPage <= 1) {
                return index_1.knictCliService.afterHomeTag();
            }
            else {
                currentPage--;
                return handleHomeTag();
            }
        }
    });
};
const nextHome = () => {
    return Promise.resolve(0).then(() => {
    });
};
const home = () => {
    return Promise.resolve(0).then(() => {
        currentTag = '';
        return index_1.knictCliService.homeTag();
    })
        .then((res) => {
        const { homeTag } = res;
        currentTag = homeTag;
        return handleHomeTag();
    })
        .catch((res) => {
        const status = res && res.response && res.response.status;
        console.error('home', status || res);
        return home();
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = yield index_1.knictCliService.login('', '');
    // Knict.builder(new FetchClientBuilder())
    // Knict.builder(new FetchClientBuilder().baseUrl('https://bbs.uestc.edu.cn/mobcent/'))
    index_1.BBSService.login(index_1.LOGINTYPE.login, username, password)
        .then((res) => {
        return res.data;
    })
        .then((data) => {
        user = data;
        return home();
    });
});
main();
