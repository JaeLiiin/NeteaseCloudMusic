// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    win_height:0
    
  },
  test: function(){
    console.log("test123");
  },
  login_cellphone: function (){
    var that = this;
    wx.request({
      url: "http://123.207.142.115:3000/login/cellphone",
      data: {
        phone: '13566906378',
        password: 'iamjjl2014'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.process_data(res);
        wx.switchTab({
          url: '/pages/index/index',
          data: {
            profile: res.data
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '登录失败',
          content: '用户名或密码错误',
          showCancel: false,
          confirmText: "OK"
        })
      }
    });
    // wx.switchTab({
    //   url: '/pages/index/index',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          win_height:res.windowHeight
        })
      },
    })
  
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
  
  },
  process_data: function (res) {
    var user_data = new Object();
    user_data.id = res.data.account.id;
    user_data.avatarUrl = res.data.profile.avatarUrl;
    user_data.backgroundUrl = res.data.profile.backgroundUrl;
    user_data.birthday = res.data.profile.birthday;
    user_data.province = res.data.profile.province;
    user_data.nickname = res.data.profile.nickname;
    user_data.gender = res.data.profile.gender;
    user_data.signature = res.data.profile.signature;
    wx.setStorage({
      key: 'user_data',
      data: user_data,
    })
  }
})