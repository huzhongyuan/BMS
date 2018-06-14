//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称  
    },
    sex: 1,
    name: null,
    age: null,
    height: null,
    weight: null,
    bmd: null,
    alb: null,
    ca: null,
    p: null,
    alp: null,
    hb: null,
    lym: null,
    items: [
      { name: '1', value: '男', checked: 'true'},
      { name: '2', value: '女' },
    ]
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data,
        })
      },
    })
    /**  
     * 获取用户信息  
     */
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    }) ;
  },
  personal: function() {
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },
  histroy: function() {
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  inputAge: function (e) {
    this.setData({
      age: e.detail.value
    })
  },
  inputHeight: function (e) {
    this.setData({
      height: e.detail.value
    })
  },
  inputWeight: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  inputBmd: function (e) {
    this.setData({
      bmd: e.detail.value
    })
  },
  inputAlb: function (e) {
    this.setData({
      alb: e.detail.value
    })
  },
  inputCa: function (e) {
    this.setData({
      ca: e.detail.value
    })
  },
  inputP: function (e) {
    this.setData({
      p: e.detail.value
    })
  },
  inputAlp: function (e) {
    this.setData({
      alp: e.detail.value
    })
  },
  inputHb: function (e) {
    this.setData({
      hb: e.detail.value
    })
  },
  inputLym: function (e) {
    this.setData({
      lym: e.detail.value
    })
  },
  radioChange: function (e) {
    this.setData({
      sex: e.detail.value,
    });
  },
  //查询
  serch:function () {
    let ref = this;
    if(this.data.sex && this.data.name && this.data.age && this.data.weight && this.data.height && this.data.bmd && this.data.alb && this.data.ca && this.data.p && this.data.hb && this.data.alp && this.data.lym) {
      console.log(1);
      let info = {
        userId: ref.data.userId,
        sex: this.data.sex - 1,
        name: this.data.name,
        age: this.data.age,
        height: this.data.height,
        weight: this.data.weight,
        bmd: this.data.bmd,
        alb: this.data.alb,
        ca: this.data.ca,
        p: this.data.p,
        hb: this.data.hb,
        alp: this.data.alp,
        lym: this.data.lym,
      };
      info = JSON.stringify(info);
      console.log(info);
      wx.request({
        url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/bonetest#!method=post',
        method: 'POST',
        data: info,
        success: function(json){
          wx.setStorage({
            key: 'predictId',
            data: json.data.object.advices.predictId,
          })
        }
      })
      wx.navigateTo({
        url: '/pages/predictinfos/predictinfos',
      });
    }
  }

})
