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
    active_album:0,
    currentTab:0,
    activeIndex: 0,
    // songsheet: ["1","2","3"],
    user_album:[],
    user_profile:[],
    user_gender:"",
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
  },

  user_album_access: function (e) {
    var that = this;
    console.log("歌单 启动！");
    this.setData({
      active_album: e.currentTarget.id
    })
    console.log(this.data.active_album)
    wx.navigateTo({
      url: '/pages/music_list/music_list?id=' + that.data.user_album[that.data.active_album].id + '&name=' + that.data.user_album[that.data.active_album].name,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_data = (wx.getStorageSync('user_data'));
    // var user_id = (wx.getStorageSync('user_data.id'));
    this.setData({
      avatarimage: user_data.avatarUrl,
      topbgimage: user_data.backgroundUrl,
      nickname: user_data.nickname,
      signature: user_data.signature 
    });    //从本地缓存读取用户资料





    wx.request({
      url: "http://123.207.142.115:3000/user/playlist",
      data: {
        uid: user_data.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          user_album: res.data.playlist,
        }),
          console.log(res.data)
      },

    })  //用户歌单请求


    wx.request({
      url: "http://123.207.142.115:3000/user/detail?uid="+user_data.id,
      header:{
        'content-type': 'application:json'
      },
      success:function(res){
        if(res.data.profile.gender==1){
          that.setData({
            user_gender:'男',
            user_profile: res.data
          })
        }else{
          that.setData({
            user_gender: '女',
            user_profile: res.data
          })
        
        }
        
        console.log(res.data)
      }
    })    //用户信息请求

    // if(that.data.user_profile.profile.gender==1){
    //   this.setData({
    //     user_gender:"男"
    //   })
    // }
    // else {
    //   this.setData({
    //     user_gender:"女"
    //   })
    // }
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