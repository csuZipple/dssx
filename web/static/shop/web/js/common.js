/**
 * Created by asus on 2017/9/22.
 * 判断页面权限，获取用户基本信息
 * 退出登录
 * 获取页面数据
 * 对地址栏参数进行md5加密
 * 分类查询函数---待完善
 */

var rootUrl ="http://ice97.cn:8080/store/";
var rootImageUrl="https://www.ice97.cn/download/image/";

//页面加载完开始执行
$(function () {
   console.log("common.js 待完成函数：分类查询");
    console.log("结束调试时，请注意注释掉ajax result");
    //获取权限信息,获取uid
    var uid = getDecodeQueryString("uid");
    var userJson = getUserJson(uid);
    if (userJson!=null){
        //不显示登录注册按钮
        console.log("---已登录--");
        $(".isLogin").hide();
        $(".isRegister").hide();
        //获取个人参数

        console.log("获取到用户信息----");
        console.log(userJson);

        //隐藏移动端
        console.log("隐藏移动端")
        console.log($(".off-canvas menu li"));
        $(".off-canvas menu li").eq(1).hide();
        $(".off-canvas menu li").eq(2).hide();

        $(".user-name").text(userJson.username);
        $(".user-username").text(userJson.username);
        $(".avatar").attr("src",rootImageUrl+userJson.avatar);
        $(".user-avatar").attr("src",rootImageUrl+userJson.avatar);
    }else{
        console.log("---未登录--");
        $(".isUserAvatar").hide();
        $(".isUserName").hide();
        $(".isShowUser").hide();
        $(".isLogout").hide();
    }



    //加载各页面公共部分

    //加载分类
    getRootCategory();

    //如果是个人中心页面,执行翻页操作
    var ip =getDecodeQueryString("ip");
    if (ip!=null&&ip!="cart"){
        //pc 端
        var selector = ".tabs li."+ip+" a";
        $(selector).click();
        //phone
         selector = ".user-tabs-phone li."+ip+" a";
        $(selector).click();
    }

});

/**
 * 退出登录
 */
function logout() {
    //不用传参
   var result= ajax("user/logout",{},false);
    if(result.success){
       alert("退出登录成功!");
        window.location.href="main.html";
    }else{
        alert("退出登录失败，请重试")
    }
}
/**
 * 判断用户名是否存在
 * @param username
 */
function isExist(username) {
    var result = ajax("user/isExistUser",{"username":username},false);
    if (result.exist){
        return true;
    }else{
        return false;
    }

}

/**
 * 返回用户个人信息;
 * @param uid 用户id
 * @returns {*}
 */
function getUserJson(uid){
    var user={
        "avatar":"",
        "username":""
    };
   var result = ajax("user/getUser",{"id":uid},false);
    if (result.success){
        user.avatar=result.data.avatar;
        user.username=result.data.username;
        return user;
    }else{
        console.log("获取用户信息失败，请重试...")
        return null;
    }

}
/**
 * 注册用户---此时应该要保存该用户的uid
 * @param name
 * @param password
 * @param avatar
 * @param questionId
 * @param answer
 */
function addUser(name,password,questionId,answer) {
   var register={
       "user.username":name,
       "user.password":password,
       "user.questionId":questionId,
       "user.answer":answer
   };
    return  ajaxPost("user/addUser", register, false);
}
/**
 * 加载密保问题
 */
function loadQuestion() {
   var result = ajaxPost("question/getAllQuestions",{},false);//允许异步执行
   if (result.success){
       $.each(result.data,function (index, item) {
           createQuestionOptions(item.id,item.question);
       })
   }else{
       console.log("加载密保问题失败!")
   }

}

/**
 * 获取json对象中的所有参数名称
 * @param obj
 * @returns {Array}
 */
function getObjKeys(obj){
    var params = [];//要提交的参数名称
    for (var p in obj){
        if (obj.hasOwnProperty(p)){
            params.push(p);
        }
    }
    return params;
}
/**
 * 获取json对象中的所有value值
 * @param obj
 * @param keys 属性名称数组
 * @returns {Array}
 */
function getObjValues(obj,keys) {
    var values=[];//要提交的参数值
    for (var i = 0;i<keys.length;i++){
       values.push(obj[keys[i]])
    }
    return values;
}
/**
 * 将两个数组按照search的方式连接起来
 * @param params
 * @param values
 * @param hasParam 是否有参数
 */
function joinStr(params, values,hasParam) {
    var str="";
    if (hasParam==""||hasParam==null){
        str="?"
    }else{
        str="&"
    }

   if (params.length!=values.length){
       console.log("拼接url参数时异常，参数之间长度不匹配")
       return null;
   }else{
       for(var i = 0;i<params.length;i++){
           if (i==(params.length-1)){
               str+=params[i]+"="+values[i];
           }else{
               str+=params[i]+"="+values[i]+"&";
           }

       }
   }
   return str;
}

/**
 * 使用ajax GET 提交前端数据
 * @param url 接口路径
 * @param obj 接口所需参数
 * @param isAsync 是否接受异步
 */
function ajax(url,obj,isAsync) {

    var keys = getObjKeys(obj);
    var values =getObjValues(obj,keys);
    var params = joinStr(keys,values);
    var json={};
    $.ajax({
        type : "GET",  //提交方式
        url : rootUrl+url+params,//路径
        async:isAsync,
        success : function(result) {//返回数据根据结果进行相应的处理
            // console.log("ajax接收后台数据：");
            // console.log(result);
            json=result;
        },
        //异常处理
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest+"---"+textStatus+"---"+errorThrown)
        }
    });
    // console.log(json);
    return json;
}
/**
 * 使用post方式处理ajax
 * @param url
 * @param obj
 * @param isAsync
 * @returns {{name: string}}
 */
function ajaxPost(url,obj,isAsync) {
    var json={};
    $.ajax({
        type : "POST",  //提交方式
        url : rootUrl+url,//路径
        async:isAsync,
        data:obj,
        contentType:"application/x-www-form-urlencoded",
        success : function(result) {//返回数据根据结果进行相应的处理
            console.log("ajax post接收后台数据：");
            console.log(result);
            json=result;
        },
        //异常处理
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest+"---"+textStatus+"---"+errorThrown)
        }
    });
    return json;
}

/**
 * 获取当前页面参数
 * @returns {string}
 */
function getCurrentPage() {
    // console.log( window.location.href.replace(window.location.hash, ''))
    return  window.location.href.replace(window.location.hash, '');
}
/**
 * 获取地址栏参数
 * @param name
 * @returns {null}
 */
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null && r[2]!="")
        return  unescape(r[2]);
    return null;
}
/**
 * 获取解码后的地址栏参数
 * @param name
 * @returns {null}
 */
function getDecodeQueryString(name) {
    var option = getQueryString(name);
    if (option==null){
        return null;
    }
    var b = new Base64();
    return b.decode(option);
}

/**
 * 判断地址栏是否有uid参数，如果用户自己输入未加密的uid参数，怎么处理？敬请期待v2.0
 * @returns {*}
 */
function getUid() {
    var from =encodeStr(getCurrentPage());
    var uid = getDecodeQueryString("uid");
    if (uid==null){
        alert("请先登录");
        window.location.href="login.html?from="+from;
        return null;
    }else{
        return uid;
    }
}

/**
 * 将地址栏的信息加密--个人中心uid，非登录不能进入
 * @param url
 * @param type
 */
function go(url,type) {
    console.log("每一次跳转页面先判断用户是否登录")
    var from =encodeStr(getCurrentPage());
    var target = url;
    target+="?from="+from;

    var uid = getDecodeQueryString("uid");
    if (uid!=null||uid==""){
        target+="&uid="+encodeStr(uid);
    }

    if (url=="user-zone.html"){

        if (uid==null){
            alert("请先登录");

            window.location.href="login.html?from="+from;
            return;
        }
               if (type!=null) {
                   var ipt = encodeStr(type);
                   target += "&ip=" + ipt;
               }
    }
    console.log("go to "+target);
    window.location.href=target;
}
/**
 * 跳转到url界面，后面跟随obj参数
 * @param url
 * @param obj
 * @param hasParam url是否已经含有参数
 */
function goto(url, obj,hasParam) {
    var uid = getDecodeQueryString("uid");
    var keys = getObjKeys(obj);
    var values =getObjValues(obj,keys);
    var params = joinStr(keys,values,hasParam);
    if (typeof (uid) != 'undefined'&&uid!=null&&uid!=""){
        console.log("带上uid");
        window.location.href=url+params+"&uid="+encodeStr(uid);
    }else{
        window.location.href=url+params;
    }
}
/**
 * 将字符串加密
 * @param str 必须确保是字符串，否则无法执行string.replace方法
 */
function encodeStr(str) {
    // console.log(str);
     return new Base64().encode(str);
}

/**
 * 获取商品根分类
 */
// getRootCategory();
function getRootCategory(){
    console.log("加载根分类....")
   var result= ajax("category/getRootCategory",{},false);
    if (result.success){
        $.each(result.data,function (index,item){
            createCategoryLi(".root-category",item.id,item.name)
        })
    }
    console.log("加载根分类成功")
}
/**
 * 在根分类的基础上添加子分类
 * @param elements   this==li
 */
function getChildrenCategory(elements) {
    console.log("开始创建子分类....");
    var cid = $(elements).parent('li').attr("data-category-id");
    console.log("cid:"+cid);
    var result= ajax("category/getChildrenCategory",{"id":cid},false);
    if (result.success){
        if (result.data!=null||result.data!=""){
           var classname= createCategoryUl($(elements).parent('li'),"c"+cid);
            $.each(result.data,function (index,item){
                console.log(item.name);
                createCategoryLi(classname,item.id,item.name)
            })
        }
    }
}

/**
 * 添加商品分类
 * @param name
 * @param parentId
 * @param imageUrl
 * @param attributes
 */
function addCategory(name, parentId, imageUrl, attributes) {
    var params={
        "category.name":name,
        "category.parentId":parentId,
        "category.imageURL":imageUrl,
        "category.attributes":attributes,
    };
    if (ajax("category/addCategory",params,true).success){
        console.log("添加商品分类成功")
    }else{
        console.log(ajax("category/addCategory",params,true).message)
    }
}
/**
 * 获取banner图，即今日推荐
 */
function loadBanner(){
    console.log("开始获取banner...")
    var result = ajax("banner/getBanners",{},false);
    if (result.data!=null||result.data!=""){
        // createOribitContainer();//创建父元素
        // createNavigationCantainner();
        if (result.success){
            $.each(result.data,function (index, item) {
                // if (index==0){
                //     createFigureInLi("is-active",item.id,rootImageUrl+item.imageUrl,item.title,item.title)
                // }else{
                //     createFigureInLi("",item.id,rootImageUrl+item.imageUrl,item.title,item.title)
                // }
                // createNavigationButton(index,item.title)
                if (index<4){
                    changeImageUrl(index,rootImageUrl+item.imageUrl,item.title,item.id)
                }else return false;
            })
        }
    }else{
        console.log("未获取到banner信息.")
    }
}

/**
 * 获取优先级最高的公告
 */
function getBroadCast(){

   var result = ajax("announcement/getAll",{},false);//不允许超时
    var text ="";

    console.log("开始获取公告....");
    $.each(result.data,function (index,item){
           text=item.text;
    });
    if (text!=""){
        console.log("获取公告信息："+text)
    }else{
        console.log("获取公告信息失败!")
    }
    return text;
}



/**
 * 搜索接口，获取匹配结果json
 * @param elements 当前对象
 * @returns {*}
 */
$("#searchItems").bind("input propertychange",function () {
    console.log("搜索参数:"+$(this).val());
    var question=$(this).val();
    var result= ajaxPost("product/searchProduct",{"name":question},false);
    //获取name description pid --点击跳转到商品详情页面

    if (result.data!=null||result.data!=""){
        $(".search-result").css("display","block");
        $(".search-result li").remove();

        if (isNullObj(result.data)){
            createSeacrchLi("","没有匹配结果..","T_T");
        }else{
            var words = result.words;//返回的词包
            console.log(words);

            createSearchInfo(result.data.length);

            $.each(result.data,function (index,item){
                //这里要更新词包颜色
                var strong = item.name;
                for (var i=0;i<words.length;i++){
                    if (words[i]!=" "){
                        strong = strong.replace(words[i],"<span class='red'>"+words[i]+"</span>");
                        console.log(strong)
                    }
                }
                createSeacrchLi(item.id,strong,item.description);
            });
        }
    }
});

/**
 * 隐藏搜索框
 */
function hideSearch() {
    $(".search-result").css("display","none")
}


/**
 * 获取最新添加的四个商品 latest-items
 * @param parent  父元素,eg..今日推荐，新品上市，热卖商品
 * @param url
 */
function getLatest4Items(parent,url){
   var result = ajax(url,{},false);
   if (result.success){
       $.each(result.data,function (index, item) {
           if (index<4){
               createItemsCard(parent,item.id,rootImageUrl+item.imageUrls[0].imageUrl,item.attr[0].price,item.description,item.name,item.attr[0].id)
           }else{
               return false;
           }
       })
   }
}



/**
 * 添加到购物车
 * @param uid 用户
 * @param pid 商品id
 * @param num  商品数量
 * @param attrId
 */
function addToCart(uid,pid,num,attrId) {
    var params={
        "cart.userId":uid,
        "cart.productId":pid,
        "cart.count":num,
        "cart.attrId":attrId
    };
   var result = ajax("cart/addCart",params,false);//同步提交，需要知道反馈信息
   if (result.success){
       console.log("添加购物车成功")
       return true;
   }else{
       alert(result.message);  //会显示库存=0的商品吗？
       return false;
   }
}
/**
 * 从购物车中删除商品
 * @param elements
 */
function deleteCartItem(elements) {
   var cartId = $(elements).attr("data-cart-id");
    var result =  ajax("cart/deleteCart",{"id":cartId},false);
    if (result.success){
        alert("删除商品成功...");
       // window.location.reload();
        $(elements).parent('div').parent('div').parent('div').parent('div').remove();
    }else{
         console.log("删除商品失败")
    }
}

/**
 * 添加到我的收藏
 * @param uid
 * @param pid
 */
function addCollection(uid, pid) {
   var params={
        "collection.userId":uid,
       "collection.productId":pid
    };

    if (pid==0||pid=="0"){
       alert("当前商品已不存在，不能收藏");
        return;
    }

    var result = ajax("collection/addCollection",params,false);//同步提交，需要知道反馈信息
    if (result.success){
        console.log("添加收藏成功");
        return true;
    }else{
        alert(result.message);  //会显示库存=0的商品吗？
        return false;
    }

}
/**
 * 获取商品图片
 * @param pid
 */
function getItemImages(pid) {
   var result = ajax("product/getProductById",{"id":pid},false);
   if (result.success){
       if (result.data!=null||result.data!=""){
           console.log("开始加载商品图片...");
          var description = result.data.description;
           var array = result.data.imageUrls;
           for (var i =0;i<array.length;i++){
               if (i==0){
                   $(".item-big-image").attr("src",rootImageUrl+array[i].imageUrl)
               }
               if (!isContains(array[i].imageUrl,"big")){
                   createItemImages(rootImageUrl+array[i].imageUrl,description)
               }else{
                   createItemBigImages(rootImageUrl+array[i].imageUrl,description)
               }
           }
           console.log("加载商品图片完成");
       }
   }
}
/**
 * 加载商品基本属性
 * @param pid
 */
function getItemInfo(pid) {
    var result = ajax("product/getProductById",{"id":pid},false);
    if (result.success){
        if (result.data!=null||result.data!=""){
            replaceTextIn(".item-detail-title",result.data.name);
            replaceTextIn(".item-detail-describe",result.data.description);
            console.log("加载商品信息时，当前只加载了第一个attr的价格..");
            replaceTextIn(".item-detail-price span",result.data.attr[0].price);
            console.log("打95折");
            replaceTextIn(".item-detail-discount span",Math.floor(result.data.attr[0].price*0.95));
            replaceTextIn(".item-detail-stock span",result.data.attr[0].count);
            $.each(result.data.attr,function (index, item) {
                createItemTypes(item.attributes,item.count,item.price,item.id)
            })
        }
    }
}
/**
 * 替换elements中的文字信息
 * @param elements
 * @param content
 */
function replaceTextIn(elements, content) {
   $(elements).text(content)
}

function replaceValIn(elements, content) {
    $(elements).val(content)
}
/**
 * 展示商品评论
 * @param pid
 */
function loadComments(pid) {
    var result = ajax("comment/getCommentsByProductId",{"productId":pid},false)
    if (result.success){
        console.log("typeof result.data.user："+typeof result.data.user)
        if (!isNullObj(result.data)){
            $(".user-comments-container").empty();//删除子元素
        }
       if (result.data!=null||result.data!=""){
           console.log("开始添加评论组件。。。");
           $.each(result.data,function (index, item) {
               createComments(rootImageUrl+item.user.avatar,item.user.username,item.text,item.createdAt.replace("T"," "))
           })

       }
    }
}
/**
 * 添加商品评论
 * @param pid
 * @param uid
 * @param text
 */
function addComments(pid, uid, text) {
    var params={
        "comment.productId":pid,
        "comment.userId":uid,
       "comment.text":text
      };
    console.log("添加评论....");
    var result = ajaxPost("comment/addComment",params,false)
    if (result.success){
        console.log("添加评论成功")
    }else{
        console.log("添加评论失败")
    }
}

/**
 * 加载---其他用户也看过的商品
 */
function loadCommonItems() {
    var result = ajax("product/getHot",{},false);
    if (result.success){
        $.each(result.data,function (index, item) {
                createCommonItems(".common-items-container",item.id,rootImageUrl+item.imageUrls[0].imageUrl,item.description,item.name)
        })
    }
}
/**
 * 加载--相似商品
 */
function loadRelatedItems() {
    console.log("加载相似商品推荐...eg..敬请期待v2.0");
    var result = ajax("product/getHot",{},false);
    if (result.success){
        $.each(result.data,function (index, item) {
            createRelatedItems(".related-items",item.id,rootImageUrl+item.imageUrls[0].imageUrl,item.description,item.name)
        })
    }
}

function addHistory(uid,pid) {
    var params = {
        "history.userId":uid,
        "history.productId":pid
    };
   var result = ajax("history/addHistory",params,false);
    if (result.success){
        console.log("增加一条历史记录");
    }else{
        console.log("增加历史记录失败..")
    }
}

/**
 * 返回顶部
 */
function goTop(){
    $('html,body').animate({scrollTop: '0px'}, 800);
}
/**
 * 返回首页
 */
$(".logo").click(function () {
    window.location.href="main.html"
});
$(".menu-text").click(function () {
    window.location.href="main.html"
});


function loadUserInfo() {
    console.log("user-zone,加载个人信息....");
    var uid = getUid();//在user-zone界面中，uid此时肯定不为空
    var user = getUserJson(uid);
    console.log(user);
    replaceTextIn(".user-username",user.username);
    replaceTextIn(".user-description span",user.username);
    $(".user-user-avatar img").attr("src",rootImageUrl+user.avatar);

}


/**
 * 获取商品的基本属性
 * @param pid
 * @param attrid
 */
function getProductJson(pid,attrid) {
   var product={
       "name":"",
       "imageUrl":"",
       "price":"",
       "description":"",
       "attributes":""
   };
   var i=-1;
   var result =ajax("product/getProductById",{"id":pid},false);

    if (result.success){
         product.name=result.data.name;
         product.description=result.data.description;
        if (attrid==""||attrid==null){
            product.price=result.data.attr[0].price;
            product.attributes=result.data.attr[0].attributes;
        }else{
            $.each(result.data.attr,function (index, item) {
                if (item.id==attrid){
                    product.price=item.price;
                    product.attributes=item.attributes;
                    i = index;
                    return false;//退出遍历
                }
            });
        }

        product.imageUrl=result.data.imageUrls[0].imageUrl;
        // console.log("获取到的商品：");
        // console.log(product);
         return product
    }else{
        console.log("获取商品信息,getProductById失败!")
        return null;
    }
}

/**
 * 加载购物车信息
 */
function loadCartInfo() {
    console.log("获取购物车信息..");
    var uid = getUid();
    var result = ajax("cart/getCartList",{"userId":uid},false)
    if (result.success){
        //更新总价格
        replaceTextIn(".total-price span",result.totalPrice);

       $.each(result.data,function (index, item) {
           var tempProduct = getProductJson(item.productId,item.attrId);
           createCartRow(item.id,item.productId,rootImageUrl+tempProduct.imageUrl,tempProduct.name,tempProduct.price,item.price,item.count,tempProduct.description,item.attrId,tempProduct.attributes)
       });

    }else{
        console.log("获取购物车信息异常")
    }
}
/**
 * 数组转换为字符串
 * @param array
 * @param regex1
 * @param regex2
 */
function arrayToString(array, regex1,regex2) {
   return  regex1+array.toString()+regex2;
}
/**
 * 字符串转数组
 * @param str
 * @param regex 字符串连接符
 */
function stringToAray(str,regex) {
    return str.split(regex)
}

/**
 * 更新购物车信息
 * @param id
 * @param uid
 * @param pid
 * @param num
 * @param attrId
 */
function updateCart(id, uid, pid, num,attrId) {
    var params = {
        "cart.id":id,
        "cart.userId":uid,
        "cart.productId":pid,
        "cart.count":num,
        "cart.attrId":attrId
    };
    console.log("获取到的属性值");
    console.log(params);
     var result = ajax("cart/updateCart",params,false);

    if (result.success){
        alert("更新购物车成功...")
       window.location.reload();

    }else{
        alert(result.message);
    }
}
/**
 * 获取购物车总价格
 */
function getCartTotalPrice() {
    var total = 0;
    var i =0;
      $(".user-cart .cart-row").each(function () {
          console.log(total);
        if (i!=0&&!$(this).parent("div").hasClass("isphone")){
            total += parseInt($(this).find("div.item-total-price span").text());
        }
          i++;
      });
    $(".total-price span").text(total)
}

/**
 * 提交购物车
 */
function submitCart(params) {
  var result = ajaxPost("order/addOrder",params,false);
    if (result.success){
       alert("提交成功");
        goto("pay-feedback.html");//给下一个界面传递信息
    }
}
/**
 * 加载账单中的商品信息
 * @param productArray
 * @param AttriIds
 * @param countArray
 */
function loadProducts(productArray, AttriIds, countArray) {
    for (var i = 0; i<productArray.length;i++){
        console.log("获取账单商品信息....");
        var product = getProductJson(productArray[i],AttriIds[i]);
        createProductInOrders(productArray[i],product.name,product.attributes,countArray[i],product.price);
    }
    replaceTextIn(".order-total span",getTotalPrice())
}
/**
 * 获取总价钱
 */
function getTotalPrice() {
    var total  = -1;
    $(".cart_item").each(function () {
        total += parseInt($(this).find("span.amount").text());
    });
    return total;
}

/**
 * 加载收藏
 */
function loadCollection() {
    console.log("开始加载收藏的商品--");
    var uid = getUid();
    var result = ajax("collection/getCollections",{"userId":uid},false);
    if (!isNullObj(result.data)){
        $(".favorite-item-wrapper").empty();//删除子元素
    }
    if (result.success){
        $.each(result.data,function (index, item) {
            var product = getProductJson(item.productId);
            var time=item.createdAt;
            createCollectionItems(item.id,item.productId,rootImageUrl+product.imageUrl,product.name,product.description,time.replace("T","  "))
        })
    }else {
        console.log("获取历史记录失败，请重试...")
    }
}
/**
 * 删除收藏
 * @param elements
 */
function deleteCollection(elements) {
    var id = $(elements).attr("data-collection-id");
    console.log("当前待删除的history id:"+id);
    if (ajax("collection/deleteCollection",{"id":id},false).success){
         alert("删除收藏的商品成功");
       // window.location.reload();
        $(elements).parent('p').parent('div').parent('div').parent('div').remove();

    }else{
        alert("删除收藏的商品失败...")
    }
}
/**
 * 获取用户的浏览记录
 */
function loadHistory() {
    console.log("开始加载历史记录--")
   var uid = getUid();
    var result = ajax("history/getHistorys",{"userId":uid},false)
    if (result.success){
       $.each(result.data,function (index, item) {
           var product = getProductJson(item.productId);
           // console.log("历史记录:");
           // console.log(product);
           var time=item.createdAt;
           if (product==null|| typeof (product) == 'undefined'){

           }else{
               createHistoryItems(item.id,item.productId,rootImageUrl+product.imageUrl,product.name,product.description,time.replace("T","  "))
           }
       })
    }else {
        console.log("获取历史记录失败，请重试...")
    }
}

/**
 * 删除历史记录
 * @param elements
 */
function deleteHistory(elements) {
   var id = $(elements).attr("data-history-id");
    console.log("当前待删除的history id:"+id);
    if (ajax("history/deleteHistoryById",{"id":id},false).success){
        alert("删除历史记录成功");
         //window.location.reload();
        $(elements).parent('p').parent('div').parent('div').remove();
    }else{
        alert("删除历史记录失败...")
    }
}

/**
 * 加载用户地址
 */
function loadAddress() {
    var uid =getUid();
    var result = ajax("address/getAddressByUserId",{"userId":uid},false)
    if (result.success){
        $.each(result.data,function (index, item) {
            createAddressSet(item.id,item.name,item.phone,item.address,item.postcode)
        })
    }
}

/**
 * 支付页面，加载用户地址信息，第i
 */
function loadUserAddress(uid) {
    console.log("加载地址中....");
    var address = getAddressObj(uid,0);
    replaceValIn(".user-name",address.name);
    replaceValIn(".user-phone",address.phone);
    replaceValIn(".user-postcode",address.postcode);
    replaceValIn("#detailAddress",address.address);
    console.log("加载地址完成....")
}
/**
 * 获取第index个地址
 * @param uid
 * @param i
 * @returns {*}
 */
function getAddressObj(uid,i) {
    var obj={
        "address": "湖南省长沙市天心区 铁道学院",
        "id": 6,
        "name": "邹博",
        "phone": "18373151083",
        "postcode": "430426",
        "userId": 6
    };
    var result = ajax("address/getAddressByUserId",{"userId":uid},false);
    if (result.success){
        $.each(result.data,function (index, item) {
            if (i==index){
                obj.address = item.address;
                obj.id = item.id;//
                console.log("item.id:"+item.id);
                obj.name=item.name;
                obj.phone=item.phone;
                obj.postcode = item.postcode;
                obj.userId=item.username;
            }
        })
    }
   return obj;
}
/**
 * 添加订单
 */
function loadOrders() {
    var uid = getUid();
    console.info("加载订单...");
    var result = ajax("order/getAllOrders",{"userId":uid},false);
    if (result.success){
        $.each(result.data,function (index, item) {
            var parent = createOrders(item.id,item.createdAt.replace("T"," "),item.totalPrice);
            var state = item.state+"";

            $.each(item.details,function (index, items) {
                var temp = getProductJson(items.productId,items.attrId);
                createCartItems(parent,items.productId,rootImageUrl+temp.imageUrl,temp.name,state.replace("1","交易完成"),temp.description,items.price,items.number)
            })
        })
    }
}

/**
 * 给商品添加评论--跳转至item界面--传入uid pid 参数
 * @param elements
 */
function discuss(elements) {
    var params = {
        "pid":encodeStr($(elements).attr("data-item-id"))
    };
    goto("discuss.html",params,false);
}

/**
*以下为各单页面的js
*/

function createItemsShow(data) {
    //通过json数据生成html界面
    //等待动画

    //停止动画
    $('#waiting-for-data').foundation('close');
}



/**
 * 返回是否包含子串
 * @param str
 * @param substr
 * @returns {boolean}
 */
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

/**
 * 判断购买的数量
 * @param elements
 */
function checkItemsNums(elements) {
    if ($(elements).val()!=""){
        if($(elements).val()<=0){  //如果输入0-2？
            console.log("不发生添加购物车请求事件.");
            $(elements).val(1);
            return false;
        }
    }else{
        return true;
    }
}

/*注册密码*/
function changeType(type) {
    $("#input-password").attr("type",type);
}

/**
 * 判断是不是空对象
 * @param obj
 * @returns {boolean}
 */
function isNullObj(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}

