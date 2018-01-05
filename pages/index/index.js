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
    recommend_win_width:0,
    recommend:[],
    recommend_mv_list:[],
    recommend_list_key:[1,2,3,4,5,6],
    user_album:[],
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
    console.log("index加载");
    var that = this;
    var user_data = (wx.getStorageSync('user_data'));
    wx.getSystemInfo({
      success: function (res) {
        sliderWidth = res.windowWidth / 3;
        that.setData({
          sliderOffset: (res.windowWidth / that.data.tabs.length) * that.data.activeIndex,
          sliderwidth: sliderWidth,
          recommend_win_width:(res.windowWidth/3)-2,
          win_width:res.windowWidth,
        });
      }
    });
    console.log(user_data);


    wx.request({
      url: "http://123.207.142.115:3000/top/playlist/highquality?limit=6",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          recommend: res.data.playlists,
        }),
        console.log(res.data)
      },
      
    })    //精品歌单请求

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
    
  }
})