var e = getApp();

Component({
    properties: {
        zIndex: {
            type: Number,
            value: 20
        },
        width: {
            type: Number,
            value: 652
        },
        top: {
            type: Number,
            value: 0
        },
        notShowClose: {
            type: Boolean,
            value: !1
        },
        isList: {
            type: Boolean,
            value: !1
        },
        type: {
            type: Number,
            value: 1
        },
        showBanner: {
            type: Boolean,
            value: !1
        },
        bannerId: {
            type: String,
            value: ""
        }
    },
    lifetimes: {
        created: function() {},
        attached: function() {},
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowBanner: !0
    },
    methods: {
        close: function() {
            this.triggerEvent("close");
        },
        bannerLoad: function() {
            e.actionTrace({
                event: "ad_banner_show",
                subEvent: this.data.bannerId
            });
        },
        bannerError: function(n) {
            e.actionTrace({
                event: "ad_banner_fail",
                subEvent: this.data.bannerId
            }), console.log("banner err", n), this.setData({
                isShowBanner: !1
            });
        },
        toPoem: function() {
            wx.navigateToMiniProgram({
                appId: e.globalData.shareResult.daoliu_banner.title
            });
        }
    }
});