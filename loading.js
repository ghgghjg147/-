var t = getApp();

Component({
    lifetimes: {
        created: function() {},
        attached: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(a) {
                    var n = wx.getStorageSync("loadingList"), i = wx.getStorageSync("isSeeRecord"), o = wx.getStorageSync("yearCardUser");
                    t.globalData.platform = a.platform;
                    var s = a.platform;
                    if (n) {
                        ("ios" == s || o) && n.splice(4, 1);
                        for (var r = 0; r < n.length; r++) n[r].index = r + 1;
                        if (console.log("loadingList", n), n && n.length > 0) {
                            i || n.splice(2, 1);
                            var l = n[Math.floor(Math.random() * n.length)];
                            e.data.item = l, e.setData({
                                bg: l.bg.imageUrl,
                                tip: l.txt.imageUrl
                            }), t.actionTrace({
                                event: "open_show",
                                subEvent: "load_img_" + l.index
                            });
                        }
                        e.data.interval = setInterval(function() {
                            if (e.data.loadingStatus < 3) {
                                e.data.loadingStatus += 1;
                                for (var t = "", a = 0; a < e.data.loadingStatus; a++) t += "";
                                e.setData({
                                    text: "" + t
                                });
                            } else e.data.loadingStatus = 0, e.setData({
                                text: "登录中2"
                            });
                        }, 600);
                    } else t.actionTrace({
                        event: "open_show",
                        subEvent: "load_img_4"
                    });
                }
            });
        },
        ready: function() {},
        detached: function() {
            clearInterval(this.data.interval), this.data.item ? t.actionTrace({
                event: "open_enter",
                subEvent: "load_img_" + this.data.item.index
            }) : t.actionTrace({
                event: "open_enter",
                subEvent: "load_img_4"
            });
        }
    },
    properties: {},
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowText: !1,
        text: "",
        loadingStatus: 0
    },
    methods: {
        loadFinish: function() {
            this.setData({
                isShowText: !0
            });
        }
    }
});