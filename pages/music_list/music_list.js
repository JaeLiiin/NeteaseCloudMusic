// pages/music_list/music_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    album_id:0,
    album_name:"",
    music_list:[],
    win_width:0,
    win_height: 0,
    music_url:"",
    song_name:"",
    music_avatar:"",
    music_id:0,
    active_music:0,
  },

  music_access:function(e){
    var that = this;
    var music_list = this.data.music_list;
    console.log(music_list);
    this.setData({
      active_music: e.currentTarget.id,
    });
    console.log(this.data.active_music);
    this.music_data_process(music_list);

    // wx.request({
    //   url: "http://123.207.142.115:3000/music/url?",
    //   data:{
    //     id:that.data.music_id,
    //   },
    //   header:{
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success:function(res){
    //     that.setData({
    //       music_url:res.data.data.url
    //     })
    //   }
    // })       歌曲url请求
    wx.switchTab({
      url:'/pages/music_on/music_on',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id);
    console.log(options.name);

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          win_height:res.windowHeight,
          win_width:res.windowWidth
        })
      },
    })

    that.setData({
      album_id:options.id,
      album_name:options.name
    })
    wx.request({
      url: "http://123.207.142.115:3000/playlist/detail",
      data:{
        // id: 487515986
        id:that.data.album_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          music_list:res.data.playlist
        });
        console.log('123'),
        console.log(that.data.music_list)
      }
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

  music_data_process:function(res){
    var that = this;
    var music_data = new Object();
    music_data.id = res.tracks[that.data.active_music].id;
    music_data.pic = res.tracks[that.data.active_music].al.picUrl;
    wx.setStorageSync('music_data', music_data);
  }
})