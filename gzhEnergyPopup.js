var e = getApp();

Component({
    properties: {
        shareResult: {
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
            this.setData({
                shareVideoRule: e.globalData.shareVideoRule
            }), e.actionTrace({
                event: "enlist_wxoa",
                subEvent: "enlist_wxoa_click"
            });
        },
        ready: function() {},
        detached: function() {}
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        toggleGzhSignUp: function() {
            this.triggerEvent("close");
        },
        toGzh: function() {
            e.actionTrace({
                event: "enlist_wxoa",
                subEvent: "guide_wxoa_click"
            }), this.triggerEvent("toGzh");
        }
    }
});