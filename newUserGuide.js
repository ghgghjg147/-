Component({
    properties: {
        shareResult: {
            type: Object,
            value: {}
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        close: function() {
            this.triggerEvent("close");
        }
    }
});