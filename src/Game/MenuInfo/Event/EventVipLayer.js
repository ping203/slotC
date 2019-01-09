

var EventVipLayer = BaseLayer.extend(
    {
        ctor: function () {
            this.resourcePath = "res/ResourceMenuTab/Vip/";
            this.commonImagePath = "res/ResourceMenuTab/";

            this.array_btn_moc = [];
            this.gotoToolTip = "";
            this.gotoUpDown = false;
            this.arrrayPlaceVip = [];
            this.arrayTop = [];
            this.placeMe = [];
            this.isMeInList = false;

            this.IntelOrStrong = false; // false muu tri true kien cuong
            this.page_bxh = 1;
            this.arrrayIntel = [];
            this.arrrayStrong = [];
            this.IntelMe = [];
            this.StrongMe = [];
            this.maxpage = 0;
            this.number_nhay = 0;

            this._super("EventVipLayer");
            // this.initWithBinaryFile("res/this.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Vip/PlistVip.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
            this.addLayoutStructure(this, "pn_event_Vip", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);
            this.initBgLayer();
            this.initPnMocPoint();
            this.initNoticeMe();
            this.initNoticeTop();
            this.initPositionMe();
            this.initPNEndEvent();
            this.initPNBangTopXH();
            this.initPNBangXepHangVP();
            this.initEventRun();
            // this.initPNTheleEvent();
            this.otherCustorm();
            this.parserGetConfigVippointEvent();
        },

        initBgLayer: function () {
            var layout = this.pn_event_Vip;

            this.addSpriteStructure(layout, "bg", cc.p(640, 360.41), "Vip_point.png");
            this.addTextStructure(layout, "txt_time_event", cc.p(1080.81, 574.70), "00H\n00:00", fontRobotoBold.fontName, "21", undefined, {__size: cc.size(73.00, 60.00)});
            this.txt_time_event.setColor(cc.color("#ffff00"));
            this.txt_time_event.enableOutline(GuiUtil.color("#ffb129"), 1);
            this.txt_time_event.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_time_event.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        },

        initPnMocPoint: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_moc_point", cc.p(0, 0), "", cc.size(0, 0), false, {
                anchorX: 0, anchorY: 0
            });
            this.addButtonStructure(layout, "btn_hide_top", EventVipLayer.BTN_HIDE_TOP, cc.p(640.00, 360), true, undefined).setContentSize(cc.size(1500.00, 1000.00));

            var positions = [[435, 184], [292, 204], [277, 292], [371, 333], [423, 405], [468, 483], [557, 517], [726, 523],
                [823, 518], [930, 493], [976, 438], [901, 377], [856, 311], [797, 223], [778, 136], [883, 218]];

            for (var i = 0; i < 16; i++) {
                var name = i + 1;
                if(i == 0){
                    this.addButtonStructure(layout, "btn_moc_" + name, EventVipLayer['BTN_MOC_' + name], cc.p.apply(this, positions[i]), true,
                        [this.resourcePath + "xuatphat.png", this.resourcePath + "xuatphat_chose.png", this.resourcePath + "xuatphat.png"]);
                }else{
                    this.addButtonStructure(layout, "btn_moc_" + name, EventVipLayer['BTN_MOC_' + name], cc.p.apply(this, positions[i]), true,
                        [this.resourcePath + "vitri.png", this.resourcePath + "vitri_chose.png", this.resourcePath + "vitri.png"]);
                }
            }
            this.addSpriteStructure(layout, "sp_vitri3", cc.p(0.00, 0.00), "");
            this.addSpriteStructure(layout, "sp_vitri2", cc.p(0.00, 0.00), "");
            this.addSpriteStructure(layout, "sp_vitri1", cc.p(0.00, 0.00), "");

            this.addButtonStructure(layout, "btn_close_event_vip", EventVipLayer.BTN_CLOSE_EVENT_VIP, cc.p(1194.94, 618.16), true, res_ResourceMenuTab_Mail + "/btnClose.png");
        },

        initNoticeMe: function () {

            var layout = this.addLayoutStructure(this.pn_event_Vip, "notice_me", cc.p(368.36, 164.17), "", cc.size(0, 0), false, {
                anchorX: 1, anchorY: 1
            });
            var textOptions = {anchorX: 0, __size: cc.size(128.00, 19.00)};
            this.addSpriteStructureWithoutResourcePath(layout, "avatar_me", cc.p(-168.95, -42.43), "res/common/avatar/Avatar_1.png");
            this.addSpriteStructure(layout, "Image_8", cc.p(-109.00, -40.00), "notice_top.png");
            this.addTextStructure(layout, "txt_name_me", cc.p(-135.99, -18.45), "top", RobotoRegular.fontName, "14", "#FFDF58", textOptions);
            this.addTextStructure(layout, "txt_vp_me", cc.p(-126.99, -40.45), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "txt_destroy_me", cc.p(-126.99, -61.45), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        },

        initNoticeTop: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "notice_top", cc.p(559.69, 192.04), "", cc.size(221.00, 87.00), false, {
                anchorX: 0, anchorY: 0
            });
            var textOptions = {anchorX: 0, __size: cc.size(128.00, 19.00)};
            this.addSpriteStructureWithoutResourcePath(layout, "avatar_top", cc.p(53.05, 40.57), "res/common/avatar/Avatar_1.png");
            this.addSpriteStructure(layout, "Image_8", cc.p(110.5, 43.5), "notice_top.png");
            this.addTextStructure(layout, "txt_name_top", cc.p(83.01, 65.55), "top", RobotoRegular.fontName, "14", "#FFDF58", textOptions);
            this.addTextStructure(layout, "txt_vp_top", cc.p(92.01, 43.55), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "txt_destroy_top", cc.p(92.01, 22.55), "vippoint", RobotoRegular.fontName, "14", "#FCF4D8", textOptions).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        },

        initPositionMe: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "position_me", cc.p(559.37, 189.46), "cotmoc.png", cc.size(32.00, 49.00), true, {
                anchorY: 0
            });
            this.addTextStructure(layout, "txt_moc", cc.p(15.51, 32.96), "", RobotoRegular.fontName, "17", "#000000", {__size: cc.size(90.00, 20.00)});

            this.addButtonStructure(this.pn_event_Vip, "btn_vinhdanh_vp", EventVipLayer.BTN_OPEN_BANG_XH, cc.p(576.86, 89.23), true, this.resourcePath + "btn_bangxephang.png", {anchorY: 0});
            this.addButtonStructure(this.pn_event_Vip, "btn_thele_vp", EventVipLayer.BTN_THE_LE, cc.p(699.32, 89.07), true, this.resourcePath + "btn_thele.png", {anchorY: 0});
        },

        initPNEndEvent: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_end_event", cc.p(540.76, 290.37), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0,
                visible: false
            });

            //this.addSpriteStructureWithoutResourcePath(layout, "Image_6", cc.p(97.56, 110.50), this.commonImagePath + "Mail/bg_supersmaill_mail.png").setScaleY(80/242);

            this.addImage(layout,"Image_6",cc.p(97.56, 110.50),res_ResourceMenuTab_Mail+"/bg_supersmaill_mail.png",cc.size(560,80));
            this.Image_6.setScale9Enabled(false);
            this.Image_6.ignoreContentAdaptWithSize(false);
            this.Image_6.setContentSize(cc.size(560,80));

            this.addTextStructure(layout, "txt_content_end_event", cc.p(98.04, 112.58), "vippoint", RobotoRegular.fontName, "22", "#FFFFFF", {__size: cc.size(537.00, 63.00)});
        },

        initPNBangTopXH: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_bang_topxh", cc.p(-741.62, 404.55), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0
            });
            // this.addLayoutStructure(layout, "bg_bang_xh_vp", cc.p(1009.51, 267.11), "bg_topxh.png", cc.size(322.00, 195.00), false, {anchorY: 1});

            this.addImage(layout, "bg_bang_xh_vp", cc.p(1009.51, 267.11), this.resourcePath + "bg_topxh.png", cc.size(306.00, 296.00));
            this.bg_bang_xh_vp.setAnchorPoint(0.5, 1);
            this.bg_bang_xh_vp.setCapInsets(cc.rect(15, 150, 29, 29));

            //this.addSpriteStructure(layout, "bg_bxh_che", cc.p(1009.51, 268.11), "top_dai.png", {
            //    anchorY: 1,
            //    visible: false
            //});

            var lv_top_xh = this.lv_top_xh = new ccui.ListView();
            // lv_top_xh.setTouchEnabled(true);
            // lv_top_xh.setBounceEnabled(true);
            // lv_top_xh.setClippingEnabled(true);
            lv_top_xh.setScrollBarEnabled(0);
            lv_top_xh.setContentSize(cc.size(225.00, 85.00));
            lv_top_xh.setPosition(cc.p(896.88, 140));
            lv_top_xh.setAnchorPoint(cc.p(0.00, 1.00));
            layout.addChild(lv_top_xh);
            this.addButtonStructure(layout, "btn_updown_top_vp", EventVipLayer.BTN_UPDOWN_VP, cc.p(1108.41, 165.55), true, this.resourcePath + "btn_muiten_vp.png", {
                rotationX: 180,
                rotationY: 180
            });
        },

        initPNBangXepHangVP: function () {
            // var layout = this.addLayoutStructure(this.pn_event_Vip, "pn_thele_event", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true);
        },

        initEventRun: function () {
            var layout = this.addLayoutStructure(this.pn_event_Vip, "event_run", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorY: 0,
                anchorX: 0,
                // visible: false
            });
            this.addSpriteStructure(layout, "ronglua", cc.p(640, 360), "RongLua.png");
            layout.runAction(cc.fadeOut(0));
            layout.setVisible(false);
        },

        otherCustorm: function () {
            this.pn_end_event.setVisible(false);
            this.avatar_top.setScale(0.7);
            this.avatar_me.setScale(0.7);
            var fadein_top = cc.fadeIn(0);
            this.notice_top.runAction(fadein_top);
            this.notice_top.setVisible(false);
            this.notice_me.setVisible(false);

            var fadein_moc = cc.fadeIn(0);
            this.position_me.runAction(fadein_moc);
            this.position_me.setVisible(false);

            GuiUtil.changeSprite(this.sp_vitri1, res_ResourceMenuTab + "/Vip/sp_1.png");
            GuiUtil.changeSprite(this.sp_vitri2, res_ResourceMenuTab + "/Vip/sp_2.png");
            GuiUtil.changeSprite(this.sp_vitri2, res_ResourceMenuTab + "/Vip/sp_3.png");

            this.sp_vitri1.setVisible(false);
            this.sp_vitri2.setVisible(false);
            this.sp_vitri3.setVisible(false);

            this.btn_moc_1.setName("ev_0");
            this.btn_moc_2.setName("ev_1");
            this.btn_moc_3.setName("ev_2");
            this.btn_moc_4.setName("ev_3");
            this.btn_moc_5.setName("ev_4");
            this.btn_moc_6.setName("ev_5");
            this.btn_moc_7.setName("ev_6");
            this.btn_moc_8.setName("ev_7");
            this.btn_moc_9.setName("ev_8");
            this.btn_moc_10.setName("ev_9");
            this.btn_moc_11.setName("ev_10");
            this.btn_moc_12.setName("ev_11");
            this.btn_moc_13.setName("ev_12");
            this.btn_moc_14.setName("ev_13");
            this.btn_moc_15.setName("ev_14");
            this.btn_moc_16.setName("ev_15");

            for (var i = 0; i < 16; i++) {
                if (this.pn_moc_point.getChildByName("ev_" + i) != null) {
                    this.array_btn_moc.push(this.pn_moc_point.getChildByName("ev_" + i));
                }
            }

            this.pn_event_Vip.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.show_event_vip, this)));


        },

        onMovePoint: cc.EventListener.create(
            {
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if (this.gotoToolTip != target.getName()) {
                            var stt = target.getName().substr(3, target.getName().length);
                            this.gotoToolTip = target.getName();
                            if (menutab.eventVipLayer.arrrayPlaceVip[stt].nickname != null) {
                                menutab.eventVipLayer.fillDataTop(target.getName());
                                menutab.eventVipLayer.notice_top.x = target.x + 25;
                                menutab.eventVipLayer.notice_top.y = target.y - 40;
                                menutab.eventVipLayer.notice_top.setVisible(true);
                                menutab.eventVipLayer.notice_top.stopAllActions();
                                menutab.eventVipLayer.notice_top.runAction(cc.fadeIn(0.2));

                                menutab.eventVipLayer.notice_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                    menutab.eventVipLayer.notice_me.setVisible(false);
                                })));

                                if (Number(stt) == 0)
                                    GuiUtil.loadTextureNormal(this.array_btn_moc[stt],"res/ResourceMenuTab/Vip/xuatphat_chose.png");
                                else
                                    GuiUtil.loadTextureNormal(this.array_btn_moc[stt],"res/ResourceMenuTab/Vip/vitri_chose.png");

                                for (var i = 0; i < this.array_btn_moc.length; i++) {
                                    if (i != Number(stt)) {
                                        cc.eventManager.pauseTarget(this.array_btn_moc[i], true);
                                    }
                                }
                            }
                            menutab.eventVipLayer.position_me.x = target.x + 3;
                            menutab.eventVipLayer.position_me.y = target.y + 10;
                            menutab.eventVipLayer.position_me.setVisible(true);
                            menutab.eventVipLayer.position_me.stopAllActions();
                            menutab.eventVipLayer.position_me.runAction(cc.fadeIn(0.2));
                            menutab.eventVipLayer.txt_moc.setString(formatMoney(0, 3, menutab.eventVipLayer.arrrayPlaceVip[stt].min));
                        }
                    } else {
                        if (this.gotoToolTip == target.getName()) {
                            this.gotoToolTip = "";
                            menutab.eventVipLayer.position_me.stopAllActions();
                            menutab.eventVipLayer.position_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                menutab.eventVipLayer.position_me.setVisible(false);
                            })));

                            menutab.eventVipLayer.notice_top.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                menutab.eventVipLayer.notice_top.setVisible(false);
                            })));

                            menutab.eventVipLayer.notice_me.setVisible(true);
                            menutab.eventVipLayer.notice_me.stopAllActions();
                            menutab.eventVipLayer.notice_me.runAction(cc.fadeIn(0.2));

                            for (var i = 0; i < menutab.eventVipLayer.array_btn_moc.length; i++) {
                                cc.eventManager.resumeTarget(menutab.eventVipLayer.array_btn_moc[i], true);
                                if (i == 0) {
                                    GuiUtil.loadTextureNormal(menutab.eventVipLayer.array_btn_moc[i],"res/ResourceMenuTab/Vip/xuatphat.png");
                                } else {
                                    GuiUtil.loadTextureNormal(menutab.eventVipLayer.array_btn_moc[i],"res/ResourceMenuTab/Vip/vitri.png");
                                }
                            }
                        }
                    }
                }
            }),
        onButtonRelease: function (button, id) {
            switch (id) {
                case EventVipLayer.BTN_CLOSE_THELE_EVENT:
                    this.pn_thele_event.setVisible(false);
                    this.pn_thele_event.setScale(0);
                    for (var i = 0; i < this.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(this.array_btn_moc[i], true);
                    }
                    break;
                case EventVipLayer.BTN_KIEN_CUONG:
                    GuiUtil.loadTextureNormal(this.btn_muutri,"res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    GuiUtil.loadTextureNormal(this.btn_kiencuong,"res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    this.pn_muutri.setVisible(false);
                    this.pn_kiencuong.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = true;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case EventVipLayer.BTN_MUU_TRI:
                    GuiUtil.loadTextureNormal(this.btn_muutri,"res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    GuiUtil.loadTextureNormal(this.btn_kiencuong,"res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    this.pn_kiencuong.setVisible(false);
                    this.pn_muutri.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = false;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case EventVipLayer.BTN_CLOSE_BANG_XH:
                    this.pn_bangxephang_vp.setVisible(false);
                    this.pn_bangxephang_vp.setScale(0);
                    for (var i = 0; i < this.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(this.array_btn_moc[i], true);
                    }
                    break;
                case EventVipLayer.BTN_OPEN_BANG_XH:
                    open_event_vip_history();
                    break;
                case EventVipLayer.BTN_CLOSE_EVENT_VIP:
                    closeEvent_Vip();
                    break;
                case EventVipLayer.BTN_UPDOWN_VP:
                    if (!this.isRun_table) {
                        this.isRun_table = true;
                        if (this.gotoUpDown == false) {
                            this.zoomBigBg_bangxh_vp(496);
                            this.gotoUpDown = true;
                        } else {
                            //this.bg_bxh_che.setVisible(false);
                            this.zoomSmallBg_bangxh_vp(296);
                            this.gotoUpDown = false;
                        }
                    }
                    break;
                case EventVipLayer.BTN_MOC_1:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[0].nickname != null) {
                            this.fillDataTop("ev_0");
                            this.unHideDataTop(0);
                        }
                        this.position_me.x = this.btn_moc_1.x + 3;
                        this.position_me.y = this.btn_moc_1.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[0].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_2:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[1].nickname != null) {
                            this.fillDataTop("ev_1");
                            this.unHideDataTop(1);
                        }
                        this.position_me.x = this.btn_moc_2.x + 3;
                        this.position_me.y = this.btn_moc_2.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[1].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_3:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[2].nickname != null) {
                            this.fillDataTop("ev_2");
                            this.unHideDataTop(2);
                        }
                        this.position_me.x = this.btn_moc_3.x + 3;
                        this.position_me.y = this.btn_moc_3.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[2].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_4:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[3].nickname != null) {
                            this.fillDataTop("ev_3");
                            this.unHideDataTop(3);
                        }
                        this.position_me.x = this.btn_moc_4.x + 3;
                        this.position_me.y = this.btn_moc_4.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[3].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_5:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[4].nickname != null) {
                            this.fillDataTop("ev_4");
                            this.unHideDataTop(4);
                        }
                        this.position_me.x = this.btn_moc_5.x + 3;
                        this.position_me.y = this.btn_moc_5.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[4].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_6:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[5].nickname != null) {
                            this.fillDataTop("ev_5");
                            this.unHideDataTop(5);
                        }
                        this.position_me.x = this.btn_moc_6.x + 3;
                        this.position_me.y = this.btn_moc_6.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[5].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_7:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[6].nickname != null) {
                            this.fillDataTop("ev_6");
                            this.unHideDataTop(6);
                        }
                        this.position_me.x = this.btn_moc_7.x + 3;
                        this.position_me.y = this.btn_moc_7.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[6].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_8:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[7].nickname != null) {
                            this.fillDataTop("ev_7");
                            this.unHideDataTop(7);
                        }
                        this.position_me.x = this.btn_moc_8.x + 3;
                        this.position_me.y = this.btn_moc_8.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[7].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_9:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[8].nickname != null) {
                            this.fillDataTop("ev_8");
                            this.unHideDataTop(8);
                        }
                        this.position_me.x = this.btn_moc_9.x + 3;
                        this.position_me.y = this.btn_moc_9.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[8].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_10:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[9].nickname != null) {
                            this.fillDataTop("ev_9");
                            this.unHideDataTop(9);
                        }
                        this.position_me.x = this.btn_moc_10.x + 3;
                        this.position_me.y = this.btn_moc_10.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[9].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_11:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[10].nickname != null) {
                            this.fillDataTop("ev_10");
                            this.unHideDataTop(10);
                        }
                        this.position_me.x = this.btn_moc_11.x + 3;
                        this.position_me.y = this.btn_moc_11.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[10].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_12:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[11].nickname != null) {
                            this.fillDataTop("ev_11");
                            this.unHideDataTop(11);
                        }
                        this.position_me.x = this.btn_moc_12.x + 3;
                        this.position_me.y = this.btn_moc_12.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[11].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_13:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[12].nickname != null) {
                            this.fillDataTop("ev_12");
                            this.unHideDataTop(12);
                        }
                        this.position_me.x = this.btn_moc_13.x + 3;
                        this.position_me.y = this.btn_moc_13.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[12].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_14:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[13].nickname != null) {
                            this.fillDataTop("ev_13");
                            this.unHideDataTop(13);
                        }
                        this.position_me.x = this.btn_moc_14.x + 3;
                        this.position_me.y = this.btn_moc_14.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[13].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_15:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[14].nickname != null) {
                            this.fillDataTop("ev_14");
                            this.unHideDataTop(14);
                        }
                        this.position_me.x = this.btn_moc_15.x + 3;
                        this.position_me.y = this.btn_moc_15.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[14].min));
                    }
                    break;
                case EventVipLayer.BTN_MOC_16:
                    if (cc.sys.isNative) {
                        if (this.arrrayPlaceVip[15].nickname != null) {
                            this.fillDataTop("ev_15");
                            this.unHideDataTop(15);
                        }
                        this.position_me.x = this.btn_moc_16.x + 3;
                        this.position_me.y = this.btn_moc_16.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0, 3, this.arrrayPlaceVip[15].min));
                    }
                    break;
                case EventVipLayer.BTN_HIDE_TOP:
                    if (cc.sys.isNative) {
                        this.hideDataTop();
                    }
                    break;
                case EventVipLayer.BTN_BACK_PAGE:
                    if (this.page_bxh != 1)
                        this.page_bxh = this.page_bxh - 1;
                    this.funLoadOtherPage();
                    break;
                case EventVipLayer.BTN_BACKALL_PAGE:
                    if (this.page_bxh != 1)
                        this.page_bxh = 1;
                    this.funLoadOtherPage();
                    break;
                case EventVipLayer.BTN_NEXT_PAGE:
                    if (this.page_bxh != this.maxpage)
                        this.page_bxh = this.page_bxh + 1;
                    this.funLoadOtherPage();
                    break;
                case EventVipLayer.BTN_NEXTALL_PAGE:
                    if (this.page_bxh != this.maxpage)
                        this.page_bxh = this.maxpage;
                    this.funLoadOtherPage();
                    break;
                case EventVipLayer.BTN_THE_LE:
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        if (lobby.open_payment_ios == false)
                            return;
                    }
                    ConnectNative.openWebView(GameManager.webViewLink.theLeVipPoint);
                    //for (var i = 0; i < this.array_btn_moc.length; i++) {
                    //    cc.eventManager.pauseTarget(this.array_btn_moc[i], true);
                    //}
                    break;
            }
        },

        funLoadOtherPage: function () {
            if (this.IntelOrStrong = false)
                this.reload_Data_Intel(this.page_bxh);
            else
                this.reload_Data_Strong(this.page_bxh);
        },
        hideDataTop: function () {
            this.position_me.runAction(cc.sequence(cc.fadeIn(0.2), cc.callFunc(function () {
                this.position_me.setVisible(false);
            })));

            this.notice_top.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                this.notice_top.setVisible(false);
            })));
            this.notice_me.setVisible(true);
            this.notice_me.stopAllActions();
            this.notice_me.runAction(cc.fadeIn(0.2));
        },
        unHideDataTop: function (vitri) {
            this.notice_top.x = this.array_btn_moc[vitri].x + 25;
            this.notice_top.y = this.array_btn_moc[vitri].y - 40;
            this.notice_top.setVisible(true);
            this.notice_top.stopAllActions();
            this.notice_top.runAction(cc.fadeIn(0.2));

            this.notice_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                this.notice_me.setVisible(false);
            })));
        },
        fillDataTop: function (vitri) {
            vitri = vitri.substr(3, vitri.length);
            if (this.arrrayPlaceVip[vitri].nickname.length >= 15) {
                var nick = this.arrrayPlaceVip[vitri].nickname;
                var head = nick.substring(0, 12);
                var name = head + "...";
                this.txt_name_top.setString(name);
            } else
                this.txt_name_top.setString(this.arrrayPlaceVip[vitri].nickname);
            this.txt_vp_top.setString("Vippoint: " + formatMoney(0, 3, this.arrrayPlaceVip[vitri].vippoint));
            this.txt_destroy_top.setString("Thiệt hại: " + formatMoney(0, 3, this.arrrayPlaceVip[vitri].subVippoint));
            //this.txt_moc.setString(formatMoney(0,3,this.arrrayPlaceVip[vitri].min));
            if (this.arrrayPlaceVip[vitri].nickname == userInfo.userData.nickname)
                GuiUtil.changeSprite(this.avatar_top,menutab.userManager.getlinkAvatar(userInfo.userData.avatar));
            else
                GuiUtil.changeSprite(this.avatar_top,menutab.userManager.getlinkAvatar(this.arrrayPlaceVip[vitri].avatar));
            this.avatar_top.setScale(0.7);
        },
        zoomBigBg_bangxh_vp: function (value) {
            if (this.bg_bang_xh_vp.height < value) {
                this.bg_bang_xh_vp.height = this.bg_bang_xh_vp.height + 10;
                //this.btn_updown_top_vp.y = this.btn_updown_top_vp.y + 10;
                this.lv_top_xh.height = this.lv_top_xh.height + 9;
                this.runAction(cc.callFunc(function () {
                    menutab.eventVipLayer.zoomBigBg_bangxh_vp(520);
                }));
            } else {
                this.bg_bang_xh_vp.height = value;
                this.isRun_table = false;
                //this.bg_bxh_che.setVisible(true);
                this.btn_updown_top_vp.setRotation(0);
                this.lv_top_xh.height = 360;
                this.lv_top_xh.refreshView();
            }
        },
        zoomSmallBg_bangxh_vp: function (value) {
            if (this.bg_bang_xh_vp.height > value) {
                this.bg_bang_xh_vp.height = this.bg_bang_xh_vp.height - 10;
                //this.btn_updown_top_vp.y = this.btn_updown_top_vp.y - 10;
                this.lv_top_xh.height = this.lv_top_xh.height - 10;
                this.runAction(cc.callFunc(function () {
                    menutab.eventVipLayer.zoomSmallBg_bangxh_vp(296);
                }));
            } else {
                this.bg_bang_xh_vp.height = value;
                this.isRun_table = false;
                this.btn_updown_top_vp.setRotation(180);
                this.lv_top_xh.height = 85;
            }
        },

        pauseMovePoint: function () {
            for (var i = 0; i < this.array_btn_moc.length; i++) {
                cc.eventManager.pauseTarget(this.array_btn_moc[i], true);
            }
        },
        resumeMovePoint: function () {
            for (var i = 0; i < this.array_btn_moc.length; i++) {
                cc.eventManager.resumeTarget(this.array_btn_moc[i], true);
            }
        },

        show_event_vip: function () {
            this.pn_event_Vip.setVisible(true);
            this.pn_event_Vip.runAction(cc.scaleTo(0.2, 1));
            if (!cc.sys.isNative) {
                this.btn_hide_top.setVisible(false);
            }
        },
        callBackError: function (response) {
        },

        parserGetConfigVippointEvent: function () {
            var url = urlGetEventVippoint(userInfo.userData.nickname);
            sendRequest(url, null, false, this.callBackDataVippointEvent.bind(this), this.callBackError.bind(this));
            cc.log("url vip" + url);
        },
        callBackDataVippointEvent: function (response) {
            cc.log("event vip" + response);
            var jsonData = JSON.parse(response);
            this.arrrayPlaceVip = jsonData["places"];
            this.placeMe = jsonData["vip"];
            GuiUtil.changeSprite(this.avatar_me,menutab.userManager.getlinkAvatar(userInfo.userData.avatar));
            this.avatar_me.setScale(0.7);

            var end_event = jsonData["status"];
            var des = jsonData["des"];
            if (end_event == 0) {
                this.pn_end_event.setVisible(true);
                this.txt_content_end_event.setString(des);
            } else if (end_event == 1) {
                this.pn_end_event.setVisible(false);
                this.txt_content_end_event.setString("");
            } else {
                this.pn_end_event.setVisible(true);
                this.txt_content_end_event.setString(des);
            }

            var button = new ccui.Button();
            if (jsonData["place"].place != 0) {
                button = this.array_btn_moc[jsonData["place"].place - 1];
                this.notice_me.x = button.x + 25;
                this.notice_me.y = button.y - 40;
                this.notice_me.setVisible(true);
                if (jsonData["place"].nickname.length >= 15) {
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0, 12);
                    var name = head + "...";
                    this.txt_name_me.setString(name);
                } else
                    this.txt_name_me.setString(jsonData["place"].nickname);
                this.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                this.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            } else {
                this.notice_me.x = 368.36;
                this.notice_me.y = 164.17;
                this.notice_me.setVisible(true);
                if (jsonData["place"].nickname.length >= 15) {
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0, 12);
                    var name = head + "...";
                    this.txt_name_me.setString(name);
                } else
                    this.txt_name_me.setString(jsonData["place"].nickname);
                this.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                this.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            }

            if (this.arrayTop != null)
                while (this.arrayTop.length > 0) {
                    this.arrayTop.pop();
                }

            var DataUser = jsonData["vips"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                this.arrayTop.push(counter);

            }
            this.reload_Bangxephang();
            if (!cc.sys.isNative) {
                for (var i = 0; i < this.array_btn_moc.length; i++) {
                    cc.eventManager.addListener(this.onMovePoint.clone(), this.array_btn_moc[i]);
                }
            }
        },
        reload_Bangxephang: function () {
            this.lv_top_xh.removeAllItems();
            this.lv_top_xh.removeAllChildren();
            var cellHeight = 29;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            if (this.arrayTop.length > 0) {
                for (var i = 0; i < this.arrayTop.length; i++) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(this.arrayTop[i].stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(this.arrayTop[i].nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(185, positionY));
                    lbvippoint.setString(this.arrayTop[i].vippoint + " VP");

                    lbstt.setColor(GuiUtil.color("#f7ebc6"));
                    lbnickname.setColor(GuiUtil.color("#f7ebc6"));
                    lbvippoint.setColor(GuiUtil.color("#f7ebc6"));

                    if (i == 0) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,res_ResourceMenuTab + "/Vip/sp_1.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                        lbstt.setColor(GuiUtil.color("#ffdf58"));
                        lbnickname.setColor(GuiUtil.color("#ffdf58"));
                        lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    } else if (i == 1) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,res_ResourceMenuTab + "/Vip/sp_2.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else if (i == 2) {
                        var vong1 = new cc.Sprite();
                        GuiUtil.changeSprite(vong1,res_ResourceMenuTab + "/Vip/sp_3.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else {
                        cellList.addChild(lbstt);
                    }

                    if (this.arrayTop[i].nickname == userInfo.userData.nickname) {
                        this.isMeInList = true;
                        lbstt.setColor(GuiUtil.color("#ffdf58"));
                        lbnickname.setColor(GuiUtil.color("#ffdf58"));
                        lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    }

                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                if (this.isMeInList == false) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(this.placeMe.stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(this.placeMe.nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(185, positionY));
                    lbvippoint.setString(this.placeMe.vippoint + " VP");

                    lbstt.setColor(GuiUtil.color("#67ec8a"));
                    lbnickname.setColor(GuiUtil.color("#67ec8a"));
                    lbvippoint.setColor(GuiUtil.color("#67ec8a"));

                    cellList.addChild(lbstt);
                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                /// ve 3 vitri dau tien
                // vitri 1
                for (var i = 0; i < 16; i++) {
                    if (this.arrayTop[0].vippoint >= this.arrrayPlaceVip[i].min) {
                        this.sp_vitri1.setVisible(true);
                        var button = new ccui.Button();
                        button = this.array_btn_moc[i];
                        this.sp_vitri1.x = button.x;
                        this.sp_vitri1.y = button.y;
                    }
                  
                }
            }
        },

        parserBXH_Vippoint: function (kind) {
            if (kind == false) {
                var url = urlBXH_Intel_Vippoint(userInfo.userData.nickname);
                sendRequest(url, null, false, this.callBackData_Intel, this.callBackError);
            } else {
                var url = urlBXH_Strong_Vippoint(userInfo.userData.nickname);
                sendRequest(url, null, false, this.callBackData_Strong, this.callBackError);
            }
            //cc.log("url : " + url);
        },
        callBackData_Intel: function (response) {
            var jsonData = JSON.parse(response);
            this.IntelMe = jsonData["intel"];
            if (this.arrrayIntel != null)
                while (this.arrrayIntel.length > 0) {
                    this.arrrayIntel.pop();
                }

            var DataUser = jsonData["intels"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                this.arrrayIntel.push(counter);

            }
            this.maxpage = (this.arrrayIntel.length / 10);
            this.reload_Data_Intel(this.page_bxh);
        },
        reload_Data_Intel: function (page) {
            this.lv_muutri.removeAllItems();
            this.lv_muutri.removeAllChildren();
            this.txt_page.setString(page + "/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            var end = page * 10;
            var start = end - 10;

            for (var i = 0; i < this.arrrayIntel.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_muutri.width;

                var cellList = null;
                if (i % 2 == 0) {
                    cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                } else {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width = this.lv_muutri.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                lbstt.setString(this.arrrayIntel[i].stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(this.arrrayIntel[i].nickname);

                var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42, positionY));
                lbvippoint.setString(formatMoney(0, 3, this.arrrayIntel[i].vippoint));

                var lbbonus = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73, positionY));
                lbbonus.setString(this.arrrayIntel[i].bonus);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(64, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31, positionY));
                lbplace.setString(this.arrrayIntel[i].place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91, positionY));
                var str = this.arrrayIntel[i].prize;
                if (this.arrrayIntel[i].prize == null || this.arrrayIntel[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#f7ebc6"));
                lbaccount.setColor(GuiUtil.color("#f7ebc6"));
                lbplace.setColor(GuiUtil.color("#f7ebc6"));
                lbvippoint.setColor(GuiUtil.color("#f7ebc6"));
                lbbonus.setColor(GuiUtil.color("#f7ebc6"));
                lbprize.setColor(GuiUtil.color("#f7ebc6"));

                if (i == 0) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    lbbonus.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                } else if (i == 1) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else if (i == 2) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else {
                    cellList.addChild(lbstt);
                }

                if (this.arrrayIntel[i].nickname == userInfo.userData.nickname) {
                    this.isMeInListIntel = true;
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbvippoint.setColor(GuiUtil.color("#ffdf58"));
                    lbbonus.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
            if (this.isMeInListIntel == false) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_muutri.width;

                var cellList = null;
                cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                cellList.height = cellHeight;
                cellList.width = this.lv_muutri.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                if (parseInt(this.IntelMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(this.IntelMe.stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(this.IntelMe.nickname);

                var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42, positionY));
                lbvippoint.setString(formatMoney(0, 3, this.IntelMe.vippoint));

                var lbbonus = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73, positionY));
                lbbonus.setString(this.IntelMe.bonus);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(64, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31, positionY));
                lbplace.setString(this.IntelMe.place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91, positionY));
                var str = this.IntelMe.prize;
                if (this.IntelMe.prize == null || this.IntelMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#67ec8a"));
                lbaccount.setColor(GuiUtil.color("#67ec8a"));
                lbplace.setColor(GuiUtil.color("#67ec8a"));
                lbvippoint.setColor(GuiUtil.color("#67ec8a"));
                lbbonus.setColor(GuiUtil.color("#67ec8a"));
                lbprize.setColor(GuiUtil.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
        },

        callBackData_Strong: function (response) {
            var jsonData = JSON.parse(response);
            this.StrongMe = jsonData["strong"];
            if (this.arrrayStrong != null)
                while (this.arrrayStrong.length > 0) {
                    this.arrrayStrong.pop();
                }

            var DataUser = jsonData["strongs"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                this.arrrayStrong.push(counter);

            }
            this.maxpage = (this.arrrayStrong.length / 10);
            this.reload_Data_Strong(this.page_bxh);
        },
        reload_Data_Strong: function (page) {
            this.lv_kiencuong.removeAllItems();
            this.lv_kiencuong.removeAllChildren();
            this.txt_page.setString(page + "/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            var end = page * 10;
            var start = end - 10;

            for (var i = 0; i < this.arrrayStrong.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_kiencuong.width;

                var cellList = null;
                if (i % 2 == 0) {
                    cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                } else {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width = this.lv_kiencuong.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                lbstt.setString(this.arrrayStrong[i].stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(this.arrrayStrong[i].nickname);

                var lbvippointSub = new cc.LabelTTF('', fonts.fontName, 14, cc.size(117, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81, positionY));
                lbvippointSub.setString(formatMoney(0, 3, this.arrrayStrong[i].vippointSub));

                var lbdragon = new cc.LabelTTF('', fonts.fontName, 14, cc.size(122, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42, positionY));
                lbdragon.setString(this.arrrayStrong[i].count);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(69, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91, positionY));
                lbplace.setString(this.arrrayStrong[i].place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41, positionY));
                var str = this.arrrayStrong[i].prize;
                if (this.arrrayStrong[i].prize == null || this.arrrayStrong[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#f7ebc6"));
                lbaccount.setColor(GuiUtil.color("#f7ebc6"));
                lbvippointSub.setColor(GuiUtil.color("#f7ebc6"));
                lbdragon.setColor(GuiUtil.color("#f7ebc6"));
                lbprize.setColor(GuiUtil.color("#f7ebc6"));

                if (i == 0) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbvippointSub.setColor(GuiUtil.color("#ffdf58"));
                    lbdragon.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                } else if (i == 1) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else if (i == 2) {
                    var vong1 = new cc.Sprite();
                    GuiUtil.changeSprite(vong1,"res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38, positionY + 2));
                    cellList.addChild(vong1);
                } else {
                    cellList.addChild(lbstt);
                }

                if (this.arrrayStrong[i].nickname == userInfo.userData.nickname) {
                    this.isMeInListStrong = true;
                    lbstt.setColor(GuiUtil.color("#ffdf58"));
                    lbaccount.setColor(GuiUtil.color("#ffdf58"));
                    lbvippointSub.setColor(GuiUtil.color("#ffdf58"));
                    lbdragon.setColor(GuiUtil.color("#ffdf58"));
                    lbplace.setColor(GuiUtil.color("#ffdf58"));
                    lbprize.setColor(GuiUtil.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
            if (this.isMeInListStrong == false) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_kiencuong.width;

                var cellList = null;
                cellList = new cc.LayerColor(GuiUtil.color(25, 23, 88, 160));
                cellList.height = cellHeight;
                cellList.width = this.lv_kiencuong.width;

                var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(53, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38, positionY));
                if (parseInt(this.StrongMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(this.StrongMe.stt);

                var lbaccount = new cc.LabelTTF('', fonts.fontName, 14, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38, positionY));
                lbaccount.setString(this.StrongMe.nickname);

                var lbvippointSub = new cc.LabelTTF('', fonts.fontName, 14, cc.size(106, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81, positionY));
                lbvippointSub.setString(formatMoney(0, 3, this.StrongMe.vippointSub));

                var lbdragon = new cc.LabelTTF('', fonts.fontName, 14, cc.size(112, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42, positionY));
                lbdragon.setString(this.StrongMe.count);

                var lbplace = new cc.LabelTTF('', fonts.fontName, 14, cc.size(69, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91, positionY));
                lbplace.setString(this.StrongMe.place);

                var lbprize = new cc.LabelTTF('', fonts.fontName, 14, cc.size(260, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41, positionY));
                var str = this.IntelMe.prize;
                if (this.IntelMe.prize == null || this.StrongMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(GuiUtil.color("#67ec8a"));
                lbaccount.setColor(GuiUtil.color("#67ec8a"));
                lbvippointSub.setColor(GuiUtil.color("#67ec8a"));
                lbdragon.setColor(GuiUtil.color("#67ec8a"));
                lbplace.setColor(GuiUtil.color("#67ec8a"));
                lbprize.setColor(GuiUtil.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite1.setScaleY(1);
                aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53, positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite2.setScaleY(1);
                aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91, positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite3.setScaleY(1);
                aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37, positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite4.setScaleY(1);
                aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81, positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png", cc.rect(0, 0, 1, 30));
                aSprite5.setScaleY(1);
                aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81, positionY + 3));

                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
        },

        funDragonEvent: function () {
            this.number_nhay = this.number_nhay + 1;
            if (this.number_nhay <= 3) {
                this.event_run.setVisible(true);
                this.event_run.runAction(cc.sequence(cc.fadeIn(0.35), cc.delayTime(2.5), cc.fadeOut(0.35), cc.callFunc(function () {
                    this.event_run.setVisible(false);
                }), cc.delayTime(1.5), cc.callFunc(function () {
                    menutab.eventVipLayer.funDragonEvent();
                })));
            } else {
                this.event_run.stopAllActions();
                this.number_nhay = 0;
                this.event_run.setVisible(false);
                this.event_run.runAction(cc.fadeOut(0));
            }
        }
    }
);
EventVipLayer.BTN_CLOSE_EVENT_VIP = 1;
EventVipLayer.BTN_MOC_1 = 2;
EventVipLayer.BTN_MOC_2 = 3;
EventVipLayer.BTN_MOC_3 = 4;
EventVipLayer.BTN_MOC_4 = 5;
EventVipLayer.BTN_MOC_5 = 6;
EventVipLayer.BTN_MOC_6 = 7;
EventVipLayer.BTN_MOC_7 = 8;
EventVipLayer.BTN_MOC_8 = 9;
EventVipLayer.BTN_MOC_9 = 10;
EventVipLayer.BTN_MOC_10 = 11;
EventVipLayer.BTN_MOC_11 = 12;
EventVipLayer.BTN_MOC_12 = 13;
EventVipLayer.BTN_MOC_13 = 14;
EventVipLayer.BTN_MOC_14 = 15;
EventVipLayer.BTN_MOC_15 = 16;
EventVipLayer.BTN_MOC_16 = 17;

EventVipLayer.BTN_UPDOWN_VP = 18;

EventVipLayer.BTN_MUU_TRI = 19;
EventVipLayer.BTN_KIEN_CUONG = 20;
EventVipLayer.BTN_CLOSE_BANG_XH = 21;

EventVipLayer.BTN_OPEN_BANG_XH = 22;
EventVipLayer.BTN_THE_LE = 23;
EventVipLayer.BTN_HIDE_TOP = 24;

EventVipLayer.BTN_BACK_PAGE = 25;
EventVipLayer.BTN_BACKALL_PAGE = 26;
EventVipLayer.BTN_NEXT_PAGE = 27;
EventVipLayer.BTN_NEXTALL_PAGE = 28;
EventVipLayer.BTN_CLOSE_THELE_EVENT = 29;


closeEvent_Vip = function () {
    if(menutab.eventVipLayer != null){
        menutab.eventVipLayer .removeFromParent(true);
        menutab.eventVipLayer  = null;
    }
};
