var t = require("../../utils/https"), e = getApp();

Component({
    properties: {
        needAuth: {
            type: Boolean,
            value: !1
        },
        shareResult: {
            type: Object,
            value: {}
        },
        shareVideoRule: {
            type: Object,
            value: {}
        },
        player: {
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
                    }), t.data.isIos ? (t.data.player.iosPay || t.data.player.yearCardUser) && t.setData({
                        isShowShop: !0
                    }) : t.setData({
                        isShowShop: !0
                    });
                }
            });
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isIos: !1,
        isShowGuide: !1,
        isShowShop: !1
    },
    methods: {
        bindgetuserinfo: function(t) {
            e.actionTrace({
                event: "ios_guide_wxoa",
                subEvent: "buy_energy_click"
            }), console.log("bindgetuserinfo e", t), "getUserInfo:ok" == t.detail.errMsg ? this.triggerEvent("getuserinfo", !0) : this.triggerEvent("getuserinfo", !1);
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
        show: function() {
            this.data.toShopContact && (this.data.toShopContact = !1, this.checkWebStatus()), 
            e.globalData.toShare && this.triggerEvent("shareSuccess");
        },
        closeNoEnergyPopup: function() {
            this.triggerEvent("close");
        },
        toWatchVideo: function() {
            this.closeNoEnergyPopup(), this.triggerEvent("watchVideo");
        },
        toggleGuide: function() {
            this.setData({
                isShowGuide: !this.data.isShowGuide
            });
        },
        toBuy: function(t) {
            e.globalData.setting.playAudio("btnClick");
            var a = t.currentTarget.dataset.item;
            this.setData({
                currentItem: a
            }), this.data.isIos ? this.toggleGuide() : this.doBuy(a);
        },
        doBuy: function(e) {
            var a = this, o = e.propId;
            t.prepay(o).then(function(t) {
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
        checkWebStatus: function() {
            var a = this, o = 1;
            !function i() {
                if (o > 10) return wx.hideLoading(), void wx.showModal({
                    title: "支付失败",
                    content: "请联系客服，我们将尽快为您处理",
                    showCancel: !1,
                    complete: function(t) {
                        console.log("用户点击确定");
                    }
                });
                t.getWebPrepay(o).then(function(t) {
                    0 === t.data.data.code && (2 === t.data.data.data.payStatus ? (e.actionTrace({
                        event: "buy_goods",
                        subEvent: "buy_game_tips"
                    }), wx.hideLoading(), a.toggleGuide(), a.triggerEvent("buySuccess"), a.triggerEvent("close")) : (o += 1, 
                    setTimeout(function() {
                        i();
                    }, 300)));
                });
            }();
        },
        checkStatus: function() {
            var a = this, o = 1;
            !function i() {
                if (o > 10) return wx.hideLoading(), void wx.showModal({
                    title: "支付失败",
                    content: "请联系客服，我们将尽快为您处理",
                    showCancel: !1,
                    complete: function(t) {
                        console.log("用户点击确定");
                    }
                });
                t.getPrepayStatus(a.data.prepayNo, o).then(function(t) {
                    0 === t.data.data.code && (2 === t.data.data.data.payStatus ? (e.actionTrace({
                        event: "buy_goods",
                        subEvent: "buy_game_tips"
                    }), wx.hideLoading(), a.triggerEvent("buySuccess"), a.triggerEvent("close")) : (o += 1, 
                    setTimeout(function() {
                        i();
                    }, 300)));
                });
            }();
        },
        toShare: function() {
            e.setGlobalData({
                toShare: Date.now()
            });
        }
    }
});