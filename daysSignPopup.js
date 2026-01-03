var e = getApp();

Component({
    lifetimes: {
        attached: function() {
            this.setData({
                shareVideoRule: e.globalData.shareVideoRule
            });
        }
    },
    properties: {
        daysSignStyle: {
            type: Boolean,
            value: !1
        },
        daysSignInfo: {
            type: Object,
            value: {}
        },
        player: {
            type: Object,
            value: {}
        },
        shareResult: {
            type: Object,
            value: {}
        },
        shareVideoRule: {
            type: Object,
            value: {}
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        toSign: function() {
            this.data.player.yearCardUser && 2 == this.data.shareVideoRule.dailySign ? this.triggerEvent("toSignWatchVideo") : this.triggerEvent("toSign");
        },
        switchDaysSignStyle: function() {
            this.setData({
                daysSignStyle: !this.data.daysSignStyle
            });
        },
        toggleSignUp: function() {
            this.triggerEvent("close");
        }
    }
});