/*
 * @Description: 首页
 * @Author: 林俊丞
 * @Date: 2021-04-18 13:57:14
 * @LastEditTime: 2021-04-28 12:59:09
 * @LastEditors: 林俊丞
 */
window.addEventListener('load', function () {
    if(userId==null) {
        getArticle(91,1)//没有账号登录时的空账号
    }
    //投放广告
    let posBan = document.querySelector('.posBan');
    posBan.addEventListener('mouseenter', classToggle('.noneIcon', '', 'noneIcon'))
    posBan.addEventListener('mouseleave', classToggle('.noneIcon', '', 'noneIcon'))
    //点击头像
    let myMore = document.querySelector('.myMore');
    let myImg = document.querySelector('#myImg');
    document.addEventListener('click', function () {
        if (myMore.style.display == 'block') {
            myMore.style.display = 'none';
        }
        let meBox = document.querySelectorAll('.meBox');
        let containBox = document.querySelectorAll('.containBox')
        for (let i = 0; i < meBox.length; i++) {
            containBox[i].innerHTML = `<button class="editBtn2">修改</button>`
        }
    })
    myImg.addEventListener('click', (e) => {
        e.stopPropagation();
        myMore.style.display = 'block'
    })
    let about = document.querySelector('#about');
    let aboutLi = document.querySelector('.aboutLi')
    //滑过关于 弹出框
    about.addEventListener('mouseenter', show('.aboutLi'));
    about.addEventListener('mouseleave', hide('.aboutLi'));
    aboutLi.addEventListener('mouseenter', show('.aboutLi'));
    aboutLi.addEventListener('mouseleave', hide('.aboutLi'));
    //点击输入框 输入框的变化效果
    let searchIpt = document.querySelector('.searchIpt');
    searchIpt.onfocus = function () {
        this.placeholder = '文章/小册/标签/用户';
        classToggle('.searchBox', 'searchBox', 'searchBox searchFocus')();
    }
    searchIpt.onblur = function () {
        this.placeholder = '探索掘金';
        classToggle('.searchBox', 'searchBox searchFocus', 'searchBox')();
    }
    //点击logo返回
    let logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        //回到主页
        homePage();
    })

})