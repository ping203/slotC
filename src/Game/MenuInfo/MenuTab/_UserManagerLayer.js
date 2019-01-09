/**
 * Created by PVC on 1/22/2018.
 */
var UserManagerLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.pTabQuanLy = null;
            this.btn_logout = null;
            this.lb_user_name = null;
            this.lb_vip_lever = null;
            this.lb_exp = null;
            this.sd_exp = null;
            this.lb_blance_vin = null;
            this.lb_blance_xu = null;
            this.btn_nap_vin = null;
            this.btn_nap_xu = null;
            this.btn_sercuriry = null;
            this.btn_lichsugiaodich = null;
            this.btn_shop = null;
            this.btn_menu = null;
            this.sp_avatar = null;
            this.sp_quangsang = null;
            this.btn_event = null;
            this.sp_time_event = null;
            this.txt_event = null;
            this.pn_tooltip = null;
            this.lb_content_tooltip = null;
            this.settingGame = null;
            this.gotoToolTip = "";
            this.arrayToolTip = [];

            return true;
        },
        customizeGUI: function () {
            this.addLayout(this, "pTabQuanLy", cc.p(0, 642), null, cc.size(1280, 78), true);
            this["pTabQuanLy"].setAnchorPoint(0, 0);
            this.addButton(this["pTabQuanLy"], "btn_logout", UserManagerLayer.BTN_LOGOUT, cc.p(44, 41), true, res_ResourceMenuTab_Profile + "/btn_back_lobby.png", res_ResourceMenuTab_Profile + "/btn_back_lobby.png");
            this.addText(this["pTabQuanLy"], "lb_user_name", cc.p(170, 65), "", RobotoRegular.fontName, 20);
            this["lb_user_name"].setAnchorPoint(0, 0.5);
            this["lb_user_name"].setColor(GuiUtil.color("#feeaca"));

            this.addText(this["pTabQuanLy"], "lb_vip_lever", cc.p(170, 40), "VP : ", RobotoRegular.fontName, 20);
            this["lb_vip_lever"].setAnchorPoint(0, 0.5);
            this["lb_vip_lever"].setColor(GuiUtil.color("#FFFF00"));
            this.addText(this["pTabQuanLy"], "lb_exp", cc.p(170, 15), "Đá", RobotoRegular.fontName, 18);
            this["lb_exp"].setAnchorPoint(0, 0.44);
            this["lb_exp"].setColor(GuiUtil.color("#feeaca"));
            this["sd_exp"] = new ccui.Slider();
            this["sd_exp"].setPosition(cc.p(280, 15));
            this["sd_exp"].setContentSize(cc.size(134, 10));
            this["sd_exp"].setPercent(48);
            var texttpe = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(res_ResourceMenuTab_Profile + "/thanhExp.png"))
                texttpe = ccui.Widget.PLIST_TEXTURE;
            this["sd_exp"].loadBarTexture(res_ResourceMenuTab_Profile + "/thanhExp.png", texttpe);
            this["sd_exp"].loadSlidBallTextures(res_ResourceMenuTab_Profile + "/circleB.png", res_ResourceMenuTab_Profile + "/circleB.png", res_ResourceMenuTab_Profile + "/circleB.png", texttpe);
            this["sd_exp"].loadProgressBarTexture(res_ResourceMenuTab_Profile + "/load_level.png",GuiUtil.checkTextureType(res_ResourceMenuTab_Profile + "/load_level.png"));
            this.sd_exp.setTouchEnabled(false);
            this["pTabQuanLy"].addChild(this["sd_exp"]);
            this.addSprite(this["pTabQuanLy"], "money_Vin_3", cc.p(490, 41), res_ResourceMenuTab_Profile + "/money_Vin.png");
            this.addSprite(this["pTabQuanLy"], "money_Xu_4", cc.p(782, 41), res_ResourceMenuTab_Profile + "/money_Xu.png");
            this.addText(this["pTabQuanLy"], "lb_blance_vin", cc.p(496, 39), "", RobotoRegular.fontName, 23);
            this["lb_blance_vin"].setColor(GuiUtil.color("#FFFF00"));
            this.addText(this["pTabQuanLy"], "lb_blance_xu", cc.p(792, 39), "", RobotoRegular.fontName, 23);
            this["lb_blance_xu"].setColor(GuiUtil.color("#feeaca"));
            this.addButton(this["pTabQuanLy"], "btn_nap_vin", UserManagerLayer.BTN_NAP_VIN, cc.p(611, 39), true, res_ResourceMenuTab_Profile + "/btnNapVin.png", res_ResourceMenuTab_Profile + "/btnNapVin.png");
            this.addButton(this["pTabQuanLy"], "btn_nap_xu", UserManagerLayer.BTN_NAP_XU, cc.p(905, 39), true, res_ResourceMenuTab_Profile + "/btnNapVin.png", res_ResourceMenuTab_Profile + "/btnNapVin.png");
            this.addButton(this["pTabQuanLy"], "btn_sercuriry", UserManagerLayer.BTN_SERCURITY, cc.p(1035, 41), true, res_ResourceMenuTab_Profile + "/btnSercurity.png", res_ResourceMenuTab_Profile + "/btnSercurity.png");
            this.addButton(this["pTabQuanLy"], "btn_lichsugiaodich", UserManagerLayer.BTN_LICHSUGIAODICH, cc.p(1105, 41), true, res_ResourceMenuTab_Profile + "/btnMail.png", res_ResourceMenuTab_Profile + "/btnMail.png");
            this.addButton(this["pTabQuanLy"], "btn_shop", UserManagerLayer.BTN_SHOP, cc.p(1175, 41), true, res_ResourceMenuTab_Profile + "/btnShop.png", res_ResourceMenuTab_Profile + "/btnShop.png");

            this.addButton(this["pTabQuanLy"], "btn_menu", UserManagerLayer.BTN_MENU, cc.p(1245, 41), true, res_ResourceMenuTab_Profile + "/btnMenu.png", res_ResourceMenuTab_Profile + "/btnMenu.png");
            var texttpe = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(res_ResourceMenuTab_Profile + "/btnMenu.png"))
                texttpe = ccui.Widget.PLIST_TEXTURE;
            this["btn_menu"].loadTextureDisabled(res_ResourceMenuTab_Profile + "/btnMenu.png", texttpe);
            this.addButton(this["pTabQuanLy"], "sp_avatar", UserManagerLayer.CLICKAVATAR, cc.p(121, 40), true, res_common_avatar + "/Avatar_1.png", res_common_avatar + "/Avatar_1.png");
            this.sp_avatar.setScale(0.6);
            this.addSprite(this["pTabQuanLy"], "sp_quangsang", cc.p(965, 45), res_ResourceMenuTab_Profile + "/quangsang.png");
            this.addButton(this["pTabQuanLy"], "btn_event", UserManagerLayer.BTN_EVENT, cc.p(965, 43.5), true, res_ResourceMenuTab_Profile + "/btn_dragon.png", res_ResourceMenuTab_Profile + "/btn_dragon_s.png");
            this.addImage(this["pTabQuanLy"], "sp_time_event", cc.p(965, 80), res_ResourceMenuTab_Profile + "/bg_time_event.png", cc.size(67, 22));
            this.sp_time_event.setVisible(false);
            this.addText(this["pTabQuanLy"], "txt_event", cc.p(965, 80), "00:00:15", RobotoRegular.fontName, 15);
            this["txt_event"].setAnchorPoint(0.5, 0.5);
            this.txt_event.ignoreContentAdaptWithSize(false);
            this.txt_event.setContentSize(cc.size(63, 18));
            this.txt_event.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_event.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_event.setString("");
            if(cc.sys.isNative){
                this.txt_event.setPosition(cc.p(905,72));
                this.sp_time_event.setPosition(cc.p(905,72));
            }
            this.addLayout(this["pTabQuanLy"], "pn_tooltip", cc.p(0, 0), null, cc.size(0, 0));
            this.addText(this["pn_tooltip"], "lb_content_tooltip", cc.p(0, 0), "", RobotoRegular.fontName, 16);
            this.pn_tooltip.setVisible(false);
            var fadein = cc.fadeIn(0);
            this.pn_tooltip.runAction(fadein);
            this.addImage(this, "imgJackpot", cc.p(550, 614.5), res_ResourceMenuTab + "/titleJackpot.png", cc.size(205, 35));
            this.imgJackpot.setVisible(false);
            this.initSettingGame();
            this.loadData();


            var onMovepToolTip = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (this.gotoToolTip != target.getName()) {
                                var stt = target.getName().substr(8, target.getName().length);
                                //cc.log("vao roi: " + stt);
                                this.gotoToolTip = target.getName();
                                //cc.log("vitri : " + target.x + "y: " + target.y);
                                menutab.userManager.pn_tooltip.x = target.x;
                                menutab.userManager.pn_tooltip.y = target.y + 50;
                                var fadein = cc.fadeIn(0.3);
                                menutab.userManager.pn_tooltip.setVisible(true);
                                menutab.userManager.pn_tooltip.stopAllActions();
                                menutab.userManager.pn_tooltip.runAction(fadein);
                                for (var i = 0; i < menutab.userManager.arrayToolTip.length; i++) {
                                    if (i != Number(stt)) {
                                        cc.eventManager.pauseTarget(menutab.userManager.arrayToolTip[i], true);
                                    }
                                }
                                menutab.userManager.lb_content_tooltip.setString(menutab.userManager.getNameTooltip(target.getName()));
                            }
                        } else {
                            if (this.gotoToolTip == target.getName()) {
                                this.gotoToolTip = "";
                                var fadeout = cc.fadeOut(0.3);
                                menutab.userManager.pn_tooltip.stopAllActions();
                                menutab.userManager.pn_tooltip.runAction(cc.sequence(fadeout, cc.callFunc(function () {
                                    menutab.userManager.pn_tooltip.setVisible(false);
                                    menutab.userManager.lb_content_tooltip.setString("");
                                })));
                                for (var i = 0; i < menutab.userManager.arrayToolTip.length; i++) {
                                    cc.eventManager.resumeTarget(menutab.userManager.arrayToolTip[i], true);
                                }
                            }
                        }
                    }
                });

            this.btn_logout.setName("Tooltip_0");
            this.sp_avatar.setName("Tooltip_1");
            this.btn_nap_vin.setName("Tooltip_2");
            this.btn_nap_xu.setName("Tooltip_3");
            this.btn_event.setName("Tooltip_4");
            this.btn_sercuriry.setName("Tooltip_5");
            this.btn_lichsugiaodich.setName("Tooltip_6");
            this.btn_shop.setName("Tooltip_7");
            this.btn_menu.setName("Tooltip_8");

            this.arrayToolTip.push(this.btn_logout);
            this.arrayToolTip.push(this.sp_avatar);
            this.arrayToolTip.push(this.btn_nap_vin);
            this.arrayToolTip.push(this.btn_nap_xu);
            this.arrayToolTip.push(this.btn_event);
            this.arrayToolTip.push(this.btn_sercuriry);
            this.arrayToolTip.push(this.btn_lichsugiaodich);
            this.arrayToolTip.push(this.btn_shop);
            this.arrayToolTip.push(this.btn_menu);

            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_logout);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.sp_avatar);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_nap_vin);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_nap_xu);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_event);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_sercuriry);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_lichsugiaodich);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_shop);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_menu);
        },
        onEnter: function () {
            this._super();
        },
        loadData:function () {
            this.lb_user_name.setString(userInfo.userData.nickname);
            this.genVipPoint(userInfo.userData.vippointSave);
            this.lb_blance_vin.setString(formatMoney(0, 3, userInfo.userData.vinTotal));
            this.lb_blance_xu.setString(formatMoney(0, 3, userInfo.userData.xuTotal));
            var texttpe = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(this.getlinkAvatar(userInfo.userData.avatar)))
                texttpe = ccui.Widget.PLIST_TEXTURE;
            var image = this.getlinkAvatar(userInfo.userData.avatar);
            this.sp_avatar.loadTextures(image, image, image, texttpe);
        },
        genVipPoint:function (value) {
            for (var i = 0; i < vipPointDefine.length; i++)
            {
                if(value > vipPointDefine[i].minVp && value <= vipPointDefine[i].maxVp)
                {
                    this.lb_exp.setString(vipPointDefine[i].name);
                    this.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(userInfo.userData.vippointSave)) + "/" + vipPointDefine[i].maxVp);
                    this.sd_exp.setPercent(parseInt((userInfo.userData.vippointSave * 100) / vipPointDefine[i].maxVp));
                }
            }
        },
        updateMoney:function () {
            this.lb_blance_vin.setString(formatMoney(0, 3, userInfo.userData.vinTotal));
            this.lb_blance_xu.setString(formatMoney(0, 3, userInfo.userData.xuTotal));
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case UserManagerLayer.BTN_NAP_VIN:
                    ConfigShopping.check_tab_shopping = 0;
                    menutab.openShoppingLayer();
                    break;
                case UserManagerLayer.BTN_NAP_XU:
                    ConfigShopping.check_tab_shopping = 1;
                    menutab.openShoppingLayer();
                    break;
                case UserManagerLayer.BTN_SERCURITY:
                    if (gI.mainSocket.listener.gameWsState == CLIENT_STATE.CONNECTED) {
                        menutab.openSercurityLayer();

                    }else{
                        cc.log(gI.mainSocket.listener.gameWsState);
                        gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    }
                    break;
                case UserManagerLayer.BTN_LICHSUGIAODICH:
                    menutab.openLichSuGDLayer();
                    break;
                case UserManagerLayer.BTN_SHOP:
                    menutab.openShoppingLayer();
                    break;
                case UserManagerLayer.BTN_MENU:
                    this.settingGame.openSetting();
                    break;
                case UserManagerLayer.BTN_LOGOUT:
                    if (GameManager.getInstance().inGame == false) {
                         gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn thoát game!", "ĐỒNG Ý", "HỦY", this.logout, this.Cancellogout);
                    } else {
                        GameManager.getInstance().clickOnBack();
                        menutab.Isingame = false;
                        if (lobby.menuLayer.isMenuSlots) {
                            Slots.socketSlot.sendSubScribe(SUBSCRIBE_HALL,null);
                        }

                    }
                    break;
                case UserManagerLayer.BTN_EVENT:
                   menutab.openEventViplayer();
                    break;
                case UserManagerLayer.CLICKAVATAR:
                    menutab.openProfileLayer();
                    break;
            }
        },

        initSettingGame:function () {
            this.settingGame = new SettingLayer();
            this.addChild(this.settingGame);
        },
        getlinkAvatar: function (value) {
            for (var i = 0; i < 21; i++) {
                if (value == i) {
                    return "res/common/avatar/Avatar_" + (i + 1) + ".png";
                }
            }
        },
        logout: function () {
            menutab.Islogout = true;
            lobby.menuLayer.setMenuSlot(false);
            userInfo.userData = null;
            lobby.logOut();
            gI.mainSocket.closeSocket();
            gI.taixiuSocket.closeSocket();
            if (Slots.socketSlot && Slots.socketSlot.gameWsState == CLIENT_STATE.CONNECTED)
                Slots.socketSlot.closeSocket();

            menutab.removeFromParent(true);
            menutab = null;
        },
        Cancellogout: function () {

        },


        funGetInfoEventVippoint: function () {
            if (gI.mainSocket.listener.isLogged) {
                var eventVippoint = new CmdSendEventVippoint();
                eventVippoint.putEventVippoint();
                gI.mainSocket.send(eventVippoint);
                eventVippoint.clean();
            } else {
                gI.mainSocket.connectSocket();
            }
        },

        responseEventVippoint: function (status, time) {
            // cc.log("status: " + status + " time : " + time);
            this.timeEvent = time;
            if (status == 0) {
                this.sp_time_event.setVisible(false);
                this.txt_event.setString("");
                if (menutab.eventVipLayer != null) {
                    menutab.eventVipLayer.txt_time_event.setString("00H\n00:00");
                }
                this.btn_event.stopAllActions();
                this.btn_event.runAction(cc.scaleTo(0, 1));
                this.txt_event.stopAllActions();
                this.sp_time_event.stopAllActions();
            } else {
                var seq = cc.sequence(cc.scaleTo(0.2, 1.05), cc.scaleTo(0.2, 1));
                this.btn_event.runAction(cc.repeatForever(seq));
                if (cc.sys.os == cc.sys.OS_IOS) {
                    if (lobby.open_payment_ios == true) {
                        this.sp_time_event.setVisible(true);
                        this.funDownTimeEvent();
                        this.sp_time_event.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(menutab.userManager.funGetInfoEventVippoint, this)));
                    }
                } else {
                    this.sp_time_event.setVisible(true);
                    this.funDownTimeEvent();
                    this.sp_time_event.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(menutab.userManager.funGetInfoEventVippoint, this)));
                }
            }
        },
        funDownTimeEvent: function () {
            this.txt_event.setString(formartTimeSecond(this.timeEvent));
            if (menutab.eventVipLayer != null) {
                menutab.eventVipLayer.txt_time_event.setString(formartTimeSecondEventVip(this.timeEvent));
            }
            this.timeEvent = this.timeEvent - 1;
            var seq1 = cc.sequence(cc.delayTime(1), cc.callFunc(menutab.userManager.funDownTimeEvent, menutab.userManager));
            this.txt_event.stopAllActions();
            this.txt_event.runAction(seq1);
        },

        responseHasEventDragon: function () {
            cc.log("has event dragon");
            this.btn_event.stopAllActions();
            var texttpe = ccui.Widget.LOCAL_TEXTURE;
            //if (cc.spriteFrameCache.getSpriteFrame("res/ResourceMenuTab/Profile/btn_dragon_s.png"))
            //    texttpe = ccui.Widget.PLIST_TEXTURE;
            GuiUtil.loadTextureNormal(this.btn_event,"res/ResourceMenuTab/Profile/btn_dragon_s.png");
            GuiUtil.loadTexturePressed(this.btn_event,"res/ResourceMenuTab/Profile/btn_dragon_s.png");
            var seq = cc.sequence(cc.scaleTo(0.2, 1.05), cc.callFunc(function () {
                GuiUtil.loadTextureNormal(menutab.userManager.btn_event,"res/ResourceMenuTab/Profile/btn_dragon_s.png");
            }), cc.scaleTo(0.2, 1), cc.callFunc(function () {
                GuiUtil.loadTextureNormal(menutab.userManager.btn_event,"res/ResourceMenuTab/Profile/btn_dragon_s.png");
            }));
            this.btn_event.runAction(cc.repeatForever(seq));
            this.btn_event.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(function () {
                GuiUtil.loadTexturePressed( menutab.userManager.btn_event,"res/ResourceMenuTab/Profile/btn_dragon.png");
                menutab.userManager.btn_event.stopAllActions();
                var seq2 = cc.sequence(cc.scaleTo(0.2, 1.05), cc.scaleTo(0.2, 1));
                menutab.userManager.btn_event.runAction(cc.repeatForever(seq2));
            })));
            if (menutab.eventVipLayer == true) {
                menutab.eventVipLayer.number_nhay = 0;
                menutab.eventVipLayer.funDragonEvent();
            }
        },

        getNameTooltip: function (value) {
            var str = "";
            if (value == "Tooltip_0")
                str = "Thoát game";
            else if (value == "Tooltip_1")
                str = " Hồ sơ ";
            else if (value == "Tooltip_2")
                str = "Mua "+GameManager.config.moneyName+"";
            else if (value == "Tooltip_3")
                str = " Đổi xu ";
            else if (value == "Tooltip_4")
                str = "Sự kiện";
            else if (value == "Tooltip_5")
                str = " Bảo mật ";
            else if (value == "Tooltip_6")
                str = "Lịch sử giao dịch";
            else if (value == "Tooltip_7")
                str = "Cửa hàng";
            else if (value == "Tooltip_8")
                str = "Thông tin khác";


            return str;

            this.btn_logout.setName("Tooltip_0");
            this.sp_avatar.setName("Tooltip_1");
            this.btn_nap_vin.setName("Tooltip_2");
            this.btn_event.setName("Tooltip_3");
            this.btn_lichsugiaodich.setName("Tooltip_4");
            this.btn_shop.setName("Tooltip_5");
            this.btn_menu.setName("Tooltip_6");
            //this.btn_nap_xu.setName("Tooltip_7");
            //this.btn_sercuriry.setName("Tooltip_8");
        },
        pauseToolTip: function () {
            for (var i = 0; i < this.arrayToolTip.length; i++) {
                cc.eventManager.pauseTarget(this.arrayToolTip[i], true);
            }
        },
        resumeToolTip: function () {
            for (var i = 0; i < this.arrayToolTip.length; i++) {
                cc.eventManager.resumeTarget(this.arrayToolTip[i], true);
            }
        },
        pauseHeader: function () {
            this.pauseToolTip();
            cc.eventManager.pauseTarget(this.pTabQuanLy, true);
            this.gotoToolTip = "";
            var fadeout = cc.fadeOut(0.3);
            this.pn_tooltip.stopAllActions();
            this.pn_tooltip.runAction(cc.sequence(fadeout, cc.callFunc(function () {
                menutab.userManager.pn_tooltip.setVisible(false);
                menutab.userManager.lb_content_tooltip.setString("");
            })));

        },


    });
UserManagerLayer.BTN_NAP_VIN = 1;
UserManagerLayer.BTN_NAP_XU = 2;
UserManagerLayer.BTN_SERCURITY = 3;
UserManagerLayer.BTN_LICHSUGIAODICH = 4;
UserManagerLayer.BTN_SHOP = 5;
UserManagerLayer.BTN_MENU = 6;
UserManagerLayer.BTN_LOGOUT = 7;
UserManagerLayer.BTN_EVENT = 8;
UserManagerLayer.CLICKAVATAR = 9;