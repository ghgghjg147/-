var t = require("../../utils/https"), a = getApp();

Component({
    lifetimes: {
        created: function() {},
        attached: function() {
            a.shareShowTrace({
                sharePath: "",
                event: "invite_new",
                subEvent: "invite_new_show",
                shareCard: "",
                shareTitle: "",
                result: 1,
                gameTime: -1
            }), this.setData({
                shareVideoRule: a.globalData.shareVideoRule
            }), this.getList();
        },
        ready: function() {
            this.setData({
                pageReady: !0
            });
        },
        detached: function() {}
    },
    properties: {},
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowText: !0,
        pageReady: !1,
        animalStep: 1,
        isDetailFinish: !1,
        moreStep: 0,
        flyMsgIndex: 2
    },
    methods: {
        getList: function() {
            var a = this;
            t.invShareRandomTxt().then(function(t) {
                0 === t.data.code && (a.setData({
                    userList: t.data.data
                }), a.flyMsgHandle());
            });
        },
        animationend1: function(t) {
            1 == this.data.animalStep && (this.data.flyMsgIndex < this.data.userList.length - 2 ? this.data.flyMsgIndex += 2 : this.data.flyMsgIndex = 1, 
            this.setData({
                text1: this.data.userList[this.data.flyMsgIndex - 1]
            }));
            var a = 1 == this.data.animalStep ? 2 : 1;
            this.setData({
                animalStep: a
            }), this.animationend2();
        },
        animationend2: function(t) {
            1 == this.data.animalStep && this.setData({
                text2: this.data.userList[this.data.flyMsgIndex]
            });
        },
        flyMsgHandle: function() {
            this.data.userList.length > 1 ? this.setData({
                text1: this.data.userList[this.data.flyMsgIndex - 1],
                text2: this.data.userList[this.data.flyMsgIndex],
                isDetailFinish: !0
            }) : 1 == this.data.userList.length && this.setData({
                text1: this.data.userList[0],
                text2: this.data.userList[0]
            });
        },
        show: function() {
            this.shareHandle();
        },
        close: function() {
            this.triggerEvent("close");
        },
        shareHandle: function() {
            if (this.data.moreStep < 2) {
                var t = this.data.moreStep + 1;
                this.setData({
                    moreStep: t
                });
            } else this.setData({
                moreStep: 0
            }), this.showToast("请提醒好友完成6关，即可领取能量奖励");
        },
        showToast: function(t) {
            this.triggerEvent("showToast", t);
        },
        closeMore: function() {
            this.setData({
                moreStep: 0
            }), a.globalData.setting.playAudio("btnClick");
        },
        playSound: function() {
            a.globalData.setting.playAudio("btnClick"), this.triggerEvent("inviteNewUser");
        }
    }
});