//index.js
//获取应用实例
var sliderWidth = 98
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["个性推荐", "我的音乐", "主播电台"],
    imageurls:["images/music.png","images/search.png","images/user.png"],
    icons: ['iconfont icon-resou-copy','iconfont icon-jian'],
    icontexts: ['每日推荐','热搜排行'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderwidth:0,
    user_id:0,
    win_width:0,
    active_album:0,
    album:{
      album_id:0,
      album_name:""
    },
    hot_list:[],
    recommend_win_width:0,
    recommend:[],
    recommend_mv_list:[],
    user_album:[],
    personal_fm:[],
  },

  onclick_1:function(){
    var that = this;
    console.log("每日推荐 启动！");
    console.log(this.data.album.album_id);
    console.log(that.data.album.album_name);
    wx.navigateTo({
      url: '/pages/music_list/music_list?id='+that.data.album.album_id+'&name='+that.data.album.album_name,
    })
  },    //每日推荐

  onclick_2:function(){
    var that = this;
    console.log("热搜排行 启动！");
    console.log(this.data.album.album_id);
    console.log(that.data.album.album_name);
    wx.navigateTo({
      url: '/pages/music_list/music_list?id=' + that.data.hot_list.id + '&name=' + that.data.hot_list.name,
    })
  },    //热搜排行

  onclick_3:function(){
    var that = this;
    console.log('私人fm 启动！');
    wx.request({
      url: 'http://123.207.142.115:3000/personal_fm',
      header:{
        'content-type' : 'application:json'
      },
      success:function(res){
        that.setData({
          personal_fm:res.data
        })
        console.log(that.data.personal_fm);
        that.music_data_process(that.data.personal_fm);
        wx.switchTab({
          url: '/pages/music_on/music_on',
        })
      }
    })
  },


  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  album_access:function(e){
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

  album_access_1: function (e) {
    var that = this;
    console.log("推荐 启动！");
    this.setData({
      active_album: e.currentTarget.id
    })
    console.log(this.data.active_album)
    wx.navigateTo({
      url: '/pages/music_list/music_list?id=' + that.data.recommend[that.data.active_album].id + '&name=' + that.data.recommend[that.data.active_album].name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index 加载!");
    var str1 = "album.album_id";
    var str2 = "album.album_name";
    var that = this;
    var user_data = (wx.getStorageSync('user_data'));
    wx.getSystemInfo({
      success: function (res) {
        sliderWidth = res.windowWidth / 3;
        that.setData({
          sliderOffset: (res.windowWidth / that.data.tabs.length) * that.data.activeIndex,
          sliderwidth: sliderWidth,
          recommend_win_width:(res.windowWidth/3)-5,
          win_width:res.windowWidth,
        });
      }
    });
    console.log(user_data);


    wx.request({
      url: "http://123.207.142.115:3000/top/playlist?limit=12&order=new",
      // data:{
      //   limit:6
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          recommend: res.data.playlists,
        }),
        console.log(res.data)
      },
      
    })    //推荐歌单请求

    wx.request({
      url: "http://123.207.142.115:3000/personalized/mv",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res1){
        that.setData({
          recommend_mv_list:res1.data.result,
        })
        
      },
      
    })   //滑动海报请求

    wx.request({
      url: "http://123.207.142.115:3000/user/playlist",
      data:{
        uid:user_data.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          user_album:res.data.playlist,
        }),
        console.log(res.data)
      },

    })    //用户歌单请求

    wx.request({
      // url: "http://112.74.189.215:5000/ask?id=123",
      
      url: "http://123.207.142.115:3000/personalized/newsong",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          [str1] : res.data.result[1].id,
          [str2] : res.data.result[1].name
        })
        console.log(res.data)
        // album_id=res.data.result[0].id;
        // console.log(res.data.result[0].id)
      }
    })      //每日推荐请求

    wx.request({
      url: "http://123.207.142.115:3000/top/list?idx=1",
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          hot_list: res.data.playlist
        })
        console.log(res.data)
      },


      
    })   //热搜排行推荐

    wx.request({
      url: "http://123.207.142.115:3000/top/playlist?limit=12&order=new",
      // data:{
      //   limit:6
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          recommend: res.data.playlists,
        }),
          console.log(res.data)
      },

    })    //最新歌单请求

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

  music_data_process: function (res) {
    var that = this;
    var music_list = new Array();   //歌单数组
    for (var i = 0; i < 3; i++) {
      var music_data = new Object();
      music_data.name = res.data[i].name;
      music_data.id = res.data[i].id;
      music_data.str = res.data[i].album.pic;
      music_data.pic_url = res.data[i].album.picUrl;
      music_list.push(music_data);
    }
    console.log(music_list);
    wx.setStorageSync('music_list', music_list);

    wx.setStorageSync('active_music', 3);

  }

  // music_data_process: function (res) {
  //   var that = this;
  //   var music_list = new Array();   //歌单数组
  //   var music_data = new Object();
  //   music_data.name = res.name;
  //   music_data.id = res.id;
  //   music_data.str = res.album.pic;
  //   music_data.pic_url = res.album.picUrl;
  //   music_list.push(music_data);
  //   console.log(music_list);
  //   wx.setStorageSync('music_list', music_list);

  // }
})