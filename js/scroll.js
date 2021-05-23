/*
 * @Description: 滚动页面的变化
 * @Author: 林俊丞
 * @Date: 2021-04-17 22:37:03
 * @LastEditTime: 2021-05-14 19:00:05
 * @LastEditors: 林俊丞
 */
let beforeTop = 0;
/**
 * @description: 这个函数是关于页面滚动头部变化的
 * @param  
 * @return 
 */

window.addEventListener('scroll', throttle(scrollF, 200));
/**
 * @description: 实现页面滚蛋是头部的变化
 * @param  {*}
 * @return {*}
 */
function scrollF() {
    lazyLoad(userId);
    let mainHeader = document.querySelector('.mainHeader');
    let miniFix = document.querySelector('.miniFix');
    let sideBox = document.querySelector('.sideBox');
    let editNav = document.querySelector('.editNav');
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 375) {
        mainHeader.style.transform = 'translateY(-60px)';
        miniFix.style.transform = 'translateY(-60px)';
        editNav.style.transform = 'translateY(-60px)';
        if (scrollTop > 1700) {
            sideBox.className = 'sidebarFix sideBox'
            sideBox.style.transform = 'translateY(57px)'
            if (scrollTop < beforeTop) {
                sideBox.style.transform = 'translateY(117px)'
            } else {
                sideBox.style.transform = 'translateY(57px)'
            }
        } else {
            sideBox.style.transform = 'translateY(0px)'
            sideBox.className = 'sideBox'
        }
        if (scrollTop < beforeTop) {
            mainHeader.style.transform = 'translateY(0px)'
            miniFix.style.transform = 'translateY(0px)';
            editNav.style.transform = 'translateY(0px)';
        } else {
            mainHeader.style.transform = 'translateY(-60px)';
            miniFix.style.transform = 'translateY(-60px)';
            editNav.style.transform = 'translateY(-60px)';
        }
        setTimeout(() => {
            beforeTop = scrollTop;
        }, 0)
    } else {
        mainHeader.style.transform = 'translateY(0px)'
        miniFix.style.transform = 'translateY(0px)';
        beforeTop = scrollTop;
    }
}
//小火箭缓慢置顶
window.addEventListener('load', () => {
    let rocketImg = document.querySelector('.rocketImg');
    rocketImg.addEventListener('click', () => {
        let time = setInterval(() => {
            let top = pageYOffset;
            let step = Math.ceil(top / 50);
            window.scroll(0, top - step);
            if (top == 0) {
                clearInterval(time);
            } else if (top > beforeTop) {
                clearInterval(time);
            }
        }, 10);
    })
})
/**
 * @description: 加载主页文章
 * @param  {*}
 * @return {*}
 * @param {*} userId
 */
 function lazyLoad(userId) {
    let scrollTop = document.documentElement.scrollTop;
    let clH = document.documentElement.clientHeight;
    let doc = document.querySelector('.newsMain');
    //滚动时的加载
    if (scrollTop > (doc.offsetHeight - clH) - 150 && doc.offsetHeight > 1200 * page) {
        if (userId != null) {
            if (page == 11) {
                alert('没有了喔')
            } else {
                page++;
                getArticle(userId, page)
            }
        } else {
            showLogin()
        }
    }
}