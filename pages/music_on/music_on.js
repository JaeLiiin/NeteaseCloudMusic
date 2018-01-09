// pages/music_on/music_on.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen_width : 0,
    screen_height : 0,
    music_id :0,
    music_cov : "",
    music_url : "123",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var music_dat=[];
    var music_dat = (wx.getStorageSync('music_data'));
    this.setData({
      music_id: music_dat.id,
      music_cov: music_dat.pic,
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screen_width : res.windowWidth,
          screen_height : res.windowHeight
        });
      },
    })
    wx.request({
      url: "http://123.207.142.115:3000/music/url",
      data:{
        id:that.data.music_id,
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          music_url:res.data.data[0].url
        })
        console.log(that.data.music_url)
        wx.playBackgroundAudio({
          dataUrl: that.data.music_url
        });
      }
    });      //歌曲url请求
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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