function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a = require("../../config"), t = getApp(), o = require("../../utils/https");

Component({
    properties: {
        isIndex: {
            type: Boolean,
            value: !1
        },
        isShowCollectApp: {
            type: Boolean,
            value: !1
        },
        isBackBtn: {
            type: Number,
            value: 0
        },
        navColor: {
            type: String,
            value: "#F5535E"
        },
        isShowRound: {
            type: Boolean,
            value: !1
        },
        showNavBar: {
            type: Boolean,
            value: !0
        },
        isShowPower: {
            type: Boolean,
            value: !0
        },
        showMsg: {
            type: Boolean,
            value: !1
        },
        navTitle: {
            type: String,
            value: "快速匹配"
        },
        titleColor: {
            type: String,
            value: "white"
        },
        showHome: {
            type: Boolean,
            value: !1
        },
        isShowBack: {
            type: Boolean,
            value: !1
        },
        showMargin: {
            type: Boolean,
            value: !0
        },
        ifLeave: {
            type: Boolean,
            value: !0
        },
        showques: {
            type: Boolean,
            value: !0
        },
        showNormalTip: {
            type: Number,
            value: 0
        },
        room: {
            type: String,
            value: ""
        },
        showMoney: {
            type: Boolean,
            value: !1
        },
        showLeave: {
            type: Boolean,
            value: !0
        },
        nextUnlock: {
            type: Boolean,
            value: !1
        },
        roundNum: {
            type: Number,
            value: 0
        },
        isShowShopEnter2: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        siteInfo: require("../../siteinfo.js"),
        isShowShareGuide: !1,
        isShowShop: !1,
        isAgree: !0,
        homeTop: 18,
        titleFontSize: 36,
        titleFontWeight: 500,
        navBarTop: 0,
        titleTop: 20,
        capsuleHeight: a.capsuleHeight,
        statusBarHeight: a.statusBarHeight,
        pixelRate: a.pixelRate,
        gameTipShow: !1,
        energyValue: 0,
        energyExtraValue: 0,
        energyMaxValue: 0,
        energyCountDown: 0,
        recoverTime: 0,
        countDown: "--:--",
        countDownM: 0,
        countDownS: 0,
        interval1: 0,
        showNoEnergyPopup: !1,
        allM: 0,
        allS: 0,
        show: !0,
        bannerData: {},
        videoAd: ""
    },
    lifetimes: {
        created: function() {
            t.log("lifetimes created0");
        },
        attached: function() {
            var e = this;
            t.log("lifetimes attached0"), t.setWatch(this, function() {
                e.getData();
            }, "navbar");
        },
        ready: function() {
            t.log("lifetimes ready0", t.globalData.videoAD), t.globalData.navHeight = (this.data.statusBarHeight + this.data.capsuleHeight) / this.data.pixelRate, 
            t.log("navHeight", t.globalData.navHeight, this.data.statusBarHeight, this.data.pixelRate, this.data.capsuleHeight), 
            this.setData({
                capsuleHeight: a.capsuleHeight,
                statusBarHeight: a.statusBarHeight,
                pixelRate: a.pixelRate
            });
        },
        detached: function() {
            t.log("lifetimes attached1"), clearInterval(this.data.interval1), this.data.interval1 = 0, 
            clearInterval(this.data.interval2), this.data.interval2 = 0;
        }
    },
    methods: {
        clickBanner: function() {
            switch (this.data.bannerData.bannerType) {
              case "buyYearCard":
              case "firstRecharge":
                this.triggerEvent("toggleShop");
                break;

              case "tryGame":
                this.triggerEvent("toggleGameTry");
                break;

              case "dailySign":
                this.triggerEvent("toggleSignUp");
                break;

              case "followAccount":
                this.triggerEvent("toggleGzhSignUp");
                break;

              case "sharePyq":
                this.triggerEvent("toggleFriendLine");
                break;

              case "friendHelp":
                this.triggerEvent("inviteEarnEnergy");
                break;

              case "inviteNew":
                this.triggerEvent("toggleInviteNew");
            }
            this.closeNoEnergyPopup();
        },
        randomBanner: function() {
            var e = this;
            o.randomBanner().then(function(a) {
                if (0 == a.data.code && (e.setData({
                    showNoEnergyPopup: !0,
                    bannerData: a.data.data
                }), t.shareShowTrace({
                    sharePath: "",
                    event: "un_energy",
                    subEvent: "un_energy_show",
                    shareCard: "",
                    shareTitle: "",
                    result: 1,
                    gameTime: -1
                }), "tryGame" == e.data.bannerData.bannerType)) {
                    var o = "";
                    t.globalData.moreGameIndex < t.globalData.moreGameList.length ? o = t.globalData.moreGameList[t.globalData.moreGameIndex] : (o = t.globalData.moreGameList[0], 
                    t.globalData.moreGameIndex = 0), e.setData({
                        gameItem: o
                    });
                }
            });
        },
        popWindowTimes: function() {
            var e = this;
            o.popWindowTimes().then(function(a) {
                e.randomBanner();
            }).catch(function(a) {
                e.randomBanner();
            });
        },
        toggleAgree: function() {
            this.setData({
                isAgree: !this.data.isAgree
            });
        },
        toggleShop: function() {
            this.triggerEvent("toggleShop"), t.sourceReport("buy_energy_click");
        },
        show: function() {
            this.setData({
                show: !0
            }), t.log("show1", this.data.show);
        },
        hide: function() {
            this.setData({
                show: !1
            }), t.log("show2", this.data.show);
        },
        toTest: function() {},
        goBack: function() {
            t.globalData.setting.playAudio("btnClick"), this.triggerEvent("goback");
        },
        getData: function(e) {
            var a = this;
            o.getEnergy().then(function(o) {
                0 === o.data.code && (a.setData({
                    energyValue: o.data.data.energyValue,
                    energyExtraValue: o.data.data.energyExtraValue,
                    energyCountDown: o.data.data.energyCountDown,
                    energyMaxValue: o.data.data.energyMaxValue,
                    recoverTime: o.data.data.recoverTime
                }), a.data.energyCountDown && a.formatCountDown(), "noInit" === e ? t.setWatch(a, function() {
                    t.setGlobalData({
                        energyTotal: o.data.data.energyTotal,
                        traceEnergyTotal: o.data.data.energyTotal
                    });
                }, "navbar") : (a.triggerEvent("init"), t.setGlobalData({
                    energyTotal: o.data.data.energyTotal,
                    traceEnergyTotal: o.data.data.energyTotal
                })));
            }).catch(function(e) {
                t.log("errrr", e);
            });
        },
        formatCountDown: function() {
            var e = this, a = this.data.energyCountDown;
            this.data.interval1 && (clearInterval(this.data.interval1), this.data.interval1 = 0), 
            this.data.interval1 = setInterval(function() {
                if (t.globalData.energyTotal >= 5) clearInterval(e.data.interval1); else {
                    var o = a % 60, n = (a - o) / 60;
                    a <= 0 ? e.data.energyMaxValue - t.globalData.energyTotal == 1 ? (clearInterval(e.data.interval1), 
                    e.data.interval1 = 0, t.setGlobalData({
                        energyTotal: t.globalData.energyTotal + 1
                    })) : e.data.energyMaxValue - t.globalData.energyTotal > 1 ? (t.setGlobalData({
                        energyTotal: t.globalData.energyTotal + 1
                    }), a = e.data.recoverTime, e.setData({
                        countDown: (n < 10 ? "0" + n : n) + ":" + (o < 10 ? "0" + o : o),
                        countDownM: n,
                        countDownS: o
                    })) : (clearInterval(e.data.interval1), e.data.interval1 = 0) : e.setData({
                        countDown: (n < 10 ? "0" + n : n) + ":" + (o < 10 ? "0" + o : o),
                        countDownM: n,
                        countDownS: o
                    }), a--;
                }
            }, 1e3);
        },
        useEnergy: function() {
            if (!this.data.nextUnlock) {
                if (t.globalData.energyTotal <= 0 && !this.data.player.yearCardUser) return this.triggerEvent("resetStart"), 
                void this.showNoEnergyPopup();
                t.setGlobalData({
                    energyTotal: t.globalData.energyTotal - 1,
                    traceEnergyTotal: t.globalData.energyTotal - 1
                }), this.data.interval1 || (this.data.energyCountDown = this.data.recoverTime, this.formatCountDown());
            }
            this.triggerEvent("toGameRedirect");
        },
        showNoEnergyPopup: function() {
            var e = this;
            this.getSubEnergyNotify(function() {
                clearInterval(e.data.interval2), e.data.interval2 = setInterval(function() {
                    var a = e.data.countDownM + (e.data.energyMaxValue - t.globalData.energyTotal - 1) * e.data.recoverTime / 60, o = e.data.countDownS;
                    o <= 0 && a <= 0 ? clearInterval(e.data.interval2) : e.setData({
                        allM: "" + (a < 10 ? "0" + a : a),
                        allS: "" + (o < 10 ? "0" + o : o)
                    });
                }, 1e3), e.popWindowTimes();
            });
        },
        closeNoEnergyPopup: function() {
            this.subEnergyNotify(), clearInterval(this.data.interval2), this.setData({
                showNoEnergyPopup: !1
            });
        },
        normalGetEnergy: function() {
            this.closeNoEnergyPopup(), this.triggerEvent("inviteEarnEnergy");
        },
        shareEarnEnergy: function() {
            t.globalData.setting.playAudio("btnClick"), this.setData({
                isShowShareGuide: !0,
                shareGuideType: "not-energy",
                pageGuideType: 3
            });
        },
        shareScb: function() {
            t.setGlobalData({
                toShare: Date.now()
            });
        },
        shareSuccess: function() {
            t.shareVideoRule(), this.toggleShareGuide();
        },
        watchAd: function() {
            var a = this;
            if (t.actionTrace({
                event: "ad_video_click",
                subEvent: t.globalData.shareVideoRule.adv.energyShortageAdv
            }), t.globalData.setting.playAudio("btnClick"), t.globalData.shareVideoRule.adv.energyShortageAdv) {
                var n = null;
                (n = wx.createRewardedVideoAd({
                    adUnitId: t.globalData.shareVideoRule.adv.energyShortageAdv
                })).offError(), n.onError(function(n) {
                    console.log("err", n), o.shareVideoDynamicControl();
                    var r = e({}, "shareVideoRule.canWatchVideo", !1);
                    for (var i in t.globalData.shareVideoRule) "canWatchVideo" != i && (r[[ "shareVideoRule." + i ]] = 1);
                    t.setGlobalData(r), a.adGetEnergySuccess();
                }), n.offClose(), n.onClose(function(e) {
                    e.isEnded ? (t.toggleWatchVideoGuide(), t.actionTrace({
                        event: "ad_video_finish",
                        subEvent: t.globalData.shareVideoRule.adv.energyShortageAdv
                    }), a.adGetEnergySuccess()) : (wx.getStorageSync("isWatchGuideFinish") || t.toggleWatchVideoGuide(function() {
                        a.watchAd();
                    }), t.actionTrace({
                        event: "ad_video_close",
                        subEvent: t.globalData.shareVideoRule.adv.energyShortageAdv
                    }), wx.showToast({
                        title: "请观看完整视频",
                        icon: "none",
                        duration: 2e3
                    }));
                }), n.show().catch(function(e) {
                    n.load().then(function() {
                        n.show();
                    });
                }), this.data.videoAd = n;
            } else this.adGetEnergySuccess();
        },
        adGetEnergySuccess: function() {
            var a = this;
            o.shareAddEnergy().then(function(o) {
                if (0 === o.data.code) {
                    var n;
                    t.shareVideoRule(), t.globalData.setting.playAudio("getEnergy"), a.triggerEvent("toSetData", {
                        isShowReward: !0,
                        rewardType: 5,
                        commonGetEnegyPopupValue: o.data.data.addValue
                    }), a.triggerEvent("showAd"), t.setGlobalData((n = {}, e(n, "shareGetEnergy.leftTimes", o.data.data.leftTimes), 
                    e(n, "energyTotal", t.globalData.energyTotal + o.data.data.addValue), n)), t.log("shareGetEnergy", t.globalData.shareGetEnergy, a.data.shareGetEnergy), 
                    a.closeNoEnergyPopup();
                }
            }).catch(function(e) {
                t.log("errrrrrr", e);
            });
        },
        newPlayerFree: function() {
            t.globalData.setting.playAudio("btnClick"), this.adGetEnergySuccess();
        },
        getSubEnergyNotify: function(e) {
            var a = this;
            o.getSubEnergyNotify().then(function(t) {
                0 == t.data.code && (a.setData({
                    isAgree: 1 == t.data.data.subSwitch
                }), e && e());
            });
        },
        subEnergyNotify: function() {
            var e = this.data.isAgree ? 1 : 0;
            o.subEnergyNotify(e).then(function(e) {});
        },
        toggleSelfShop: function() {
            this.setData({
                isShowShop: !this.data.isShowShop
            });
        },
        toggleWatchVideo: function() {
            this.triggerEvent("toggleWatchVideo");
        },
        toggleWatchVideoGuide: function() {
            t.setGlobalData({
                isShowWatchVideoGuide: !t.globalData.isShowWatchVideoGuide
            });
        },
        toggleShareGuide: function() {
            this.setData({
                isShowShareGuide: !this.data.isShowShareGuide
            });
        }
    }
});