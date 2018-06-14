// pages/personal/personal.js
//个人信息展示
const timeInfo = new Date();

const endTime = timeInfo.getFullYear() + '-' + (timeInfo.getMonth()+1) + '-' +  timeInfo.getUTCDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称  
    },
    items: [{
      'name': 'nae',
      'title': '姓名',
      'value': '***' 
    },{
        'name': 'sex',
        'title': '性别',
        'value': '***' 
    },{
      'name': 'email',
      'title':'邮箱',
      'value': '***'
    },{
      'name': 'password',
      'title':'密码',
      'value':'***'
    }],
    histroyShow:'none',
    personalShow: 'block',
    editButton: 'block',
    storageButton: 'none',
    cancelButton: 'none',
    showPersonInfo: 'block',
    editPersonInfo: 'none',

    personColor: 'white',
    histroyColor: '#ccc',

    //得到历史预测结果（列表）
    listHistroys: '',
    loadMoreLogo: '',
    //历史查询data
    date: '',
    time: '12:01',
    endTime: endTime,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;

    //获取userId
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data,
        })
      },
    })

    //加载个人信息
    wx.request({
      url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/user#!method=get',
      method: 'get',
      data: {
        userId: that.data.userId,
      },
      success: function(json) {
        let arr = [];
        let tit = ['姓名', '邮箱', '性别', '密码'];
        let iter = tit[Symbol.iterator]();
        for (let i in json.data.object ) {
          console.log(i);
          let obj = {
            name: i,
            title: JSON.stringify(iter.next().value).replace(/\"/g, ""),
            value: json.data.object[i], 
          }
        arr.push(obj);
        };
        arr[3].value = '******';
        that.setData({
          items: arr,
        })
        console.log(arr); 
      }
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
    });
  },

  //登出
  out: function() {
    wx.showModal({
      title: '是否确认退出登陆',
      content: '退出登陆操作',
      success: function(res) {
        if(res.confirm) {
          wx.setStorage({
            key: 'userId',
            data: 'null',
            success: function() {
              console.log('clear userId');
            }
          });
          wx.redirectTo({
            url: '/pages/login/login',
          });
        }
      }
    })
  },

  //转到个人信息
  personInfo: function() {
    this.setData({
      personalShow: 'block',
      histroyShow: 'none',
      editPersonInfo: 'none',
      editButton: 'block',
      storageButton: 'none',
      cancelButton: 'none',
      showPersonInfo: 'block',
      editPersonInfo: 'none',
      personColor: 'white',
      histroyColor: '#ccc',
    })
  },
  //转到历史查询
  histroyInfo: function() {
    let ref = this;
    this.setData({
      histroyShow: 'block',
      personalShow: 'none',
      personColor: '#ccc',
      histroyColor: 'white',
    });
    wx.request({
      method: 'GET',
      data: ref.data.userId,
      url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/predictinfos#!method=get',
      success: function(json) {
        ref.setData({
          listHistroys: json.data.object,
        })
        console.log(ref.data.listHistroys);
      }
    })
  },

  //输入储存更新数据
  name: function(e) {
    this.setData({
      name: e.detail.value,
    });
  },
  sex: function(e) {
    this.setData({
      sex: e.detail.value,
    })
  },
  email: function (e) {
    this.setData({
      email: e.detail.value,
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value,
    })
  },


  //编辑
  edit:function() {
    this.setData({
      editButton: 'none',
      storageButton: 'block',
      cancelButton: 'block',
      showPersonInfo: 'none',
      editPersonInfo: 'block',
    })

  },

  //保存
  storage:function() {
    let ref = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/userinfo#!method=PUT',
      method: 'PUT',
      data: {
       'userId': ref.data.userId,
       'password': ref.data.password,
      },
      success: function(json) {
        ref.setData({
          editButton: 'block',
          storageButton: 'none',
          cancelButton: 'none',
          showPersonInfo: 'block',
          editPersonInfo: 'none',
        });
        wx.redirectTo({
          url: '/pages/login/login',
        })
      },
      error: function(json) {
        console.log(json);
      }
    })
  },

  //取消
  cancel: function () {
    this.setData({
      editButton: 'block',
      storageButton: 'none',
      cancelButton: 'none',
      showPersonInfo: 'block',
      editPersonInfo: 'none',
    })
  },

  //跳转到查询详细界面
  toDetail:function(e) {
    let ref = this;
    let index = parseInt(e.currentTarget.dataset.index);
    var listHistroys = this.data.listHistroys;
    wx.setStorage({
      key: "predictId",
      data: listHistroys[index].advices.id,
    });
    wx.navigateTo({
      url: '/pages/predictinfos/predictinfos',
    })
  },

  //加载更多
  loadMore:function(e) {
    let ref = this;
    console.log('loadMore');
    wx.request({
      url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/predictinfosMore#!method=get',
      method: 'get',
      data: {
        'userId': ref.data.userId,
      },
      success: function(json) {
        ref.setData({
          listHistroys: json.data.object,
          loadMoreLogo: 'none',
        })
        console.log(ref.data.listHistroys);
      },
      fail: function(json) {
        console.log(json);
      }
    });
  },
 
  //历史查询日期选择
  bindDateChange: function (e) {
    let ref = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
        date: e.detail.value,
    });
    wx.request({
      method: 'GET',
      data: {
        data: ref.data.userId,
        time:e.detail.value,
      },
      url: 'https://easy-mock.com/mock/5b1b726ce97929499ca19a11/BES/histroyInfos#!method=get',
      success:function(json) {
        ref.setData({
          listHistroys: json.data.object,
          loadMoreLogo: 'none',
        })
      },
      fail: function(json) {
        console.log(json);
      }
    })
  },
})