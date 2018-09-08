var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var lonlat;
var city;
Page({
  data: {
    markers: [
      {
        id: 1,
        latitude: 34.221200,
        longitude: 108.95551,
        iconPath: '../../img/mapicon_navi_s.png'
      }
    ],
    tips: {}
  },
  onLoad: function (e) {
    lonlat = e.lonlat;
    city = e.city;
  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({
      key: '900cd0384cc848c45188cdbff435c817'
    });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            markers: this.markers,
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../navigation/navigation?keywords=' + keywords;
    wx.redirectTo({
      url: url
    })
  }
})