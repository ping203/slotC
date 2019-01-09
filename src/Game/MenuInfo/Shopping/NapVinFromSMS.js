/**
 * Created by B150M on 3/23/2018.
 */

var NapVinFromSMS = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.is_first_nap_sms = false;
        this.is_Vina = false;
        this.is_Mobile = false;
        this.is_Viettel = false;
        this.is_VietnamMobile = false;
        this.is_beeline = false;
        this.txt_dau_so_sms = null;
        this.savecuphap = "";
    },

    customizeGUI: function () {
        this.createPnVinFromSms();
        this.CheckConFig();
    },

    CheckConFig: function () {
        if (ConfigShopping.is_recharge == 0) {
            if (this.is_first_nap_sms == false) {
                this.configRechargeVin_SMS();
                this.is_first_nap_sms = true;
            } else
                this.AutoOpenHomeNet();
        }
        this.shopping.hideLoadingNapVin();
    },

    createPnVinFromSms: function () {
        this.addLayout(this, "pn_vin_from_sms", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.pn_vin_from_sms.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_vin_from_sms.setBackGroundColor(GuiUtil.color("#1E2D64"));
        this.pn_vin_from_sms.setBackGroundColorOpacity(0);
        this.addText(this.pn_vin_from_sms, "title1", cc.p(514, 437.5), "MUA "+GameManager.config.moneyNameUpper+" TỪ SMS", RobotoRegular.fontName, 30);
        this.title1.setColor(GuiUtil.color("#FFDF58"));
        this.addText(this.pn_vin_from_sms, "txtsms1", cc.p(154, 345.5), "Lựa chọn nhà mạng:", RobotoRegular.fontName, 20);
        this.addImage(this.pn_vin_from_sms, "nen1", cc.p(388, 345.5), res_ResourceMenuTab_Shopping + '/bg_2.png', cc.size(250, 45));
        this.addText(this.pn_vin_from_sms, "txt_nha_mang_sms", cc.p(387.5, 345.5), "Viettel", RobotoRegular.fontName, 24);
        this.txt_nha_mang_sms.setColor(GuiUtil.color("#000000"));
        this.txt_nha_mang_sms.ignoreContentAdaptWithSize(false);
        this.txt_nha_mang_sms.setContentSize(cc.size(249, 26));
        this.txt_nha_mang_sms.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addImage(this.pn_vin_from_sms, "nen_11", cc.p(495, 345.5), res_ResourceMenuTab_Shopping + "/muiten_xuong.png", cc.size(37, 47));
        this.addButton(this.pn_vin_from_sms, "btn_nha_mang_sms", NapVinFromSMS.BTN_CHOSE_HOMENETWORK_SMS, cc.p(388, 345.5), false, res_ResourceMenuTab_Shopping + "/btn_shop.png", res_ResourceMenuTab_Shopping + "/btn_shop.png");
        this.btn_nha_mang_sms.ignoreContentAdaptWithSize(false);
        this.btn_nha_mang_sms.setContentSize(cc.size(250, 45));
        this.addLayout(this.pn_vin_from_sms, "pn_chose_menh_gia", cc.p(507, 320), null, cc.size(0, 0), true);
        this.pn_chose_menh_gia.setAnchorPoint(0, 0);
        this.addText(this.pn_chose_menh_gia, "txt6", cc.p(-355, -63), "Lựa chọn mệnh giá:", RobotoRegular.fontName, 20);
        this.addImage(this.pn_chose_menh_gia, "sp_nen", cc.p(-119.5, -63), res_ResourceMenuTab_Shopping + '/bg_2.png', cc.size(250, 45));
        this.addText(this.pn_chose_menh_gia, "txt_menhgia_sms", cc.p(-119.5, -63), "1.000", RobotoRegular.fontName, 20);
        this.txt_menhgia_sms.setColor(GuiUtil.color("#000000"));
        this.txt_menhgia_sms.ignoreContentAdaptWithSize(false);
        this.txt_menhgia_sms.setContentSize(cc.size(249, 23));
        this.txt_menhgia_sms.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addImage(this.pn_chose_menh_gia, "nen_12", cc.p(-13.5, -63), res_ResourceMenuTab_Shopping + "/muiten_xuong.png", cc.size(37, 47));
        this.addButton(this.pn_chose_menh_gia, "btn_chose_menhgia_sms", NapVinFromSMS.BTN_CHOSE_MENHGIA_SMS, cc.p(-119.5,-63), false, res_ResourceMenuTab_Shopping + "/btn_shop.png", res_ResourceMenuTab_Shopping + "/btn_shop.png");
        this.btn_chose_menhgia_sms.ignoreContentAdaptWithSize(false);
        this.btn_chose_menhgia_sms.setContentSize(cc.size(250, 45));
        this.addText(this.pn_chose_menh_gia, "txt6_0", cc.p(-355, -148), "Số "+GameManager.config.moneyName+" nhận:", RobotoRegular.fontName, 20);
        this.txt6_0.ignoreContentAdaptWithSize(false);
        this.txt6_0.setContentSize(cc.size(175, 23));
        this.addImage(this.pn_chose_menh_gia, "sp_nen_1", cc.p(-119.5, -148), res_ResourceMenuTab_Shopping + '/bg_2.png', cc.size(250, 45));
        this.addText(this.pn_chose_menh_gia, "txt_vin_sms_plus", cc.p(-120.5, -148), "", RobotoRegular.fontName, 22);
        this.txt_vin_sms_plus.setColor(GuiUtil.color("#FFFF00"));
        this.txt_vin_sms_plus.ignoreContentAdaptWithSize(false);
        this.txt_vin_sms_plus.setContentSize(cc.size(202, 30));
        this.txt_vin_sms_plus.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.txt_vin_sms_plus.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addButtonStructure(this.pn_chose_menh_gia, "btn_send_sms_plus", NapVinFromSMS.BTN_SOANTIN_SMS, cc.p(-220.5, -257), true,
            [res_ResourceMenuTab_Mail+ "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_chose_menh_gia, "lb_smsm", cc.p(-220.5, -257), "SOẠN TIN", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_smsm.setColor(GuiUtil.color(162,105,64));
        if (!cc.sys.isNative) {
            this.btn_send_sms_plus.setVisible(false);
            this.lb_smsm.setVisible(false);
        }
        this.addLayout(this.pn_chose_menh_gia, "pn_9029", cc.p(-231.5, -86), null, cc.size(0, 0), false);
        this.pn_9029.setVisible(false);
        //    this.addButton(this.pn_9029, "btn_close_pn_9029", code_shopping_info_test.BTN_CLOSE_PN_9029, cc.p(246, -69), true, res_ResourceMenuTab_Shopping + "/btn_shop.png", res_ResourceMenuTab_Shopping + "/btn_shop.png");
        this.addLayout(this.pn_9029, "btn_close_pn_9029",cc.p(246, -69),null,cc.size(1700, 1200),true);
        this.btn_close_pn_9029.ignoreContentAdaptWithSize(false);
        this.btn_close_pn_9029.setContentSize(cc.size(1700, 1200));
        this.btn_close_pn_9029.addTouchEventListener(this.onTouchEventHandler, this);
        this.btn_close_pn_9029.setTag(NapVinFromSMS.BTN_CLOSE_PN_9029);

        this.addLayout(this.pn_9029, "bg_pn_9029", cc.p(-18, -1.5), null, cc.size(260, 0), false);
        this.bg_pn_9029.setAnchorPoint(0,1);
        this.bg_pn_9029.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_pn_9029.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.bg_pn_9029.setBackGroundColorOpacity(255);
        this.addListView(this.pn_9029, "lv_9029", cc.p(114, -114), cc.size(260, 220));
        this.lv_9029.setTouchEnabled(false);
        this.addLayout(this.pn_chose_menh_gia, "pn_8x98", cc.p(-231.5, -86), null, cc.size(0, 0), false);
        this.pn_8x98.setVisible(false);
        this.addLayout(this.pn_8x98, "btn_close_pn_8x98",cc.p(246, -69),null,cc.size(1700, 1200),true);
        this.btn_close_pn_8x98.ignoreContentAdaptWithSize(false);
        this.btn_close_pn_8x98.setContentSize(cc.size(1700, 1200));
        this.btn_close_pn_8x98.addTouchEventListener(this.onTouchEventHandler, this);
        this.btn_close_pn_8x98.setTag(NapVinFromSMS.BTN_CLOSE_PN_8X98);
        this.addLayout(this.pn_8x98, "bg_pn_8x98", cc.p(-18, -1.5), null, cc.size(262, 0), false);
        this.bg_pn_8x98.setAnchorPoint(0,1);
        this.bg_pn_8x98.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_pn_8x98.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.bg_pn_8x98.setBackGroundColorOpacity(255);
        this.addListView(this.pn_8x98, "lv_8x98", cc.p(114, -114), cc.size(260, 220));
        this.lv_8x98.setTouchEnabled(false);
        this.addText(this.pn_chose_menh_gia, "txt_dieukien_sms", cc.p(268, 68.5), "ĐIỀU KIỆN ÁP DỤNG", RobotoRegular.fontName, 24);
        this.addText(this.pn_chose_menh_gia, "txt_notice_sms", cc.p(268, -106.5), "", RobotoRegular.fontName, 18);
        this.txt_notice_sms.ignoreContentAdaptWithSize(false);
        this.txt_notice_sms.setContentSize(cc.size(457, 311));
        this.addLayout(this.pn_vin_from_sms, "pn_cu_phap_sms", cc.p(521.5, 268.5), null, cc.size(0, 0), true);
        this.addText(this.pn_cu_phap_sms, "txt_9", cc.p(250.5, -119.5), "Soạn tin theo cú pháp", RobotoRegular.fontName, 24);
        this.txt_9.setColor(GuiUtil.color("#FFDF58"));
        this.addText(this.pn_cu_phap_sms, "txt_cu_phap", cc.p(250.5, -153.5), "", RobotoRegular.fontName, 24);
        this.txt_cu_phap.ignoreContentAdaptWithSize(false);
        this.txt_cu_phap.setContentSize(cc.size(516, 28));
        this.txt_cu_phap.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.pn_cu_phap_sms, "txt_9_1", cc.p(214.5, -188.5), "Gửi:", RobotoRegular.fontName, 24);
        this.txt_9_1.setColor(GuiUtil.color("#FFDF58"));
        this.addText(this.pn_cu_phap_sms, "txt_dau_so_sms", cc.p(323.5, -188.5), "", RobotoRegular.fontName, 24);
        this.txt_dau_so_sms.ignoreContentAdaptWithSize(false);
        this.txt_dau_so_sms.setContentSize(cc.size(149, 28));

        this.addLayout(this.pn_vin_from_sms, "pn_nha_mang_sms", cc.p(507, 328), null, cc.size(0, 0), true);
        this.pn_nha_mang_sms.setVisible(false);
        // this.addButton(this.pn_nha_mang_sms, "btn_close_pn_nha_mang", code_shopping_info_test.BTN_CLOSE_HOMENETWORK_SMS, cc.p(20, -153.5), true, res_ResourceMenuTab_Shopping + "/btn_shop.png", res_ResourceMenuTab_Shopping + "/btn_shop.png");
        this.addLayout(this.pn_nha_mang_sms, "btn_close_pn_nha_mang",cc.p(20, -153.5),null,cc.size(1700, 1200),true);
        this.btn_close_pn_nha_mang.ignoreContentAdaptWithSize(false);
        this.btn_close_pn_nha_mang.setContentSize(cc.size(1700, 1200));
        this.btn_close_pn_nha_mang.addTouchEventListener(this.onTouchEventHandler, this);
        this.btn_close_pn_nha_mang.setTag(NapVinFromSMS.BTN_CLOSE_HOMENETWORK_SMS);
        this.addListView(this.pn_nha_mang_sms, "bg_chose_homenet_sms", cc.p(-119, -115), cc.size(255, 215));
        this.bg_chose_homenet_sms.setScrollBarEnabled(false);
        this.bg_chose_homenet_sms.setTouchEnabled(true);

    },

    configRechargeVin_SMS: function () {
        var posy = -30.46;
        var array_homenetwork = [];
        if (ConfigShopping.is_sms_plus == 0) {
            for (var i = 0; i < ConfigShopping.sms_plus_telco.length; i++) {
                if (ConfigShopping.sms_plus_telco[i] == 0) {
                    this.is_vietel = true;
                    this.dauso_sms_viettel = "9029";
                    var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                    array_homenetwork.push(itemNhaMang);
                }
                if (ConfigShopping.sms_plus_telco[i] == 1) {
                    this.is_vina = true;
                    this.dauso_sms_vina = "9029";
                    var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                    array_homenetwork.push(itemNhaMang);
                }
                if (ConfigShopping.sms_plus_telco[i] == 2) {
                    this.is_mobi = true;
                    this.dauso_sms_mobi = "9029";
                    var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                    array_homenetwork.push(itemNhaMang);
                }

            }

        }
        if (ConfigShopping.is_sms == 0) {
            for (var i = 0; i < ConfigShopping.sms_telco.length; i++) {
                if (this.is_vietel == false) {
                    if (ConfigShopping.sms_telco[i] == 0) {
                        this.is_vietel = true;
                        this.dauso_sms_viettel = "8x98";
                        var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                        array_homenetwork.push(itemNhaMang);
                    }
                }
                if (this.is_vina == false) {
                    if (ConfigShopping.sms_telco[i] == 1) {

                        this.is_vina = true;
                        this.dauso_sms_vina = "8x98";
                        var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                        array_homenetwork.push(itemNhaMang);
                    }
                }
                if (this.is_mobi == false) {
                    if (ConfigShopping.sms_telco[i] == 2) {
                        this.is_mobi = true;
                        this.dauso_sms_mobi = "8x98";
                        var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                        array_homenetwork.push(itemNhaMang);
                    }
                }
                if (ConfigShopping.sms_telco[i] == 3) {
                    this.is_vnmobile = true;
                    var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                    array_homenetwork.push(itemNhaMang);
                }
                if (ConfigShopping.sms_telco[i] == 4) {
                    var itemNhaMang = NapVinFromSMS.arrInfoButtonSelectNhaMangSMS[i];
                    array_homenetwork.push(itemNhaMang);
                    this.is_beeline = true;
                }

            }

        }
        this.createNhaMangSMS(array_homenetwork);

        if (ConfigShopping.is_sms_plus == 0) {
            for (var i = (ConfigShopping.sms_plus_amount.length - 1); i >= 0; i--) {
                var cl1 = new ccui.Layout();
                cl1.height = 45;
                cl1.width = this.lv_9029.width;

                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/bg_2.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/bg_2.png");
                button.setPosition(cc.p(128, 22.5));
                button.setScaleX(0.7);
                button.setScaleY(0.85);
                var str = ConfigShopping.sms_plus_amount[i] * 1000;
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(24);
                button.setName(ConfigShopping.sms_plus_amount[i]);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonSelectMenhGia9029(sender.getName());
                            break;
                    }

                }, this);
                cl1.addChild(button);
                this.lv_9029.pushBackCustomItem(cl1);
            }
            if (ConfigShopping.sms_plus_amount.length > 4)
                this.bg_pn_9029.height = 228;
            else
                this.bg_pn_9029.height = 3 + ConfigShopping.sms_plus_amount.length * 45;
        }
        if (ConfigShopping.is_sms == 0) {
            for (var i = (ConfigShopping.sms_amount.length - 1); i >= 0; i--) {
                var cl1 = new ccui.Layout();
                cl1.height = 45;
                cl1.width = this.lv_8x98.width;

                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/bg_2.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/bg_2.png");
                button.setPosition(cc.p(128, 22.5));
                button.setScaleX(0.7);
                button.setScaleY(0.85);
                var str = ConfigShopping.sms_amount[i] * 1000;
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(24);
                button.setName(ConfigShopping.sms_amount[i]);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonSelectMenhGia8x98(sender.getName());
                            break;
                    }

                }, this);
                cl1.addChild(button);
                this.lv_8x98.pushBackCustomItem(cl1);
            }
            if (ConfigShopping.sms_amount.length > 4)
                this.bg_pn_8x98.height = 228;
            else
                this.bg_pn_8x98.height = 3 + ConfigShopping.sms_amount.length * 45;
        }
        this.AutoOpenHomeNet();
    },

    createNhaMangSMS: function (arr) {
        for (var k = 0; k < arr.length; k++) {
            this.addLayout(this.bg_chose_homenet_sms, "lv_nha_mang_sms" + k, cc.p(0, 0), null, cc.size(254, 42), true);
            this["lv_nha_mang_sms" + k].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this["lv_nha_mang_sms" + k].setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this["lv_nha_mang_sms" + k].setBackGroundColorOpacity(255);
            this.addButton(this["lv_nha_mang_sms" + k], arr[k].nameButton, arr[k].tagButton, cc.p(128, 21), true, res_ResourceMenuTab_Shopping + "/bg_2.png", res_ResourceMenuTab_Shopping + "/bg_2.png");
            this[arr[k].nameButton].ignoreContentAdaptWithSize(false);
            this[arr[k].nameButton].setContentSize(cc.size(240, 38));
            this[arr[k].nameButton].setTitleColor(GuiUtil.color("#000000"));
            this[arr[k].nameButton].setTitleFontSize(24);
            this[arr[k].nameButton].setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this[arr[k].nameButton].setTitleText(arr[k].txtBt);
        }
    },

    AutoOpenHomeNet: function () {
        if (lobby.networkCode == 1) {
            if (this.is_mobi == true)
                this.choseHomeNetWork_SMS(2);
        } else if (lobby.networkCode == 2) {
            if (this.is_vina == true)
                this.choseHomeNetWork_SMS(1);
        } else if (lobby.networkCode == 4) {
            if (this.is_vietel == true)
                this.choseHomeNetWork_SMS(0);
        } else if (lobby.networkCode == 5) {
            if (this.is_vnmobile == true)
                this.choseHomeNetWork_SMS(3);
        } else if (lobby.networkCode == 7) {
            if (this.is_beeline == true)
                this.choseHomeNetWork_SMS(4);
        } else {
            if (this.is_vietel == true)
                this.choseHomeNetWork_SMS(0);
            else if (this.is_mobi == true)
                this.choseHomeNetWork_SMS(2);
            else if (this.is_vina == true)
                this.choseHomeNetWork_SMS(1);
            else if (this.is_vnmobile == true)
                this.choseHomeNetWork_SMS(3);
            else if (this.is_beeline == true)
                this.choseHomeNetWork_SMS(4);
        }
    },

    choseHomeNetWork_SMS: function (value) {
        if (value == 0) {
            this.homenetwork_sms = 0;
            this.txt_nha_mang_sms.setString("Viettel");
            if (this.dauso_sms_viettel == "9029") {
                this.txt_notice_sms.setString("Điều kiện: hoạt động >= 180 ngày\nHạn mức: 500k/ngày");
                this.menhgia_sms = ConfigShopping.sms_plus_amount[ConfigShopping.sms_plus_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            } else {
                this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                this.menhgia_sms = ConfigShopping.sms_amount[ConfigShopping.sms_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            }
        } else if (value == 1) {
            this.homenetwork_sms = 1;
            this.txt_nha_mang_sms.setString("Vinaphone");
            if (this.dauso_sms_vina == "9029") {
                this.txt_notice_sms.setString("Trả trước:\n- Điều kiện: hoạt động >= 180 ngày\n- Hạn mức: 200k/ngày\nTrả sau:\n- Với thuê bao thường và hạn mức < 1 Triệu / tháng hạn mức 100k/tháng" +
                    "\n- Với thuê bao có mức cam kết cước / tháng > 1 Triệu \nđồng hạn mức tối đa 10% giá trị cước cam kết / tháng");
                this.menhgia_sms = ConfigShopping.sms_plus_amount[ConfigShopping.sms_plus_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            } else {
                this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                this.menhgia_sms = ConfigShopping.sms_amount[ConfigShopping.sms_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            }
        } else if (value == 2) {
            this.homenetwork_sms = 2;
            this.txt_nha_mang_sms.setString("Mobifone");
            if (this.dauso_sms_mobi == "9029") {
                this.txt_notice_sms.setString("Điều kiện: hoạt động >= 90 ngày, phát sinh cước gọi, tin nhắn\nHạn mức: 500k/ngày");
                this.menhgia_sms = ConfigShopping.sms_plus_amount[ConfigShopping.sms_plus_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            } else {
                this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                this.menhgia_sms = ConfigShopping.sms_amount[ConfigShopping.sms_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
            }
        } else if (value == 3) {
            this.homenetwork_sms = 3;
            this.txt_nha_mang_sms.setString("VietNamMobile");
            this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
            this.menhgia_sms = ConfigShopping.sms_amount[ConfigShopping.sms_amount.length - 1] * 1000;
            this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
            this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
        } else if (value == 4) {
            this.homenetwork_sms = 4;
            this.txt_nha_mang_sms.setString("Beeline");
            this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
            this.menhgia_sms = ConfigShopping.sms_amount[ConfigShopping.sms_amount.length - 1] * 1000;
            this.txt_menhgia_sms.setString(formatMoney(0, 3, this.menhgia_sms));
            this.txt_vin_sms_plus.setString(formatMoney(0, 3, this.menhgia_sms * ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
        }
        this.showCuPhapSMS();
        this.pn_nha_mang_sms.setScaleY(0);
        this.pn_nha_mang_sms.setVisible(false);
        this.pn_chose_menh_gia.setVisible(true);
        this.txt_dieukien_sms.setVisible(true);
    },

    showCuPhapSMS: function () {
        if (this.menhgia_sms != 0) {
            if (this.homenetwork_sms == 0) {
                if (this.dauso_sms_viettel == "9029") {
                    this.savecuphap = "MW " + this.menhgia_sms + " VPL NAP " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("MW  " + this.menhgia_sms + "  VPL  NAP  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString("9029");
                } else {
                    this.savecuphap = "VPL " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("VPL  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString(getDauSo8x98(this.menhgia_sms));
                }
            } else if (this.homenetwork_sms == 1) {
                if (this.dauso_sms_vina == "9029") {
                    this.savecuphap = "MW VPL " + getGoiNap9029(this.menhgia_sms) + " " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("MW  VPL  " + getGoiNap9029(this.menhgia_sms) + "  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString("9029");
                } else {
                    this.savecuphap = "VPL " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("VPL  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString(getDauSo8x98(this.menhgia_sms));
                }
            } else if (this.homenetwork_sms == 2) {
                if (this.dauso_sms_mobi == "9029") {
                    this.savecuphap = "MW VPL " + getGoiNap9029(this.menhgia_sms) + " " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("MW  VPL  " + getGoiNap9029(this.menhgia_sms) + "  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString("9029");
                } else {
                    this.savecuphap = "VPL " + userInfo.userData.nickname;
                    this.txt_cu_phap.setString("VPL  " + userInfo.userData.nickname);
                    this.txt_dau_so_sms.setString(getDauSo8x98(this.menhgia_sms));
                }
            } else if (this.homenetwork_sms == 3 || this.homenetwork_sms == 4) {
                this.savecuphap = "VPL " + userInfo.userData.nickname;
                this.txt_cu_phap.setString("VPL  " + userInfo.userData.nickname);
                this.txt_dau_so_sms.setString(getDauSo8x98(this.menhgia_sms));
            }
            this.pn_cu_phap_sms.setVisible(true);
        } else {
             gI.popUp.openPanel_Alert_Lobby("Vui lòng chọn đầy đủ thông tin!");
        }
    },

    openMenhGia_SMS : function(){
        if(this.homenetwork_sms == 0){
            if(this.dauso_sms_viettel == "9029"){
                this.pn_9029.setVisible(true);
                // this.pn_9029.runAction(cc.scaleTo(0.2,1,1));
            }else{
                this.pn_8x98.setVisible(true);
                // this.pn_8x98.runAction(cc.scaleTo(0.2,1,1));
            }
        }else if(this.homenetwork_sms == 1){
            if(this.dauso_sms_vina == "9029"){
                this.pn_9029.setVisible(true);
                // this.pn_9029.runAction(cc.scaleTo(0.2,1,1));
            }else{
                this.pn_8x98.setVisible(true);
                // this.pn_8x98.runAction(cc.scaleTo(0.2,1,1));
            }
        }else if(this.homenetwork_sms == 2){
            if(this.dauso_sms_mobi == "9029"){
                this.pn_9029.setVisible(true);
                // this.pn_9029.runAction(cc.scaleTo(0.2,1,1));
            }else{
                this.pn_8x98.setVisible(true);
                // this.pn_8x98.runAction(cc.scaleTo(0.2,1,1));
            }
        }else if(this.homenetwork_sms == 3 || this.homenetwork_sms == 4){
            this.pn_8x98.setVisible(true);
            // this.pn_8x98.runAction(cc.scaleTo(0.2,1,1));
        }
    },

    buttonSelectMenhGia9029 : function(str){
        this.menhgia_sms = str*1000;
        this.txt_menhgia_sms.setString(formatMoney(0,3,this.menhgia_sms));
        this.pn_9029.setVisible(false);
        this.txt_vin_sms_plus.setString(formatMoney(0,3,this.menhgia_sms*ConfigShopping.ratio_nap_sms) + " "+GameManager.config.moneyNameUpper+"");
        this.showCuPhapSMS();
    },
    buttonSelectMenhGia8x98 : function(str){
        //cc.log("vao: " + str);
        this.menhgia_sms = str*1000;
        this.txt_menhgia_sms.setString(formatMoney(0,3,this.menhgia_sms));
        this.pn_8x98.setVisible(false);
        this.txt_vin_sms_plus.setString(formatMoney(0,3,this.menhgia_sms*ConfigShopping.ratio_nap_sms) + " "+ GameManager.config.moneyNameUpper);
        this.showCuPhapSMS();
    },
    onButtonRelease: function (button, id) {
        switch (id) {
            case NapVinFromSMS.BTN_CLOSE_PN_9029:
                this.pn_9029.setVisible(false);
                break;
            case NapVinFromSMS.BTN_CLOSE_PN_8X98:
                this.pn_8x98.setVisible(false);
                // this.pn_8x98.setScaleY(0);
                break;
            case NapVinFromSMS.BTN_SOANTIN_SMS:
                if (cc.sys.isNative)
                    ConnectNative.sendSMS(this.txt_dau_so_sms.getString(), this.savecuphap);
                break;
            case NapVinFromSMS.BTN_CHOSE_MENHGIA_SMS:
                this.openMenhGia_SMS();
                break;
            case NapVinFromSMS.BTN_HOMENETWORK_VIETTEL_SMS:
                this.choseHomeNetWork_SMS(0);
                break;
            case NapVinFromSMS.BTN_HOMENETWORK_VINA_SMS:
                this.choseHomeNetWork_SMS(1);
                break;
            case NapVinFromSMS.BTN_HOMENETWORK_MOBI_SMS:
                this.choseHomeNetWork_SMS(2);
                break;
            case NapVinFromSMS.BTN_HOMENETWORK_VNM_SMS:
                this.choseHomeNetWork_SMS(3);
                break;
            case NapVinFromSMS.BTN_HOMENETWORK_BEE_SMS:
                this.choseHomeNetWork_SMS(4);
                break;
            case NapVinFromSMS.BTN_CLOSE_HOMENETWORK_SMS:
                this.pn_nha_mang_sms.setScaleY(0);
                this.pn_nha_mang_sms.setVisible(false);
                break;
            case NapVinFromSMS.BTN_CHOSE_HOMENETWORK_SMS:
                this.pn_nha_mang_sms.setVisible(true);
                this.pn_nha_mang_sms.setScale(1);
                // this.pn_nha_mang_sms.runAction(cc.scaleTo(0.2, 1, 1));
                break;
        }
    },
});
NapVinFromSMS.BTN_CLOSE_PN_9029 = 1;
NapVinFromSMS.BTN_CLOSE_PN_8X98 = 2;
NapVinFromSMS.BTN_SOANTIN_SMS = 3;
NapVinFromSMS.BTN_CHOSE_MENHGIA_SMS = 4;
NapVinFromSMS.BTN_HOMENETWORK_VIETTEL_SMS = 5;
NapVinFromSMS.BTN_HOMENETWORK_VINA_SMS = 6;
NapVinFromSMS.BTN_HOMENETWORK_MOBI_SMS = 7;
NapVinFromSMS.BTN_HOMENETWORK_VNM_SMS = 8;
NapVinFromSMS.BTN_HOMENETWORK_BEE_SMS = 9;
NapVinFromSMS.BTN_CLOSE_HOMENETWORK_SMS = 10;
NapVinFromSMS.BTN_CHOSE_HOMENETWORK_SMS = 11;








NapVinFromSMS.arrInfoButtonSelectNhaMangSMS = [
    {
        tagButton: NapVinFromSMS.BTN_HOMENETWORK_VIETTEL_SMS,
        nameButton: "btn_nha_mang_vietel",
        txtBt: "Viettel"


    },
    {
        tagButton: NapVinFromSMS.BTN_HOMENETWORK_VINA_SMS,
        nameButton: "btn_nha_mang_vina",
        txtBt: "Vinaphone"


    },
    {
        tagButton: NapVinFromSMS.BTN_HOMENETWORK_MOBI_SMS,
        nameButton: "btn_nha_mang_mobi",
        txtBt: "Mobifone"


    },
    {
        tagButton: NapVinFromSMS.BTN_HOMENETWORK_VNM_SMS,
        nameButton: "btn_nha_mang_vnmobile",
        txtBt: "VietNamMobile"


    },
    {
        tagButton: NapVinFromSMS.BTN_HOMENETWORK_BEE_SMS,
        nameButton: "btn_nha_mang_beeline",
        txtBt: "G Mobile"
    },

];





