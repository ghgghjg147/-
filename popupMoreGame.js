var e = getApp();

Component({
    properties: {
        isShowDetention: {
            type: Boolean,
            value: !1
        },
        list: {
            type: Array,
            value: []
        },
        shareVideoRule: {
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
            var t = this.data.list;
            t.length > 6 && (t = this.getRandomArrayElements(t, 6)), this.setData({
                moreGameList: t
            }), this.data.isShowTreasure = e.globalData.isShowTreasure, console.log("this.data.list", this.data.list);
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowBanner: !0
    },
    methods: {
        bannerLoad: function() {
            e.actionTrace({
                event: "ad_banner_show",
                subEvent: this.data.shareVideoRule.adv.tryGameBanner
            });
        },
        bannerError: function(t) {
            e.actionTrace({
                event: "ad_banner_fail",
                subEvent: this.data.shareVideoRule.adv.tryGameBanner
            }), console.log("banner err", t), this.setData({
                isShowBanner: !1
            });
        },
        toGame: function() {
            this.triggerEvent("toGame"), this.triggerEvent("close");
        },
        close: function() {
            e.globalData.setting.playAudio("btnClick"), this.triggerEvent("close");
        },
        toPoem: function(t) {
            var a = this, n = t.currentTarget.dataset.item;
            e.actionTrace({
                event: "more_game_click",
                subEvent: n.gameAppid
            }), this.data.isShowDetention && e.actionTrace({
                event: "01detain_game_click",
                subEvent: n.gameAppid
            }), this.data.isShowTreasure && e.actionTrace({
                event: "01loss_game_click",
                subEvent: n.gameAppid
            }), wx.navigateToMiniProgram({
                appId: n.title,
                path: n.position,
                success: function(t) {
                    e.globalData.toOtherGame = !0, e.actionTrace({
                        event: "more_game_out",
                        subEvent: n.gameAppid
                    }), a.data.isShowDetention && e.actionTrace({
                        event: "01detain_game_out",
                        subEvent: n.gameAppid
                    }), a.data.isShowTreasure && e.actionTrace({
                        event: "01loss_game_out",
                        subEvent: n.gameAppid
                    });
                },
                fail: function() {
                    console.log("跳转失败"), void 0 != n.gameQrcode && n.gameQrcode.length && wx.previewImage({
                        urls: [ n.gameQrcode ]
                    });
                }
            });
        },
        clickItem: function(t) {
            var a = this;
            console.log(t.currentTarget.dataset.item);
            var n = t.currentTarget.dataset.item;
            e.globalData.setting.playAudio("btnClick"), e.actionTrace({
                event: "more_game_click",
                subEvent: n.gameAppid
            }), this.data.isShowDetention && e.actionTrace({
                event: "01detain_game_click",
                subEvent: n.gameAppid
            }), this.data.isShowTreasure && e.actionTrace({
                event: "01loss_game_click",
                subEvent: n.gameAppid
            }), wx.navigateToMiniProgram({
                appId: n.gameAppid,
                path: n.gamePath,
                envVersion: n.envVersion,
                success: function(t) {
                    e.globalData.toOtherGame = !0, e.actionTrace({
                        event: "more_game_out",
                        subEvent: n.gameAppid
                    }), a.data.isShowDetention && e.actionTrace({
                        event: "01detain_game_out",
                        subEvent: n.gameAppid
                    }), a.data.isShowTreasure && e.actionTrace({
                        event: "01loss_game_out",
                        subEvent: n.gameAppid
                    });
                },
                fail: function() {
                    console.log("跳转失败"), void 0 != n.gameQrcode && n.gameQrcode.length && wx.previewImage({
                        urls: [ n.gameQrcode ]
                    });
                }
            });
        },
        getRandomArrayElements: function(e, t) {
            for (var a = []; a.length < t; ) {
                var n = e[this.getRandomInt(0, e.length)];
                n && -1 == a.indexOf(n) && a.push(n);
            }
            return a;
        },
        getRandomInt: function(e, t) {
            return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e;
        }
    }
});