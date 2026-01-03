var t = getApp();

Component({
    properties: {},
    lifetimes: {
        created: function() {},
        attached: function() {},
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
        }
    }
});