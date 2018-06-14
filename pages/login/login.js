// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hidden1: 'block',
    Hidden2: 'none',

    //登陆
    loginColor: '#1d75a3',
    registColor: '#818b90',
    emailType: 'info',
    passwordType: 'info',
    checkPassword: false,
    checkEmail: false,
    emailValue: '',
    passwordValue: '',

    loginButton: '#4e6398',

    //注册
    nameType1: 'info',
    name: false,
    nValue: '',

    sexType1: 'info',
    sex: false,
    sValue: '',

    emailType1: 'info',
    email: false,
    eValue: '',

    passwordType1: 'info',
    password: false,
    pValue: '',

    checkPassword1: 'info',
    repassword: false,
    rValue: '',

    registButton: '#4e6398'


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let a = this;
    // wx.getUserInfo({
    //   success: function (res) {
    //     a.setData({
    //       userInfo :{
    //         nickName: res.userInfo.nickName,
    //         avatarUrl: res.userInfo.avatarUrl,
    //       }
    //     })
    //   },
    // })

  },
  //登陆界面
  loginning: function(e) {
    this.setData({
      Hidden1: 'block',
      Hidden2: 'none',
      loginColor: '#1d75a3',
      registColor: '#818b90'
    })
  },
  //注册界面
  registing: function (e) {
    this.setData({
      Hidden1: 'none',
      Hidden2: 'block',
      loginColor: '#818b90',
      registColor: '#1d75a3'
    })
  },


//登陆
  //验证邮箱
  checkEmail: function(e) {
    this.setData({
      emailValue: e.detail.value
    });
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (reg.test(e.detail.value)) {
      this.setData({
        checkEmail: true,
        emailType: 'success'
      })
    } else {
      this.setData({
        checkEmail: false,
        emailType: 'cancel'
      })
    }
  },

  //验证密码
  checkPassword: function(e) {
    this.setData({
      passwordValue: e.detail.value
    });
    var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
    if(reg.test(e.detail.value)) {
      this.setData({
        checkPassword: true,
        passwordType: 'success'
      })
    } else {
      this.setData({
        checkPassword: false,
        passwordType: 'cancel'
      })
    }
  },

//登陆
  primary: function(e) {
    let ref = this;
    if (this.data.checkPassword && this.data.checkEmail) {
      wx.request({
        url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/usersession#!method=post',
        method: 'POST',
        data: {
          userId: ref.data.emailValue,
          password: ref.data.passwordValue,
        },
        success: function(data) {
          wx.setStorage({
            key: 'userId',
            data: ref.data.emailValue,
          });
          //跳转
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
        fail: function(data) {
          wx.showModal({
            title: '登陆失败',
            content: '用户名或者密码错误',
          })
        }
      })
    } else {
      wx.showModal({
        title: '登陆失败',
        content: '用户名或者密码错误',
      })
    }
  },



//注册验证
  //验证姓名
  checkName: function(e) {
    this.setData({
      nValue: e.detail.value
    });
    var reg = /^([\u4e00-\u9fa5]){2,7}$/;  
    if(reg.test(e.detail.value)) {
      this.setData({
        nameType1: 'success',
        name: true
      })
    } else {
      this.setData({
        nameType1: 'cancel',
        name: false
      })
    }
  },

  //验证性别
  checkSex: function(e) {
    this.setData({
      sValue: e.detail.value
    });
    var reg = /^['男'|'女']$/;
    if(reg.test(e.detail.value)) {
      this.setData({
        sexType1: 'success',
        sex: true
      })
    } else {
      this.setData({
        sexType1: 'cancel',
        sex: false
      })
    }
  },

  //邮箱验证
  checkEmail1: function(e) {
    this.setData({
      eValue: e.detail.value
    });
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (reg.test(e.detail.value)) {
      this.setData({
        email: true,
        emailType1: 'success'
      })
    } else {
      this.setData({
        email: false,
        emailType1: 'cancel'
      })
    }
  },
  //密码验证
  checkPassword1:function(e) {
    this.setData({
      pValue: e.detail.value
    });
    var reg = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
    if (reg.test(e.detail.value)) {
      this.setData({
        password: true,
        passwordType1: 'success'
      })
    } else {
      this.setData({
        password: false,
        passwordType1: 'cancel'
      })
    }
  },

  //再次验证密码
  checkPassword2:function(e) {
    this.setData({
      rValue: e.detail.value
    });
    if (this.data.pValue === this.data.rValue && e.detail.value) {
      this.setData({
        checkPassword1: 'success',
        repassword: true
      })
    } else {
      this.setData({
        checkPassword1: 'cancel',
        repassword: false
      })
    }
  },
  rejest: function(e) {
    let ref = this;
    if (ref.data.name && ref.data.sex && ref.data.email && ref.data.password && ref.data.repassword) {
      wx.request({
        url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/user#!method=post',
        method: 'POST',
        data: {
          username: ref.data.nValue,
          sex: ref.data.sValue,
          userId: ref.data.eValue,
          password: ref.data.pvalue,
        },
        success: function(data) {
          wx.setStorage({
            key: 'userId',
            data: ref.data.eValue,
          });
          wx.switchTab({
            url: '/pages/index/index',
          })
        },
        fail: function(json) {
          wx.showModal({
            title: '注册失败',
            content: '该邮箱已经被注册/网络错误',
          })
        }
      })
    } else {
      wx.showModal({
        title: '信息有误',
        content: '输入信息有误',
      })
    }
  }

})