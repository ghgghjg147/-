Component({
    properties: {
        isDown: {
            type: Boolean,
            value: !1
        },
        move: {
            type: Boolean,
            value: !1
        },
        width: {
            type: Number,
            value: 32
        },
        top: {
            type: Number,
            value: -8
        },
        right: {
            type: Number,
            value: -10
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js")
    },
    methods: {}
});