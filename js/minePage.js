/*
 * @Description: 我的主页
 * @Author: 林俊丞
 * @Date: 2021-04-20 14:53:50
 * @LastEditTime: 2021-05-03 13:36:45
 * @LastEditors: 林俊丞
 */
window.addEventListener('load', function () {
    // getLoved(userId)
    // getArticle(89,2)
    //点击进入我的主页
    let myHome = document.querySelector('#myHome');
    myHome.addEventListener('click', () => {
        minePage(); //进入我的主页页面
        myInfo(userId); //获取我的个人信息
        getMyLove(userId); //获取我的点赞
        getSubNum(userId); //获取关注我的人
        getSubMeNum(userId) //获取我关注的人
    })
    let goodItem = document.querySelector('#goodPot'); //赞的下拉列表
    let moreItem = document.querySelector('#morePot'); //更多的下拉列表
    //点击赞和更多出现对应盒子
    goodItem.addEventListener('click', (e) => {
        e.stopPropagation();
        hide('.moreBox')();
        show('.goodBox')();
    })
    moreItem.addEventListener('click', (e) => {
        e.stopPropagation();
        show('.moreBox')();
        hide('.goodBox')();
    })
    bodyPot(); //点击其他地方盒子隐藏
    let allAct = document.querySelector('#allAct'); //我的文章
    let actHeader = document.querySelector('.actHeader'); //文章头部
    let actHeaderLi = actHeader.querySelectorAll('li'); //头部导航
    // 点击文章加载发送请求
    allAct.addEventListener('click', () => {
        for (var i = 0; i < actHeaderLi.length; i++) {
            actHeaderLi[i].className = ''
        }
        allAct.className = 'selected';
        let contentAct1 = document.querySelector('#contentAct1');
        contentAct1.innerHTML = ''
        showBox('.bodyBox');
        getMyWrite(userId);
    })
    let goodBtn1 = document.querySelector('#goodBtn1'); //赞的两个按钮
    let goodBtn2 = document.querySelector('#goodBtn2');
    let hotText1 = document.querySelector('#hotText1'); //更多的两个按钮
    let hotText2 = document.querySelector('#hotText2');
    //点击赞的文章
    goodBtn1.addEventListener('click', () => {
        hotText2.style.opacity = '.5'
        hotText1.style.opacity = '1'
        onlyMy('.actHeader', '#goodPot');
        showBox('.bodyBox2');
        getMyLove(userId); //我的点赞
    })
    //赞的沸点
    goodBtn2.addEventListener('click', () => {
        hotText1.style.opacity = '.5'
        hotText2.style.opacity = '1'
        onlyMy('.actHeader', '#goodPot')
        showBox('.bodyBox2');
    })
    let collectBox1 = document.querySelector('#collectBox1');
    let collectBox2 = document.querySelector('#collectBox2');
    let loveBox1 = document.querySelector('#loveBox1');
    let loveBox2 = document.querySelector('#loveBox2');
    //收藏 第一个 收藏集
    collectBox1.addEventListener('click', () => {
        loveBox1.style.opacity = '1';
        loveBox2.style.opacity = '.5';
        onlyMy('.actHeader', '#morePot')
        showBox('.bodyBox3');
    })
    //收藏第二个 关注
    collectBox2.addEventListener('click', () => {
        loveBox2.style.opacity = '1';
        loveBox1.style.opacity = '.5';
        onlyMy('.actHeader', '#morePot');
        let loveBest = document.querySelector('#loveBest');
        let myLoveM = document.querySelector('#myLoveM');
        myLoveM.className = '';
        loveBest.className = 'selectedA'
        showBox('.bodyBox5');
        getSubMe(userId) //我关注的人
    })
    let myLoveM = document.querySelector('#myLoveM');
    let loveBest = document.querySelector('#loveBest');
    //点击关注者
    myLoveM.addEventListener('click', function () {
        getLoved(userId); //关注我的人
        this.className = 'selectedA'
        loveBest.className = ''
    })
    //点击关注的人
    loveBest.addEventListener('click', function () {
        this.className = 'selectedA';
        myLoveM.className = '';
        getSubMe(userId);
    })
    getYourMain(); //点击进入别人的主页
})