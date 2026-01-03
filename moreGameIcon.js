var e = getApp();

Component({
    properties: {
        moreGameList: {
            type: Array,
            value: []
        }
    },
    data: {
        swiperIndex: 0
    },
    methods: {
        change: function(e) {
            this.data.swiperIndex = e.detail.current;
        },
        openOtherGame: function() {
            console.log("openOtherGame");
            var a = this.data.moreGameList[this.data.swiperIndex];
            e.actionTrace({
                event: "flash_game_click",
                subEvent: a.gameAppid
            }), wx.navigateToMiniProgram({
                appId: a.gameAppid,
                path: a.gamePath,
                envVersion: a.envVersion,
                success: function() {
                    e.globalData.toOtherGame = !0, e.actionTrace({
                        event: "flash_game_out",
                        subEvent: a.gameAppid
                    });
                },
                fail: function() {
                    console.log("跳转失败"), void 0 != a.gameQrcode && a.gameQrcode.length && wx.previewImage({
                        urls: [ a.gameQrcode ]
                    });
                },
                complete: function() {
                    e.globalData.moreGameIndex = e.globalData.moreGameIndex + 1;
                }
            });
        }
    }
});