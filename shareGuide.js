var e = getApp();

Component({
    properties: {
        pageType: {
            type: Number,
            value: 0
        },
        shareGuideType: {
            type: String,
            value: ""
        },
        shareScb: {
            type: Function,
            value: function() {}
        }
    },
    lifetimes: {
        created: function() {},
        attached: function() {
            2 == this.data.pageType && e.shareShowTrace({
                sharePath: "",
                event: "receive_energy",
                subEvent: "invite_button_show",
                shareCard: "",
                shareTitle: "",
                result: 1,
                gameTime: -1
            }), 4 == this.data.pageType && e.shareShowTrace({
                sharePath: "",
                event: "game_tips",
                subEvent: "game_tips_show",
                shareCard: "",
                shareTitle: "",
                result: 1,
                gameTime: -1
            });
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowText: !0
    },
    methods: {
        show: function() {
            e.globalData.toShare && this.triggerEvent("shareSuccess");
        },
        close: function() {
            this.triggerEvent("close");
        },
        toShare: function() {
            this.triggerEvent("shareScb");
        }
    }
});