/*
 * @Description: 登录
 * @Author: 林俊丞
 * @Date: 2021-04-17 17:23:19
 * @LastEditTime: 2021-04-30 10:24:52
 * @LastEditors: 林俊丞
 */
var userId = null;
var page = 1;
var myUserId = null;//这个用来保存我的id，因为在后面的操作中会改变userId
window.addEventListener('load', () => {
    initData();//初始化cookie，自动登录
    // 点击叉叉关闭模态框
    let loginFace = document.querySelector('.loginFace');//登录模态框
    let close = loginFace.querySelector('#close1');//模态框关闭按钮
    let loginBtn = document.querySelector('.loginBtn');//左上角的登录按钮
    let body = document.querySelector('body');
    loginBtn.addEventListener('click', () => {
        loginFace.style.display = 'flex';
        body.className = 'noScroll';
    })
    close.addEventListener('click', hide('.loginFace', hide('.otherBox'), function () {
        telBox.style.display = 'block';
        body.className = '';
    }))
    //点击切换其他方式登录
    let other = loginFace.querySelector('.other');//其他方式登录
    let phone = loginFace.querySelector('.phone');//手机登录
    let telBox = loginFace.querySelector('.telBox');//手机登录页面
    let otherBox = loginFace.querySelector('.otherBox');//其他方式登录页面
    other.addEventListener('click', hide('.telBox', show('.otherBox')));
    phone.addEventListener('click', show('.telBox', hide('.otherBox')));
    //登录
    let loginBtn2 = document.querySelector('#loginBtn2');//其他方式登录的登录按钮

    function pushReq2() {
        let valId = loginFace.querySelector('.tewIpt');//账号输入框
        let valPsd = loginFace.querySelector('#codeIpt2');//密码框
        let tipsList = document.querySelector('#tipsList');//错误提示
        let regId = /^[a-z]+[1-3]$/;//账号的正则表达
        if (valId.value != '' && valPsd.value != '') {
            if (regId.test(valId.value)) {
                inLogin(); //发送请求
            } else {
                let Lis = document.createElement('li');
                Lis.innerHTML = '账号不存在';
                tipsList.insertBefore(Lis, tipsList.children[0]);
                setInterval(() => {
                    Lis.remove();
                }, 2000)
            }
        } else {
            let Lis = document.createElement('li');
            Lis.innerHTML = '请输入账号或密码';
            tipsList.insertBefore(Lis, tipsList.children[0]);
            setInterval(() => {
                Lis.remove();
            }, 2000)
        }
    }
    loginBtn2.onclick = pushReq2;
})