"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIV = exports.http = void 0;
const http = {
    baseUrl: 'https://bbs.uestc.edu.cn/mobcent/',
    urlLogin: 'app/web/index.php?r=user/login/',
    urlNewReply: 'app/web/index.php?r=forum/topiclist&pageSize=20',
    urlTodayHot: 'app/web/index.php?r=portal/newslist&moduleId=2&pageSize=10',
    urlNewPost: 'app/web/index.php?r=forum/topiclist&pageSize=20'
};
exports.http = http;
const CLIV = {
    msgHome: 'Choose your next tag',
    msgBottom: 'Choose your next tag',
    msgAfterHome: 'Go Back/Next Page',
    choiceHomeReply: 'Reply',
    choiceHomePost: 'Post',
    choiceHomeHot: 'Hot',
    choiceAfterHomeBack: 'Back',
    choiceAfterHomeNext: 'Next',
    choiceAfterHomePre: 'Pre'
};
exports.CLIV = CLIV;
