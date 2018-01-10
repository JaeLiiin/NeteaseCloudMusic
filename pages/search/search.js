// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    search_showed:false,
    search_result:[],
    result_showed:false,
    a:6,
  },



  search:function(e){
    var that = this;
    console.log(this.data.inputVal);
    this.setData({
      search_showed:false,
    })
    wx.request({
      url: 'http://123.207.142.115:3000/search?keywords='+that.data.inputVal+'&limit=30',
      header:{
        'content-type' : 'application:json'    //默认值
      },
      success:function(res){
        that.setData({
          search_result:res.data.result,
          result_showed:true,
        }),
        console.log(that.data.search_result)
      },
    })
  },      //搜索功能



  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },


  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      search_showed:false,
    });
  },


  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },


  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      search_showed:true,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://123.207.142.115:3000/search?keywords=sway&limit=1',
      header: {
        'content-type': 'application:json'    //默认值
      },
      success: function (res) {
        that.setData({
          search_result: res.data.result,
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