
const http = {
    baseUrl:'https://bbs.uestc.edu.cn/mobcent/',
    urlLogin: 'app/web/index.php?r=user/login/',
    urlNewReply: 'app/web/index.php?r=forum/topiclist&pageSize=20',
    urlTodayHot: 'app/web/index.php?r=portal/newslist&moduleId=2&pageSize=10',
    urlNewPost: 'app/web/index.php?r=forum/topiclist&pageSize=20'
}

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
}

export {
    http,
    CLIV
}