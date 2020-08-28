// pages/category/category.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数组
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex: 0,
    //右侧滚动条距顶部距离
    scrollTop:0
  },

  //接口的返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 获取本地存储中的数据
    const Cates=wx.getStorageSync("cates");
    // 2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCates();
    }else{
      // 有旧的数据 暂时定义一个过期时间
      if(Date.now()-Cates.time>1000*10){
        //重新发送请求
        this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates=Cates.data;
     
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类信息 
  async getCates(){
    // request({
    //   url: '/categories'
      
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;
    //   //把接口的数据存入到本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

    //   //构造左侧菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);

    //   //构造右侧商品数据
    //   let rightContent=this.Cates[0].children; 

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 1 使用es7的async await发送异步
    const res=await request({url:"/categories"});
    // this.Cates=res.data.message;
    this.Cates=res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //构造左侧菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重新设置scroll-view标签的滚动条的距离
      scrollTop:0
    })

  }
})