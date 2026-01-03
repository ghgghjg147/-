Component({
    properties: {
        shareType: {
            type: String,
            value: ""
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        toShare: function() {
            var e = this;
            this.triggerEvent("share"), setTimeout(function() {
                e.triggerEvent("close");
            }, 100);
        },
        close: function() {
            this.triggerEvent("close");
        }
    }
});