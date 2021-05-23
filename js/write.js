/*
 * @Description: 写文章
 * @Author: 林俊丞
 * @Date: 2021-04-19 22:43:07
 * @LastEditTime: 2021-04-26 23:12:24
 * @LastEditors: 林俊丞
 */
window.addEventListener('load', function () {
    let write = document.querySelector('#write'); //写文章按钮
    let loginFace = document.querySelector('.loginFace'); //登录模态框
    let body = document.querySelector('body');
    let writeLi = document.querySelector('#writeLi'); //下拉框的写文章
    write.addEventListener('click', () => {
        if (userId == null) {
            loginFace.style.display = 'flex';
            body.className = 'noScroll';
        } else {
            writePage();
        }
    })
    writeLi.addEventListener('click', () => {
        //进入文章页
        writePage();
    })
    //点击头像
    let headImg = document.querySelector('.headImg');
    headImg.addEventListener('click', function (e) {
        e.stopPropagation()
        show('.headShow')()
    })
    body.addEventListener('click', function () {
        let headShow = document.querySelector('.headShow') //点击头像出来的盒子
        if (headShow.style.display == 'block') {
            headShow.style.display = 'none';
        }
    })
    let writeAbout = document.querySelector('.writeAbout'); //关于
    let moreMe = document.querySelector('.moreMe'); //关于的内容
    writeAbout.addEventListener('mouseenter', show('.moreMe'));
    writeAbout.addEventListener('mouseleave', hide('.moreMe'));
    moreMe.addEventListener('mouseenter', show('.moreMe'));
    moreMe.addEventListener('mouseleave', hide('.moreMe'));
    //上传数据，发布文章
    let publish = document.querySelector('.publish');
    publish.addEventListener('click', function () {
        //数据
        let titleIpt = document.querySelector('.titleIpt'); //标题
        let writeContent = document.querySelector('.writeTex'); //内容
        let title = titleIpt.value;
        let content = writeContent.value;
        if (title != '' && content != '') {
            writeIn(userId, title, content);
        } else {
            console.log('没写');
            alert('您未输入任何内容');
        }
        //发送文章
    })
    //返回主页
    let goAfter = document.querySelector('#goAfter');
    goAfter.addEventListener('click', () => {
        homePage();
    })
    //返回我的主页
    let myHomeW = document.querySelector('#myHomeW');
    myHomeW.addEventListener('click', () => {
        minePage();
        myInfo(userId);
        getMyLove(userId);
        getSubMe(userId);
        getLoved(userId);
    })
})