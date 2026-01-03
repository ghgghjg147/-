function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var e = getApp(), t = require("../../utils/https");

Component({
    lifetimes: {
        attached: function() {
            this.setData({
                shareVideoRule: e.globalData.shareVideoRule
            });
        }
    },
    properties: {
        player: {
            type: Object,
            values: {}
        },
        shareVideoRule: {
            type: Object,
            value: {}
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowBanner: !0
    },
    methods: {
        bannerLoad: function() {
            e.actionTrace({
                event: "ad_banner_show",
                subEvent: this.data.shareVideoRule.adv.dailyLoginBanner
            });
        },
        bannerError: function(a) {
            console.log("banner err", a), e.actionTrace({
                event: "ad_banner_fail",
                subEvent: this.data.shareVideoRule.adv.dailyLoginBanner
            }), this.setData({
                isShowBanner: !1
            });
        },
        closeDaysLoginRewardPopup: function() {
            this.triggerEvent("close");
        },
        daysLoginWatchAd: function() {
            var i = this;
            if (e.actionTrace({
                event: "ad_video_click",
                subEvent: e.globalData.shareVideoRule.adv.loginAwardAdv
            }), e.actionTrace({
                event: "sign_gift",
                subEvent: "sign_open_video"
            }), e.globalData.setting.playAudio("btnClick"), !e.globalData.shareVideoRule.adv.loginAwardAdv || this.data.player.shareForbidden && (this.data.player.advAuditSwitch || !this.data.player.advAuditSwitch && 1 == e.globalData.shareVideoRule.loginAward)) this.daySignShareSuccess(); else {
                var o = null;
                (o = wx.createRewardedVideoAd({
                    adUnitId: e.globalData.shareVideoRule.adv.loginAwardAdv
                })).load(), o.offError(), o.onError(function(o) {
                    console.log("err", o), t.shareVideoDynamicControl(), i.daySignShareSuccess();
                    var n = a({}, "shareVideoRule.canWatchVideo", !1);
                    for (var r in e.globalData.shareVideoRule) "canWatchVideo" != r && (n[[ "shareVideoRule." + r ]] = 1);
                    e.setGlobalData(n);
                }), o.offClose(), o.onClose(function(a) {
                    a.isEnded ? (e.toggleWatchVideoGuide(), e.actionTrace({
                        event: "ad_video_finish",
                        subEvent: e.globalData.shareVideoRule.adv.loginAwardAdv
                    }), i.daySignShareSuccess()) : (wx.getStorageSync("isWatchGuideFinish") || e.toggleWatchVideoGuide(function() {
                        i.daysLoginWatchAd();
                    }), e.actionTrace({
                        event: "ad_video_close",
                        subEvent: e.globalData.shareVideoRule.adv.loginAwardAdv
                    }), i.showToast("请观看完整视频"));
                }), o.show().catch(function(a) {
                    o.load().then(function() {
                        o.show();
                    });
                }), this.data.videoAd = o;
            }
        },
        daysLoginEnergy: function() {
            e.globalData.setting.playAudio("btnClick"), e.actionTrace({
                event: "sign_gift",
                subEvent: "sign_open_share"
            }), this.data.toDaySignShare = Date.now();
        },
        toggleWatchVideoGuide: function() {
            e.setGlobalData({
                isShowWatchVideoGuide: !e.globalData.isShowWatchVideoGuide
            });
        },
        daySignShareSuccess: function() {
            this.triggerEvent("daySignShareSuccess");
        },
        shareHandle: function() {
            if (this.data.toDaySignShare) {
                var a = this.data.toDaySignShare;
                if (this.data.toDaySignShare = 0, Date.now() - a < e.globalData.shareGetEnergy.timeInterVal) return e.globalData.loginTraceData.result = 0, 
                e.shareTrace(e.globalData.loginTraceData), this.showToast("分享失败，请分享到群聊");
                if (this.data.lastDaySignShareFail || Math.random() < e.globalData.shareGetEnergy.successRate) this.daySignShareSuccess(), 
                this.data.lastDaySignShareFail = !1; else {
                    e.globalData.loginTraceData.result = 0;
                    var t = Math.floor(Math.random() * e.globalData.shareGetEnergy.textList.length);
                    this.showToast(e.globalData.shareGetEnergy.textList[t]), this.data.lastDaySignShareFail = !0;
                }
                e.shareTrace(e.globalData.loginTraceData);
            }
        }
    }
});