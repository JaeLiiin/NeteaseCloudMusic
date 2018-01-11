// pages/music_on/music_on.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation: "",
    play_flag : true,
    icon_playorpause: "icon-zanting",
    screen_width : 0,
    screen_height : 0,
    music_dat : [],
    music_length : 0,
    active_music : 0,
    music_pic_url : "",
    music_plur_pic_url :"",
    music_current_id : "",
    music_current_url : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change_icon : function()
  {
    if(this.data.play_flag)
    {
      this.setData({
        icon_playorpause : "icon-bofang2"
      });
    }
    else{
      this.setData({
        icon_playorpause: "icon-zanting"
      });
    }

  },
  pause_play: function(){
    if(this.data.play_flag)
    {
      this.setData({
        play_flag: false
      });
      
    }else{
      this.setData({
        play_flag: true
      });
    }
    this.change_icon();
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if(this.data.play_flag)
    {
      backgroundAudioManager.pause();
    }
    else
    {
      backgroundAudioManager.play();
    }
  },
  music_play : function(music_url){
    var that = this;
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = this.data.music_dat[this.data.active_music].name;
    console.log(music_url);
    backgroundAudioManager.src = music_url;

  },
  pre_music :function(){
    var length = this.data.music_length;
    var active_music = this.data.active_music;
    if (this.data.active_music == 0)
    {
      this.setData({
        active_music : length
      });
    }else{
      this.setData({
        active_music : --active_music
      });
    }
    this.setData({
      icon_playorpause: "icon-zanting"
    });
    this.music_refresh();
    this.music_request();

  },
  next_music : function(){
    var length = this.data.music_length;
    var active_music = this.data.active_music;
    if(this.data.active_music == length-1)
    {
      this.setData({
        active_music : 0
      });
    }else{
      this.setData({
        active_music: ++active_music
      });
    }
    this.setData({
      icon_playorpause: "icon-zanting"
    });
    this.music_refresh();
    this.music_request();

  },
  music_refresh : function(){
    var active_music = this.data.active_music;
    var music_dat = this.data.music_dat;
    this.setData({
      music_pic_url: music_dat[active_music].pic_url,
      music_plur_pic_url: "http://music.163.com/api/img/blur/" + music_dat[active_music].str,
    })
    wx.setStorage({
      key: 'active_music',
      data: active_music,
    })
  },
  music_request : function(){
    var that =this;
    var music_current_id = this.data.music_dat[this.data.active_music].id
    this.setData({
      music_current_id: music_current_id
    });
    var music_id = that.data.music_current_id;
    wx.request({
      url: "http://123.207.142.115:3000/music/url",
      data: {
        id: music_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {        
        that.setData({
          music_current_url: res.data.data[0].url
        })
        var music_url = that.data.music_current_url;
        that.music_play(music_url);
      }
    });      //歌曲url请求
  },
  music_load : function(){
    var music_dat = [];
    var music_dat = (wx.getStorageSync('music_list'));
    var active_music = wx.getStorageSync('active_music');
    var music_pic_str = music_dat[active_music].str;
    var music_pic_url = music_dat[active_music].pic_url;
    var music_length = music_dat.length;
    this.setData({
      music_dat: music_dat,
      active_music: active_music,
      music_pic_url: music_pic_url,
      music_plur_pic_url: "http://music.163.com/api/img/blur/" + music_pic_str,
      music_length : music_length
    })
  },
  music_show_refresh : function(){

  },
  onLoad: function (options) {
    var that = this;
    this.music_load();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          screen_width : res.windowWidth,
          screen_height : res.windowHeight
        });
      },
    }); 
    this.music_request();
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
    this.animation = wx.createAnimation({
      duration: 1400,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.setData({
      icon_playorpause: "icon-zanting",
    });
    this.music_load();
    this.music_request();
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