var t = require("../../utils/https"), e = getApp();

Component({
    properties: {
        fromToShop: {
            type: Boolean,
            value: !1
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        player: {
            type: Object,
            value: {}
        },
        shareResult: {
            type: Object,
            value: {}
        }
    },
    lifetimes: {
        created: function() {},
        attached: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(e) {
                    var a = e.platform;
                    "ios" != a ? t.setData({
                        isIos: !1,
                        platform: a
                    }) : t.setData({
                        isIos: !0,
                        platform: a
                    });
                }
            });
        },
        ready: function() {
            this.autoTicket(), e.actionTrace({
                event: "buy_energy",
                subEvent: "buy_energy_click"
            }), this.getList();
        },
        detached: function() {
            clearInterval(this.data.interval1), clearInterval(this.data.interval2);
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        pageReady: !1,
        leftTime: 0,
        countDown: "--:--",
        countDown2: "--分--秒",
        countDownM: 0,
        countDownS: 0,
        interval1: 0,
        flyMsgIndex: 2,
        notShowClose: !1,
        isShowShop: !0,
        isShowTicket: !1,
        yearData: {},
        isShowGuide: !1,
        isIos: !1,
        isBuyNew: !1,
        isBuyYear: !1,
        isShowText: !0,
        propItems: [],
        currentItem: {},
        canShowTicket: !0
    },
    methods: {
        bindgetuserinfo: function(t) {
            e.actionTrace({
                event: "ios_guide_wxoa",
                subEvent: "buy_energy_click"
            }), console.log("bindgetuserinfo e", t), "getUserInfo:ok" == t.detail.errMsg ? this.triggerEvent("getuserinfo", !0) : this.triggerEvent("getuserinfo", !1);
        },
        show: function() {
            this.setData({
                isShowText: !0
            }), this.data.toShopContact && (this.data.toShopContact = !1, this.checkWebStatus());
        },
        hide: function() {
            this.setData({
                isShowText: !1
            });
        },
        close: function() {
            this.data.discountPop && !this.data.player.yearCardUser ? (e.actionTrace({
                event: "index_coupon",
                subEvent: "coupon_close"
            }), this.showTicket()) : (e.globalData.setting.playAudio("btnClick"), this.triggerEvent("close"));
        },
        showTicket: function() {
            var e = this;
            t.popDiscountEvent().then(function(t) {
                0 === t.data.code && (e.setData({
                    isShowTicket: !0
                }), e.getList());
            });
        },
        autoTicket: function() {
            var t = this;
            this.data.interval2 = setInterval(function() {
                t.data.discountPop && !t.data.player.yearCardUser && (e.actionTrace({
                    event: "index_coupon",
                    subEvent: "coupon_5s"
                }), t.showTicket()), clearInterval(t.data.interval2);
            }, 5e3);
        },
        closeTicket: function() {
            this.setData({
                discountPop: !1,
                isShowTicket: !1
            });
        },
        getList: function() {
            var e = this;
            t.propStore().then(function(t) {
                if (0 === t.data.code) {
                    var a = t.data.data.tips, n = t.data.data.users, i = t.data.data.propItems, o = t.data.data.discountPop, s = t.data.data.hasDiscount, r = t.data.data.leftTime, c = [], u = !0, d = !1, h = !0, l = !1, p = void 0;
                    try {
                        for (var y, g = i[Symbol.iterator](); !(h = (y = g.next()).done); h = !0) {
                            var f = y.value;
                            if (f.price = Number(f.price), f.originalPrice = Number(f.originalPrice), f.discounts = Number(f.discounts), 
                            1 == f.propType && (2 == f.propFlag ? (e.setData({
                                newData: f
                            }), u = !1) : e.setData({
                                oneData: f
                            })), 4 == f.propType && (f.discountPrice = o || !s ? f.price : Number(f.price) - Number(f.discounts), 
                            e.setData({
                                yearData: f
                            }), f.recharge)) {
                                d = !0, c = [ f ];
                                break;
                            }
                            c.push(f);
                        }
                    } catch (t) {
                        l = !0, p = t;
                    } finally {
                        try {
                            !h && g.return && g.return();
                        } finally {
                            if (l) throw p;
                        }
                    }
                    e.setData({
                        pageReady: !0,
                        hasDiscount: s,
                        tips: a,
                        userList: n,
                        leftTime: r,
                        discountPop: o,
                        isBuyYear: d,
                        isBuyNew: u,
                        propList: c
                    }), o || e.formatCountDown(), e.flyMsgHandle();
                }
            });
        },
        toShopContact: function(t) {
            e.actionTrace({
                event: "ios_guide_wxoa",
                subEvent: "buy_energy_click"
            }), e.actionTrace({
                event: "ios_guide_wxoa",
                subEvent: "ios_guide_kf"
            }), this.data.toShopContact = !0;
        },
        toggleGuide: function() {
            this.setData({
                isShowGuide: !this.data.isShowGuide
            });
        },
        toBuy: function(t) {
            console.log("this.data.isIos", this.data.isIos, this.data.needAuth), e.globalData.setting.playAudio("btnClick");
            var a = t.currentTarget.dataset.item;
            console.log("item", a), 1 == a.propType && (0 == a.propFlag && e.actionTrace({
                event: "buy_energy",
                subEvent: "buy_energy_once"
            }), 2 == a.propFlag && e.actionTrace({
                event: "buy_energy",
                subEvent: "buy_new_user"
            })), 2 == a.propType && e.actionTrace({
                event: "buy_energy",
                subEvent: "buy_energy_week"
            }), 4 == a.propType && (this.data.hasDiscount ? this.data.fromToShop ? e.actionTrace({
                event: "index_coupon",
                subEvent: "coupon_mes_click"
            }) : e.actionTrace({
                event: "index_coupon",
                subEvent: "coupon_shop_click"
            }) : e.actionTrace({
                event: "buy_energy",
                subEvent: "buy_energy_infinit"
            })), this.setData({
                currentItem: a
            }), this.data.isIos ? this.toggleGuide() : this.doBuy(a);
        },
        doBuy: function(e) {
            var a = this, n = e.propId;
            t.prepay(n).then(function(t) {
                if (0 === t.data.code) {
                    var e = t.data.data.jsPay;
                    a.data.prepayNo = t.data.data.prepayNo, e.success = function(t) {
                        wx.showLoading({
                            title: "支付中",
                            mask: !0
                        }), a.checkStatus();
                    }, wx.requestPayment(e);
                }
            });
        },
        buySuccessTrace: function() {
            var t = this.data.currentItem;
            1 == t.propType && (0 == t.propFlag && e.actionTrace({
                event: "buy_goods",
                subEvent: "buy_energy_once"
            }), 2 == t.propFlag && e.actionTrace({
                event: "buy_goods",
                subEvent: "buy_new_user"
            })), 4 == t.propType && (this.data.hasDiscount ? e.actionTrace({
                event: "buy_goods",
                subEvent: "buy_energy_coupon"
            }) : e.actionTrace({
                event: "buy_goods",
                subEvent: "buy_energy_infinit"
            }), wx.setStorage({
                key: "yearCardUser",
                data: !0
            }));
        },
        checkWebStatus: function() {
            var e = this, a = 1;
            !function n() {
                if (a > 10) return wx.hideLoading(), void wx.showModal({
                    title: "支付失败",
                    content: "请联系客服，我们将尽快为您处理",
                    showCancel: !1,
                    complete: function(t) {
                        console.log("用户点击确定");
                    }
                });
                t.getWebPrepay(a).then(function(t) {
                    0 === t.data.data.code && (2 === t.data.data.data.payStatus ? (wx.hideLoading(), 
                    e.toggleGuide(), 2 == e.data.currentItem.propType || 4 == e.data.currentItem.propType ? wx.showModal({
                        title: "支付成功",
                        content: "购买成功",
                        showCancel: !1,
                        complete: function(t) {
                            console.log("用户点击确定"), e.getList(), e.triggerEvent("buySuccess", e.data.currentItem);
                        }
                    }) : (e.getList(), e.triggerEvent("buySuccess", e.data.currentItem)), e.buySuccessTrace()) : (a += 1, 
                    setTimeout(function() {
                        n();
                    }, 300)));
                });
            }();
        },
        checkStatus: function() {
            var e = this, a = 1;
            !function n() {
                if (a > 10) return wx.hideLoading(), void wx.showModal({
                    title: "支付失败",
                    content: "请联系客服，我们将尽快为您处理",
                    showCancel: !1,
                    complete: function(t) {
                        console.log("用户点击确定");
                    }
                });
                t.getPrepayStatus(e.data.prepayNo, a).then(function(t) {
                    0 === t.data.data.code && (2 === t.data.data.data.payStatus ? (wx.hideLoading(), 
                    2 == e.data.currentItem.propType || 4 == e.data.currentItem.propType ? wx.showModal({
                        title: "支付成功",
                        content: "购买成功",
                        showCancel: !1,
                        complete: function(t) {
                            console.log("用户点击确定"), e.getList(), e.triggerEvent("buySuccess", e.data.currentItem);
                        }
                    }) : (e.getList(), e.triggerEvent("buySuccess", e.data.currentItem)), e.buySuccessTrace()) : (a += 1, 
                    setTimeout(function() {
                        n();
                    }, 300)));
                });
            }();
        },
        animationend1: function(t) {
            1 == this.data.animalStep && (this.data.flyMsgIndex < this.data.userList.length - 2 ? this.data.flyMsgIndex += 2 : this.data.flyMsgIndex = 1, 
            this.setData({
                text1: this.data.userList[this.data.flyMsgIndex - 1]
            }));
            var e = 1 == this.data.animalStep ? 2 : 1;
            this.setData({
                animalStep: e
            }), this.animationend2();
        },
        animationend2: function(t) {
            1 == this.data.animalStep && this.setData({
                text2: this.data.userList[this.data.flyMsgIndex]
            });
        },
        flyMsgHandle: function() {
            console.log("flyMsgHandle", this.data.userList, this.data.userList.length);
            var t = !0, e = !1, a = void 0;
            try {
                for (var n, i = this.data.userList[Symbol.iterator](); !(t = (n = i.next()).done); t = !0) {
                    var o = n.value, s = Math.round(5 * Math.random());
                    o.tip = this.data.tips[s], o.nickName.length > 5 && (o.nickName = o.nickName.substr(0, 5) + "...");
                }
            } catch (t) {
                e = !0, a = t;
            } finally {
                try {
                    !t && i.return && i.return();
                } finally {
                    if (e) throw a;
                }
            }
            this.data.userList.length > 1 ? (this.setData({
                text1: this.data.userList[this.data.flyMsgIndex - 1],
                text2: this.data.userList[this.data.flyMsgIndex],
                isDetailFinish: !0
            }), console.log("flyMsgHandle", this.data.flyMsgIndex, this.data.text1, this.data.text2)) : 1 == this.data.userList.length && this.setData({
                text1: this.data.userList[0],
                text2: this.data.userList[0]
            });
        },
        formatCountDown: function() {
            var t = this, e = this.data.leftTime;
            this.data.interval1 && (clearInterval(this.data.interval1), this.data.interval1 = 0), 
            this.data.interval1 = setInterval(function() {
                if (0 != t.data.leftTime) {
                    var a = e % 60, n = (e - a) / 60;
                    e > 0 ? (t.setData({
                        countDown: (n < 10 ? "0" + n : n) + ":" + (a < 10 ? "0" + a : a),
                        countDown2: (n < 10 ? "0" + n : n) + "分" + (a < 10 ? "0" + a : a) + "秒",
                        countDownM: n,
                        countDownS: a
                    }), e -= 1) : (t.data.yearData.discountPrice = t.data.yearData.price, t.setData({
                        countDown: "00:00",
                        countDown2: "00分00秒",
                        countDownM: "00",
                        countDownS: "00",
                        leftTime: 0,
                        hasDiscount: !1,
                        yearData: t.data.yearData
                    }));
                } else clearInterval(t.data.interval1);
            }, 1e3);
        },
        toBuyTicket: function() {
            this.setData({
                currentItem: this.data.yearData
            }), this.data.isIos ? this.toggleGuide() : this.doBuy(this.data.yearData);
        }
    }
});