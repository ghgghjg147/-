var e = getApp();

Component({
    properties: {
        getRewardList: {
            type: Array,
            value: []
        }
    },
    lifetimes: {
        attached: function() {
            this.triggerEvent("refreshReward");
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        closeReward: function() {
            if (this.triggerEvent("refreshReward"), this.data.getRewardList.length > 1) {
                var t = this.data.getRewardList.slice(0, 1);
                e.setGlobalData({
                    getRewardList: t
                });
            } else e.setGlobalData({
                isShowGetReward: !1
            });
        }
    }
});