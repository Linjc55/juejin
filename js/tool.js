/*
 * @Description: 工具函数库
 * @Author: 林俊丞
 * @Date: 2021-04-19 10:29:44
 * @LastEditTime: 2021-05-14 18:08:42
 * @LastEditors: 林俊丞
 */

/**
 * @description: 节流函数
 * @param  {function} fn 要节流操作的函数
 * @param  {number} delay 节流时间
 * @return {function} fn 节流处理的函数
 */
function throttle(fn, delay) {
    var t = null;
    begin = new Date().getTime();
    return function () {
        cur = new Date().getTime();
        clearTimeout(t);
        if (cur - begin >= delay) {
            fn.apply(this, arguments);
            begin = cur;
        } else {
            t = setTimeout(function () {
                fn.apply(this, arguments);
            }, delay)
        }
    }
}

/**
 * @description: 防抖
 * @param  {function} fn 
 * @param  {number} delay 
 * @return {*}
 */
function debounce(fn, delay) {
    var t = null;
    return function () {
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(function () {
            fn.apply(this, arguments);
        }, delay)
    }
}

/**
 * @description: 
 * @param  {*}
 * @return {*}
 * @param {*} el 操作元素
 */
function toggle(el) {
    let element = document.querySelector(el);
    return () => {
        if (element.style.display == 'block') {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
        }
    }
}
/**
 * @description: 显示
 * @param  el:操作的元素
 * @param  fn:添加的函数
 * @return {*}
 */
function show(el, fn) {
    let element = document.querySelector(el);
    return () => {
        fn != null ? fn() : null;
        element.style.display = 'block';
    }
}
/**
 * @description: 隐藏
 * @param  el:操作的元素
 * @param  fn:添加的函数
 * @return {*}
 */
function hide(el, fn, fn2) {
    let element = document.querySelector(el);
    return () => {
        fn != null ? fn() : null;
        fn2 != null ? fn2() : null;
        element.style.display = 'none';
    }
}
/**
 * @description: 切换类名
 * @param  {*}
 * @return {*}
 */
function classToggle(el, prev, after) {
    let element = document.querySelector(el);
    return () => {
        if (element.className == prev) {
            element.className = after;
        } else {
            element.className = prev;
        }
    }
}
/**
 * @description: 点body去除其他的
 * @param  {*}
 * @return {*}
 */
function bodyPot() {
    let goodBox = document.querySelector('.goodBox')
    let moreBox = document.querySelector('.moreBox')
    document.addEventListener('click', () => {
        if (moreBox.style.display == 'block') {
            moreBox.style.display = 'none';
        }
        if (goodBox.style.display == 'block') {
            goodBox.style.display = 'none';
        }
    })
}
/**
 * @description: 设置cookie
 * @param  {*}
 * @return {*}
 */
function setCookie(userId) {
    let loginFace = document.querySelector('.loginFace');
    let valId = loginFace.querySelector('.tewIpt');
    let valPsd = loginFace.querySelector('#codeIpt2');
    let imgSrc = document.querySelectorAll('.allHead');
    let work = document.querySelector('.work');
    let date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (valId.value != '' && valPsd.value != '') {
        document.cookie = 'username=' + valId.value + ';path=/;expires=' + date.toGMTString();
        document.cookie = 'psd=' + valPsd.value + ';path=/;expires=' + date.toGMTString();
    }
    document.cookie = 'userId=' + userId + ';path=/;expires=' + date.toGMTString();
    document.cookie = 'imgSrc=' + imgSrc[1].src + ';path=/;expires=' + date.toGMTString();
    document.cookie = 'work=' + work.innerHTML + ';path=/;expires=' + date.toGMTString();
}
/**
 * @description: 移除cookie
 * @param  {*}
 * @return {*}
 */
function removeCookie() {
    let date = new Date();
    date.setTime(date.getTime() - 60 * 60 * 1000);
    document.cookie = 'username=path=/;expires=' + date.toGMTString();
    document.cookie = 'psd=;path=/;expires=' + date.toGMTString();
    document.cookie = 'userId=;path=/;expires=' + date.toGMTString();
    document.cookie = 'imgSrc=;path=/;expires=' + date.toGMTString();
    document.cookie = 'work=;path=/;expires=' + date.toGMTString();
    userId = null;
    myUserId = null;
}
/**
 * @description: 获取cookie值
 * @param  {*}
 * @return {*}
 * @param {*} cookieName 获取的cookie名
 */
function getCookie(cookieName) {
    cookieName += '=';
    let cookieList = document.cookie.split(';');
    for (let i = 0; i < cookieList[i].length; i++) {
        let cookieItem = cookieList[i].trim(); //去除空格
        if (cookieItem.indexOf(cookieName) != -1) {
            return cookieItem.substring(cookieName.length, cookieItem.length)
        }
    }
}
/**
 * @description: 初始化实现cookie自动登录
 * @param  {*}
 * @return {*}
 */
function initData() {
    if (getCookie('username') && getCookie('psd')) {
        let myImg = document.querySelectorAll('.allHead');
        let temp = getCookie('imgSrc');
        let work = document.querySelector('.work');
        work.innerHTML = getCookie('work');
        userId = getCookie('userId');
        for (let i = 0; i < myImg.length; i++) {
            myImg[i].src = temp;
        }
        myUserId = userId;
        hide('.loginBtn')();
        hide('.loginBox')();
        show('#myImg')();
        show('#myLove')();
        getArticle(userId, 1);
    }
}
/**
 * @description: 回到主页
 * @param  {*}
 * @return {*}
 */
function homePage() {
    //隐藏显示盒子
    hide('.minePage')();
    hide('.writePage')();
    hide('.editPage')();
    hide('.detailPage')();
    show('.mainPage')();
    show('.miniHeader')();
    show('.homePage')();
    let mainPageAct = document.querySelector('#mainPageAct');
    mainPageAct.innerHTML = ''; //回到主页面重新更新数据
    initPage();
    if (userId != null) {
        page = 1 //页数重置一下，不然有bug
        getArticle(userId, 1);
    }
}
/**
 * @description: 从别人主页回来的初始化
 * @param  {*}
 * @return {*}
 */
function initPage() {
    let myLoveM = document.querySelector('#myLoveM');
    let loveBest = document.querySelector('#loveBest');
    myLoveM.className = ''
    loveBest.className = 'selectedA'
    userId = myUserId; //把之前保存的id，重新覆盖userId,
    show('.editBtn')();
}
/**
 * @description: 点击进入写文章页面
 * @param  {*}
 * @return {*}
 */
function writePage() {
    hide('.homePage')();
    hide('.minePage')();
    hide('.editPage')();
    hide('.detailPage')();
    show('.writePage')();
    initPage();
}
/**
 * @description: 我的主页
 * @param  {*}
 * @return {*}
 */
function minePage() {
    hide('.mainPage')();
    hide('.miniHeader')();
    hide('.writePage')();
    hide('.editPage')();
    hide('.detailPage')();
    show('.homePage')();
    show('.minePage')();
    show('.mainHeader')();
    showBox('.bodyBox4');
    onlyMy('.actHeader', '#trend');
    initPage()
}
/**
 * @description: 他人的主页
 * @param  {*}
 * @return {*}
 */
function yourPageC() {
    hide('.mainPage')();
    hide('.miniHeader')();
    hide('.writePage')();
    hide('.editPage')();
    hide('.detailPage')();
    hide('.editBtn')();
    show('.homePage')();
    show('.minePage')();
    show('.mainHeader')();
    showBox('.bodyBox4');
    onlyMy('.actHeader', '#trend');
}
/**
 * @description: 进入编辑页面
 * @param  {*}
 * @return {*}
 */
function editPage() {
    hide('.minePage')();
    show('.editPage')();
    showBox('.bodyBox4');
    onlyMy('.actHeader', '#trend')
    // show('.bodyBox4')();
}
/**
 * @description: 显示文章内容
 * @param  {*}
 * @return {*}
 */
function detailPage() {
    hide('.miniHeader')();
    hide('.mainPage')();
    hide('.minePage')();
    show('.detailPage')();
    initPage();
}
/**
 * @description: 登录页面显示
 * @param  {*}
 * @return {*}
 */
function showLogin() {
    let loginFace = document.querySelector('.loginFace'); //登录模态框
    let body = document.querySelector('body');
    loginFace.style.display = 'flex';
    body.className = 'noScroll';
}
/**
 * @description: 显示哪个盒子
 * @param  {*}
 * @return {*}
 * @param {*} boxClass 显示的盒子
 */
function showBox(boxClass) {
    hide('.bodyBox')();
    hide('.bodyBox2')();
    hide('.bodyBox3')();
    hide('.bodyBox4')();
    hide('.bodyBox5')();
    show(boxClass)();
}
/**
 * @description: 排他
 * @param  {*}
 * @return {*}
 * @param {*} father
 * @param {*} son
 */
function onlyMy(father, son) {
    let fatherE = document.querySelector(father);
    let fathers = fatherE.querySelectorAll('li');
    let sons = document.querySelector(son)
    for (var i = 0; i < fathers.length; i++) {
        fathers[i].className = ''
    }
    sons.className = 'selected';
}
/**
 * @description: 拼接内容 我创作的文章
 * @param  {*}
 * @return {*}
 * @param {*} data 传入的数据
 */
function spliceData(data) {
    let contentAct1 = document.querySelector('#contentAct1');
    let li = `<li id="articleId${data.articleId}" data-index ="${userId}" class="sign" >
    <div class="contentBox">
        <div class="newsBox">
            <div class="newsTime">
                <ul>
                    <li class="authorName colorBlue">${data.author}</li>
                    <li class="authorName">2天前</li>
                    <li class="way colorBlue">前端</li>
                </ul>
            </div>
            <div class="newsTitle">
                <span>${data.title}</span>
            </div>
            <div class="newsBtn">
                <ul class="newsUl">
                    <li  onclick = "tempThumb(this,${myUserId},${data.articleId})">
                        <i class="good"></i>
                        <span class="clickNum" >${data.thumbUpNum}</span>
                    </li>
                    <li >
                        <i class="worse"></i>
                        <span class="clickNum">${data.commentNum}</span>
                    </li>
                    <li class="shareIcon">
                        <i class="share"></i>
                    </li>
                    <li class="shareIcon" id="moreIcon">
                        <i class="share">···</i>
                        <ul id="threePotShow">
                            <li>编辑</li>
                            <li data-index="articleId${data.articleId}" class="delateIcon">删除</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
      
    </div>
</li>`
    contentAct1.innerHTML += li;

}
/**
 * @description: 主页文章 
 * @param  {*}
 * @return {*}
 * @param {*} what 加到哪
 * @param {*} data 数据
 */
function spliceAll(what, data) {
    console.log('渲染主页');
    let reg = /<[^>]+>/gi;
    data.title = data.title.replace(reg, '');
    let cup = document.querySelector(what);
    let li = `<li id="mainArticleId${data.articleId}" data-index ="${data.authorId}" class="sign">
    <div class="contentBox">
        <div class="newsBox">
            <div class="newsTime">
                <ul>
                    <li class="authorName colorBlue">${data.author}</li>
                    <li class="authorName">2天前</li>
                    <li class="way colorBlue">前端</li>
                </ul>
            </div>
            <div class="newsTitle">
                <span>${data.title}</span>
            </div>
            <div class="newsBtn">
                <ul class="newsUl">
                    <li class="${data.isThumbUp}" onclick = "tempThumb(this,${userId},${data.articleId})">
                        <i class="good"></i>
                        <span class="clickNum">${data.thumbUpNum}</span>
                    </li>
                    <li>
                        <i class="worse"></i>
                        <span class="clickNum">${data.commentNum}</span>
                    </li>
                    <li class="shareIcon">
                        <i class="share"></i>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</li>`
    cup.innerHTML += li;
}
/**
 * @description: 我的点赞文章
 * @param  {*}
 * @return {*}
 * @param {*} what
 * @param {*} data
 */
function spliceMy(what, data) {
    let cup = document.querySelector(what);
    let li = `<li id="mainArticleId${data.articleId}" class="sign" >
    <div class="contentBox">
        <div class="newsBox">
            <div class="newsTime">
                <ul>
                    <li class="authorName colorBlue">${data.author}</li>
                    <li class="authorName">2天前</li>
                    <li class="way colorBlue">前端</li>
                </ul>
            </div>
            <div class="newsTitle">
                <span>${data.title}</span>
            </div>
            <div class="newsBtn">
                <ul class="newsUl">
                    <li class="selected" onclick = "tempThumb(this,${myUserId},${data.articleId})">
                        <i class="good"></i>
                        <span class="clickNum">${data.thumbUpNum}</span>
                    </li>
                    <li>
                        <i class="worse"></i>
                        <span class="clickNum">${data.commentNum}</span>
                    </li>
                    <li class="shareIcon">
                        <i class="share"></i>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</li>`
    cup.innerHTML += li;
}
/**
 * @description: 我的关注者
 * @param  {*}
 * @return {*}
 * @param {*} where 拼接到哪个盒子
 * @param {*} data 数据
 * @param {*} otherId 其他人的id
 * @param {*} isBool 第一个盒子的显示状态
 * @param {*} isBoolTwo 第二个盒子的显示状态
 */
function spliceLoved(where, data, otherId, isBool, isBoolTwo) {
    let li = `<li class="loveMe" id='other${otherId}'>
    <div class="loveMeItem">
        <a href="javascript:;" class="loveItem">
            <img src=" http://47.100.42.144:3389/${data.avatar}" alt="" class="youHead">
            <div class="youInfo">
                <span class="youName">${data.nickname}</span>
                <div class="detail">${data.introduction}</div>
            </div>
            <button class="lovedBtn loveLove${isBool}" onclick ="leaveLove(this,${myUserId},${otherId})">已关注</button> 
            <button class="lovedBtn loveLove${isBoolTwo}"  onclick ="leaveLove(this,${myUserId},${otherId})">关注</button>
        </a>
    </div>
</li>`
    let cup = document.querySelector(where);
    cup.innerHTML += li;
}
/**
 * @description: 渲染文章详情
 * @param  {*}
 * @return {*}
 * @param {*} where
 * @param {*} data
 */
function spliceContent(where, data, authorId) {
    let cup = document.querySelector(where);
    let reg = /<[^>]+>/gi;
    // let reg = /^<.*?>$/gi;
    data.title = data.title.replace(reg, '');
    data.content = data.content.replace(reg, '')
    //这个模板字符串拼接了文章内容和评论区顶部
    let li = `<div class="artDetail">
    <div class="authorInfo">
        <img src="http://47.100.42.144:3389/${data.authorAvatar}" alt="" class="actImg">
        <div class="authorInfoBox">
            <div class="authorName">${data.author}</div>
            <div class="createTime">2021年4月23日</div>
        </div>
        <button class="authorBtn" onclick ="leaveLove(this, userId, ${authorId})">已关注</button>
    </div>
    <h1 class="artTitle">${data.title}</h1>
    <div class="artContent">${data.content}</div>
</div>
<div class="tagBox">
    <div class="tagList">
        <div class="tagItem">文章分类</div>
        <div>前端</div>
    </div>
    <div class="tagList">
        <div class="tagItem">文章标签</div>
        <div>html</div>
    </div>
</div>
<div class="authorFooter">
    <div class="authorInner">
        <img src="http://47.100.42.144:3389/${data.authorAvatar}" alt="" class="actImg">
        <div class="authorInfoTwo">
            <div class="authorSick">
                ${data.author}
            </div>
            <div class="authorOther">发布1篇专栏· 获得点赞1· 获得阅读5</div>
        </div>
    </div>
</div>
<div class="bannerBox">
    <a href="javascript:;">
        安装掘金浏览器插件
    </a>
    <div class="bannerDetail">
        打开新标签页发现好内容，掘金、GitHub、Dribbble、ProductHunt 等站点内容轻松获取。快来安装掘金浏览器插件获取高质量内容吧！
    </div>
</div>
<a name="cmm"></a>
<div class="commentFrom">
    <div class="commentInner">
        <div class="avatarBox">
            <img src="" alt="" class="actImg" id="commentImg">
        </div>
        <div class="commentIpt">
            <div class="comIptBox">
                <input placeholder="输入评论..." type="text" class="commentCreate">
            </div>
            <div class="actionCommit">
                <div class="emojiBtn"><img src="images/detail/emoji.svg" alt="表情"
                        class="iconSmall"><span>表情</span>
                        <div class="emojiBox" id="commentEmoji">
                <ul class="category">
                        <li class="item">
                                <img class="emoji" alt="[微笑]" src="images/emoji/1.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[亲亲]" src="images/emoji/2.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[破涕而笑]" src="images/emoji/3.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[震惊]" src="images/emoji/4.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[色]" src="images/emoji/5.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[赞]" src="images/emoji/6.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[踩]" src="images/emoji/7.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[大笑]" src="images/emoji/8.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[哭泣]" src="images/emoji/9.svg">
                        </li>
                        <li class="item">
                                <img class="emoji" alt="[爱心]" src="images/emoji/10.svg"> </li>
                        <li class="item">
                                <img class="emoji" alt="[心碎]" src="images/emoji/11.svg">
                        </li>
                </ul>
        </div>
                        </div>
                <div class="upImgBtn"><img src="images/detail/up.svg" alt="图片"
                        class="iconSmall"><span>图片</span></div>
                <div class="submitBtn">
                    <span>Ctrl or ⌘ + Enter</span>
                    <button class="commitBtn">评论</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 评论区 -->
    <div class="allComment"></div>
</div>`
    cup.innerHTML = li;
}
/**
 * @description: 渲染评论
 * @param  {*}
 * @return {*}
 * @param {*} where
 * @param {*} data
 * @param {*} author 作者
 */
function spliceComment(where, data, author, content) {
    let cup = document.querySelector(where);
    let reg = /<[^i][^>]+>/gi;
    content = content.replace(reg, '')
    let li = `<div class="comment" id="comment${data.commentId}">
                <div class="commentItem">
                    <div class="resImg"><img src="http://47.100.42.144:3389/${data.commentatorAvatar}" alt=""></div>
                    <div class="commentContent">
                        <div class="commentHeader"><span class="otherP">${data.commentator}</span><span
                            class="mid">@</span><span class="subOther">${author}</span></div>
                        <div class="commentDetail">${content}</div>
                        <div class="commentTime">
                            <div class="timeTime">6小时前<span class="delateComBTn">删除</span></div>
                            <div class="timeBox">
                                 <div class="timeGood ${data.isThumbUp}" id="iconGood"></div>
                                <div class="timeGood ${data.isDislike}" id="iconWorse"></div>
                                <div class="timeSay">回复</div>
                            </div>
                        </div> 
                        <div class="recordBox">
                                        <div class="record">
                                            <div class="commentIpt">
                                                <div class="recIptBox">
                                                    <input placeholder="回复${data.commentator}" type="text" id="recIpt${data.commentId}" class="recordCreate">
                                                </div>
                                                <div class="actionRecord">
                                                    <div class="emojiBtn"><img src="images/detail/emoji.svg" alt="表情"
                                                            class="iconSmall"><span class='recordEmoji'>表情</span>
                                                            </div>
                                                    <div class="upImgBtn"><img src="images/detail/up.svg" alt="图片"
                                                            class="iconSmall"><span>图片</span></div>
                                                    <div class="submitBtn">
                                                        <span>Ctrl or ⌘ + Enter</span>
                                                        <button class="recordBtn">评论</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="showRecord">
                                            
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>`
    cup.innerHTML += li
}

/**
 * @description: 左侧固定导航
 * @param  {*}
 * @return {*}
 * @param {*} where
 * @param {*} data
 */
function spliceSidebar(where, data, userId, articleId) {
    let cup = document.querySelector(where);
    let li = `<li class="sideIconItem ${data.isThumbUp}" onclick = "innerThumb(this,${userId},${articleId})"><span></span><span class="sideCount ${data.isThumbUp}" id="sideCount1">${data.thumbUpNum}</span></li>
    <li class="sideIconItem ${data.isDislike}" onclick = "innerDislike(this,${userId},${articleId})"><span></span><span class="sideCount" id="sideCount2"></span></li>
    <li class="sideIconItem"><a href="#cmm" id="cmt"></a><span class="sideCount" id="sideCount3">${data.commentNum}</span></li>
    <li class="sideIconItem"></li>
    <li class="sideIconItem"></li>
    <li class="sideShare">分享</li>
    <li class="sideIconItem"></li>
    <li class="sideIconItem"></li>
    <li class="sideIconItem"></li>`
    cup.innerHTML = li;
}
/**
 * @description: 回复内容模板 渲染回复
 * @param  {*}
 * @return {*}
 * @param {*} where
 * @param {*} data
 * @param {*} author
 */
function spliceRecord(where, data, author) {
    let temp = document.querySelector(where).children[0];
    let cup = temp.children[1];
    // let reg = /<[^>]+>/gi;
    // data.replyContent = data.replyContent.replace(reg,'')
    let li = `
    <div class="showRecord" id="reply${data.replyId}">
        <div class="resImg"><img src="http://47.100.42.144:3389/${data.replierAvatar}" alt=""></div>
        <div class="showRecordBox">
            <div class="commentHeader"><span class="otherP">${data.replier}</span><span
                class="mid">@</span><span class="subOther">${author}</span></div>
        <div class="commentDetail">${data.replyContent}</div>
        <div class="commentTime">
            <div class="timeTime">6小时前<span class="delateComBTn2">删除</span></div>
            <div class="timeBox">
                <div class="timeGood"></div>
                <div class="timeSay2">回复</div>
            </div>
        </div>
        </div>
    </div>`
    cup.innerHTML += li
}
/**
 * @description: 进入文章详情页 非常重要的一个函数 事件委托方式
 * @param  {*}
 * @return {*}
 * @param {*} where 文章渲染到哪个盒子里
 * @param {*} fromNum 拆分字符串的起始位置
 */
function intoDetail(where, fromNum) {
    let cupUl = document.querySelector(where);
    cupUl.addEventListener('click', function (e) {
        if (userId == null) {
            showLogin() //未登录，显示登录界面
        } else {
            let temp = e.path.find(num => {
                if (num.localName == 'li' && num.className == 'sign') {
                    return num
                }
            })
            userId = myUserId; //进去前就改回来，不然程序不会中断
            temp.style.opacity = '.5'
            let artId = temp.id.substring(fromNum, temp.id.length)
            getContent(userId, artId, temp.dataset.index); //获取文章详细信息并渲染
        }
    })
}
/* 删除和点赞评论调用在详情页内容加载完后 */
/**
 * @description: 删除评论
 * @param  {*}
 * @return {*}
 * @param {*} fromWhere 装评论的容器，发现好像可以不用
 * @param {*} result 数据
 * @param {*} articleId 文章id
 */
function delateComment(fromWhere, result, articleId) {
    let commentCup = document.querySelector(fromWhere);
    commentCup.addEventListener('click', (e) => {
        if (e.target.className == 'delateComBTn') { //如果点击的是删除按钮才触发事件
            let temp = e.path.find(num => {
                if (num.localName == 'div' && num.className == 'comment') {
                    return num
                }
            }) //获取到删除按钮所对应的评论id
            let commentId = temp.id.substring(7, temp.id.length)
            delateCom(userId, commentId, result, articleId); //获取文章详细信息并渲染
        }
    })
}
/**
 * @description: 点赞点踩评论执行函数
 * @param  {*}
 * @return {*}
 * @param {*} fromWhere 给谁添加事件
 * @param {*} userId 我的id
 * @param {*} btn 点击哪个按钮触发
 * @param {*} type 点赞还是踩
 */
function thumbDown(fromWhere, userId, btn, type) {
    let commentCup = document.querySelector(fromWhere);
    commentCup.addEventListener('click', (e) => {
        if (e.target.id == btn) { //如果点击的是点赞按钮才触发事件
            let temp = e.path.find(num => {
                if (num.localName == 'div' && num.className == 'comment') {
                    return num
                }
            }) //获取到点赞按钮所对应的评论id
            let commentId = temp.id.substring(7, temp.id.length)
            if (type == 'thumb') {
                if (e.target.className == 'timeGood true') {
                    commentThumb(userId, commentId, false, e.target); //点赞请求
                } else {
                    commentThumb(userId, commentId, true, e.target); //点赞请求
                }
            }
            if (type == 'down') {
                if (e.target.className == 'timeGood true') {
                    commentDown(userId, commentId, false, e.target); //点赞请求
                } else {
                    commentDown(userId, commentId, true, e.target); //点赞请求
                }
            }

        }
    })
}
/**
 * @description: 显示评论按钮 发送emoji
 * @param  {*}
 * @return {*}
 * @param {*} userId id
 * @param {*} articleId 文章id
 * @param {*} res 返回的数据
 */
function showCommit(userId, articleId, res) {
    let actionCommit = document.querySelector('.actionCommit'); //提交
    let commentCreate = document.querySelector('.commentCreate'); //输入框
    let commentInner = document.querySelector('.commentInner'); //大盒子
    let emojiBtn = document.querySelector('.emojiBtn');
    let emojiBox = document.querySelector('.emojiBox'); //装图标的盒子
    let category = document.querySelector('.category'); //emoji图标
    commentCreate.addEventListener('focus', () => {
        actionCommit.style.display = 'flex';
        let allComment = document.querySelector('.allComment');
        let recordLis = allComment.querySelectorAll('.record'); //获取全部的回复框，只显示一个
        for (let i = 0; i < recordLis.length; i++) {
            recordLis[i].style.display = 'none'
        }
    })
    commentInner.addEventListener('click', (e) => {
        e.stopPropagation()
        emojiBox.style.display = 'none'
    })
    //点击表情按钮弹出表情
    emojiBtn.addEventListener('click', e => {
        e.stopPropagation()
        emojiBox.style.display = 'block'
    })
    //点击图标显示到输入框内
    category.onclick = e => {
        if (e.target.className == 'emoji') {
            let target = e.target.alt;
            commentCreate.value += target;
        }
    }
    document.addEventListener('click', () => {
        actionCommit.style.display = 'none'
    }) //点击除本身以外的地方消失
    postCom(userId, articleId, res) //发布评论
}
/**
 * @description: 点击提交按钮
 * @param  {*}
 * @return {*}
 * @param {*} userId id
 * @param {*} article 文章id
 */
function postCom(userId, article, author) {
    let commentCreate = document.querySelector('.commentCreate'); //输入框
    let commitBtnS = document.querySelector('.commitBtn');
    commitBtnS.onclick = () => {
        if (commentCreate.value != '') {
            let comment = commentCreate.value;
            postComment(userId, article, comment, author);
            commentCreate.value = '';
        }
    }
    commentCreate.onkeydown = (e) => {
        if (e.key == 'Enter') {
            if (commentCreate.value != '') {
                let comment = commentCreate.value;
                postComment(userId, article, comment, author);
                commentCreate.value = '';
            }
        }
    }
}
/**
 * @description: 显示回复盒子 删除回复
 * @param  {*}
 * @return {*}
 * @param {*} userId 我的id
 * @param {*} author 作者
 * @param {*} articleId 文章id
 */
function recordBox(userId, author, articleId) {
    let allComment = document.querySelector('.allComment');
    allComment.onclick = e => {
        if (e.target.className == 'timeSay') {
            let temp = e.path.find(num => {
                if (num.localName == 'div' && num.className == 'comment') {
                    return num
                }
            }) //当前按钮的评论盒
            let recordIpt = temp.querySelector('.recordCreate'); //获取到输入框
            let recBox = recordIpt.parentNode.parentNode.parentNode; //外层盒子
            let recordLis = allComment.querySelectorAll('.record'); //获取全部的回复框，只显示一个
            for (let i = 0; i < recordLis.length; i++) {
                recordLis[i].style.display = 'none'
            }
            recBox.style.display = 'block';
            recordIpt.focus();
            let len = temp.id.length;
            let comId = temp.id.substring(7, len); //评论id
            postRecord(temp, recBox, userId, comId, author, articleId) //执行回复函数   
        }
        if (e.target.className == 'delateComBTn2') {
            let temp = e.path.find(num => {
                if (num.localName == 'div' && num.className == 'showRecord') {
                    return num
                }
            }) //当前按钮的评论盒
            let replyId = temp.id.substring(5, temp.id.length)
            delateRecord(userId, replyId, temp)
        }
    }
}
/**
 * @description: 发布回复
 * @param  {*}
 * @return {*}
 * @param {*} temp 上一个函数传来的值，是当前点击删除所在的评论
 * @param {*} recBox 回复输入框
 * @param {*} userId 我的id
 * @param {*} commentId 评论的id
 * @param {*} author 回复谁的评论
 * @param {*} articleId 回复的在的文章id
 */
function postRecord(temp, recBox, userId, commentId, author, articleId) {
    let resBtn = temp.querySelector('.recordBtn'); //最外层盒子
    let recIpt = document.querySelector('#recIpt' + commentId) //输入框
    resBtn.onclick = () => {
        if (recIpt != '') {
            recBox.style.display = 'none';
            commitRecord(userId, commentId, recIpt.value, recIpt, author, articleId) //发送回复请求
        }
    }
    recIpt.onkeydown = e => {
        if (recIpt != '' && e.key == 'Enter') {
            recBox.style.display = 'none';
            commitRecord(userId, commentId, recIpt.value, recIpt, author, articleId) //发送回复请求
        }
    }

}
/**
 * @description: 点击进入别人的主页函数
 * @param  {*}
 * @return {*}
 */
function getYourMain() {
    let lovePeopleBox = document.querySelector('.lovePeopleBox');
    lovePeopleBox.onclick = e => {
        let temp = e.path.find(num => {
            if (num.localName = 'li' && num.className == 'loveMe') {
                return num
            }
        })
        let youId = temp.id.substring(5, temp.id.length);
        userId = youId;
        youInfo(youId)
    }
}