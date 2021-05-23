/*
 * @Description: 编辑资料页面
 * @Author: 林俊丞
 * @Date: 2021-04-22 01:03:25
 * @LastEditTime: 2021-04-28 12:57:42
 * @LastEditors: 林俊丞
 */
window.addEventListener('load', function () {
    let editBtn = document.querySelector('.editBtn');
    //点击进入编辑资料
    editBtn.addEventListener('click', () => {
        editPage();
    })
    let editHome = document.querySelector('#editHome');
    //点击返回我的主页
    editHome.addEventListener('click', () => {
        minePage();
        myInfo(userId)
        
    })
    let uploadBtn = document.querySelector('.uploadBtn');
    let fileIpt = document.querySelector('#fileIpt');
    //点击按钮上传图片
    uploadBtn.addEventListener('click', async function () {
        fileIpt.click();
    })
    //当文件选择完毕，发送修改请求
    fileIpt.addEventListener('change', function () {
        let file = fileIpt.files[0];
        let fd = new FormData();
        fd.append('userId', userId);
        fd.append('avatar', file);
        editHead(fd);//编辑头像函数，改变全局头像
    })
    //点击输入框或者点击修改
    let meBox = document.querySelectorAll('.meBox'); //全部的輸入框和按鈕
    let containBox = document.querySelectorAll('.containBox');
    let editName = document.querySelector('#editName');
    let editInfo = document.querySelector('#editInfo');
    //循环绑定所有输入框
    for (let i = 0; i < meBox.length; i++) {
        meBox[i].onclick = function (e) {
            e.stopPropagation();
            for (let i = 0; i < meBox.length; i++) {
                containBox[i].innerHTML = `<button class="editBtn2">修改</button>`
            }
            containBox[i].innerHTML = `<button class="editBtn2" id="keep">保存</button><button class="editBtn2 cancel">取消</button>`
            let keep = document.querySelector('#keep');
            //点击保存按钮
            keep.onclick = function (e) {
                e.stopPropagation()
                for (let i = 0; i < meBox.length; i++) {
                    containBox[i].innerHTML = `<button class="editBtn2">修改</button>`
                }
                editInformation(userId, editName.value, editInfo.value);//保存发送更改请求
            }
            //点击取消按钮
            let cancel = document.querySelector('.cancel') 
            cancel.onclick = function(e) {
                e.stopPropagation()
                for (let i = 0; i < meBox.length; i++) {
                    containBox[i].innerHTML = `<button class="editBtn2">修改</button>`
                }
            }
            
        }
    }

})