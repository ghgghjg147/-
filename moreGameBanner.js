var e = getApp();

require("../../utils/https"), Component({
    properties: {},
    lifetimes: {
        created: function() {
            console.log("moreGameList", this.data.moreGameList);
        },
        attached: function() {
            var t = e.globalData.moreGameList, a = !1;
            t.length >= 4 && (t.length > 4 && (t = this.getRandomArrayElements(t, 4)), a = !0), 
            this.setData({
                moreGameList: t,
                isSort: a
            });
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        moveIndex: 0
    },
    methods: {
        jumpToGame: function(t) {
            var a = this;
            e.globalData.setting.playAudio("btnClick");
            var n = t.currentTarget.dataset.item, o = t.currentTarget.dataset.index;
            e.actionTrace({
                event: "guess_game_click",
                subEvent: n.gameAppid
            }), wx.navigateToMiniProgram({
                appId: n.gameAppid,
                path: n.gamePath,
                success: function() {
                    e.globalData.toOtherGame = !0, e.actionTrace({
                        event: "guess_game_out",
                        subEvent: n.gameAppid
                    }), a.triggerEvent("toTryGame", n);
                    var t = a.data.moveIndex;
                    o == t && (t += 1), a.setData({
                        moveIndex: t
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