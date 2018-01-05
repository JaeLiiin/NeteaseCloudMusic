// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarimage: "",
    topbgimage:"",
    nickname: "",
    signature: "",
    navbar: ["音乐", "动态", "关于我"],
    currentTab:0,
    activeIndex: 0,
    songsheet: ["1","2","3"],
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_data = (wx.getStorageSync('user_data'));
    this.setData({
      avatarimage: user_data.avatarUrl,
      topbgimage: user_data.backgroundUrl,
      nickname: user_data.nickname,
      signature: user_data.signature 
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