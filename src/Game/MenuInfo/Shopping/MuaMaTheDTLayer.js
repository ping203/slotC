/**
 * Created by B150M on 3/23/2018.
 */

var MuaMaTheDTLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.kind_mua_the_dt = "vina";
        this.is_Buy_Vina = false;
        this.is_Buy_Mobile = false;
        this.is_Buy_Viettel = false;
        this.is_Buy_VietnamMobile = false;
        this.is_Buy_Bee = false;
        this.is_Buy_Zing = false;
        this.is_Buy_Gate = false;
        this.is_Buy_Vcoin = false;
        this.saveArray_mua_the_dt = [];
        this.menhgia_mua_the_dt = 0;
        this.positionY_muathedt = 186.97;
        this.iskindDoiThe = "";
        this.provider = null;
        this.NameCard = null;
        this.soluong_muathe = null;
    },

    customizeGUI: function () {
        this.createPnMuaTheDT();
        this.CheckConFig();
        this.createNoticeMuaThe();
    },

    CheckConFig: function () {
        this.lb_mua_the_selected.setString(this.getLabelTheDT(ConfigShopping.buy_card[0], 0));
        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
        this.kind_panel_shop = "mua_the";
        this.loadNhaMang(ConfigShopping.buy_card);
        this.changeButtonNhaMang(0, ConfigShopping.buy_card);
        this.resetCheckNhaMang();
        this.checkNhaMang(ConfigShopping.buy_card);

        this.shopping.hideLoadingNapVin();
    },


    createPnMuaTheDT: function () {
        this.addLayout(this, "pn_mua_the_DT", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.addSprite(this.pn_mua_the_DT, "bg_0_0", cc.p(240, 375.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_DT, "txt_0_1_0_0", cc.p(122, 376), "Số dư KD:", RobotoRegular.fontName, 22);
        this.txt_0_1_0_0.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_mua_the_DT, "lb_sodu_kd_muathe_dt", cc.p(265, 375),formatMoney(0, 3, userInfo.userData.vinTotal), RobotoRegular.fontName, 22);
        this.lb_sodu_kd_muathe_dt.setColor(cc.color("#1A1A1A"));
        this.lb_sodu_kd_muathe_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_sodu_kd_muathe_dt.ignoreContentAdaptWithSize(false);
        this.lb_sodu_kd_muathe_dt.setContentSize(cc.size(186, 26));
        this.lb_sodu_kd_muathe_dt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_mua_the_DT, "sp_xeng", cc.p(395, 375), res_Minigame_ImageChung + "/iconVin.png");
        this.sp_xeng.setScale(0.7);

        //this.addText(this.pn_mua_the_DT, "lb_sodu_kd_napxu_0_0", cc.p(385, 375), "" + GameManager.config.moneyName.toUpperCase()+ "", RobotoRegular.fontName, 22);
        //this.lb_sodu_kd_napxu_0_0.setColor(GuiUtil.color("#C200FF"));

        this.addSprite(this.pn_mua_the_DT, "bg_0_1", cc.p(240, 312), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_DT, "lb_mua_the_selected", cc.p(207.5, 309), "Thẻ Vinaphone", RobotoRegular.fontName, 24);
        this.lb_mua_the_selected.setColor(GuiUtil.color("#4D4D4D"));
        this.lb_mua_the_selected.ignoreContentAdaptWithSize(false);
        this.lb_mua_the_selected.setContentSize(cc.size(260, 28));
        this.lb_mua_the_selected.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addSprite(this.pn_mua_the_DT, "sp_muiten1", cc.p(397.5, 312), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_mua_the_DT, "btn_select_mua_the", MuaMaTheDTLayer.BTN_SELECT_MUA_THE_DT, cc.p(241, 312.5), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_select_mua_the.ignoreContentAdaptWithSize(false);
        this.btn_select_mua_the.setContentSize(cc.size(351, 39));
        this.addSprite(this.pn_mua_the_DT, "bg_0_2", cc.p(240, 248), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_DT, "lb_mg", cc.p(123.5, 247), "Mệnh giá:", RobotoRegular.fontName, 22);
        this.lb_mg.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_mua_the_DT, "lb_menhgia_dt", cc.p(277, 248), "500.000", RobotoRegular.fontName, 22);
        this.lb_menhgia_dt.setColor(cc.color("#1A1A1A"));
        this.lb_menhgia_dt.ignoreContentAdaptWithSize(false);
        this.lb_menhgia_dt.setContentSize(cc.size(190, 28));
        this.lb_menhgia_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_menhgia_dt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_mua_the_DT, "sp_muiten2", cc.p(396, 251), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_mua_the_DT, "btn_menhgia_thedt", MuaMaTheDTLayer.BTN_OPEN_MENHGIA_DT, cc.p(297.5, 252), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_menhgia_thedt.ignoreContentAdaptWithSize(false);
        this.btn_menhgia_thedt.setContentSize(cc.size(234, 39));
        this.addSprite(this.pn_mua_the_DT, "bg_0_3", cc.p(240, 181.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_DT, "lb_sl", cc.p(123.5, 180), "Số lượng:", RobotoRegular.fontName, 22);
        this.lb_sl.setColor(GuiUtil.color("#2F2F2F"));
        this.addEditBox(this.pn_mua_the_DT, "tf_soluong_dt", cc.p(291.5, 181), "", "0", RobotoRegular.fontName, 22, cc.size(230, 40), null, cc.TEXT_ALIGNMENT_RIGHT, 1);
        this.tf_soluong_dt.setName("tf_soluong_dt");
        this.tf_soluong_dt.setFontColor(cc.color("#4D4D4D"));
        this.tf_soluong_dt.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this.addSprite(this.pn_mua_the_DT, "bg_0_4", cc.p(240, 115.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_DT, "lb_gb", cc.p(123.5, 114), "Giá bán:", RobotoRegular.fontName, 22);
        this.lb_gb.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_mua_the_DT, "tf_gia_ban_dt", cc.p(288, 114), "", RobotoRegular.fontName, 22);
        this.tf_gia_ban_dt.setColor(cc.color("#1A1A1A"));
        this.tf_gia_ban_dt.ignoreContentAdaptWithSize(false);
        this.tf_gia_ban_dt.setContentSize(cc.size(244, 26));
        this.tf_gia_ban_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.tf_gia_ban_dt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addButtonStructure(this.pn_mua_the_DT, "btn_tiep_tuc_mua_the_dt", MuaMaTheDTLayer.BTN_TIEP_TUC_MUA_THE_DT, cc.p(240, 43), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_mua_the_DT, "lb_tt_buy_1", cc.p(240, 43), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_tt_buy_1.setColor(GuiUtil.color(162, 105, 64));

        this.addLayout(this.pn_mua_the_DT, "pn_menhgia_thedt", cc.p(293.5, 119), null, cc.size(246, 210), true);
        this.pn_menhgia_thedt.setVisible(false);
        this.addButton(this.pn_menhgia_thedt, "btn_close_menhgia_dt", MuaMaTheDTLayer.BTN_CLOSE_MENHGIA_DT, cc.p(346.5, 275), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_menhgia_dt.ignoreContentAdaptWithSize(false);
        this.btn_close_menhgia_dt.setContentSize(cc.size(1280, 720));

        this.addLayout(this.pn_menhgia_thedt, "bg_pn_menhgia_thedt", cc.p(123, 186.5), null, cc.size(244, 45), true);
        this.pn_menhgia_thedt.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_menhgia_thedt.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.pn_menhgia_thedt.setBackGroundColorOpacity(255);
        this.addText(this.pn_mua_the_DT, "txt_0_0", cc.p(736, 426), "MUA THẺ ĐIỆN THOẠI", RobotoRegular.fontName, 30);
        this.txt_0_0.setColor(GuiUtil.color("#FFDF58"));
        this.addSprite(this.pn_mua_the_DT, "bg_menhgia", cc.p(736, 221), res_ResourceMenuTab_Shopping + "/menhgia2.png");
        this.addListView(this.pn_mua_the_DT, "lv_menhgia_doi_the_dt", cc.p(735, 184.5), cc.size(463, 240));
        this.lv_menhgia_doi_the_dt.setTouchEnabled(false);
        this.lv_menhgia_doi_the_dt.setScrollBarEnabled(false);

        this.addText(this.pn_mua_the_DT, "lb_notice_muathe_dt", cc.p(736, 41), "Chú ý: Mỗi lần mua được tối đa 3 thẻ", RobotoRegular.fontName, 18);
        this.lb_notice_muathe_dt.setColor(GuiUtil.color("#FFDF58"));
    },
    createPnNhaMang: function (arr) {
        this.addLayout(this, "pn_nha_mang", cc.p(332, 293.5), null, cc.size(280, 127), true);
        this.pn_nha_mang.setVisible(false);
        this.addButton(this.pn_nha_mang, "btn_close_select_mua_the_dt", MuaMaTheDTLayer.BTN_CLOSE_SELECT_MUA_THE_DT, cc.p(447.5, 130), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_select_mua_the_dt.ignoreContentAdaptWithSize(false);
        this.btn_close_select_mua_the_dt.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_nha_mang, "bg_pn_nha_mang", cc.p(140, 22), null, cc.size(278, 208), true);

        this.addListView(this.pn_nha_mang, "lv_nha_mang", cc.p(141.5, 21), cc.size(278, 208));
        for (var k = 0; k < arr.length; k++) {
            this.addLayout(this.lv_nha_mang, "pn_lv_nha_mang" + k, cc.p(0, 0), null, cc.size(274, 41), true);
            this["pn_lv_nha_mang" + k].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this["pn_lv_nha_mang" + k].setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this["pn_lv_nha_mang" + k].setBackGroundColorOpacity(255);
            this.addButton(this["pn_lv_nha_mang" + k], arr[k].nameButton, arr[k].tagButton, cc.p(137, 19), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this[arr[k].nameButton].ignoreContentAdaptWithSize(false);
            this[arr[k].nameButton].setContentSize(cc.size(270, 33));
            this[arr[k].nameButton].setTitleColor(GuiUtil.color("#000000"));
            this[arr[k].nameButton].setTitleFontSize(20);
            this[arr[k].nameButton].setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this[arr[k].nameButton].setTitleText(arr[k].txtBt);
        }

    },

    createNoticeMuaThe: function () {
        this.addLayout(this, "pn_notice_mua_the", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.pn_notice_mua_the.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_notice_mua_the.setBackGroundColor(GuiUtil.color("#33408D"));
        this.pn_notice_mua_the.setBackGroundColorOpacity(0);
        this.pn_notice_mua_the.setVisible(false);
        this.addLayout(this.pn_notice_mua_the, "pn_content", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.pn_content.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_content.setBackGroundColor(GuiUtil.color("#33408D"));
        this.pn_content.setBackGroundColorOpacity(255);
        this.addButton(this.pn_notice_mua_the, "btn_xacnhan_muathe", MuaMaTheDTLayer.BTN_XACNHAN_MUATHE, cc.p(640, 116), true, res_ResourceMenuTab_Mail + "/button.png", res_ResourceMenuTab_Mail + "/button_s.png");
        this.btn_xacnhan_muathe.setTitleText("Xác nhận");
        this.btn_xacnhan_muathe.setTitleFontSize(30);
        this.btn_xacnhan_muathe.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
        this.btn_xacnhan_muathe.ignoreContentAdaptWithSize(false);
        this.btn_xacnhan_muathe.setContentSize(cc.size(365, 58));


    },
    getLabelTheDT: function (value, card_or_mobile) {
        var str = "";
        if (value == 0) {
            this.kind_mua_the_dt = "viettel";
            if (card_or_mobile == 0) {
                str = "Thẻ Viettel";
            } else {
                str = "Viettel";
            }
            return str
        } else if (value == 1) {
            this.kind_mua_the_dt = "vina";
            if (card_or_mobile == 0)
                str = "Thẻ Vinaphone";
            else
                str = "Vinaphone";
            return str
        } else if (value == 2) {
            this.kind_mua_the_dt = "mobi";
            if (card_or_mobile == 0)
                str = "Thẻ Mobifone";
            else
                str = "Mobifone";
            return str
        } else if (value == 3) {
            this.kind_mua_the_dt = "vnmobile";
            if (card_or_mobile == 0)
                str = "Thẻ VietnamMobile";
            else
                str = "VietnamMobile";
            return str
        } else if (value == 4) {
            this.kind_mua_the_dt = "vbee";
            if (card_or_mobile == 0)
                str = "Thẻ G Mobile";
            else
                str = "G Mobile";
            return str
        }
    },

    LoadMenhGiaThe_Buy_Card: function (str, value) {
        var array = "";
        if (value == 0) {
            //cc.log("vao2");
            if (str == "vina" || str == "mobi" || str == "viettel" || str == "vnmobile" || str == "vbee") {
                this.lv_menhgia_doi_the_dt.removeAllItems();
            } else {
                this.lv_menhgia_doi_the_game.removeAllItems();
            }
        } else
            this.lv_menhgia_nap_dt.removeAllItems();

        if (str == "vina") {
            array = ConfigShopping.card_Vina;
        } else if (str == "mobi") {
            array = ConfigShopping.card_Mobi;
        } else if (str == "viettel") {
            array = ConfigShopping.card_Viettel;
        } else if (str == "zingxu") {
            array = ConfigShopping.card_Zing;
        } else if (str == "vcoin") {
            array = ConfigShopping.card_Vcoin;
        } else if (str == "vnmobile") {
            array = ConfigShopping.card_VnMobi;
        } else if (str == "vbee") {
            array = ConfigShopping.card_Bee;
        } else if (str == "gate") {
            array = ConfigShopping.card_Gate;
        }
        //cc.log("array the game: " + array);

        var cellHeight = 30;
        var positionY = 12;
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        if (value == 0) {
            for (var i = 0; i < array.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_menhgia_doi_the_dt.width;

                var lbMenhGia2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbMenhGia2.setPosition(cc.p(100, positionY));
                var menhgia2 = getMenhGiaThe(array[i]);
                lbMenhGia2.setString(formatMoney(0, 3, menhgia2));
                lbMenhGia2.setColor(GuiUtil.color("#e8daad"));

                var lbVin2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVin2.setPosition(cc.p(340, positionY));
                var heso2 = Number(menhgia2) * ConfigShopping.radio_exchange_card;
                heso2 = heso2.toFixed(0);
                lbVin2.setString(formatMoney(0, 3, Number(heso2)));
                lbVin2.setColor(GuiUtil.color("#FFFF00"));

                cl1.addChild(lbMenhGia2);
                cl1.addChild(lbVin2);

                if (str == "vina" || str == "mobi" || str == "viettel" || str == "vnmobile" || str == "vbee") {
                    this.lv_menhgia_doi_the_dt.pushBackCustomItem(cl1);
                } else
                    this.lv_menhgia_doi_the_game.pushBackCustomItem(cl1);
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_menhgia_nap_dt.width;

                var lbMenhGia2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbMenhGia2.setPosition(cc.p(100, positionY));
                var menhgia2 = getMenhGiaThe(array[i]);
                lbMenhGia2.setString(formatMoney(0, 3, menhgia2));
                lbMenhGia2.setColor(GuiUtil.color("#e8daad"));

                var lbVin2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVin2.setPosition(cc.p(340, positionY));
                var heso2 = Number(menhgia2) * ConfigShopping.radio_recharge_out_mobile;
                heso2 = heso2.toFixed(0);
                lbVin2.setString(formatMoney(0, 3, Number(heso2)));
                lbVin2.setColor(GuiUtil.color("#FFFF00"));

                cl1.addChild(lbMenhGia2);
                cl1.addChild(lbVin2);

                this.lv_menhgia_nap_dt.pushBackCustomItem(cl1);
            }
        }
    },

    getMenhGiaThe: function (value) {
        // cc.log("menhgia: " + value);
        var menhgia = 0;
        if (value == 0)
            menhgia = 10000;
        else if (value == 1)
            menhgia = 20000;
        else if (value == 2)
            menhgia = 50000;
        else if (value == 3)
            menhgia = 100000;
        else if (value == 4)
            menhgia = 200000;
        else if (value == 5)
            menhgia = 500000;
        else if (value == 6)
            menhgia = 1000000;
        else if (value == 7)
            menhgia = 2000000;
        else if (value == 8)
            menhgia = 5000000;
        else if (value == 9)
            menhgia = 10000000;
        return parseInt(menhgia);
    },
    GotoMuaTheDienThoai: function (str) {
        for (var j = 0; j < this.saveArray_mua_the_dt.length; j++) {
            if (this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + j) != null) {
                var button = this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + j);
                button.setVisible(false);
            }
        }

        if (str == "vina") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Vina;
        } else if (str == "mobi") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Mobi;
        } else if (str == "viettel") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Viettel;
        } else if (str == "zingxu") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Zing;
        } else if (str == "vcoin") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Vcoin;
        } else if (str == "vnmobile") {
            this.saveArray_mua_the_dt = ConfigShopping.card_VnMobi;
        } else if (str == "vbee") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Bee;
        } else if (str == "gate") {
            this.saveArray_mua_the_dt = ConfigShopping.card_Gate;
        }
        //cc.log("array : " + this.saveArray_mua_the_dt);
        if (this.saveArray_mua_the_dt.length != 0) {
            this.menhgia_mua_the_dt = getMenhGiaThe(this.saveArray_mua_the_dt[0]);
            this.lb_menhgia_dt.setString(formatMoney(0, 3, getMenhGiaThe(this.saveArray_mua_the_dt[0])));
        } else {
            this.menhgia_mua_the_dt = 0;
            this.lb_menhgia_dt.setString("");
        }
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        for (var i = 0; i < this.saveArray_mua_the_dt.length; i++) {
            if (this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + i) == null) {
                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                button.setPosition(cc.p(123.03, this.positionY_muathedt));
                var str = getMenhGiaThe(this.saveArray_mua_the_dt[i]);
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(20);
                button.setName("btn_mua_the_dt" + i);

                this.pn_menhgia_thedt.addChild(button);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonMenhGiaTheDT(sender.titleText);
                            break;
                    }

                }, this);
                this.positionY_muathedt = this.positionY_muathedt - 41;
            } else {
                var button = this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + i);
                button.setVisible(true);
                var str = getMenhGiaThe(this.saveArray_mua_the_dt[i]);
                button.setTitleText(formatMoney(0, 3, str));
            }
        }
        this.positionY_muathedt = 186.97;
        this.bg_pn_menhgia_thedt.height = 12 + this.saveArray_mua_the_dt.length * 33 + (this.saveArray_mua_the_dt.length - 1) * 8;
    },
    buttonMenhGiaTheDT: function (value) {
        value = replaceAll(".", "", value);
        this.menhgia_mua_the_dt = value;
        this.lb_menhgia_dt.setString(formatMoney(0, 3, value));
        this.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 0));
        this.pn_menhgia_thedt.setVisible(false);
        this.showMoneyBuyCard();
        //cc.log("menh gia the: " + value);
    },
    showMoneyBuyCard: function () {
        var str = this.tf_soluong_dt.getString();
        this.tf_gia_ban_dt.setString(formatMoney(0, 3, (this.menhgia_mua_the_dt * ConfigShopping.radio_exchange_card * Number(str)).toFixed(0)));

    },
    loadNhaMang: function (str) {
        var array = [];
        array = str;
        var arrNhamang = [];
        for (var i = 0; i < array.length; i++) {
            var itemNhamang = MuaMaTheDTLayer.arrInfoButtonSelectNhaMang[array[i]];
            arrNhamang.push(itemNhamang);
        }
        this.createPnNhaMang(arrNhamang);

    },


    changeButtonNhaMang: function (kind, arr) {
        var array = [];
        array = arr;
        if (kind == 0) {

            for (var i = 0; i < array.length; i++) {
                this[MuaMaTheDTLayer.arrInfoButtonSelectNhaMang[array[i]].nameButton].setTitleText(MuaMaTheDTLayer.arrInfoButtonSelectNhaMang[array[i]].txtBt);
            }

        } else {
            for (var i = 0; i < array.length; i++) {
                this[MuaMaTheDTLayer.arrInfoButtonSelectNhaMang[array[i]].nameButton].setTitleText(MuaMaTheDTLayer.arrInfoButtonSelectNhaMang[array[i]].txtNT);
            }
        }
    },

    resetCheckNhaMang: function () {
        this.is_Buy_Bee = false;
        this.is_Buy_Zing = false;
        this.is_Buy_Gate = false;
        this.is_Buy_Vcoin = false;
    },

    checkNhaMang: function (str) {
        for (var i = 0; i < str.length; i++) {
            this.getHomeNetWork_Buy_Card_Mobi(str[i]);
        }
    },

    getHomeNetWork_Buy_Card_Mobi: function (value) {
        if (value == 0) {
            this.is_Buy_Viettel = true;
            return;
        } else if (value == 1) {
            this.is_Buy_Vina = true;
            return;
        } else if (value == 2) {
            this.is_Buy_Mobile = true;
            return;
        } else if (value == 3) {
            this.is_Buy_VietnamMobile = true;
            return;
        } else if (value == 4) {
            this.is_Buy_Bee = true;
            return;
        }
    },
    closePanel_Nhamang: function (value) {
        if (value == 1) { /// vina
            if (this.kind_panel_shop == "mua_the") {
                this.lb_mua_the_selected.setString("Thẻ Vinaphone");
            } else if (this.kind_panel_shop == "nap_dt") {
                this.lb_nttt_loai_the.setString("Vinaphone");
                this.lb_dau_so_nttt.setString("091");
            }
        } else if (value == 2) { /// mobi
            if (this.kind_panel_shop == "mua_the") {
                this.lb_mua_the_selected.setString("Thẻ Mobifone");
            } else if (this.kind_panel_shop == "nap_dt") {
                this.lb_nttt_loai_the.setString("Mobifone");
                this.lb_dau_so_nttt.setString("090");
            }
        } else if (value == 3) { /// viettel
            if (this.kind_panel_shop == "mua_the") {
                this.lb_mua_the_selected.setString("Thẻ Viettel");
            } else if (this.kind_panel_shop == "nap_dt") {
                this.lb_nttt_loai_the.setString("Viettel");
                this.lb_dau_so_nttt.setString("097");
            }
        } else if (value == 4) { /// vn mobile
            if (this.kind_panel_shop == "mua_the") {
                this.lb_mua_the_selected.setString("Thẻ VietnamMobile");
            } else if (this.kind_panel_shop == "nap_dt") {
                this.lb_nttt_loai_the.setString("VietnamMobile");
                this.lb_dau_so_nttt.setString("097");
            }
        } else if (value == 5) { /// vn mobile
            if (this.kind_panel_shop == "mua_the") {
                this.lb_mua_the_selected.setString("Thẻ G Mobile");
            } else if (this.kind_panel_shop == "nap_dt") {
                this.lb_nttt_loai_the.setString("G Mobile");
                this.lb_dau_so_nttt.setString("097");
            }
        }
    },

    funBuyCardMobile_Game: function (value) { // = 0  mua the dien thoai // = 1 la mua the game
        if (value == 0) {
            this.iskindDoiThe = "mobile";
            if (this.kind_mua_the_dt == "viettel") {
                this.provider = 0;
                this.NameCard = "Thẻ Viettel";
            } else if (this.kind_mua_the_dt == "vina") {
                this.provider = 1;
                this.NameCard = "Thẻ Vinaphone";
            } else if (this.kind_mua_the_dt == "mobi") {
                this.provider = 2;
                this.NameCard = "Thẻ Mobifone";
            } else if (this.kind_mua_the_dt == "vnmobile") {
                this.provider = 3;
                this.NameCard = "Thẻ VietNamMobile";
            } else if (this.kind_mua_the_dt == "vbee") {
                this.provider = 4;
                this.NameCard = "Thẻ G Mobile";
            }
        } else {
            this.iskindDoiThe = "game";
            if (this.kind_mua_the_game == "zingxu") {
                this.provider = 6;
                this.NameCard = "Thẻ Zing";
            } else if (this.kind_mua_the_game == "gate") {
                this.provider = 5;
                this.NameCard = "Thẻ Gate";
            } else if (this.kind_mua_the_game == "vcoin") {
                this.provider = 7;
                this.NameCard = "Thẻ Vcoin";
            }
        }

        //cc.log("provide :" + this.provider);

        if (value == 0) {
            var soluong = this.tf_soluong_dt.getString();
            var money = (this.menhgia_mua_the_dt * Number(soluong)).toFixed(0);
        } else {
            var soluong = this.tf_soluong_thegame.getString();
            var money = (this.menhgia_mua_the_game * Number(soluong)).toFixed(0);
        }
        //cc.log("money tranfer:" + money);
        //cc.log("soluong : " + soluong);

        if (soluong == "" || soluong == null) {
            soluong = 0;
            gI.popUp.openPanel_Alert_Lobby("Nhập số lượng thẻ muốn đổi!");
        } else if (money > userInfo.userData.moneyUse) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        } else if (money > ConfigShopping.cashout_limit_user) {
            gI.popUp.openPanel_Alert_Lobby("Hạn mức đổi thưởng tối đa " + formatMoney(0, 3, ConfigShopping.cashout_limit_user) + "!\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch");
        } else {
            gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn thực hiện giao dịch đổi thẻ!", "ĐỒNG Ý", "HỦY", this.confirmBuyCardMobile.bind(this), null);
        }
    },

    confirmBuyCardMobile: function () {
        cc.log(this.iskindDoiThe);
        if (this.iskindDoiThe == "mobile")
            var soluong = this.tf_soluong_dt.getString();
        else
            var soluong = this.tf_soluong_thegame.getString();
        this.soluong_muathe = Number(soluong);
        this.shopping.createLoadingNapVin();
        if (gI.mainSocket.listener.isLogged) {
            var rechargeVin = new CmdSendBuyCardMobile();
            if (this.iskindDoiThe == "mobile") {
                rechargeVin.putBuyCardMobile(this.provider, this.ReGetMenhGia(this.menhgia_mua_the_dt), Number(soluong));
            } else {
                rechargeVin.putBuyCardMobile(this.provider, this.ReGetMenhGia(this.menhgia_mua_the_game), Number(soluong));
            }
            gI.mainSocket.send(rechargeVin);
            rechargeVin.clean();
        } else {
            this.shopping.hideLoadingNapVin();
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            gI.mainSocket.connectSocket();
        }
    },

    responseBuyCard: function (error) {
        //cc.log("error buy card dt : " + error);
        this.shopping.hideLoadingNapVin();
        if (error == 0) {
            openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch đổi thẻ!", 1, 4);
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 2) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
        } else if (error == 3) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        } else if (error == 9) {
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", menutab.shoppingLayer.gotoSercurity, null);
            })));
        } else if (error == 20) {
            gI.popUp.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        } else if (error == 21) {
            gI.popUp.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        } else if (error == 10) {
            gI.popUp.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau " + ConfigShopping.configHour + "h kích hoạt bảo mật thành công!");
        }
    },
    responseResultBuyCard: function (error, currentmoney, softpin) {
        //cc.log("error result buy card: " + error + " currentmoney: " + currentmoney + " softpin: " + softpin);
        this.shopping.hideLoadingNapVin();
        if (error == 0) {
            var listthe = softpin;
            var length = listthe.split('|').length;
            ////cc.log("the 1" + listthe.split('|')[0]);
            var str = "";
            for (var i = 0; i < length; i++) {
                str = str + listthe.split('|')[i] + "\n";
            }
            //cc.log("soluong : " + shopping_info.soluong_muathe);
            //popup.openPanel_Big_Message("Giao dịch thành công!\nMã thẻ của bạn:\n" + str);
            if (this.iskindDoiThe == "mobile")
                this.showNoticeBuyCard(this.NameCard, this.soluong_muathe, this.menhgia_mua_the_dt, softpin);
            else
                this.showNoticeBuyCard(this.NameCard, this.soluong_muathe, this.menhgia_mua_the_game, softpin);
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = currentmoney;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            this.tf_soluong_dt.setString("");
            this.tf_soluong_dt.setPlaceHolder("0");
            this.tf_soluong_dt.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_soluong_dt.runAction(cc.scaleTo(0.225, 1));
            this.tf_gia_ban_dt.setString("");
            funGetMoneyUse();
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        } else if (error == 2) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
        } else if (error == 3) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        } else if (error == 9) {
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", menutab.shoppingLayer.gotoSercurity, null);
            })));
        } else if (error == 20) {
            gI.popUp.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        } else if (error == 21) {
            gI.popUp.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        } else if (error == 22) {
            gI.popUp.openPanel_Alert_Lobby("Số lượng thẻ đổi đã quá hạn mức.\nBạn vui lòng quay trở lại sau!");
        } else if (error == 30) {
            gI.popUp.openPanel_Alert_Lobby("Giao dịch đang chờ xử lý!");
        }
    },

    showNoticeBuyCard : function(kindcard,value, menhgia, array){

        this.pn_notice_mua_the.setVisible(true);
        this.pn_notice_mua_the.runAction(cc.scaleTo(0.2,1));
        var jsonData = JSON.parse(array);
        //cc.log("giatri: " + jsonData[0].serial);
        //cc.log("value: " + value);
        var position = null;
        if(value == 1)
            position = 369.03;
        else  if(value == 2)
            position = 200.03;
        else  if(value == 3)
            position = 24.03;
        else  if(value == 4)
            position = -144.97;

        var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
        for(var i = 0; i < value; i ++){
            var cl1 = null;
            cl1 = new cc.LayerColor(GuiUtil.color("#FFF6F6"));
            cl1.height = 340;
            cl1.width =  300;
            cl1.setPosition(cc.p(position,102.22));

            var lbtitle =  new cc.LabelTTF('',  fonts.fontName, 22, cc.size(280,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbtitle.setPosition(cc.p(150,302.44));
            lbtitle.setString(kindcard);
            lbtitle.setColor(GuiUtil.color("#4D4D4D"));

            var lbMenhGia =  new cc.LabelTTF('',  fonts.fontName, 22, cc.size(280,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbMenhGia.setPosition(cc.p(150,262.82));
            lbMenhGia.setString(formatMoney(0,3,menhgia));
            lbMenhGia.setColor(GuiUtil.color("#1E90FF"));

            var lbMathe =  new cc.LabelTTF('',  fonts.fontName, 24, cc.size(280,30), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbMathe.setPosition(cc.p(150,224.30));
            lbMathe.setString(jsonData[i].pin);
            lbMathe.setColor(GuiUtil.color("#FF0000"));

            var lbSerial =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,30), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbSerial.setPosition(cc.p(150,184.37));
            lbSerial.setString("Số serial: " + jsonData[i].serial);
            lbSerial.setColor(GuiUtil.color("#4D4D4D"));

            var lbhandung =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,30), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbhandung.setPosition(cc.p(150,159.37));
            lbhandung.setString("Hạn sử dụng: " + jsonData[i].expire);
            lbhandung.setColor(GuiUtil.color("#4D4D4D"));

            var lbnap =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbnap.setPosition(cc.p(150,134.37));
            lbnap.setString("Nạp tiền nhấn: *100*mã nạp tiền#");
            lbnap.setColor(GuiUtil.color("#4D4D4D"));

            var lbtra =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbtra.setPosition(cc.p(150,109.37));
            lbtra.setString("Kiểm tra tài khoản: *101#");
            lbtra.setColor(GuiUtil.color("#4D4D4D"));

            var lbemail =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbemail.setPosition(cc.p(150,84.37));
            lbemail.setString("Email hỗ trợ: " + GameManager.webViewLink.email);
            lbemail.setColor(GuiUtil.color("#4D4D4D"));

            var lbmagd =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(280,60), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbmagd.setPosition(cc.p(150,59.37));
            lbmagd.setString("Mã GD: " + jsonData[i].id);
            lbmagd.setColor(GuiUtil.color("#4D4D4D"));

            cl1.addChild(lbtitle);
            cl1.addChild(lbMenhGia);
            cl1.addChild(lbMathe);
            cl1.addChild(lbSerial);
            cl1.addChild(lbhandung);
            cl1.addChild(lbnap);
            cl1.addChild(lbtra);
            cl1.addChild(lbemail);
            cl1.addChild(lbmagd);

            position = position + 345;
            this.pn_content.addChild(cl1);
        }
    },
    ReGetMenhGia: function (value) {
        var menhgia = 0;
        if (value == 10000)
            menhgia = 0;
        else if (value == 20000)
            menhgia = 1;
        else if (value == 50000)
            menhgia = 2;
        else if (value == 100000)
            menhgia = 3;
        else if (value == 200000)
            menhgia = 4;
        else if (value == 500000)
            menhgia = 5;
        else if (value == 1000000)
            menhgia = 6;
        else if (value == 2000000)
            menhgia = 7;
        else if (value == 5000000)
            menhgia = 8;
        return parseInt(menhgia);
    },


    onButtonRelease: function (button, id) {
        switch (id) {
            case MuaMaTheDTLayer.BTN_SELECT_MUA_THE_DT:
                this.pn_nha_mang.setVisible(true);
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case MuaMaTheDTLayer.BTN_CLOSE_SELECT_MUA_THE_DT:
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_MUATHEDT_VINA:
                if (this.is_Buy_Vina == true) {
                    if (this.kind_panel_shop == "mua_the") {
                        this.kind_mua_the_dt = "vina";
                        this.closePanel_Nhamang(1);
                        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
                        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
                    } else {
                        this.closePanel_Nhamang(1);
                        this.homenetwork_nap_dt = 1;
                        this.LoadDauSo("vina");
                    }
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_MUATHEDT_MOBI:
                if (this.is_Buy_Mobile == true) {
                    if (this.kind_panel_shop == "mua_the") {
                        this.kind_mua_the_dt = "mobi";
                        this.closePanel_Nhamang(2);
                        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
                        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
                    } else {
                        this.closePanel_Nhamang(2);
                        this.homenetwork_nap_dt = 2;
                        this.LoadDauSo("mobi");
                    }
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_MUATHEDT_VIETTEL:
                if (this.is_Buy_Viettel == true) {
                    if (this.kind_panel_shop == "mua_the") {
                        this.kind_mua_the_dt = "viettel";
                        this.closePanel_Nhamang(3);
                        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
                        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
                    } else {
                        this.closePanel_Nhamang(3);
                        this.homenetwork_nap_dt = 0;
                        this.LoadDauSo("viettel");
                    }
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_MUATHEDT_VNMOBILE:
                if (this.is_Buy_VietnamMobile == true) {
                    if (this.kind_panel_shop == "mua_the") {
                        this.kind_mua_the_dt = "vnmobile";
                        this.closePanel_Nhamang(4);
                        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
                        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
                    } else {
                        this.closePanel_Nhamang(4);
                        this.homenetwork_nap_dt = 3;
                        this.LoadDauSo("vnmobile");
                    }
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_MUATHEDT_BEELINE:
                if (this.is_Buy_Bee == true) {
                    if (this.kind_panel_shop == "mua_the") {
                        this.kind_mua_the_dt = "vbee";
                        this.closePanel_Nhamang(5);
                        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 0);
                        this.GotoMuaTheDienThoai(this.kind_mua_the_dt);
                    } else {
                        this.closePanel_Nhamang(5);
                        this.homenetwork_nap_dt = 4;
                        this.LoadDauSo("vbee");
                    }
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case MuaMaTheDTLayer.BTN_OPEN_MENHGIA_DT:
                this.pn_menhgia_thedt.setVisible(true);
                this.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case MuaMaTheDTLayer.BTN_TIEP_TUC_MUA_THE_DT:
                this.funBuyCardMobile_Game(0);
                break;
            case MuaMaTheDTLayer.BTN_XACNHAN_MUATHE:
                this.pn_notice_mua_the.setVisible(false);
                this.pn_notice_mua_the.runAction(cc.scaleTo(0, 0));
                this.pn_content.removeAllChildren();
                break;
            case MuaMaTheDTLayer.BTN_CLOSE_MENHGIA_DT:
                this.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_menhgia_thedt.setVisible(false);
                break;

        }
    },

    editBoxEditingDidBegin: function (editBox) {
        var str = editBox.getString();
        if (editBox.getName() == "tf_serial") {
            if (str != "")
                this.btn_clear_serial.setVisible(true);
            else
                this.btn_clear_serial.setVisible(false);
        } else if (editBox.getName() == "tf_ma_the") {
            if (str != "")
                this.btn_clear_mathe.setVisible(true);
            else
                this.btn_clear_mathe.setVisible(false);
        }
    },

    editBoxEditingDidEnd: function (editBox) {
        var str = editBox.getString();
        if (editBox.getName() == "tf_soluong_dt") {
            str = replaceAll(".", "", str);
            if (!isNumeric(str)) {
                str = str.substr(0, str.length - 1);
            }
            if (!isNumeric(str)) {
                str = "";
            }
            //if(str == "")
            //    str = 0;

            if (editBox.getName() == "tf_soluong_dt") {
                editBox.setString(str);

                this.showMoneyBuyCard();
            }
        }
    },

    editBoxTextChanged: function (editBox, text) {


    },

    editBoxReturn: function (editBox) {
        return;
    },


});

MuaMaTheDTLayer.BTN_SELECT_MUA_THE_DT = 1;
MuaMaTheDTLayer.BTN_CLOSE_SELECT_MUA_THE_DT = 2;
MuaMaTheDTLayer.BTN_MUATHEDT_VINA = 3;
MuaMaTheDTLayer.BTN_MUATHEDT_MOBI = 4;
MuaMaTheDTLayer.BTN_MUATHEDT_VIETTEL = 5;
MuaMaTheDTLayer.BTN_MUATHEDT_VNMOBILE = 6;
MuaMaTheDTLayer.BTN_MUATHEDT_BEELINE = 7;
MuaMaTheDTLayer.BTN_OPEN_MENHGIA_DT = 8;
MuaMaTheDTLayer.BTN_TIEP_TUC_MUA_THE_DT = 9;
MuaMaTheDTLayer.BTN_XACNHAN_MUATHE = 10;
MuaMaTheDTLayer.BTN_CLOSE_MENHGIA_DT = 11;


MuaMaTheDTLayer.arrInfoButtonSelectNhaMang = [
    {
        tagButton: MuaMaTheDTLayer.BTN_MUATHEDT_VIETTEL,
        nameButton: "btn_muathedt_viettel",
        txtBt: "Thẻ Viettel",
        txtNT: "Viettel",


    },

    {
        tagButton: MuaMaTheDTLayer.BTN_MUATHEDT_VINA,
        nameButton: "btn_muathedt_vina",
        txtBt: "Thẻ Vinaphone",
        txtNT: "Vinaphone"


    },
    {
        tagButton: MuaMaTheDTLayer.BTN_MUATHEDT_MOBI,
        nameButton: "btn_muathedt_mobi",
        txtBt: "Thẻ Mobifone",
        txtNT: "Mobifone"

    },

    {
        tagButton: MuaMaTheDTLayer.BTN_MUATHEDT_VNMOBILE,
        nameButton: "btn_muathedt_vnmobile",
        txtBt: "Thẻ VietnamMobile",
        txtNT: "VietNamMobile"

    },
    {
        tagButton: MuaMaTheDTLayer.BTN_MUATHEDT_BEELINE,
        nameButton: "btn_muathedt_bee",
        txtBt: "Thẻ G Mobile",
        txtNT: "G Mobile"
    },
    {
        tagButton: "",
        nameButton: "",
        txtBt: "",
        txtNT: ""
    },

];









