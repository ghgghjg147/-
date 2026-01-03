var e = getApp();

Component({
    properties: {
        friendLineType: {
            type: String,
            value: ""
        },
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
                event: "enlist_sharepq",
                subEvent: "enlist_sharepq_click"
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
                event: "enlist_sharepq",
                subEvent: "guide_sharepq_click"
            }), this.triggerEvent("toFriend");
        }
    }
});