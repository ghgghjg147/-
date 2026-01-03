var e = getApp();

Component({
    properties: {
        isIos: {
            type: Boolean,
            value: !1
        },
        needAuth: {
            type: Boolean,
            value: !1
        },
        countDown: {
            type: String,
            value: "--分--秒"
        },
        yearData: {
            type: Object,
            value: {}
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        bindgetuserinfo: function(t) {
            e.actionTrace({
                event: "ios_guide_wxoa",
                subEvent: "buy_energy_click"
            }), console.log("bindgetuserinfo e", t), "getUserInfo:ok" == t.detail.errMsg ? this.triggerEvent("getuserinfo", !0) : this.triggerEvent("getuserinfo", !1);
        },
        close: function() {
            e.actionTrace({
                event: "index_coupon",
                subEvent: "coupon_buy_close"
            }), this.triggerEvent("close");
        },
        toBuyTicket: function() {
            this.triggerEvent("toBuyTicket"), e.actionTrace({
                event: "index_coupon",
                subEvent: "coupon_buy_click"
            }), this.triggerEvent("close");
        }
    }
});