Component({
    properties: {
        direction: {
            type: String,
            value: "up"
        },
        marginLeft: {
            type: String,
            value: "0"
        },
        content: {
            type: String,
            value: ""
        },
        content2: {
            type: String,
            value: ""
        },
        left: {
            type: String,
            value: "0"
        },
        top: {
            type: String,
            value: "0"
        },
        arrow: {
            type: String,
            value: ""
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {
        closeGuide: function() {
            this.triggerEvent("closeGuide");
        }
    }
});