var t = getApp(), e = require("../../utils/https");

Component({
    properties: {},
    lifetimes: {
        created: function() {},
        attached: function() {
            this.setData({
                shareVideoRule: t.globalData.shareVideoRule
            }), t.actionTrace({
                event: "receive_energy",
                subEvent: "try_game_visit"
            }), t.globalData.gameTryList ? this.setData({
                gameTryList: t.globalData.gameTryList
            }) : this.makeEnergy();
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        makeEnergy: function(a) {
            var i = this;
            e.makeEnergy().then(function(e) {
                if (0 === e.data.code) {
                    var a = !0, r = !1, n = void 0;
                    try {
                        for (var o, g = e.data.data[Symbol.iterator](); !(a = (o = g.next()).done); a = !0) {
                            var s = o.value;
                            if ("gametry" == s.sectionType) {
                                t.globalData.gameTryList = s.gameTryList, i.setData({
                                    gameTryList: s.gameTryList
                                });
                                break;
                            }
                        }
                    } catch (t) {
                        r = !0, n = t;
                    } finally {
                        try {
                            !a && g.return && g.return();
                        } finally {
                            if (r) throw n;
                        }
                    }
                }
            });
        },
        toTryGame: function(e) {
            var a = this;
            t.globalData.setting.playAudio("btnClick");
            var i = e.currentTarget.dataset.item;
            t.actionTrace({
                event: "try_game_click",
                subEvent: i.gameAppid
            }), t.log("item", i), wx.navigateToMiniProgram({
                appId: i.gameAppid,
                path: i.gamePath,
                success: function() {
                    t.globalData.toOtherGame = !0, a.triggerEvent("toTryGame", i), t.actionTrace({
                        event: "try_game_out",
                        subEvent: i.gameAppid
                    });
                },
                fail: function() {
                    console.log("跳转失败"), void 0 != i.gameQrcode && i.gameQrcode.length && wx.previewImage({
                        urls: [ i.gameQrcode ]
                    });
                }
            });
        },
        close: function() {
            t.log("close"), this.triggerEvent("close");
        },
        init: function() {
            var a = this;
            e.makeEnergy().then(function(e) {
                if (0 === e.data.code) {
                    var i = !0, r = !0, n = !1, o = void 0;
                    try {
                        for (var g, s = e.data.data[Symbol.iterator](); !(r = (g = s.next()).done); r = !0) {
                            var c = g.value;
                            if (c.gameTryList) {
                                i = !1, a.setData({
                                    gameTryList: c.gameTryList
                                }), t.globalData.gameTryList = a.data.gameTryList;
                                break;
                            }
                        }
                    } catch (t) {
                        n = !0, o = t;
                    } finally {
                        try {
                            !r && s.return && s.return();
                        } finally {
                            if (n) throw o;
                        }
                    }
                    i && (a.triggerEvent("tryFinish"), a.close());
                }
            });
        },
        toGetMoney: function(a) {
            var i = this;
            t.globalData.setting.playAudio("btnClick");
            var r = a.currentTarget.dataset.item;
            e.gameTryApi(r.id, 2).then(function(t) {
                0 === t.data.code && (i.init(), i.triggerEvent("tryGetSuccess", r));
            });
        }
    }
});