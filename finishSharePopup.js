var e = getApp();

require("../../utils/https"), Component({
    properties: {
        finishPageInfo: {
            type: Object,
            value: {}
        },
        lastSuccessWord: {
            type: String,
            value: ""
        },
        finishShareImg: {
            type: String,
            value: ""
        }
    },
    lifetimes: {
        attached: function() {
            this.setData({
                shareTitle: this.data.finishPageInfo.shareTitle.replace("%s", "[" + this.data.lastSuccessWord + "]")
            }), e.shareShowTrace({
                sharePath: "",
                event: "finish_share",
                subEvent: "finish_share_show",
                shareCard: "",
                shareTitle: "",
                result: 1,
                gameTime: -1
            });
        }
    },
    data: {},
    methods: {
        close: function() {
            this.triggerEvent("close");
        },
        next: function() {
            var e = this;
            this.triggerEvent("next"), setTimeout(function() {
                e.triggerEvent("close");
            }, 100);
        }
    }
});