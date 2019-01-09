
var GiftcodeLayer = BaseLayerTable.extend(
    {
        _isMission: null,
        ctor: function (isMission) {
            this.resourcePath = "res/ResourceMenuTab/BaoMat/";
            this.commonImageGift = "res/ResourceMenuTab/";
            //// panel dieu khoan
            this._isMission = isMission;

            this.vin_receive = 0;
            this.xu_receive = 0;

            this.listMissionVin = [];
            this.listMissionXu = [];
            this.typeMission = 1;
            this.nameGame = "";
            this.btn_earnVin = null;

            this._super("GiftcodeLayer");
            // this.initWithBinaryFile("res/GiftCode.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            this.addLayoutStructure(this, "pn_giftcode", cc.p(640.00, 360.00), "", cc.size(1280, 720), false);
            this.addLayoutStructure(this, "pn_effect_earnVin", cc.p(0, 0), "", cc.size(0, 0), true,{anchorX : 0, anchorY : 0});
            //
            if(this._isMission == true){
                this.setTitleText("KIẾM "+GameManager.config.moneyNameUpper);
                this.initPnMission();
                this.createTabView();
            }else{
                this.setTitleText("GIFTCODE");
                this.initPnQuaTang();
                this.initPnThongBao();
            }

            this.otherCustorm();

        },

        createTabView: function () {
            var arrTitleTab = ["NHIỆM VỤ "+GameManager.config.moneyNameUpper, "NHIỆM VỤ XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1, menutab.check_tab_shopping);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);

        },

        onClickTab: function (tabIndex, index) {
            cc.log(index);
            if (index == 0) {
                this.typeMission = 1;
            } else if (index == 1) {
                this.typeMission = 0;
            }
            this.funGetListMission();
        },

        initBgLayer: function () {
            var layout = this.pn_giftcode;

            this.addSpriteStructureWithoutResourcePath(layout, "bg_tab_menu", cc.p(640, 360.41), this.commonImageGift + "Mail/bgtab_mail.png");
            this.addButtonStructure(layout, "btn_close_giftcode", GiftcodeLayer.BTN_CLOSE_GIFTCODE, cc.p(1146.96, 630.16), true, this.commonImageGift + "Mail/btnClose.png");
            this.addSpriteStructureWithoutResourcePath(layout, "bg_title", cc.p(640, 648.19), this.commonImageGift + "Mail/Title.png");
            this.addTextStructure(layout, "txtInbox", cc.p(640.00, 649.10), "NHIỆM VỤ", RobotoRegular.fontName, "38", "#642A00", {__size: cc.size(179, 45)});
            this.addImage(layout, "Image_1", cc.p(640, 72.00), this.commonImageGift + "Mail/lopmo.png", cc.size(1041.00, 478.00));
            this.Image_1.setAnchorPoint(0.5,0);
            this.addButtonStructure(layout, "btn_mission_vin", GiftcodeLayer.BTN_MISSION_VIN, cc.p(640.00, 575.21), false, [this.resourcePath + "btn_3_mid_s.png", this.resourcePath + "btn_3_mid.png"], {
                titleText: "NHIỆM VỤ "+GameManager.config.moneyNameUpper,
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 28
            });
            this.addButtonStructure(layout, "btn_mission_xu", GiftcodeLayer.BTN_MISSION_XU, cc.p(985.00, 575.21), false, [this.resourcePath + "btn_3_hang_s.png", this.resourcePath + "btn_3_hang.png"]).setRotation(180);
            this.addTextStructure(this.btn_mission_xu, "Text_109", cc.p(172.50, 19.50), "NHIỆM VỤ XU", fontRobotoBold.fontName, "28", undefined, {__size: cc.size(178, 33)}).setRotation(180);
            this.addButtonStructure(layout, "btn_gift", GiftcodeLayer.BTN_QUA_TANG, cc.p(295.00, 575.21), false, [this.resourcePath + "btn_3_hang.png", this.resourcePath + "btn_3_hang.png"], {
                titleText: "QUÀ TẶNG",
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 28
            });
        },


        initPnQuaTang: function () {
            var layout = this.addLayoutStructure(this.pn_giftcode, "pn_qua_tang", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorX: 0,
                anchorY: 0
            });

            var layoutGilf = this.addLayoutStructure(layout, "pn_gift", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorX: 0,
                anchorY: 0
            });

            this.addSpriteStructure(layoutGilf, "Image_8", cc.p(468.16, 507.50), "txt_nhap_gift.png");
            this.addButtonStructure(layoutGilf, "btn_nhanGift", GiftcodeLayer.BTN_SEND_GIFTCODE, cc.p(990.45, 405.45), true, [this.resourcePath + "btn_get_gift.png", this.resourcePath + "btn_get_gift_s.png"], {
                titleText: "Nhận quà",
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 36
            });
            this.addTextStructure(layoutGilf, "txtInbox_0", cc.p(468.16, 467.68), "Nhập mã Giftcode của bạn vào ô bên dưới", fontArial.fontName, "20", undefined, {__size: cc.size(400, 23)});
            this.addTextStructure(layoutGilf, "txtInbox_0_0", cc.p(468.16, 340.43), "Mỗi mã Giftcode chỉ áp dụng cho 1 Nickname", fontArial.fontName, "20", "#FBB547", {__size: cc.size(450, 23)});
            this.addImage(layoutGilf, "Image_2", cc.p(468.16, 405.45), this.commonImageGift + "Shopping/bg_2.png",cc.size(430.00,65));
            this.addEditBoxStructure(layoutGilf, "tf_giftcode", cc.p(468.16, 405.45), "", "Nhập mã giftcode:", fontArial.fontName, 22, cc.size(430.00, 65.00), null, cc.TEXT_ALIGNMENT_LEFT, 12);
            this.tf_giftcode.setFontColor(cc.color("#000000"));
            if(this._isMission != null) {
                this.tf_giftcode.setString(this._isMission);
            }
            this.addButtonStructure(layoutGilf, "btn_clear_gift", GiftcodeLayer.BTN_CLEAR_GIFTCODE, cc.p(713.15, 406.58), true, this.resourcePath + "closetf.png");

            var layoutGioiThieu = this.addLayoutStructure(layout, "pn_gioi_thieu", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorX: 0,
                anchorY: 0
            });

            this.addSpriteStructure(layoutGioiThieu, "Image_8", cc.p(468.16, 278.50), "txt_ma_gioi_thieu.png");
            this.addButtonStructure(layoutGioiThieu, "btn_kickhoat", GiftcodeLayer.BTN_MA_GIOI_THIEU, cc.p(990.45, 176.46), true, [this.resourcePath + "btn_get_gift.png", this.resourcePath + "btn_get_gift_s.png"], {
                titleText: "Kick hoạt",
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 36
            });
            this.addTextStructure(layoutGioiThieu, "txtInbox_0", cc.p(468.16, 238.68), "Nhập Nickname người giới thiệu", fontArial.fontName, "20", undefined, {__size: cc.size(300, 23)});
            this.addTextStructure(layoutGioiThieu, "txtInbox_0_0", cc.p(468.16, 111.43), "Áp dụng cho 3 thẻ nạp đầu tiên. Tặng 5% thẻ nạp cho người giới thiệu", fontArial.fontName, "20", "#FBB547", {__size: cc.size(800, 23)});
            //this.addSpriteStructureWithoutResourcePath(layoutGioiThieu, "Image_2", cc.p(468.16, 176.46), this.commonImageGift + "Shopping/bg_2.png");
            this.addImage(layoutGioiThieu, "Image_2", cc.p(468.16, 176.46), this.commonImageGift + "Shopping/bg_2.png",cc.size(430.00,65));
            this.addEditBoxStructure(layoutGioiThieu, "tf_nickname_gioithieu", cc.p(468.16, 176.46), "", "Nhập Nickname:", RobotoRegular.fontName, 22, cc.size(430.00, 65.00), null, cc.TEXT_ALIGNMENT_LEFT, 16);

            this.addTextStructure(layout, "lb_comingsoon", cc.p(640.00, 360.00), "COMING SOON", fontArial.fontName, "90", undefined, {
                __size: cc.size(650, 107),
                visible: false
            }).setRotation(-13.45);
        },
        initPnMission: function () {
            var layout = this.addLayoutStructure(this.pn_giftcode, "pn_mission", cc.p(0, 0), "", cc.size(0, 0), true, {
                anchorX: 0,
                anchorY: 0
            });

            var lv_mision = this.lv_mision = new ccui.ListView();
            lv_mision.setScrollBarEnabled(0);
            lv_mision.setContentSize(cc.size(1011.00, 447.00));
            lv_mision.setPosition(cc.p(640.00, 535.50));
            lv_mision.setAnchorPoint(cc.p(0.50, 1.00));
            layout.addChild(lv_mision);
        },
        initPnThongBao: function () {
            var layout = this.addLayout(this.pn_giftcode, "pn_thongbao", cc.p(640.00, 360.00),"", cc.size(1280, 720), true);
            this.pn_thongbao.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_thongbao.setBackGroundColor(cc.color.BLACK);
            this.pn_thongbao.setBackGroundColorOpacity(100);
            this.pn_thongbao.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_thongbao.setTag(GiftcodeLayer.BTN_CLOSE_THONGBAO);
            this.addImage(this.pn_thongbao, "bg", cc.p(640, 458), this.commonImageGift + "Mail/bg_supersmaill_mail.png",cc.size(760.00,160.00));
            this.bg.setAnchorPoint(0.5, 1);
            this.addTextStructure(this.pn_thongbao, "Text_14", cc.p(640, 418), "THÔNG BÁO", RobotoRegular.fontName, "36", undefined, {__size: cc.size(202, 42)});
            this.addTextStructure(this.pn_thongbao, "content_thongbao", cc.p(640, 355), "", RobotoRegular.fontName, "18", undefined, {__size: cc.size(700.00, 60)});
            this.addTextStructure(this.pn_thongbao, "ct_success", cc.p(640, 383), "Chức mừng bạn, mã Giftcode của bạn nhận được:", RobotoRegular.fontName, "18", undefined, {__size: cc.size(450, 21)});
            this.addTextStructure(this.pn_thongbao, "ct_vin", cc.p(649, 360), "+ 1.000.000 "+GameManager.config.moneyName+":", RobotoRegular.fontName, "18", "#FFFF00", {__size: cc.size(450, 21)});
            this.addTextStructure(this.pn_thongbao, "ct_xu", cc.p(640, 338), "+ 1.000.000 "+GameManager.config.moneyName+":", RobotoRegular.fontName, "18", "#C0C1C3", {__size: cc.size(450, 21)});
            this.addTextStructure(this.pn_thongbao, "ct_other", cc.p(640, 316), "+ 1 lượt quay slot", RobotoRegular.fontName, "18", "#FFF043", {__size: cc.size(450, 21)});

        },

        otherCustorm: function () {
            if(this._isMission == true){
                this.funGetListMission();
                this.lv_mision.setTouchEnabled(true);
                this.lv_mision.setClippingEnabled(true);
                this.lv_mision.setScrollBarEnabled(false);
            }else{
                this.btn_clear_gift.setVisible(false);
                this.pn_thongbao.setScale(0);
                this.ct_vin.setString("");
                this.ct_xu.setString("");
                this.ct_other.setString("");
                this.pn_gioi_thieu.setVisible(false);
                this.pn_gift.setPosition(cc.p(this.pn_gift.getPositionX(), this.pn_gift.getPositionY() - 90));
            }
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case GiftcodeLayer.BTN_MA_GIOI_THIEU:
                    this.funSendMaGioiThieu();
                    break;
                case GiftcodeLayer.BTN_QUA_TANG:
                    this.gotoGiftAndMisstion(0);
                    break;
                case GiftcodeLayer.BTN_MISSION_VIN:
                    if (this.typeMission != 1)
                        this.gotoGiftAndMisstion(1);
                    break;
                case GiftcodeLayer.BTN_MISSION_XU:
                    if (this.typeMission != 0)
                        this.gotoGiftAndMisstion(2);
                    break;
                case GiftcodeLayer.BTN_CLOSE_GIFTCODE:
                    closegiftcode();
                    break;
                case GiftcodeLayer.BTN_CLEAR_GIFTCODE:
                    this.tf_giftcode.setString("");
                    this.tf_giftcode.setPlaceHolder("Nhập mã giftcode:");
                    this.btn_clear_gift.setVisible(false);
                    this.tf_giftcode.setFontColor(cc.color("#000000"));
                    this.tf_giftcode.runAction(cc.scaleTo(0.225, 1));
                    break;
                case GiftcodeLayer.BTN_SEND_GIFTCODE:
                    this.sendGiftcode();
                    break;
                case GiftcodeLayer.BTN_CLOSE_THONGBAO:
                    this.closeThongBao();
                    break;
            }
        },

        gotoGiftAndMisstion: function (kind) {
            var str = "res/ResourceMenuTab/BaoMat/";
            this.btn_gift.loadTextures(str + "btn_3_hang_s.png", str + "btn_3_hang.png", str + "btn_3_hang_s.png",ccui.Widget.PLIST_TEXTURE);
            if (lobby.open_giftcode == false)
                this.btn_mission_vin.loadTextures(str + "btn_3_hang_s.png", str + "btn_3_hang.png", str + "btn_3_hang_s.png",ccui.Widget.PLIST_TEXTURE);
            else
                this.btn_mission_vin.loadTextures(str + "btn_3_mid_s.png", str + "btn_3_mid.png", str + "btn_3_mid_s.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_mission_xu.loadTextures(str + "btn_3_hang_s.png", str + "btn_3_hang.png", str + "btn_3_hang_s.png",ccui.Widget.PLIST_TEXTURE);
            this.pn_qua_tang.setVisible(false);
            this.pn_mission.setVisible(false);
            if (kind == 0) {
                this.btn_gift.loadTextureNormal(str + "btn_3_hang.png",ccui.Widget.PLIST_TEXTURE);
                this.pn_qua_tang.setVisible(true);
                this.typeMission = 2;
            } else {
                this.pn_mission.setVisible(true);
                this.funGetListMission();
                if (kind == 1) {
                    if (lobby.open_giftcode == false)
                        this.btn_mission_vin.loadTextureNormal(str + "btn_3_hang.png",ccui.Widget.PLIST_TEXTURE);
                    else
                        this.btn_mission_vin.loadTextureNormal(str + "btn_3_mid.png",ccui.Widget.PLIST_TEXTURE);
                    this.typeMission = 1;
                } else {
                    this.btn_mission_xu.loadTextureNormal(str + "btn_3_hang.png",ccui.Widget.PLIST_TEXTURE);
                    this.typeMission = 0;
                }
            }
        },
        funSendMaGioiThieu: function () {
            var str = this.tf_nickname_gioithieu.getString();
            if (str.length > 0) {

            } else {
                this.showThongBao("Xin mời bạn nhập mã giới thiệu!", 0);
            }
        },

        openPanelMission: function (moneyType) {
            this.lv_mision.removeAllItems();
            this.lv_mision.removeAllChildren();
            var array = [];
            if (moneyType == MONEY_VIN)
                array = this.listMissionVin;
            else
                array = this.listMissionXu;

            var cellHeight = 150;
            var positionY = 75;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            for (var i = 0; i < array.length; i++) {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width = this.lv_mision.width;
                cellList.setPosition(cc.p(0, 0));
                var str = "res/ResourceMenuTab/BaoMat/";
                if (moneyType == MONEY_VIN)
                    var str2 = str + "bg_mission_vin.png";
                else
                    var str2 = str + "bg_mission_xu.png";
                var bground = GuiUtil.createSprite(str2);

                //bground.initWithFile(str2, cc.rect(0, 0, 933, 136));
                bground.setPosition(cc.p(cellList.width / 2, positionY));
                cellList.addChild(bground);

                var link = this.getLinkImage(array[i].misNa);
                if (link == "res/Lobby/IconGame/")
                    link = "res/Lobby/IconGame/samloc.png";
                var logogame = GuiUtil.createSprite(link);

                logogame.setScale(0.55)
                logogame.setPosition(cc.p(cellList.width / 2 - 380, positionY));
                cellList.addChild(logogame);

                if (array[i].compAllLev == 1) {
                    var maxlv = parseInt(array[i].misMax);
                    var money = parseInt(array[i].moBo);
                    var curlv = parseInt(array[i].misWin);
                    if (array[i].misNa == "TaiXiu") {
                        if (moneyType == MONEY_VIN)
                            var strgame = "Thắng " + maxlv + " ván " + this.nameGame + " tối thiểu 2.000 "+GameManager.config.moneyName+" nhận thưởng " + formatMoney(0, 3, money) + "" + GameManager.config.moneyName.toUpperCase()+ "";
                        else
                            var strgame = "Thắng " + maxlv + " ván " + this.nameGame + " tối thiểu 20.000 Xu nhận thưởng " + formatMoney(0, 3, money) + "" + GameManager.config.moneyName.toUpperCase()+ "";
                    } else
                        var strgame = "Chơi thắng " + maxlv + " ván game " + this.nameGame + " nhận thưởng " + formatMoney(0, 3, money) + "" + GameManager.config.moneyName.toUpperCase()+ "";
                    var lb_game = new cc.LabelTTF(strgame, fonts.fontName, 18, cc.size(600, 25), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_game.setPosition(cc.p(cellList.width / 2, positionY + 10));

                    var uiSlider = new ccui.Slider();
                    uiSlider.setTouchEnabled(false);
                    var texttpe = ccui.Widget.LOCAL_TEXTURE;
                    if (cc.spriteFrameCache.getSpriteFrame(str + "sliderBar.png"))
                        texttpe = ccui.Widget.PLIST_TEXTURE;
                    uiSlider.loadBarTexture(str + "sliderBar.png",texttpe);
                    uiSlider.loadSlidBallTextures("", "", "");
                    uiSlider.loadProgressBarTexture(str + "sliderBar2.png",texttpe);
                    var percent = parseInt(curlv / maxlv * 100);
                    uiSlider.setPercent(percent);
                    uiSlider.setPosition(cc.p(cellList.width / 2 - 60, positionY - 20));

                    var strvan = curlv + "/" + maxlv + " Ván";
                    var lb_van = new cc.LabelTTF(strvan, fonts.fontName, 18, cc.size(180, 25), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_van.setPosition(cc.p(cellList.width / 2 + 75, positionY - 20));

                    var button = new ccui.Button();
                    if (moneyType == MONEY_VIN)
                        button.loadTextures(str + "btn_get_gift.png", str + "btn_get_gift_s.png", str + "btn_gift_dis.png");
                    else
                        button.loadTextures(str + "btn_gift_xu.png", str + "btn_gift_xu_s.png", str + "btn_gift_dis.png");
                    button.setPosition(cc.p(cellList.width / 2 + 350, positionY));
                    button.setName(i);
                    button.setPressedActionEnabled(true);

                    if (parseInt(array[i].recReLev) != 0) {
                        button.setEnabled(false);
                        button.setBright(false);
                    }
                    cellList.addChild(button);
                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.EarnVin(sender);
                                break;
                        }
                    }, this);

                    var lb_btn = new cc.LabelTTF("Nhận quà", fonts.fontName, 32, cc.size(150, 35), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_btn.setPosition(cc.p(button.width / 2, button.height / 2));
                    lb_btn.enableStroke(cc.p("#FFFFFF"), 1);
                    button.addChild(lb_btn);

                    button.setScale(0.7);

                    cellList.addChild(lb_game);
                    cellList.addChild(uiSlider);
                    cellList.addChild(lb_van);
                } else {
                    var lbcomplete = parseInt(array[i].misMax);
                    var strgame = "Bạn đã hoàn thành tất cả các nhiệm vụ trong tuần!";
                    var lbcomplete = new cc.LabelTTF(strgame, fonts.fontName, 18, cc.size(400, 35), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbcomplete.setPosition(cc.p(cellList.width / 2, positionY));
                    cellList.addChild(lbcomplete);
                }
                this.lv_mision.pushBackCustomItem(cellList);
            }
        },
        EarnVin: function (sender) {
            cc.log("name game: " + sender.name);
            var name = sender.name;
            this.btn_earnVin = sender;
            sender.setEnabled(false);
            sender.setBright(false);
            if (gI.mainSocket.listener.isLogged) {
                var earnvin = new CmdSendEarnVinMission();
                var namegame = "";
                if (this.typeMission == MONEY_VIN)
                    namegame = this.listMissionVin[name].misNa;
                else
                    namegame = this.listMissionXu[name].misNa;
                earnvin.putdata(namegame, this.typeMission);
                gI.mainSocket.send(earnvin);
                earnvin.clean();
            } else {
                gI.mainSocket.connectSocket();
            }
        },

        showThongBao: function (str, value) {
            this.pn_thongbao.setVisible(true);
            this.pn_thongbao.runAction(cc.scaleTo(0.2, 1));
            if (value == 0) {
                this.ct_success.setVisible(false);
                this.ct_vin.setString("");
                this.ct_xu.setString("");
                this.ct_other.setString("");
                this.content_thongbao.setString(str);
            } else {
                this.content_thongbao.setString("");
                this.ct_success.setVisible(true);
                if (this.vin_receive != 0)
                    this.ct_vin.setString("+" + formatMoney(0, 3, this.vin_receive) + " "+GameManager.config.moneyNameUpper);
                if (this.xu_receive != 0)
                    this.ct_xu.setString("+" + formatMoney(0, 3, this.xu_receive) + " XU");
                this.ct_other.setString("");
                this.vin_receive = 0;
                this.xu_receive = 0;
            }
            this.content_thongbao.stopAllActions();
            this.content_thongbao.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.closeThongBao, this)));
        },
        closeThongBao: function (str) {
            this.pn_thongbao.runAction(cc.scaleTo(0.2, 0));
            this.content_thongbao.setString("");
            this.content_thongbao.stopAllActions();
            this.ct_success.setVisible(false);
            this.ct_vin.setString("");
            this.ct_xu.setString("");
            this.ct_other.setString("");
        },


        text_field_event_gc: function (sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    sender.setColor(GuiUtil.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                }
                    break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    if (sender.getString().length != 0)
                        sender.setColor(GuiUtil.color("#3E3E3E"));
                    else
                        sender.setColor(GuiUtil.color("#FFFFFF"));
                    sender.setPlaceHolder("Nhập mã giftcode:");
                    var str = sender.getString();
                    if (str.length == 0) {
                        this.btn_clear_gift.setVisible(false);
                    }
                }
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    this.btn_clear_gift.setVisible(true);
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    if (str.length == 0) {
                        this.btn_clear_gift.setVisible(false);
                    }
                }
                    break;
            }
        },

        funGetListMission: function () {
            if (gI.mainSocket.listener.isLogged) {
                var giftcode = new CmdSendGetListMission();
                giftcode.putdata();
                gI.mainSocket.send(giftcode);
                giftcode.clean();
            } else {
                gI.mainSocket.connectSocket();
            }
        },

        sendGiftcode: function () {
            var str = this.tf_giftcode.getString();
            if (str.length > 0) {
                if (gI.mainSocket.listener.isLogged) {
                    var giftcode = new CmdSendGiftCode();
                    giftcode.putGiftCode(str);
                    gI.mainSocket.send(giftcode);
                    giftcode.clean();
                    this.btn_nhanGift.setEnabled(false);
                } else {
                    gI.mainSocket.connectSocket();
                }
            } else {
                this.showThongBao("Xin mời bạn nhập mã Giftcode!", 0);
            }
        },

        responseGiftCode: function (error, currentMoneyVin, currentMoneyXu, moneyGiftCodeVin, moneyGiftCodeXu) {
            //cc.log("error: " + error + " currentMoneyVin: "+ currentMoneyVin + " currentMoneyXu: " + currentMoneyXu + " moneyGiftCodeVin: " + moneyGiftCodeVin + " moneyGiftCodeXu : " + moneyGiftCodeXu);
            if (error == 0) {
                this.showThongBao("Mã Giftcode không chính xác. Vui lòng kiểm tra lại!", 0);
            } else if (error == 1) {
                this.showThongBao("Mã Giftcode đã được sử dụng!", 0);
            } else if (error == 3) {
               gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Để nhận giftcode vui lòng đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", this.gotoSercurity, null);
            } else if (error == 4) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!", 0);
            } else if (error == 5) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!", 0);
            } else if (error == 6) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!", 0);
            } else if (error == 2) {
                this.vin_receive = moneyGiftCodeVin;
                this.xu_receive = moneyGiftCodeXu;
                this.showThongBao("Nhận thưởng Giftcode thành công!", 1);
                if (userInfo == null) {
                } else {
                    userInfo.userData.vinTotal = currentMoneyVin;
                    userInfo.userData.xuTotal = currentMoneyXu;
                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                    menutab.userManager.lb_blance_xu.setString(formatMoney(0, 3, parseInt(userInfo.userData.xuTotal)));
                    menutab.changeFontMoney();
                }
                this.tf_giftcode.setString("");
                this.tf_giftcode.setFontColor(cc.color("#ffffff"));
                this.btn_clear_gift.setVisible(false);
            }
            this.btn_nhanGift.setEnabled(true);
        },

        gotoSercurity: function () {
            menutab.giftcodeLayer.closeGiftcodeLayer();
            menutab.openSercurityLayer();

        },
        closeGiftcodeLayer:function(){
            if(menutab.giftcodeLayer != null){
                menutab.giftcodeLayer .removeFromParent(true);
                menutab.giftcodeLayer  = null;
            }
        },


        responseGetListMission: function (pk) {
            if(pk.str == "")
                return;
            var jsonData = JSON.parse(pk.str);
            var nickname = jsonData["nN"];
            var error = jsonData["error"];
            cc.log("error get list mission: " + error);
            if (error != 0) {
                this.showThongBao("Kết nối mạng không tốt. Vui lòng đăng nhập lại để nhận thưởng!", 0);
                return;
            }
            if (nickname == userInfo.userData.nickname) {
                this.listMissionVin = jsonData["lMisVin"];
                this.listMissionXu = jsonData["lMisXu"];
                this.openPanelMission(this.typeMission);
            }
            //cc.log("nickname: " +  jsonData["nickName"]);
        },
        responseEarnVinMission: function (pk) {
            cc.log("pk" + pk);
            var error = pk.error;
            var prize = pk.prize;
            var currentmoney = pk.currentmoney;
            if (error == 1) {
                var posY = this.getItemPositionYInView(this.lv_mision.getItems()[this.btn_earnVin.name]) + 620;
                this.effectEarnVin(980, posY, this.pn_effect_earnVin);
                this.showThongBao("Bạn đã nhận được phần thưởng là " + prize + " "+GameManager.config.moneyName+"!", 0);
                lobby.updateMoney(currentmoney, MONEY_VIN);
            } else if (error == -1) {
                this.showThongBao("Số trận thắng chưa đủ nhận thưởng!", 0);
            } else if (error == -2) {
                this.showThongBao("Nhiệm vụ này đã nhận thưởng!", 0);
            } else if (error == -3) {
                this.showThongBao("Nhiệm vụ không tồn tại!", 0);
            } else if (error == -100) {
                this.showThongBao("Kết nối mạng không tốt. Vui lòng đăng nhập lại để nhận thưởng!", 0);
                this.btn_earnVin.setEnabled(true);
                this.btn_earnVin.setOpacity(255);
            }
        },

        effectEarnVin: function (posX, posY, parent) {
            parent.removeAllChildren();
            for (var i = 0; i < 7; i++) {
                var aSprite1 = GuiUtil.createSprite("res/ResourceMenuTab/Profile/sp_vin.png");
                aSprite1.setPosition(cc.p(posX, posY));

                var x = getRandomFloat((posX - 50), (posX + 50), 2);
                var y = getRandomFloat((posY - 35), (posY + 35), 2);

                var move = cc.MoveTo.create(0.2, cc.p(parseFloat(x), parseFloat(y)));
                var move2 = cc.MoveTo.create(0.3, cc.p(413.66, 678.84));
                var seq = cc.sequence(move, cc.delayTime(0.1), move2, cc.hide());
                aSprite1.runAction(seq);
                parent.addChild(aSprite1);
            }
            //cc.log("child + " + parent.childrenCount);
        },

        getLinkImage: function (name) {
            var src = "res/Lobby/IconGame/";
            if (name == "Sam") {
                src = src + "samloc.png";
                this.nameGame = "Sâm";
            } else if (name == "BaCay") {
                src = src + "3cay.png";
                this.nameGame = "Ba Cây";
            } else if (name == "Binh") {
                src = src + "maubinh.png";
                this.nameGame = "Mậu Binh";
            } else if (name == "Tlmn") {
                src = src + "tlmn.png";
                this.nameGame = "TLMN";
            } else if (name == "Lieng") {
                src = src + "lieng.png";
                this.nameGame = "Liêng";
            } else if (name == "BaiCao") {
                src = src + "baicao.png";
                this.nameGame = "Bài Cào";
            } else if (name == "Poker") {
                src = src + "poker.png";
                this.nameGame = "Poker";
            } else if (name == "XocDia") {
                src = src + "xocdia.png";
                this.nameGame = "Xóc Xóc";
            } else if (name == "XiDzach") {
                src = src + "xizach.png";
                this.nameGame = "Xì Dzách";
            } else if (name == "Caro") {
                src = src + "cocaro.png";
                this.nameGame = "Cờ Caro";
            } else if (name == "CoTuong") {
                src = src + "cotuong.png";
                this.nameGame = "Cờ Tướng";
            } else if (name == "CoUp") {
                src = src + "coup.png";
                this.nameGame = "Cờ Úp";
            } else if (name == "TaiXiu") {
                src = src + "taixiu.png";
                this.nameGame = "Tài Xỉu";
            } else if (name == "KhoBau") {
                src = src + "khobau.png";
                this.nameGame = "Kho Báu";
            } else if (name == "NuDiepVien") {
                src = src + "nudiepvien.png";
                this.nameGame = "Nữ Điệp Viên";
            } else if (name == "SieuAnhHung") {
                src = src + "avenger.png";
                this.nameGame = "Siêu Anh Hùng";
            } else if (name == "VuongQuocVin") {
                src = src + "vuongquocvin.png";
                this.nameGame = "Vương Quốc "+GameManager.config.moneyName+"";
            }
            return src;
        },

        getItemPositionYInView: function (item) {
            var worldPos = item.getParent().convertToWorldSpaceAR(item.getPosition());
            var viewPos = this.lv_mision.convertToNodeSpaceAR(worldPos);
            var viewPosYYY = this.lv_mision.getParent().convertToNodeSpaceAR(viewPos);
            return viewPos.y;
        },


    }
);
GiftcodeLayer.BTN_CLOSE_GIFTCODE = 1;
GiftcodeLayer.BTN_CLEAR_GIFTCODE = 2;
GiftcodeLayer.BTN_SEND_GIFTCODE = 3;
GiftcodeLayer.BTN_CLOSE_THONGBAO = 4;
GiftcodeLayer.BTN_MA_GIOI_THIEU = 5;

GiftcodeLayer.BTN_QUA_TANG = 6;
GiftcodeLayer.BTN_MISSION_VIN = 7;
GiftcodeLayer.BTN_MISSION_XU = 8;


