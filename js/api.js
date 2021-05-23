/*
 * @Description: 接口
 * @Author: 林俊丞
 * @Date: 2021-04-18 23:07:35
 * @LastEditTime: 2021-05-14 18:09:33
 * @LastEditors: 林俊丞
 */

axios.defaults.baseURL = 'http://47.100.42.144:3389'; //全局url
axios.interceptors.request.use(config => {
    show('.loading')()
    return config
})
axios.interceptors.response.use(config => {
    hide('.loading')()
    return config
})
/**
 * @description: 登录
 * @param  {*}
 * @return {*}
 */
function inLogin() {
    let loginFace = document.querySelector('.loginFace');
    let valId = loginFace.querySelector('.tewIpt');
    let valPsd = loginFace.querySelector('#codeIpt2');
    axios({
        method: 'post',
        url: '/user/login',
        data: {
            "username": valId.value,
            "password": valPsd.value
        }
    }).then((res) => {
        loginSuccess(res);
        page = 1;
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 登录成功的回调
 * @param  {*}
 * @return {*}
 * @param {*} res 返回的数据
 */
function loginSuccess(res) {
    let data = res.data.data;
    let body = document.querySelector('body');
    let mainPageAct = document.querySelector('#mainPageAct');
    userId = data.userId;
    myUserId = data.userId;
    if (data.message != '登录失败') {
        body.className = '';
        mainPageAct.innerHTML = '';
        hide('.loginFace')();
        hide('.loginBtn')();
        hide('.loginBox')();
        show('#myImg')();
        show('#myLove')();
        myInfo(userId);
        getArticle(userId, 1);
    } else {
        let Lis = document.createElement('li');
        let tipsList = document.querySelector('#tipsList');
        Lis.innerHTML = '登录失败请重试';
        tipsList.insertBefore(Lis, tipsList.children[0]);
        setInterval(() => {
            Lis.remove();
        }, 2000)
    }
}

/**
 * @description: 退出登录
 * @param  {*}
 * @return {*}
 */
function out() {
    let userIdO = userId; //存id的临时变量
    axios({
        method: 'post',
        url: '/user/logout',
        data: {
            "userId": userIdO,
        }
    }).then((result) => {
        successOut();
        //默认空id
        page = 1;
        getArticle(91, 1) //退出登录后不能有空白，所以应该会有空白账号
    }).catch((err) => {
        alert(err)
    });
}
/**
 * @description: 退出登录成功的回调
 * @param  {*}
 * @return {*}
 */
function successOut() {
    hide('#myImg')();
    hide('#myLove')();
    show('.loginBtn')();
    show('.loginBox')();
    removeCookie();
    homePage();
    let mainPageAct = document.querySelector('#mainPageAct');
    mainPageAct.innerHTML = '';
}
/**
 * @description: 查看用户信息
 * @param  {*}
 * @return {*}
 * @param {*} userId 用户id
 */
function myInfo(userId) {
    axios({
        method: 'get',
        url: '/user/getUserInfo',
        params: {
            "userId": userId
        }
    }).then((res) => {
        let result = res.data;
        successInfo(result.data);
    }).catch((err) => {
        console.log(err);
    })
}
/**
 * @description: 查询成功的回调
 * @param  {*}
 * @return {*}
 * @param {*} res
 */
function successInfo(res) {
    console.log(res);
    console.log(userId);
    let myImg = document.querySelectorAll('.allHead');
    let userName = document.querySelector('.userName');
    let work = document.querySelector('.work');
    let editName = document.querySelector('#editName');
    let editInfo = document.querySelector('#editInfo');
    console.log(res.avatar);
    for (let i = 0; i < myImg.length; i++) {
        myImg[i].src = 'http://47.100.42.144:3389/' + res.avatar;
    }
    editName.value = res.nickname;
    editInfo.value = res.introduction;
    userName.innerHTML = res.nickname;
    work.innerHTML = res.introduction;
    setCookie(userId);
}
/**
 * @description: 写文章
 * @param  {*}
 * @return {*}
 * @param {*} userId 用户id
 * @param {*} title 文章标题
 * @param {*} content 文章内容
 */
function writeIn(userId, title, content) {
    let titleIpt = document.querySelector('.titleIpt');
    let writeContent = document.querySelector('.writeTex');
    axios({
        method: 'post',
        url: '/article/writeArticle',
        data: {
            "userId": userId,
            "title": title,
            "content": content
        }
    }).then((res) => {
        //返回首页，清空内容区
        titleIpt.value = '';
        writeContent.value = '';
        homePage();
        console.log(res);
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 获取首页的文章
 * @param  {*}
 * @return {*}
 * @param {*} userId id
 * @param {*} page 第几页页面
 */
function getArticle(userId, page) {
    axios({
        method: 'get',
        url: '/article/getArticle',
        params: {
            "userId": userId,
            "page": page
        }
    }).then((res) => {
        let result = res.data;
        successPage(result.data)
    }).catch((err) => {
        console.log(err);
    })
}
/**
 * @description: 成功加载的回调
 * @param  {*}
 * @return {*}
 * @param {*} res 返回数据
 */
function successPage(res) {
    for (let i = 0; i < res.length; i++) {
        spliceAll('#mainPageAct', res[i])
    }
}
/**
 * @description: 获取自己的文章列表
 * @param  {*}
 * @return {*}
 * @param {*} userId 用户id
 */
function getMyWrite(userId) {
    axios({
        method: 'get',
        url: '/user/getUserWriteArticles',
        params: {
            "userId": userId,
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '该用户暂无文章') {
            getOk(result.data);
            moreShow();
        } else {
            let contentAct1 = document.querySelector('#contentAct1');
            contentAct1.innerHTML = `<div class="contentMap" id="contentMap1">
    <div class="noneContent">列表为空</div>
</div>`
            show('#contentMap1')();
            let tipBox1 = document.querySelector('#tipBox1');
            tipBox1.style.display = 'flex';
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 获取文章成功的回调
 * @param  {*}
 * @return {*}
 * @param {*} res 返回数据
 */
function getOk(res) {
    let data = res;
    let contentAct1 = document.querySelector('#contentAct1');
    contentAct1.innerHTML = '';
    if (data != '') {
        contentAct1.innerHTML = `<div class="contentMap" id="contentMap1">
        <div class="noneContent">列表为空</div>
    </div>`
        hide('#tipBox1')();
        hide('#contentMap1')();
    }
    //改成了反向输出
    for (let i = data.length - 1; i >= 0; i--) {
        spliceData(data[i]);
    }

}
/**
 * @description: 获取我的点赞
 * @param  {*}
 * @return {*}
 * @param {*} userId
 */
function getMyLove(userId) {
    axios({
        method: 'get',
        url: '/user/getUserLikeArticles',
        params: {
            "userId": userId,
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '暂无点赞文章') {
            loveOk(result.data);
        } else {
            let loveNum = document.querySelector('#loveNum');
            let count1 = document.querySelector('#count1');
            loveNum.innerHTML = 0;
            count1.innerHTML = 0;
            let contentAct2 = document.querySelector('#contentAct2');
            contentAct2.innerHTML = `<div class="contentMap" id="contentMap2">
        <div class="noneContent">列表为空</div>
    </div>`;
            show('#contentMap2')();
            let tipBox2 = document.querySelector('#tipBox2');
            tipBox2.style.display = 'flex';
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 我的点赞成功回调
 * @param  {*}
 * @return {*}
 * @param {*} res 数组
 */
function loveOk(res) {
    let loveNum = document.querySelector('#loveNum');
    let count1 = document.querySelector('#count1');
    loveNum.innerHTML = res.length;
    count1.innerHTML = res.length;
    let contentAct2 = document.querySelector('#contentAct2');
    if (res != '') {
        contentAct2.innerHTML = `<div class="contentMap" id="contentMap2">
        <div class="noneContent">列表为空</div>
    </div>`;
        hide('#tipBox2')();
        hide('#contentMap2')();
    }
    for (let i = res.length - 1; i >= 0; i--) {
        spliceMy('#contentAct2', res[i]);
    }
}

/**
 * @description: 三个点删除
 * @param  {*}
 * @return {*}
 */
function moreShow() {
    let moreIcon = document.querySelectorAll('#moreIcon');
    let threePotShow = document.querySelectorAll('#threePotShow');
    for (let i = 0; i < moreIcon.length; i++) {
        moreIcon[i].onclick = function (e) {
            e.stopPropagation();
            threePotShow[i].style.display = 'block';
        }
    }
    let delateIcon = document.querySelectorAll('.delateIcon');
    for (let i = 0; i < delateIcon.length; i++) {
        delateIcon[i].onclick = function () {
            let temp = this.dataset.index;
            let id = temp.substring(9, temp.length);
            delateAct(myUserId, id); //发送请求
        }
    }
    let contentAct1 = document.querySelector('#contentAct1')
    let lis = contentAct1.querySelectorAll('.sign');
    for (let i = 0; i < lis.length; i++) {
        lis[i].onmouseleave = () => {
            threePotShow[i].style.display = 'none'
        }
    }
    bodyPot();
}
/**
 * @description: 删除文章的请求
 * @param  {*}
 * @return {*}
 * @param {*} userId 作者id
 * @param {*} articleId 文章id
 */
function delateAct(myUserId, articleId) {
    axios({
        method: 'post',
        url: '/article/deleteArticle',
        data: {
            userId: myUserId,
            articleId: articleId
        }
    }).then((res) => {
        let data = res.data.data;
        if (data.message != '删除成功') {
            let tipsPage = document.querySelector('.tipsPage');
            let tipsContent = document.querySelector('.tipsContent')
            tipsPage.style.display = 'block';
            tipsContent.innerHTML = '只能删除自己的文章噢！'
            setTimeout(() => {
                tipsPage.style.display = 'none';
            }, 1000)
        } else {
            successDelate(articleId); //成功回调
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 删除成功回调
 * @param  {*}
 * @return {*}
 * @param {*} id
 */
function successDelate(id) {
    let delateItem = document.querySelector('#articleId' + id);
    let contentAct1 = document.querySelector('#contentAct1');
    delateItem.remove();
    if (contentAct1.children[1] == undefined) {
        let tipBox1 = document.querySelector('#tipBox1');
        tipBox1.style.display = 'flex';
        show('#contentMap1')();
    }
}
/**
 * @description: 编辑头像
 * @param  {*}
 * @return {*}
 * @param {*} fd
 */
function editHead(fd) {
    axios({
        method: 'post',
        url: '/user/changeUserAvatar',
        data: fd,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((res) => {
        let result = res.data.data;
        console.log(result);
        if (result.message == '修改头像成功') {
            let tipsPage = document.querySelector('.tipsPage');
            let tipsContent = document.querySelector('.tipsContent')
            tipsPage.style.display = 'block';
            tipsContent.innerHTML = '修改头像成功!'
            setTimeout(() => {
                tipsPage.style.display = 'none';
            }, 1000)
        }
        myInfo(userId);
    }).catch((err) => {
        alert(err);
    })
}
/**
 * @description: 编辑个人信息的请求
 * @param  {*}
 * @return {*}
 * @param {*} userId 用户id
 * @param {*} nickname 用户名
 * @param {*} introduction 个人介绍
 */
function editInformation(userId, nickname, introduction) {
    axios({
        method: 'post',
        url: '/user/changeUserInfo',
        data: {
            'userId': userId,
            'nickname': nickname,
            'introduction': introduction
        }
    }).then((res) => {
        let result = res.data.data;
        if (result.message == '修改资料成功') {
            let tipsPage = document.querySelector('.tipsPage');
            let tipsContent = document.querySelector('.tipsContent')
            tipsPage.style.display = 'block';
            tipsContent.innerHTML = '修改资料成功!'
            setTimeout(() => {
                tipsPage.style.display = 'none';
            }, 1000)
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 点赞请求
 * @param  {*}
 * @return {*}
 * @param {number} articleId 文章id
 * @param {boolean} bool 点赞还是取消
 */
function thumbUp(userId, articleId, bool) {
    axios({
        method: 'post',
        url: '/article/thumbUpArticle',
        data: {
            "userId": userId.toString(),
            "articleId": articleId.toString(),
            "flag": bool.toString()
        }
    }).then((res) => {
        let result = res.data;
        //应该不会有bug
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 绑定行内样式的函数 点赞和取消
 * @param  {*}
 * @return {*}
 * @param {*} _this 指向触发的事件的元素
 * @param {*} userId 用户id
 * @param {*} articleId 文章id
 */
function tempThumb(_this, userId, articleId) {
    event.stopPropagation();
    if (userId != null) {
        if (_this.className == 'selected' || _this.className == 'true') {
            _this.className = '';
            _this.children[1].innerHTML--;
            thumbUp(userId, articleId, false);
        } else {
            _this.children[1].innerHTML++;
            _this.className = 'selected';
            thumbUp(userId, articleId, true);
        }
    } else {
        showLogin()
    }
}
/**
 * @description: 和上个函数一样的功能，再写一个是因为要改变的函数值有点多，有点乱
 * @param  {*}
 * @return {*}
 * @param {*} _this
 * @param {*} userId
 * @param {*} articleId
 */
function innerThumb(_this, userId, articleId) {
    if (_this.className == 'sideIconItem true') {
        _this.className = 'sideIconItem false';
        _this.children[1].innerHTML--;
        _this.children[1].style.backgroundColor = '#b2bac2'
        thumbUp(userId, articleId, false);
    } else {
        _this.children[1].innerHTML++;
        _this.className = 'sideIconItem true';
        _this.children[1].style.backgroundColor = '#6cbd45'
        thumbUp(userId, articleId, true);
        _this.nextElementSibling.className = 'sideIconItem false';
    }
}
/**
 * @description: 点踩文章请求
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 * @param {*} articleId 文章id
 * @param {*} bool 点还是踩
 */
function dislikeTub(userId, articleId, bool, _this) {
    axios({
        method: 'post',
        url: '/article/dislikeArticle',
        data: {
            "userId": userId,
            "articleId": articleId,
            "flag": bool.toString()
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message == '点踩成功' || result.data.message == '取消点踩成功') {
            if (bool) {
                _this.className = 'sideIconItem true';
                //点赞和点踩不能同时存在
                if (_this.previousElementSibling.className == 'sideIconItem true') {
                    _this.previousElementSibling.className = 'sideIconItem false';
                    _this.previousElementSibling.children[1].innerHTML--;
                    _this.previousElementSibling.children[1].style.backgroundColor = '#b2bac2'
                }

            } else {
                _this.className = 'sideIconItem false';
            }
        } else {
            console.log(result.data.message);
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 绑定的Dom0事件函数
 * @param  {*}
 * @return {*}
 * @param {*} _this 触发元素
 * @param {*} userId 作者id
 * @param {*} articleId 文章id
 */
function innerDislike(_this, userId, articleId) {
    //如果已经是点过的就取消
    if (_this.className == 'sideIconItem true') {
        dislikeTub(userId, articleId, false, _this);
    } else {
        dislikeTub(userId, articleId, true, _this);
    }
}
/**
 * @description: 获取文章详细信息 点赞点踩删除评论函数引用
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} articleId 文章id
 */
function getContent(userId, articleId, authorId) {
    axios({
        method: 'get',
        url: '/article/getContent',
        params: {
            "userId": userId,
            "articleId": articleId
        }
    }).then((res) => {
        let result = res.data;
        successGetContent(result.data, userId, articleId, authorId); //成功后执行 拼接渲染页面
        return result
    }).then((result) => {
        //从cookie中获取本人头像作为评论头像
        let src = getCookie('imgSrc')
        let commentImg = document.querySelector('#commentImg');
        commentImg.src = src;
        delateComment('.allComment', result, articleId) //删除评论事件绑定
        thumbDown('.allComment', userId, 'iconGood', 'thumb') //点赞评论事件绑定
        thumbDown('.allComment', userId, 'iconWorse', 'down') //点踩评论事件绑定
        //获取评论 最后一个参数返回作者
        getComment(userId, articleId, 1, result.data.author) //渲染页面结束后 获取评论
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 成功获取详细内容的回调 在获取页面之后执行
 * @param  {*}
 * @return {*}
 * @param {*} data
 */
function successGetContent(data, userId, articleId, authorId) {
    detailPage();
    let actHeadImg = document.querySelector('#actHeadImg');
    actHeadImg.src = 'http://47.100.42.144:3389/' + data.authorAvatar;
    let infoYou = document.querySelector('.infoYou');
    infoYou.innerHTML = data.author;
    let authorBtn = document.querySelector('.authorBtn');
    spliceContent('.articleMain', data, authorId);
    spliceSidebar('.sideIcon', data, userId, articleId);
    checkAuthor(userId, authorId)
}
/**
 * @description: 获取评论之后获取文章回复 获取评论 解析emoji
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 * @param {*} articleId 文章id
 * @param {*} page 评论第几页
 * @param {*} author 文章作者
 */
function getComment(userId, articleId, page, author) {
    axios({
        method: 'get',
        url: '/comment/getComment',
        params: {
            "userId": userId,
            "articleId": articleId,
            "page": page
        }
    }).then((res) => {
        let result = res.data;
        let temp = ['[微笑]', '[亲亲]', '[破涕而笑]', '[震惊]', '[色]', '[赞]', '[踩]', '[大笑]', '[哭泣]', '[爱心]', '[心碎]']
        if (result.data.length != 0) {
            for (let i = 0; i < result.data.length; i++) {
                //解析emoji
                let comment = result.data[i].comment;
                let reg =
                    /\[微笑\]|\[亲亲\]|\[破涕而笑\]|\[震惊\]|\[色\]|\[赞\]|\[踩\]|\[大笑\]|\[哭泣\]|\[爱心\]|\[心碎\]/gm;
                let mat = comment.match(reg);
                let content = comment;
                if (mat != null) {
                    for (let i = 0; i < mat.length; i++) {
                        content = content.replace(mat[i], '<img class="emoji" alt="' + mat[i] + '" src="images/emoji/' + (temp
                                .indexOf(mat[i]) + 1) +
                            '.svg">')
                    }
                }
                spliceComment('.allComment', result.data[i], author, content) //渲染评论
            }
        }
        return result
    }).then((result) => {
        showCommit(userId, articleId, author); //显示评论按钮
        //减少发送请求
        if (result.data.length == 5) {
            page++;
            getComment(userId, articleId, page, author) //再获取下一页评论
        }
        return result
    }).then((result) => {
        //获取评论完获取回复
        for (let j = 0; j < result.data.length; j++) { //j代表第几篇文章，只加载第一页，后面用递归
            getRecord(userId, result.data[j].commentId, 1, result.data[j].commentator, author, articleId)
        }
    }).catch((err) => {
        alert(err)
    })
}

/**
 * @description: 获取文章回复，引用在获取评论之后
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} commentId 评论id
 * @param {*} page 第几页回复
 * @param {*} commentSub 被回复者
 */
function getRecord(userId, commentId, page, commentSub, author, articleId) {
    axios({
        method: 'get',
        url: '/reply/getReply',
        params: {
            "userId": userId,
            "commentId": commentId,
            "page": page
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.length != 0) {
            for (let i = 0; i < result.data.length; i++) {
                spliceRecord('#comment' + commentId, result.data[i], commentSub)
            }
        }
        if (result.data.length == 5) {
            page++;
            getRecord(userId, commentId, page, commentSub, author, articleId) //减少渲染次数 这一页没满说明后面没了就不加载了
        }
    }).then(() => {
        recordBox(userId, author, articleId)
        //注册回复请求
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 发布回复
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 * @param {*} commentId 评论id
 * @param {*} content 评论内容
 * @param {*} _this 输入框
 * @param {*} author 用于发布回复后，重新渲染页面时的参数，文章作者
 * @param {*} articleId 文章id
 */
function commitRecord(userId, commentId, content, _this, author, articleId) {
    axios({
        method: 'post',
        url: '/reply/postReply',
        data: {
            "userId": userId,
            "commentId": commentId,
            "reply": content
        }
    }).then((res) => {
        let allComment = document.querySelector('.allComment');
        //清空评论
        allComment.innerHTML = ''
        _this.value = '';
        getComment(userId, articleId, 1, author) //评论完后重新渲染页面
    }).catch(err => {
        alert(err)
    })
}
/**
 * @description: 删除回复
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} replyId
 */
function delateRecord(userId, replyId, _this) {
    axios({
        method: 'post',
        url: '/reply/deleteReply',
        data: {
            "userId": userId,
            "replyId": replyId,
        }
    }).then(res => {
        let result = res.data;
        if (result.data.message == '删除成功') {
            _this.remove()
        } else {
            let tipsPage = document.querySelector('.tipsPage');
            let tipsContent = document.querySelector('.tipsContent')
            tipsPage.style.display = 'block';
            tipsContent.innerHTML = '只能删除自己的回复呀！'
            setTimeout(() => {
                tipsPage.style.display = 'none';
            }, 1000)

        }
    }).catch(err => {
        alert(err)
    })
}
/**
 * @description: 发布文章评论
 * @param  {*}
 * @return {*}
 * @param {string} userId 我的id
 * @param {string} articleId 文章id
 * @param {string} content 评论内容
 */
function postComment(userId, articleId, content, author) {
    axios({
        method: 'post',
        url: '/comment/postComment',
        data: {
            "userId": userId,
            "articleId": articleId,
            "comment": content
        }
    }).then((res) => {
        let allComment = document.querySelector('.allComment');
        allComment.innerHTML = ''
        getComment(userId, articleId, 1, author)
    }).catch((err) => {
        alert(err);
    })
}
/**
 * @description: 删除评论
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 * @param {*} commentId 文章id
 */
function delateCom(userId, commentId, result, articleId) {
    axios({
        method: 'post',
        url: '/comment/deleteComment',
        data: {
            "userId": userId,
            "commentId": commentId
        }
    }).then((res) => {
        let data = res.data;
        let resData = data.data.message;
        if (resData == '删除成功') {
            let temp = '#comment' + commentId
            let commentSub = document.querySelector(temp);
            commentSub.remove();
        } else {
            let tipsPage = document.querySelector('.tipsPage');
            let tipsContent = document.querySelector('.tipsContent')
            tipsPage.style.display = 'block';
            tipsContent.innerHTML = '只能删除自己的评论哟!'
            setTimeout(() => {
                tipsPage.style.display = 'none';
            }, 1000)
        }
    })
}
/**
 * @description: 点赞评论
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} commentId
 * @param {*} bool
 */
function commentThumb(userId, commentId, bool, _this) {
    axios({
        method: 'post',
        url: '/comment/thumbUpComment',
        data: {
            "userId": userId,
            "commentId": commentId,
            "flag": bool.toString()
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message == '点赞成功' || result.data.message == '取消点赞成功') {
            if (bool) {
                _this.className = 'timeGood true';
                _this.nextElementSibling.className = 'timeGood false';

            } else {
                _this.className = 'timeGood false';
            }
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 点踩评论
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} commentId 评论id
 * @param {*} bool 取消还是踩
 * @param {*} _this 踩的按钮
 */
function commentDown(userId, commentId, bool, _this) {
    axios({
        method: 'post',
        url: '/comment/dislikeComment',
        data: {
            "userId": userId,
            "commentId": commentId,
            "flag": bool.toString()
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message == '点踩成功' || result.data.message == '取消点踩成功') {
            if (bool) {
                _this.className = 'timeGood true';
                _this.previousElementSibling.className = 'timeGood false';
            } else {
                _this.className = 'timeGood false';
            }
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 获取关注我的人
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 */
function getLoved(userId) {
    axios({
        method: 'get',
        url: '/user/getSubscribeMe',
        params: {
            "userId": userId
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '暂无人关注') {
            successLoved(result.data, myUserId);
            hide('#tipBox5')();
        } else {
            let myLoveP = document.querySelector('.myLoveP');
            myLoveP.innerHTML = '';
            let tipBox5 = document.querySelector('#tipBox5');
            tipBox5.style.display = 'flex';
        }
    }).catch((err) => {
        alert(err);
    })
}
/**
 * @description: 获取关注我的人成功回调 并且判断是否关注我
 * @param  {*}
 * @return {*}
 * @param {*} data 关注我的人的数据
 */
function successLoved(data, myUserId) {
    axios({
        method: 'get',
        url: '/user/getMySubscribe',
        params: {
            'userId': myUserId
        }
    }).then(res => {
        let result = res.data.data; //这个数据是我关注的人
        let temp = [];
        for (let i = 0; i < result.length; i++) {
            temp.push(result[i].subId)
        }
        let loves = document.querySelector('.loves');
        let myLoveP = document.querySelector('.myLoveP');
        let loveMe = document.querySelector('#loveMe');
        myLoveP.innerHTML = '';
        loves.innerHTML = '';
        loveMe.innerHTML = data.length;
        for (let i = 0; i < data.length; i++) {
            if (temp.indexOf(data[i].subId) != -1) {
                getOther(data[i].subId, '.myLoveP', true, false); //已关注
            } else {
                getOther(data[i].subId, '.myLoveP', false, true) //未关注
            }
        }
    })
}

/**
 * @description: 获取其他人的信息
 * @param  {*}
 * @return {*}
 * @param {*} otherId 其他人的id
 * @param {*} where  拼接到哪
 * @param {*} isBool 是否关注
 */
function getOther(otherId, where, isBool, isBoolTwo) {
    axios({
        method: 'get',
        url: '/user/getUserInfo',
        params: {
            "userId": otherId
        }
    }).then((res) => {
        let result = res.data;
        spliceLoved(where, result.data, otherId, isBool, isBoolTwo);
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 关注人的请求
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} subId
 */
function getSub(_this, userId, subId) {
    axios({
        method: 'post',
        url: '/user/subscribeSomeone',
        data: {
            "userId": userId,
            "subscribeId": subId
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '已关注该用户') {
            _this.innerHTML = '已关注';
        }
    }).catch((err) => {
        alert(err)
    })
}
/**
 * @description: 获取我关注的人请求
 * @param  {*} userId 
 * @return {*}
 */
function getSubMe(userId) {
    axios({
        method: 'get',
        url: '/user/getMySubscribe',
        params: {
            'userId': userId
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '暂无关注用户') {
            successGet(result.data);
            hide('#tipBox5')();
        } else {
            let myLove = document.querySelector('#myLove2');
            myLove.innerHTML = '0'
            let myLoveP = document.querySelector('.myLoveP');
            myLoveP.innerHTML = '';
            let tipBox5 = document.querySelector('#tipBox5');
            tipBox5.style.display = 'flex';
        }
    }).catch((err) => {
        console.log(err);
    })

}
/**
 * @description: 获取我关注的人成功回调
 * @param  {*}
 * @return {*}
 * @param {*} data 我关注的人的数据
 */
function successGet(data) {
    let loves = document.querySelector('.loves');
    let myLoveP = document.querySelector('.myLoveP');
    let myLove = document.querySelector('#myLove2');
    myLoveP.innerHTML = '';
    loves.innerHTML = '';
    myLove.innerHTML = data.length;
    for (let i = 0; i < data.length; i++) {
        getOther(data[i].subId, '.loves', true, false)
    }
}
/**
 * @description: 取消关注
 * @param  {*}
 * @return {*}
 * @param {*} userId
 * @param {*} subId 取消的id
 */
function leaveYou(_this, userId, subId) {
    axios({
        method: 'post',
        url: '/user/cancelSubscribe',
        data: {
            "userId": userId,
            "subscribeId": subId
        }
    }).then((res) => {
        let result = res.data;
        if (result.data.message != '没有关注该用户') {
            _this.innerHTML = '关注';
        } else if (_this.innerHTML = '已关注') {
            _this.innerHTML = '关注';
        }
    }).catch((err) => {
        console.log(err);
    })
}
/**
 * @description: 关注和取消关注连用
 * @param  {*}
 * @return {*}
 * @param {*} _this 点击的按钮
 * @param {*} userId 我的id
 * @param {*} subId 被关注或者被取消关注的id
 */
function leaveLove(_this, userId, subId) {
    event.stopPropagation();
    if (_this.innerHTML == '已关注') {
        leaveYou(_this, userId, subId)
    } else {
        getSub(_this, userId, subId)
    }
}
/**
 * @description: 检测是否关注我
 * @param  {*}
 * @return {*}
 * @param {*} _this
 * @param {*} userId
 * @param {*} authorId
 */
function checkAuthor(userId, authorId) {
    axios({
        method: 'get',
        url: '/user/getMySubscribe',
        params: {
            "userId": userId
        }
    }).then(res => {
        let authorBtn = document.querySelector('.authorBtn');
        let result = res.data.data;
        let temp = []
        for (let i = 0; i < result.length; i++) {
            temp.push(result[i].subId)
        }
        let auId = parseInt(authorId);
        if (temp.indexOf(auId) != -1) {
            authorBtn.innerHTML = '已关注'
        } else {
            authorBtn.innerHTML = '关注'
        }
    })
}
/**
 * @description: 获取别人的信息
 * @param  {*}
 * @return {*}
 * @param {*} youId 你的id
 */
function youInfo(youId) {
    axios({
        method: 'get',
        url: '/user/getUserInfo',
        params: {
            "userId": youId
        }
    }).then((res) => {
        let result = res.data;
        youInfoSus(result.data, youId);
    }).catch((err) => {
        console.log(err);
    })
}
/**
 * @description: 进入别人主页前的初始化
 * @param  {*}
 * @return {*}
 * @param {*} res
 * @param {*} youId
 */
function youInfoSus(res, youId) {
    let userName = document.querySelector('.userName');
    let work = document.querySelector('.work');
    let head = document.querySelector('#headHead');
    let contentAct2 = document.querySelector('#contentAct2');
    let loves = document.querySelector('.loves');
    let myLoveP = document.querySelector('.myLoveP');
    loves.innerHTML = ''
    contentAct2.innerHTML = '';
    myLoveP.innerHTML = '';
    head.src = 'http://47.100.42.144:3389/' + res.avatar;
    userName.innerHTML = res.nickname;
    work.innerHTML = res.introduction;
    yourPageC();
    getMyLove(youId); //我的赞
    getMyWrite(youId); //我的创造
    getSubNum(userId); //我关注的人
    getSubMeNum(userId); //关注我的人
}
/**
 * @description: 获取关注的数量
 * @param  {*}
 * @return {*}
 * @param {*} userId
 */
function getSubNum(userId) {
    axios({
        method: 'get',
        url: '/user/getSubscribeMe',
        params: {
            "userId": userId
        }
    }).then(res => {
        let data = res.data.data;
        let loveMe = document.querySelector('#loveMe');
        if (data.message == '暂无人关注') {
            loveMe.innerHTML = 0
        } else {
            loveMe.innerHTML = data.length;
        }
    })
}
/**
 * @description: 获取我关注的人数量
 * @param  {*}
 * @return {*}
 * @param {*} userId
 */
function getSubMeNum(userId) {
    axios({
        method: 'get',
        url: '/user/getMySubscribe',
        params: {
            'userId': userId
        }
    }).then(res => {
        let data = res.data.data;
        let myLove = document.querySelector('#myLove2');
        if (data.message == '暂无关注用户') {
            myLove.innerHTML = 0;
        } else {
            myLove.innerHTML = data.length;
        }
    })
}