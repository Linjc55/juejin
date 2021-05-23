/*
 * @Description: 退出登录
 * @Author: 林俊丞
 * @Date: 2021-04-19 16:56:39
 * @LastEditTime: 2021-04-28 13:00:30
 * @LastEditors: 林俊丞
 */
window.addEventListener('load',function() {
    let logout = document.querySelector('#logout');//登出按钮
    logout.addEventListener('click',test);
    function test() {
        let temp = confirm('确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！');
        if(temp == true) {
            out();//退出函数
        }
    }
})