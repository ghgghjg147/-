var t = getApp();

Component({
    properties: {
        list: {
            type: Array,
            value: []
        },
        shareVideoRule: {
            type: Object,
            value: {}
        }
    },
    lifetimes: {
        created: function() {},
        attached: function() {
            var t = this.data.list;
            if (console.log("list", t.length), t.length < 9) for (var e = 0, i = t.length; e < 9 - i; e++) t.push({
                isSpace: !0
            });
            console.log("list", t.length), this.setData({
                list: t
            });
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        close: function() {
            t.globalData.setting.playAudio("btnClick"), this.triggerEvent("close");
        },
        click: function() {
            t.globalData.setting.playAudio("btnClick"), this.triggerEvent("click");
        },
        goDetail: function(t) {
            this.close(), wx.navigateTo({
                url: "/package/pages/weekReport/weekReport?week=" + t.currentTarget.dataset.week
            });
        }
    }
});