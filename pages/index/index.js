//index.js
//获取应用实例
var sliderWidth = 98;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["个性推荐", "歌单", "主播电台"],
    imageurls:["images/music.png","images/search.png","images/user.png"],
    icons: ['iconfont icon-resou-copy','iconfont icon-jian'],
    icontexts: ['每日推荐','热搜排行'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderwidth:0
  },

  onclick_1:function(){
    console.log("tap1");
  },

  onclick_2:function(){
    console.log("tap2");
  },

  onclick_3:function(){
    console.log('tap3')
  },

  // click: function(){
  //   //console.log('点击文字');
  //   if(flag){
  //     this.setData({ viewstyle: "window-red"});
  //     flag = false;
  //   }
  //   else{
  //     this.setData({ viewstyle: "window" });
  //     flag = true;
  //   }
    
  // },


  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.profile);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        sliderWidth = res.windowWidth / 3;
        that.setData({
          // sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth)/2,
          sliderOffset: (res.windowWidth / that.data.tabs.length) * that.data.activeIndex,
          sliderwidth: sliderWidth
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})