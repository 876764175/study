// 引入 用来发送请求
import { request } from "../../request/index.js";
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    //导航 数组
    cateList:[],
    //楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 发送异步请求获取轮播图数据 优化的手段可以通过es6的promise来解决
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(result=>{
      result.forEach((v,i)=>{
        let url=v.navigator_url;
        v.navigator_url=url.replace("main","goods_detail");
      });
      this.setData({
        swiperList:result
      })
    })
  },

  //获取 分类导航数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        cateList:result
      })
    })
  },

  //获取 楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      result.forEach((v,i)=>{
        let res=v.product_list;
        res.forEach((x,y)=>{
          let url=x.navigator_url;
          x.navigator_url=url.replace("goods_list?","goods_list/goods_list?");
        })
      });
      this.setData({
        floorList:result
      })
    })
  }
})