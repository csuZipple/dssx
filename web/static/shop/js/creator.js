/**
 * Created by asus on 2017/9/24.
 * this file is used to create items
 */
/**
 * 生成搜索框
 * @param pid
 * @param name
 * @param description
 */
function createSeacrchLi(pid,name,description){
    var str="<li><a class='searchLi' data-link='"+pid+"' href='#!'>"+name+"</a><span>"+description+"</span></li>"
    $(".search-result").append($(str));
    /**
     * 跳转页面
     */
   $(".searchLi").bind("click",function () {
           var uid = getQueryString("uid");//不用管uid是否是空值
           var link = $(this).attr("data-link");
           if (uid==null){
               window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

           }else{
               window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
           }
   })
}

/**
 * 在parent下生成card布局
 * @param parent 要append的父级元素
 * @param pid
 * @param imageUrl
 * @param price
 * @param description
 * @param name
 * @param attrid
 */
function createItemsCard(parent,pid,imageUrl,price,description,name,attrid) {
    var card="<div class='small-12 medium-3'>"+
    "<div class='card'>"+
        "<a class='searchLi' data-link='"+pid+"' href='#!'><img src='"+imageUrl+"' alt='推荐平板1'></a>"+
        "<div class='card-section'>"+
        "<p class='text-center'>"+"<span data-tooltip aria-haspopup='true' class='has-tip right' data-click-open='true' data-disable-hover='false' tabindex='2' title='"+description+"'>"+name+"</span></p>"+
        "<p class='grid-x add-to-cart text-center  show-for-medium'>"+
        "<span>商城价：<span style='color: red;'>￥"+price+"</span></span>"+
    "<button class='add-to-cart-button tiny' onclick='getItemId(this)' data-item-attrid='"+attrid+"' data-item-id='"+pid+"'><i class='fi-shopping-cart'></i>&nbsp;添加</button>"+
    "</p>"+
    "<p class='text-center show-for-small-only'><span>商城价：<span style='color: red;'>￥"+price+"</span></span></p>"+
    "<p class='text-center show-for-small-only'><button class='add-to-cart-button tiny' onclick='getItemId(this)' data-item-attrid='"+attrid+"' data-item-id='"+pid+"'><i class='fi-shopping-cart'></i>&nbsp;加入购物车</button></p>"+
    "</div>"+
    "</div>"+
    "</div>";
   $(parent).append($(card));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}

/**
 * 创建密保问题参数
 * @param id
 * @param question
 */
function createQuestionOptions(id, question) {
   var option ="<option value='"+id+"'>"+question+"</option>"
    $("#securePassword").prepend($(option))
}
/**
 * 在父元素parent下创建分类ul
 * @param parent
 * @param currentClass 当前被创建出来的ul类
 */
function createCategoryUl(parent,currentClass) {
    var category="<ul class='vertical menu "+currentClass+"' data-dropdown-menu style=''></ul>";
    parent.append($(category));
    return "."+currentClass;
}
/**
 * 在根分类ul中添加li，设置categoryId,和显示的名称
 * @param parent
 * @param cid
 * @param categoryLiName
 */
function createCategoryLi(parent,cid,categoryLiName) {
   var li = "<li data-category-id='"+cid+"'><a href='#!' onclick='getChildrenCategory(this)' style='color: #ffffff;'>&nbsp;&nbsp;"+categoryLiName+"</a>"+"</li>";

    $(parent).append($(li));
}
/**
 * 轮播图父元素：banner-orbit
 * 创建orbit-controls
 */
function createOribitContainer(){
  var orbit=" <div class='large-11'>"+
    "<div class='orbit text-center' role='region' aria-label='Hot Goods Pictures' data-orbit='wgi4l1-orbit' data-resize='zzy3gh-orbit' id='zzy3gh-orbit' data-events='resize'>" +
      "<div class='orbit-wrapper'>"+
    "<div class='orbit-controls'>"+
     "<button class='orbit-previous'><span class='show-for-sr'>Previous Slide</span>&#9664;&#xFE0E;</button>"+
    " <button class='orbit-next'><span class='show-for-sr'>Next Slide</span>&#9654;&#xFE0E;</button>"+
    " </div>"+
    " <ul class='orbit-container'>"+
    " </ul>"+
    " </div>"+
    " </div>"+
    " </div>";
    console.log("创建createOribitContainer成功");

    $(".banner-orbit").append($(orbit));
}
/**
 * 创建图片标签
 * @param isActive 是不是首个元素
 * @param pid
 * @param imageUrl
 * @param name
 * @param description
 */
function createFigureInLi(isActive,pid,imageUrl,name,description){
    var li = "<li class='"+isActive+" orbit-slide'>"+
    "<figure class='orbit-figure'>"+
    "<a class='searchLi' data-link='items-detail.html?pid="+pid+"' href='' title='"+description+"'><img class='orbit-image' src='"+imageUrl+"' alt='"+description+"'></a>"+
    "<figcaption class='orbit-caption'>"+name+"</figcaption>"+
    "</figure>"+
    "</li>";
    console.log("创建orbit li子元素成功")
    $(".orbit-container").append($(li));
}
/**
 * 创建轮播图导航条
 */
function createNavigationCantainner() {
    var nav="<nav class='orbit-bullets'></nav>"
    $(".orbit").append($(nav));
    console.log("创建createNavigationCantainner成功")
}
/**
 * 创建导航条button
 * @param index
 * @param name
 */
function createNavigationButton(index,name) {
    var button="";
    if (index==0){
         button="<button class='is-active' data-slide='0'>" +
            "<span class='show-for-sr'>"+name+" slide details.</span>" +
            "<span class='show-for-sr'>Current Slide</span></button>"
    }else{
         button="<button class='is-active' data-slide='0'>" +
            "<span class='show-for-sr'>"+index+" slide details.</span>" +
          "</button>"
    }
    $(".orbit-bullets").append($(button));
    console.log("创建orbit nav子元素成功")
}

function changeImageUrl(index,url,alt,pid) {
   $(".orbit-container li").eq(index).find('img').attr({
       "src":url,
       "alt":alt
   })
    $(".orbit-container li").eq(index).find('a').attr({
        "data-link":"items-detail.html?pid="+pid,
        "title":alt
    }).next().text(alt)
}


/*
* 以下为商品详情界面
* */
/**
 * 创建缩略图
 * @param imageUrl
 * @param description
 */
function createItemImages(imageUrl,description){
    var image=" <div class='small-3 changeBig'>" +
        " <img class='thumbnail' src='"+imageUrl+"' alt='"+description+"'>" +
        "</div>";
    $(".small-img-container").append($(image));
    $(".changeBig").bind("click",function () {
        $(".item-big-image").attr("src",$(this).children("img").attr("src"));
    })
}
/**
 * 创建大图
 * @param imageUrl
 * @param description
 */
function createItemBigImages(imageUrl,description) {
    var bigImage ="<img src='"+imageUrl+"' alt='"+description+"'/>";
    $(".big-images").append($(bigImage))
}
/**
 * 添加商品属性
 * @param name
 * @param count
 * @param price
 * @param type
 */
function createItemTypes(name,count,price, type) {
    var span =" <div class='item-prams' data-item-type='"+type+"' data-type-count='"+count+"' data-item-price='"+price+"'>"+name+"</div>";
    $(".item-types-container").append($(span));
    //选中颜色分类
    $(".item-prams").bind("click",function () {
        $(this).addClass("checked").siblings().removeClass("checked");
        var types=$(this).attr("data-item-type");
        var counts=$(this).attr("data-type-count");
        var prices=$(this).attr("data-item-price");
        var discounts=Math.floor(prices*0.95);
        replaceTextIn(".item-detail-price span",prices);
        replaceTextIn(".item-detail-discount span",discounts);
        replaceTextIn(".item-detail-stock span",counts);

        console.log("当前选中type:"+types);
    });
}
/**
 * 生成用户评论
 * @param avatar
 * @param name
 * @param text
 * @param time
 */
function createComments(avatar,name,text,time) {
    var comments="<div class='small-12 user-comments grid-x align-left' style='padding:8px 20px;border-bottom: 1px solid #e8e8e8;'>"+
    " <div class='user-avatar' style='margin-right: 26px;'>"+
    // " <img src='../images/avatar/02.jpg' alt='用户头像'>"+
    " <img src='"+avatar+"' alt='用户头像'>"+
    " <div class='user-nickname'>"+name+"</div>"+
    "  </div>"+
    "  <div class='user-comments-detail small-8'>"+
    "    <div class='comments'>"+text+"</div>"+
    "<div class='time'>"+time+"</div>"+
    " </div>"+
    " </div>";
    $(".user-comments-container").append($(comments));
}
/**
 * 创建都看过的商品
 * @param parent
 * @param imageUrl
 * @param description
 * @param name
 */
function createCommonItems(parent,pid,imageUrl,description,name){
    var item=" <div class='small-4'>"+
    "<div class='card'>"+
    "<div class='card-section'>"+
    " <img src='"+imageUrl+"' alt='"+description+"'/>"+
    "   </div>"+
    "   <div class='card-section'>"+
    "   <p class='show-for-medium text-center'><a href='#!' class='searchLi' data-link='"+pid+"' style='font-size: 0.8rem;'>"+name+"</a></p>"+
    " <p class='show-for-small-only text-center'><a href='#!' class='searchLi' data-link='"+pid+"' style='font-size: 0.8rem;'>"+name+"</a></p>"+
    " </div>"+
    " </div>"+
    " </div>";

    $(parent).append($(item));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}
/**
 * 创建相似商品
 * @param parent
 * @param imageUrl
 * @param description
 * @param name
 */
function createRelatedItems(parent,pid,imageUrl,description,name){
    var item=" <div class='small-4 large-12'>"+
        "<div class='card'>"+
        "<div class='card-section'>"+
        " <img src='"+imageUrl+"' alt='"+description+"'/>"+
        "   </div>"+
        "   <div class='card-section'>"+
        "   <p class='show-for-medium text-center'><a href='#!' class='searchLi' data-link='"+pid+"' style='font-size: 0.8rem;'>"+name+"</a></p>"+
        " <p class='show-for-small-only text-center'><a href='#!' class='searchLi' data-link='"+pid+"' style='font-size: 0.8rem;'>"+name+"</a></p>"+
        " </div>"+
        " </div>"+
        " </div>";

    $(parent).append($(item));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}
/**
 * 创建购物车
 * @param id 购物车id
 * @param pid
 * @param imageUrl
 * @param name
 * @param price
 * @param totalPrice
 * @param count
 * @param description
 * @param attrId
 * @param attributes
 */
function createCartRow(id,pid,imageUrl,name,price,totalPrice,count,description,attrId,attributes) {
    var row = "<div data-cart-id='"+id+"' data-product-attrId='"+attrId+"'  class='cart-row'>"+
    "<div class='is-checked'><input type='checkbox' data-product-attrId='"+attrId+"' value='"+pid+"'></div>"+
    " <div class='cart-item'>"+
    "<img src='"+imageUrl+"' alt='"+description+"'/>"+
    "   <div class='item-info'>"+
    "    <div class='usual-item-info'>"+
    "   <div class='item-name'><a class='searchLi' data-link='"+pid+"' href='#!'>"+name+"&nbsp;&nbsp;"+attributes+"</a></div>"+
    "  <div class='item-price red'>￥<span>"+price+"</span></div>"+
    "   </div>"+
    " <div class='item-nums'>"+
    "* <input type='number' data-item-price='"+price+"' id='item-num' value='"+count+"' disabled  onblur='blurAddDisable(this,0)'>&nbsp;&nbsp; <i class='fi-page-edit' onclick='removeDisabled(this)' style='color: #1779ba;cursor:pointer;'></i>"+
    "   </div>"+
    "    <div class='item-total-price'>"+
    "  ￥<span>"+totalPrice+"</span>"+
    "  </div>"+
    "   <div class='delete-button'><button data-cart-id='"+id+"' data-item-id='"+pid+"' class='button alert  delete-item' onclick='deleteCartItem(this)'>删除</button></div>"+
    "    </div>"+
    "   </div>"+
    "   </div>";

    $(".user-cart").append($(row));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}
/**
 * 创建历史记录
 * @param id
 * @param pid
 * @param imageUrl
 * @param name
 * @param description
 * @param time
 */
function createHistoryItems(id,pid,imageUrl,name,description,time) {
    var item = " <div class='small-6 medium-3'>"+
    "<div class='card'>"+
    "<a class='searchLi' data-link='"+pid+"' href='#!'><img src='"+imageUrl+"' alt='"+description+"'></a>"+
    "<div class='card-section'>"+
    " <p class='text-center'><span data-tooltip aria-haspopup='true' class='has-tip right' data-click-open='true' data-disable-hover='false' tabindex='2' title='"+description+"'>"+name+"</span></p>"+
    "<p class='text-center'>"+time+"</p>"+
    "<p class='text-center'><button data-history-id='"+id+"' class='button alert delete-history' onclick='deleteHistory(this)'>删除</button></p>"+
    "</div>"+
    "</div>"+
    "</div>";
    $(".user-history").append($(item));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}
/**
 * 创建收藏的商品
 * @param id
 * @param pid
 * @param imageUrl
 * @param name
 * @param description
 * @param time
 */
function createCollectionItems(id,pid,imageUrl,name,description,time) {
    var item = " <div class='small-6 medium-3'>"+
        "<div class='card'>"+
        "<a class='searchLi' data-link='"+pid+"' href='#!'><img src='"+imageUrl+"' alt='"+description+"'></a>"+
        "<div class='card-section'>"+
        " <p class='text-center'><span data-tooltip aria-haspopup='true' class='has-tip right' data-click-open='true' data-disable-hover='false' tabindex='2' title='"+description+"'>"+name+"</span></p>"+
        "<p class='text-center'>"+time+"</p>"+
        "<p class='text-center'><button data-collection-id='"+id+"' class='button alert delete-history' onclick='deleteCollection(this)'>删除</button></p>"+
        "</div>"+
        "</div>"+
        "</div>";
    $(".favorite-item-wrapper").append($(item));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}

/**
 * 创建地址集合
 * @param id
 * @param name
 * @param phone
 * @param address
 * @param postcode
 */
function createAddressSet(id,name,phone,address,postcode) {
    var address="    <fieldset class='fieldset'>"+
    "<legend>我的地址：</legend>"+
    "<div class='user-address-set'>"+
    " <div class='user-phone' style=''>"+
    "&nbsp;收&nbsp;件&nbsp;人：<input class='phone' type='text' disabled value='"+name+"'/>"+
    " </div>"+
    "  <div class='user-phone' style=''>"+
    "  联系方式：<input class='phone' type='text' disabled value='"+phone+"'/>"+
    "  </div>"+
    "   <div>常用地址：<input class='address' type='text' disabled value='"+address+"'></div>"+
        "   <div>邮政编码：<input class='address' type='text' disabled value='"+postcode+"'></div>"+
        "   <button data-address-id='"+id+"' class='button alert' onclick='deleteAddress(this)'>删除</button>"+
        "   </div>"+
    "   </fieldset>";
    $(".user-old-address").append($(address))
}

/**
 * 创建订单的容器
 * @param id
 * @param time
 * @param state
 * @param totalPrice
 */
function createOrders(id,time,totalPrice) {

    var row="<div class='order-row "+"id"+id+"'>"+
    "<div class='order-info'>"+
    "<div class='order-id'>订单号："+id+"</div>"+
    "<div class='order-id'>总价格："+totalPrice+"</div>"+
    "<div class='order-time'>下单时间："+time+"</div>"+
    "</div>"+
    " </div>";
    $(".order-wrapper").append($(row));
    var classname=".id"+id;
    return classname;
}

/**
 * 创建订单子项
 * @param parent
 * @param pid
 * @param imageUrl
 * @param name
 * @param state
 * @param description
 * @param price
 * @param nums
 */
function createCartItems(parent,pid,imageUrl,name,state,description,price,nums) {
    var cartItems ="<div class='cart-item'>"+
        "<img src='"+imageUrl+"' alt='"+description+"'>"+
    "<div class='item-info'>"+
    "<div class='usual-item-info'>"+
    "<div class='item-name'><a class='searchLi' data-link='"+pid+"'>"+name+"</a></div>"+
    "<div class='item-price red'>￥"+price+"</div>"+
    "  </div>"+
    " <div class='item-nums'>"+
    " * <input type='number' data-item-price='"+price+"' value='"+nums+"' disabled >"+
    "</div>"+
    "<div class='red order-state'>"+state+"</div>"+
            "<button data-item-id='"+pid+"' class='button' onclick='discuss(this)'>评论</button>"+
    "</div>"+
    "</div>";

    $(parent).append($(cartItems));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}
/**
 * 创建搜索页面
 * @param id
 * @param name
 * @param imageUrl
 * @param description
 */
function createSearchItems(id,name,imageUrl,description) {
    var a = "<div class='search-items' href='items-detail.html'>"+
    "<div class='items-title'><a href='#!' class='searchLi' data-link='"+id+"'>"+name+"_克里斯多</div></div>"+
    "<div class='items-info'>"+
    "<div class='item-images'><img src='"+imageUrl+"' alt='"+description+"'></div>"+
    "<div class='item-descripion'>"+description+"</div>"+
    " </div>"+
    " </div>";

    $(".search-result-wrapper").append($(a));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码
        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}

/**
 * 创建订单中的商品信息
 * @param pid
 * @param name
 * @param attributes
 * @param counts
 * @param price
 */
function createProductInOrders(pid, name, attributes, counts, price) {
    var tr="<tr class='cart_item'>"+
    "<td class='product-name mainProductname'>"+
    "<a href='#!' class='searchLi' data-link='"+pid+"'>"+name+"#"+attributes+"<strong class='product-quantity'>× "+counts+"</strong>"+
    " </a>"+
    "</td>"+
    " <td class='product-total mainProductname'>"+
    "   ¥<span class='amount'>"+price*counts+"</span>"+
    "  </td>"+
    "  </tr>";
    $("table.order_details tbody").append($(tr));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })

}
/**
 * 创建---共为您找到data条数据
 * @param data
 */
function createSearchInfo(data) {
    $(".search-result-wrapper div").eq(0).remove();
    var div ="<div class='small-12 large-8 grid-x align-left search-tips'>共为您找到<span class='red'>"+data+"</span>条记录</div>";
    $(".search-result-wrapper").prepend($(div))
}
/**
 * 添加随机商品
 */
function createRandomItems(parent,pid,imageUrl,name,description) {
    var items= "  <div class='small-4 medium-3 random-items'>"+
    "<div class='card'>"+
    "<a href='#!' class='searchLi' data-link='+pid+'>"+
    "<img src='"+imageUrl+"' alt='"+description+"'>"+
    "  </a>"+
    " <div class='card-section'>"+
    "  <p class='text-center'><span data-tooltip aria-haspopup='true' class='has-tip right' data-click-open='true' data-disable-hover='false' tabindex='2' title='"+description+"'>"+name+"</span></p>"+
    "  </div>"+
    "   </div>"+
    "   </div>"
    $(parent).append($(items));

    $(".searchLi").bind("click",function () {
        var uid = getQueryString("uid");//不用管uid是否是空值
        var link = $(this).attr("data-link");
        if (uid==null){
            window.location.href="items-detail.html?pid="+encodeStr(link);//对参数进行编码

        }else{
            window.location.href="items-detail.html?uid="+uid+"&pid="+encodeStr(link);//对参数进行编码
        }
    })
}