# 研发最终考核

## 写在前面

这次考核任务大概花了10天左右，大概在4月27号完成的，每天都在爆肝，最晚一天是写到了凌晨4点钟，从目前的完成度以及一些细节的处理上来看还是挺满意的，总之，我真的尽力了！我做到了！在刚拿到任务的那一刻，整个人都是震惊的，以前没有写过涵盖这么多知识的`demo`，当时是真的懵了，26个接口，5个页面...，超乎了我的想象，现在写完还有点意犹未尽。

## 项目结构说明

采用了模块化的思想 ，但实现的效果一般般，没有完全的贯穿模块化理念，有个别函数有冗余的情况

- `images`文件夹中存放了所有的图片，在文件夹中也对图片出现的位置进行了归类，比如，写文章页面出现的`svg`都存放于`write`文件夹中，方便查找
- `css`文件夹存放了所有的样式文件，每个小页面都有自己`css`样式文件，方便于后期的代码维护
- `js`文件夹中存放了所有的`js`文件，每个页面也有单独的文件，在`api.js`文件中存放了所有的请求，以及请求成功后的回调，在`tool.js`文件中存放了一些工具类函数，像隐藏，显示，回到主页，以及一些请求成功后常用到的函数像一些模板字符串之类的

## 实现效果

> 在`gitee`上部署了，但是有点问题，就不放了

实现了95%的功能，总体上个人感觉效果还是很不错的，附加功能都有完成，懒加载，发送表情，但是遗憾的是回复没有发送表情的功能，其实和评论的原理是一样的，但是因为一些原因需要做取舍，下面会讲到

## 项目反思

### 项目的不足

1. 在回复功能上，不能实现点击其他地方，==隐藏回复框==，造成的原因是因为采用了事件委托，子元素的点击冒泡到父元素身上，如果再在`document`身上绑定点击隐藏的话，根据事件冒泡的原则，最后才会冒泡到`document`身上，所以最后的结果是显示不出来，但是还是尽可能地优化了，只让一个回复框同时出现，尽可能的减少了这个问题造成的影响。

2. 在我的主页里，删除文章的三个点按钮，我的效果是鼠标移出这个文章区域后就隐藏，原版是，只有点击其他地方才会隐藏，没有解决的原因有两点，其一，个人感觉这样的效果其实不亚于原版的体验，其二，这个鼠标移入显示分享和更多的效果是采用`css`中的`hover`实现的，从实现难度来说，这样的实现方式会更加的简单
3. 为了实现，用户在文章详情页中点赞的效果能反馈到主页的文章按钮上，在返回主页的时候重新加载了主页面，造成了，没有已阅读透明度降低的效果，这是一点取舍
4. 在进入其他用户的主页时，应该有个关注按钮，这里省去了
5. 在进入其他人主页后，他人的点赞文章的点赞按钮全亮，但是实际上应该根据自己是否点赞来显示

### 项目的亮点

> 感觉还是做了很多细节处理的

1. 在登录功能上，采用了`cooike`对数据用户的登录数据进行了保存，并且实现了自动登录的功能，这里有一点小小的问题，我采用的是名码储存，没有对用户的数据进行加密处理，这个有考虑到，可以采用`base64`或`MD5`进行加密，查到的资料，没有很准确的用法，就没有实现了
2. 在主页面的右下角，增加了一个小火箭，实现==置顶功能==，速度是逐渐减缓的，同时也有为用户的操作考虑，当用户再下滑时会立即停止置顶，感觉不错
3. 主页文章是通过==懒加载==实现的，减少了不必要的请求，当用户下滑置底一定距离时，才会加载下一页
4. 对于一些操作会有相应的==遮罩层提醒==，操作的成功，比如修改资料成功这些
5. 利用正则表达式实现了评论==发送表情的功能==
6. 对于评论和回复的获取采用了，递归的思想，当返回的数据没有占满时，不会继续请求下一页的数据，很大程度的==减少了发送请求==的次数，将25次请求，减少到了最少的5次
7. 给左上角的`logo`添加了点击返回主页事件，虽然这是一个很简单的操作，但是真的是非常实用
8. 对于绝大多数高重复的事件，都采用了特殊的==事件委托==方式，绑定到其父元素上，极大的减少了事件的数量，提高了性能
9. 使用`axios`拦截器实现了加载时的==加载动画==效果，但是对于极短的加载时间没有处理

### 项目的遗憾

1. 在开始项目时，没有一个很完整的架构，就是没有明确自己要实现哪些额外的功能，只有一个大概的框架，导致了到最后没能实现想做的功能
2. 想实现一个==换肤==的功能，但是由于，全局颜色搭配事先没有考虑好，导致效果不好舍弃了，
3. 想实现一个==点击出现爱心==的效果，但是最后只能实现一个爱心的淡入淡出，整体的效果还是很拉跨，舍弃了

### 遇到的难题

1. 获取动态创建的元素

感觉动态获取元素算是一个比较复杂的地方，用了几种不同的方法

**第一种**

> 将事件绑定在已经存在的父级身上，也就是事件委托

```js
//重要的部分
let temp = e.path.find(num => {
    if (num.localName == 'div' && num.className == 'comment') {
           return num
    }
})
```

和传统的事件委托有点不一样，一般是采用`e.target`来获取元素，但是这样获取到的元素往往不是我们想要到，这里采用了`e.path`方法获取事件触发对象的所有父元素，返回的是一个父元素数组，因此可以通过数组中`find`方法，来选择符合条件的，也就是我们需要的元素。

**第二种**

获取事件的原因是要添加事件，因此我通过绑定`Dom0`级的行内事件，给每个有需求的元素绑定事件，也就是出生就带有事件，通过`this`关键字将元素本身给返回出去，也能实现对元素本身的更改

2. 判断关注与未关注

在文章详情页中的关注按钮，需要先通过获取用户关注的人，再判断作者是否关注作者，我的解决方法是，获取到用户关注的人，全部存入一个数组中，通过数组中`indexOf`的方法，来判断作者是否在用户的关注列表当中，这里有个需要注意的地方是，`indexOf`的判断原则是`===`包括数据类型也要一致，不一致时可以通过`parseInt`或者`toString`方法做字符串和数字之间的转化

3. 发送解析`emoji`表情

第一次做这个功能，查看了很多的资料文档，最后用了自己理解的方法，给每个表情添加一个相当于解释的文字，也就是我采用的`img`中的`alt`属性，当用户点击时将属性呈现在输入框中，这里其实也可以用输入法自带的图标（用文字的话其实效果不太好），在解析数据时，利用正则表达判断返回的内容中是否包含我们表情的解释文字，如果有，那就还原成对应的`img`图片

```js
//把所有的文字存入数组中，通过调用数组的方法来完成我们的功能
let temp = ['[微笑]', '[亲亲]', '[破涕而笑]', '[震惊]', '[色]', '[赞]', '[踩]', '[大笑]', '[哭泣]', '[爱心]', '[心碎]'];
        if (result.data.length != 0) {
            for (let i = 0; i < result.data.length; i++) {
                //解析emoji 
                let comment = result.data[i].comment;//这一步是保存后台返回的数据，进行处理
                let reg = /\[微笑\]|\[亲亲\]|\[破涕而笑\]|\[震惊\]|\[色\]|\[赞\]|\[踩\]|\[大笑\]|\[哭泣\]|\[爱心\]|\[心碎\]/gm;//正则表达式，判断是否有emoji
                let mat = comment.match(reg);//利用match方法获取到所有符合正则的部分
                let content = comment;
                if (mat != null) {
                    for (let i = 0; i < mat.length; i++) {
                        //利用repalce方法将对应的文字替换成对应图片
                        content = content.replace(mat[i], '<img class="emoji" alt="' + mat[i] + '" src="images/emoji/' + (temp.indexOf(mat[i]) + 1) + '.svg">')
                    }
                }
                spliceComment('.allComment', result.data[i], author, content) //渲染评论
            }
        }
```

## 实现功能说明

### 登录注销功能

#### 实现思路

通过获取输入框中的数据，前端先进行==初步的正则判断==，减少不必要的请求，当输入的账号格式符合要求时（也就是姓名加数字123），再向服务器发送请求，如果登录成功，则通过用户`id`获取用户的信息，再将返回的数据渲染到页面上，并且将账号，密码，头像，id，个人介绍进行`cookie`的==储存==，因为这些数据是在下次自动登录时，直接呈现在用户面前的。在退出账号时，清空`cooike`。在正常情况下，会先判断`cookie`中是否存在`username`以及用户密码`psd`如果存在，则自动登录，并将数据渲染在页面上。

#### 实现过程

- 当用户未登录时，进行大部分操作都会强制弹出登录框，要求用户登录

- 点击登录按钮，弹出登录模态框，并且禁止鼠标滚动

```js
loginBtn.addEventListener('click', () => {
        loginFace.style.display = 'flex';//loginFace是登录模态框的最外层盒子
        body.className = 'noScroll';//禁止滚动
})
```

- 当用户输入完成后，先进行前台处理，再决定是否发送请求
  - `regId`是账号的正则表达式，当输入的账号符合正则表达式时，才调用`inLogin`函数，发送登录请求
  - 如果输入的账号不符合正则表达时，则在右上角弹出相应的提示信息，维持两秒
  - 当用户未输入也点击了登录按钮时，也会弹出相应的提示信息

> 这个处理还是很全面的

```js
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
```

- 发送请求成功回调
  - 如果密码错误，则提示用户重新输入账号或密码
  - 如果登录成功则整理页面，关闭模态框，显示用户头像，一系列的初始化操作
  - 在`myInfo`函数中，通过用户登录成功后返回的`id`，获取用户的个人信息，渲染到页面上，同时也将用户的重要数据存入`cookie`中

> 节选了成功回调中的一小段

因为主页文章的点赞信息是通过用户个人来断定的，所以在登录成功后需要更新首页的文章

```js
if (data.message != '登录失败') {
        myInfo(userId);//获取用户信息，以及cookie
        getArticle(userId, 1);//主页文章显示第一页
}
```

`myInfo`函数，与其说是函数不如说是请求

```js
let myImg = document.querySelectorAll('.allHead');//所有用户自己的头像
let userName = document.querySelector('.userName');//主页用户名
let work = document.querySelector('.work');//个人介绍盒子
let editName = document.querySelector('#editName');//编辑资料页面的内容也要改变
let editInfo = document.querySelector('#editInfo');//同上
for (let i = 0; i < myImg.length; i++) {
    myImg[i].src = 'http://47.100.42.144:3389/' + res.avatar;//由于用户头像很多，通过for循环改变所有头像
}
editName.value = res.nickname;//当前用户昵称
editInfo.value = res.introduction;//当前个人介绍
userName.innerHTML = res.nickname;//昵称渲染在主页
work.innerHTML = res.introduction;//个人介绍渲染
setCookie(userId);//设置cookie
```

至此用户登录的操作就全部完成了，`cooike`部分在后面会写到

- 注销账号
  - 点击退出并且确认后，直接退出，清空`cooike`，将首页的文章内容重置，返回主页
  - 重置的方式是，利用自己的一个空账号，造成空白账号的效果

```js
logout.addEventListener('click',test);//点击退出按钮
function test() {
    let temp = confirm('确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！');//弹出提示框
    if(temp == true) {//用户点击确认时，进行退出操作
        out();//退出函数
    }
}
```

> 注销成功的回调中，只是对cookie的删除以及，一些重置页面的简单操作

### 自动登录功能

#### 实现思路

1. 在登录成功后，将数据存入`cookie`中
2. 在下次登录时先判断`cookie`中是否有登录数据
3. 从`cookie`中获取数据，实现登录
4. 退出登录时，移除`cookie`

#### 实现过程

##### 设置`cookie`

`setCookie`函数中的一段

```js
let date = new Date();
date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
if (valId.value != '' && valPsd.value != '') {
     document.cookie = 'username=' + valId.value + ';path=/;expires=' + date.toGMTString();
     document.cookie = 'psd=' + valPsd.value + ';path=/;expires=' + date.toGMTString();
}
document.cookie = 'userId=' + userId + ';path=/;expires=' + date.toGMTString();
document.cookie = 'imgSrc=' + imgSrc[1].src + ';path=/;expires=' + date.toGMTString();
document.cookie = 'work=' + work.innerHTML + ';path=/;expires=' + date.toGMTString();
```

设置`cookie`需要通过键值对的方式，每个数据都要设置过期时间，这个过期时间采用的是格林威治时间，中国采用的是东八区时间，会有8小时差距，这里没有做处理，直接设置了30天的过期时间，8小时看来不太重要

##### 取出`cookie`

传入需要查找的`cookie`值，将本地的`cookie`转换成数组，通过`indexOf`方法来判断需要查找的`cookie`是否存在，存在则返回对应值

```js
function getCookie(cookieName) {
    cookieName += '=';
    let cookieList = document.cookie.split(';');//将cookie转化成数组
    for (let i = 0; i < cookieList[i].length; i++) {
        let cookieItem = cookieList[i].trim(); //去除空格
        if (cookieItem.indexOf(cookieName) != -1) {
            return cookieItem.substring(cookieName.length, cookieItem.length)//对应属性值
        }
    }
}
```

##### 移除`cookie`

移除`cookie`的方法是，将时间设置为一个过去的时间，`cookie`过期后将会自动的移除

```js
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
```

##### 初始化自动登录

先判断是否存在登录所需要的`cookie`，如果有则将页面进行初始化，将保存的数据一一渲染到页面上，头像，个人介绍之类的

```js
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
		//一些其他操作
    }
}
```

### 获取文章功能

> 这里一共有三块，首页文章，我的文章，我的点赞文章,实现的思路是一样的

#### 实现思路

先按照官网，写其中一个列表项的结构以及`css`样式，再将这个结构作为模板，通过模板字符串与后台返回的数据进行拼接，最终渲染到页面上，形成一个一个样式相同但内容不同的列表项

#### 实现过程

> 这个是获取首页文章成功回调

将成功返回的数据传给模板字符串进行拼接，渲染

```js
function successPage(res) {
    for (let i = 0; i < res.length; i++) {
        spliceAll('#mainPageAct', res[i])//传入数据，用模板进行渲染
    }
}
```

### 点赞点踩功能

点赞功能在页面中有很多，文章点赞，回复点赞，评论点赞，文章详情页的侧边栏点赞

#### 实现思路

1. 通过给点赞按钮绑定点击事件，当被点击时，通过判断原先的按钮颜色，来决定是点赞还是取消点赞
2. 由于列表项是通过后台数据渲染出来的，属于给动态元素添加事件
3. 对于这个按钮，我采用的方法是，使用行内样式，这样会简单很多

#### 实现过程

实现的过程很简单给按钮绑定行内事件

```js
<li class="${data.isThumbUp}" onclick = "tempThumb(this,${userId},${data.articleId})">内容</li>
```

触发的函数

```js
function tempThumb(_this, userId, articleId) {
    event.stopPropagation();//阻止事件冒泡，以免点击点赞按钮直接进入文章详情页
    if (userId != null) {
        if (_this.className == 'selected' || _this.className == 'true') {//判断按钮当前样式，是否已点赞
            _this.className = '';//取消点赞移除类名
            _this.children[1].innerHTML--;//数量先减一，给用户直接反馈
            thumbUp(userId, articleId, false);//发送取消点赞请求
        } else {
            _this.children[1].innerHTML++;
            _this.className = 'selected';
            thumbUp(userId, articleId, true);
        }
    } else {
        showLogin()//未登录弹出登录框
    }
}
```

> 对于其他几个地方的点赞功能，实现的方法大体相同，只是在对数据或者类名的处理上有些许不同

### 进入文章详情页功能

#### 实现思路

1. 准备一个文章详情页的模板
2. 通过文章id获取文章详细内容，通过模板渲染出来
3. 由于接口返回的数据没有作者的id，可以通过获取主页文章时的文章id，传到后面使用
4. 通过判断点击的是哪个盒子，并且获取到盒子对应的文章id，渲染出来

#### 实现重点

最重要的一点，判断点击盒子对应的文章id，其他的事，交给模板字符串处理

通过给所有的列表项添加一个特定的标志，我这里添加的是一个类名`sign`。再通过`e.path.find`找到点击事件触发的`li`，再通过`li`身上的文章`id`值，从而得到了文章的`id`，以此`id`向服务器发送请求，获取详细内容，渲染页面

```js
let temp = e.path.find(num => {
    if (num.localName == 'li' && num.className == 'sign') {//获取到符合筛选条件的li
         return num
       }
})
userId = myUserId; //进去前就改回来，不然程序不会中断 这是后面进入别人主页用到的
temp.style.opacity = '.5'
let artId = temp.id.substring(fromNum, temp.id.length)//截取出文章的id
```

### 获取评论回复功能

#### 实现思路

> 其实这些大量重复的思路都是一样的，准备模板，添加数据

对于评论和回复也不例外，这里面存在了一层的嵌套关系，当获取完评论后，需要获取评论下的回复。在获取评论和回复是，需要做到减少不必要的请求，当评论空了之后，就没有必要继续向下请求了

1. 先获取文章评论，渲染页面
2. 获取回复，渲染回复

#### 实现重点

这个操作其实很简单，重要的是要做到减少发送请求的次数

在这里我采用的是递归的方法，先主动调用获取第一页的评论，如果，这一页的评论满了，再获取下一页，如果没满则不再获取，很好的实现了减少请求次数，在每次获取评论完成后通过`then`再获取对应评论下的回复，处理方法也是递归

```js
//发送获取评论请求
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
        if (result.data.length != 0) {
            for (let i = 0; i < result.data.length; i++) {
                //解析emoji 代码这里不贴了
                spliceComment('.allComment', result.data[i], author, content) //渲染评论模板
            }
        }
        return result
    }).then((result) => {
        showCommit(userId, articleId, author); //显示评论按钮
        //减少发送请求
        if (result.data.length == 5) {//当这一页满时，长度会是5，就获取下一页
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
```

### 发布评论回复功能

#### 实现思路

> 评论和回复的方法一致，只是渲染的样式不一样，其他基本一致

1. 点击回复弹出回复框
2. 点击评论按钮，提交发送评论或者回复请求
3. 重新获取渲染文章的评论回复

### 删除点赞点踩评论功能

#### 实现思路

1. 因为评论和回复的量都会很大，所以采用了事件委托的方式，给整个评论盒子绑定点击事件，判断点击的控件属于哪个评论`id`
2. 向服务器发送操作请求
3. 实时更改页面样式
4. 删除时，将对应的`li`直接移除，点赞时，通过类名的切换实现切换的效果

#### 实现重点

判断点击的控件所属的列表项`id`

通过前面所写过的方法，获取到点击事件触发的列表项，从而获取到其身上对应的评论`id`，再对点赞和点踩分开做处理，从而实现。

```js
commentCup.addEventListener('click', (e) => {
    if (e.target.id == btn) { //如果点击的是点赞点踩按钮才触发事件
        let temp = e.path.find(num => {
            if (num.localName == 'div' && num.className == 'comment') {
                return num
            }
        }) //获取到点赞按钮所对应的评论id
        let commentId = temp.id.substring(7, temp.id.length)
        if (type == 'thumb') {//如果是点赞请求
            if (e.target.className == 'timeGood true') {
                commentThumb(userId, commentId, false, e.target); //点赞请求
            } else {
                commentThumb(userId, commentId, true, e.target); //点赞请求
            }
        }
        if (type == 'down') {//如果是点踩请求
            if (e.target.className == 'timeGood true') {
                commentDown(userId, commentId, false, e.target); //点踩请求
            } else {
                commentDown(userId, commentId, true, e.target); //点踩请求
            }
        }

    }
})
```

### 关注用户功能

> 个人感觉这个功能是最复杂的功能

这个功能最重要的一点就是，判断与其他用户的关系，再关注我的人列表下的按钮，该显示关注还是显示已关注，这是解题的关键

#### 实现思路

1. 通过获取我关注的人，形成一个我关注的人的`id`数组
2. 再获取关注我的人，在渲染之前，先判断关注我的人的`id`是否存在于我关注的人数组当中
3. 如果存在，则将关注按钮隐藏，显示已关注按钮

#### 实现重点

这个函数实现的功能是用在文章详情页当中的关注按钮，和我的主页当中的关注，方法大致相同

```js
//检查是否互相关注的函数
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
        let temp = [];//存放id的数组
        for (let i = 0; i < result.length; i++) {
            temp.push(result[i].subId)//将我关注的人拼成一个数组
        }
        let auId = parseInt(authorId);
        //判断id是否存在我关注的人的数组当中
        if (temp.indexOf(auId) != -1) {
            authorBtn.innerHTML = '已关注'
        } else {
            authorBtn.innerHTML = '关注'
        }
    })
}
```

### 点击用户进入主页

实现的功能是，在关注页下，点击用户，进入对应用户的主页

#### 实现思路

> 写到这里开始有点伤感了，这个大概是最后几个了，研发的考核就差不多告一段落了

1. 从全局上看，所有的请求都采用到了`userId`这个属性，也就是用户的唯一标识
2. 因此我采用了2个全局变量保存`userId`，也就是说存在两个`userId`可用，这两个id，在正常情况下是保持一致的
3. 当用户点击其他用户，进入其主页时，我们将一个`userId`改成该用户的`id`，这样我们就实现了获取到的数据都是这个用户的
4. 对于一些点赞，以及该用户关注者与我的关系，这时候就需要我们的第二个`userId`了，因为在上一步，我们只改变了一个`id`，因此另一个属性值还是我们自己本身的`id`，我们可以通过这个属性在他的主页来进行关注，点赞操作
5. 这个做法真的是很快，个人感觉非常好
6. 当我们退出用户主页时，我们只需将，我们本身那个没有改变过的`id`重新赋值给被改过的`userId`，这样就恢复原状了

> 这一部分其实没有很明确的代码，只是一个简单的id变化

### 加载数据时的加载动画

#### 实现思路

1. 利用`axios`拦截器，在全局下设置拦截器，当请求数据返回前将`loading`盒子显示
2. 结束时隐藏

```js
axios.interceptors.request.use(config => {
    show('.loading')()
    return config
})
axios.interceptors.response.use(config => {
    hide('.loading')()
    return config
})
```

旋转水滴样式的实现过程  [旋转水滴加载效果-CSDN博客](https://blog.csdn.net/m0_50855872/article/details/115003977)

### 减速置顶功能

#### 实现思路

1. 获取当前滚动条向下滚动的距离`pageYoffset`
2. 设置速度，速度的设置是实现缓慢置顶的关键，采用表达式的方式`pageYoffset/50`
3. 随着页面的上移`pageYoffset`的值越来越小，因此得到的速度也就越小
4. 当到顶部时或者用户反向滑时时，清除定时器

```js
rocketImg.addEventListener('click', () => {
    let time = setInterval(() => {
         let top = pageYOffset;//设置页面滚动距离
         let step = Math.ceil(top / 50);//设置步频
         window.scroll(0, top - step);//滚动事件
         if (top == 0) {
             clearInterval(time);
         } else if (top > beforeTop) {
             clearInterval(time);
         }
    }, 10);
})
```

-----

> 以上就是对实现功能的一点说明，还有很多不足的地方，需要在以后的学习过程中，不断改善

## 项目总结

从刚开始的胆怯，无从下手，到现在的意犹未尽，从一个`!+Enter`到现在几千行的代码，从灰心丧气到现在满面春风，都预示着我的成长，从这次的项目当中，我真正的学习到了很多，即使有再多的不足，我想都不足以充斥我现在内心的兴奋。从完成整个项目下来，我对我之前学习的知识有了一个很好的加强巩固的过程，也学习了解了很多新的知识，像对图片的处理`object_fit`，像给新生成的元素绑定事件，实现`emoji`表情上传...还有很多很多，有些是第一次尝试，也有些是历史遗留问题。在整个项目的过程中我也学会了合理的向后台提出自己的疑问，解决问题，这也算是第一次和后台的一次对话吧。我也认识到自己有很多的不足之处，例如在项目开始前，应当罗列好需要实现的功能，以免给后期的功能实现增加难度。

## 研发考核总结

在工作室集体宣讲会上，研发给我留下了很深的印象，这是一个非常融洽亲和的工作室，对研发充满了兴趣，于是到了研发的专场宣讲会，更是感受到了研发前端的活力，以及研发其他师兄师姐的友好，更是好感倍增，由此开始了我的研发之路，一步一步走到现在，发现了自己很多的不足，在第一次面试时，清楚的记得，那道`for`循环嵌套异步事件的输出题，回去之后也进一步的了解了这方面的知识。在第二次面试时，印象最深的是那道`Foo`和`getName`的题目，牵扯到的知识点很多原型链，闭包，作用域，`new`。这一些些的遗憾都在推动着我，告诉着自己，还需要再认真一点，再深入一点。希望答辩表现好点吧！加油吧！











