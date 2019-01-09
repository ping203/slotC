/**
 * Created by B150M on 3/23/2018.
 */

var MuaTheGameLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.kind_mua_the_game = "zingxu";
        this.saveArray_mua_the_game = [];
        this.positionY_muathegame = 186.97;
        this.menhgia_mua_the_game = 50;
        this.is_Buy_Zing = false;
        this.is_Buy_Gate = false;
        this.is_Buy_Vcoin = false;

        this.iskindDoiThe = "";
        this.provider = null;
        this.NameCard = null;
        this.soluong_muathe = null;


    },

    customizeGUI: function () {
        this.createPnMuaTheGame();
        this.CheckConFig();
        this.createNoticeMuaThe();
    },

    CheckConFig: function () {
        var arrSelectTheGame = [];
        this.lb_mua_the_game.setString(this.getLabelTheGame(ConfigShopping.buy_card_game[0]));
        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_game, 0);
        this.GotoMuaTheGame(this.kind_mua_the_game);
        if (ConfigShopping.is_buy_card_game == 0) {


            for (var j = 0; j < ConfigShopping.buy_card_game.length; j++) {
                this.getHomeNetWork_Buy_Card_Game(ConfigShopping.buy_card_game[j]);
            }

            for (var i = 0; i < ConfigShopping.buy_card_game.length; i++) {
                var itemSelect = MuaTheGameLayer.arrInfoButtonSelectTheGame[i];
                arrSelectTheGame.push(itemSelect);
            }
        }
        this.createPnSelectTheGame(arrSelectTheGame);
        this.shopping.hideLoadingNapVin();
    },


    createPnMuaTheGame: function () {
        this.addLayout(this, "pn_mua_the_game", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.addSprite(this.pn_mua_the_game, "bg_1_0", cc.p(240, 375.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_game, "txt_1_1_0_0", cc.p(122, 375), "Số dư KD:", RobotoRegular.fontName, 22);
        this.txt_1_1_0_0.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_mua_the_game, "lb_sodu_kd_muathe_game", cc.p(265, 375), formatMoney(0, 3, userInfo.userData.vinTotal), RobotoRegular.fontName, 22);
        this.lb_sodu_kd_muathe_game.setColor(cc.color("#1A1A1A"));
        this.lb_sodu_kd_muathe_game.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_sodu_kd_muathe_game.ignoreContentAdaptWithSize(false);
        this.lb_sodu_kd_muathe_game.setContentSize(cc.size(186, 26));
        this.lb_sodu_kd_muathe_game.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_mua_the_game, "sp_xeng_g", cc.p(395, 375),res_Minigame_ImageChung + "/iconVin.png");
        this.sp_xeng_g.setScale(0.7);

        this.addSprite(this.pn_mua_the_game, "bg_1_1", cc.p(240, 312), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_game, "lb_mua_the_game", cc.p(189, 309), "Thẻ ZING                     ", RobotoRegular.fontName, 24);
        this.lb_mua_the_game.setColor(GuiUtil.color("#4D4D4D"));
        this.lb_mua_the_game.ignoreContentAdaptWithSize(false);
        this.lb_mua_the_game.setContentSize(cc.size(221, 28));
        this.lb_mua_the_game.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addSprite(this.pn_mua_the_game, "sp_muiten1_1", cc.p(398.5, 312), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_mua_the_game, "btn_select_the_game", MuaTheGameLayer.BTN_SELECT_THEGAME, cc.p(242, 312.5), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_select_the_game.ignoreContentAdaptWithSize(false);
        this.btn_select_the_game.setContentSize(cc.size(351, 39));
        this.addSprite(this.pn_mua_the_game, "bg_1_2", cc.p(240, 248), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_game, "lb_mg1", cc.p(123.5, 247), "Mệnh giá:", RobotoRegular.fontName, 22);
        this.lb_mg1.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_mua_the_game, "lb_menhgia_game", cc.p(276, 248), "500.000", RobotoRegular.fontName, 24);
        this.lb_menhgia_game.setColor(cc.color("#1A1A1A"));
        this.lb_menhgia_game.ignoreContentAdaptWithSize(false);
        this.lb_menhgia_game.setContentSize(cc.size(197, 28));
        this.lb_menhgia_game.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_menhgia_game.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_mua_the_game, "sp_muiten2_1", cc.p(398, 251), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_mua_the_game, "btn_menhgia_thegame", MuaTheGameLayer.BTN_MENHGIA_THEGAME, cc.p(300, 251.5), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_menhgia_thegame.ignoreContentAdaptWithSize(false);
        this.btn_menhgia_thegame.setContentSize(cc.size(234, 39));
        this.addSprite(this.pn_mua_the_game, "bg_1_3", cc.p(240, 181.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_game, "lb_sl1", cc.p(123.5, 180), "Số lượng:", RobotoRegular.fontName, 22);
        this.lb_sl1.setColor(GuiUtil.color("#4D4D4D"));
        this.addEditBox(this.pn_mua_the_game, "tf_soluong_thegame", cc.p(291.5, 181), "", "0", RobotoRegular.fontName, 22, cc.size(230, 40), null, cc.TEXT_ALIGNMENT_RIGHT, 1);
        this.tf_soluong_thegame.setName("tf_soluong_thegame");
        this.tf_soluong_thegame.setFontColor(cc.color("#4D4D4D"));
        this.tf_soluong_thegame.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this.addSprite(this.pn_mua_the_game, "bg_1_4", cc.p(240, 115.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_mua_the_game, "lb_gb1", cc.p(123.5, 114), "Giá bán:", RobotoRegular.fontName, 22);
        this.lb_gb1.setColor(GuiUtil.color("#4D4D4D"));
        this.addText(this.pn_mua_the_game, "lb_gia_ban_thegame", cc.p(293, 114), "", RobotoRegular.fontName, 22);
        this.lb_gia_ban_thegame.setColor(cc.color("#1A1A1A"));
        this.lb_gia_ban_thegame.ignoreContentAdaptWithSize(false);
        this.lb_gia_ban_thegame.setContentSize(cc.size(244, 26));
        this.lb_gia_ban_thegame.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_gia_ban_thegame.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addButtonStructure(this.pn_mua_the_game, "btn_tiep_tuc_mua_thegame", MuaTheGameLayer.BTN_TIEPTUC_THEGAME, cc.p(240, 43), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_mua_the_game, "lb_tt", cc.p(240, 43), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_tt.setColor(GuiUtil.color(162, 105, 64));
        this.addLayout(this.pn_mua_the_game, "pn_select_the_game", cc.p(210, 223.5), null, cc.size(280, 127), true);
        this.pn_select_the_game.setVisible(false);
        this.addButton(this.pn_select_the_game, "btn_close_select_thegame", MuaTheGameLayer.BTN_CLOSE_SELECT_THEGAME, cc.p(447.5, 129.5), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_close_select_thegame.ignoreContentAdaptWithSize(false);
        this.btn_close_select_thegame.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_select_the_game, "bg_pn_select_the_game", cc.p(140, 63.5), null, cc.size(278, 125), true);
        this.pn_select_the_game.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_select_the_game.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.pn_select_the_game.setBackGroundColorOpacity(255);

        this.addLayout(this.pn_mua_the_game, "pn_menhgia_thegame", cc.p(293.5, 119), null, cc.size(246, 210), true);
        this.addButton(this.pn_menhgia_thegame, "btn_close_menhgia_game", MuaTheGameLayer.BTN_CLOSE_MENHGIA_THEGAME, cc.p(344, 276), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_menhgia_game.ignoreContentAdaptWithSize(false);
        this.btn_close_menhgia_game.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_menhgia_thegame, "bg_pn_menhgia_thegame", cc.p(1, 209), null, cc.size(244, 166), true);
        this.bg_pn_menhgia_thegame.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_pn_menhgia_thegame.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.bg_pn_menhgia_thegame.setBackGroundColorOpacity(255);
        this.bg_pn_menhgia_thegame.setAnchorPoint(0, 1);
        this.pn_menhgia_thegame.setVisible(false);
        this.addText(this.pn_mua_the_game, "txt_0_1", cc.p(736, 426), "MUA THẺ GAME", RobotoRegular.fontName, 30);
        this.txt_0_1.setColor(GuiUtil.color("#FFDF58"));
        this.addSprite(this.pn_mua_the_game, "bg_menhgia1", cc.p(735, 221), res_ResourceMenuTab_Shopping + "/menhgia2.png");
        this.addListView(this.pn_mua_the_game, "lv_menhgia_doi_the_game", cc.p(735, 184.5), cc.size(463, 240));
        this.lv_menhgia_doi_the_game.setTouchEnabled(false);
        this.lv_menhgia_doi_the_game.setScrollBarEnabled(false);

        this.addText(this.pn_mua_the_game, "lb_notice_muathe_game", cc.p(736, 41), "Chú ý: Mỗi lần mua được tối đa 3 thẻ", RobotoRegular.fontName, 18);
        this.lb_notice_muathe_game.setColor(GuiUtil.color("#FFDF58"));

    },

    createPnSelectTheGame:function(arr){
        for (var k = 0; k < arr.length; k++) {
            this.addButton(this.pn_select_the_game, arr[k].nameButton, arr[k].tagButton, cc.p(140, 104 - 41 * k), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this[arr[k].nameButton].ignoreContentAdaptWithSize(false);
            this[arr[k].nameButton].setContentSize(cc.size(268, 33));
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
        this.addButton(this.pn_notice_mua_the, "btn_xacnhan_muathe", MuaTheGameLayer.BTN_XACNHAN_MUATHE, cc.p(640, 116), true, res_ResourceMenuTab_Mail + "/button.png", res_ResourceMenuTab_Mail + "/button_s.png");
        this.btn_xacnhan_muathe.setTitleText("Xác nhận");
        this.btn_xacnhan_muathe.setTitleFontSize(30);
        this.btn_xacnhan_muathe.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
        this.btn_xacnhan_muathe.ignoreContentAdaptWithSize(false);
        this.btn_xacnhan_muathe.setContentSize(cc.size(365, 58));


    },
    getLabelTheGame: function (value) {
        var str = "";
        if (value == 5) {
            this.kind_mua_the_game = "gate";
            str = "Thẻ Gate";
            return str
        } else if (value == 6) {
            this.kind_mua_the_game = "zingxu";
            str = "Thẻ Zing";
            return str
        } else if (value == 7) {
            this.kind_mua_the_game = "vcoin";
            str = "Thẻ Vcoin";
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
                cl1.width = this.lv_menhgia_doi_the_game.width;

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
    GotoMuaTheGame: function (str) {
        for (var j = 0; j < this.saveArray_mua_the_game.length; j++) {
            if (this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + j) != null) {
                var button = this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + j);
                button.setVisible(false);
            }
        }

        if (str == "vina") {
            this.saveArray_mua_the_game = ConfigShopping.card_Vina;
        } else if (str == "mobi") {
            this.saveArray_mua_the_game = ConfigShopping.card_Mobi;
        } else if (str == "viettel") {
            this.saveArray_mua_the_game = ConfigShopping.card_Viettel;
        } else if (str == "zingxu") {
            this.saveArray_mua_the_game = ConfigShopping.card_Zing;
        } else if (str == "vcoin") {
            this.saveArray_mua_the_game = ConfigShopping.card_Vcoin;
        } else if (str == "vnmobile") {
            this.saveArray_mua_the_game = ConfigShopping.card_VnMobi;
        } else if (str == "vbee") {
            this.saveArray_mua_the_game = ConfigShopping.card_Bee;
        } else if (str == "gate") {
            this.saveArray_mua_the_game = ConfigShopping.card_Gate;
        }
        //cc.log("array the game moi: " + this.saveArray_mua_the_game);
        if (this.saveArray_mua_the_game.length != 0) {
            this.menhgia_mua_the_game = getMenhGiaThe(this.saveArray_mua_the_game[0]);
            this.lb_menhgia_game.setString(formatMoney(0, 3, getMenhGiaThe(this.saveArray_mua_the_game[0])));
        } else {
            this.menhgia_mua_the_game = 0;
            this.lb_menhgia_game.setString("");
        }
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        for (var i = 0; i < this.saveArray_mua_the_game.length; i++) {
            if (this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + i) == null) {
                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                button.setPosition(cc.p(123.03, this.positionY_muathegame));
                var str = getMenhGiaThe(this.saveArray_mua_the_game[i]);
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(22);
                button.setName("btn_mua_the_game" + i);

                this.pn_menhgia_thegame.addChild(button);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonMenhGiaTheGame(sender.titleText);
                            break;
                    }

                }, this);
                this.positionY_muathegame = this.positionY_muathegame - 41;
            } else {
                var button = this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + i);
                button.setVisible(true);
                var str = getMenhGiaThe(this.saveArray_mua_the_game[i]);
                button.setTitleText(formatMoney(0, 3, str));
            }
        }
        this.positionY_muathegame = 186.97;
        this.bg_pn_menhgia_thegame.height = 12 + this.saveArray_mua_the_game.length * 33 + (this.saveArray_mua_the_game.length - 1) * 8;
    },
    buttonMenhGiaTheGame : function(value){
        value = replaceAll(".", "", value);
        this.menhgia_mua_the_game = value; this.lb_menhgia_game.setString(formatMoney(0,3,value));
        this.pn_menhgia_thegame.runAction(cc.scaleTo(0.15,1,0));
        this.pn_menhgia_thegame.setVisible(false);
        this.showMoneyBuyCard();
        //cc.log("menh gia the game: " + value);
    },

    showMoneyBuyCard: function () {

        var str2 = this.tf_soluong_thegame.getString();
        this.lb_gia_ban_thegame.setString(formatMoney(0, 3, (this.menhgia_mua_the_game * ConfigShopping.radio_exchange_card * Number(str2)).toFixed(0)));

    },

    getHomeNetWork_Buy_Card_Game : function(value){
        if(value == 5){
            this.is_Buy_Gate = true;
            return;
        }else if(value == 6){
            this.is_Buy_Zing = true;
            return;
        }else if(value == 7){
            this.is_Buy_Vcoin = true;
            return;
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
            this.tf_soluong_thegame.setString("");
            this.tf_soluong_thegame.setPlaceHolder("0");
            this.tf_soluong_thegame.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_soluong_thegame.runAction(cc.scaleTo(0.225, 1));
            this.lb_gia_ban_thegame.setString("");
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
            case MuaTheGameLayer.BTN_SELECT_THEGAME:
                this.pn_select_the_game.setVisible(true);
                this.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case MuaTheGameLayer.BTN_CLOSE_SELECT_THEGAME:
                this.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the_game.setVisible(false);
                break;
            case MuaTheGameLayer.BTN_MENHGIA_THEGAME:
                this.pn_menhgia_thegame.setVisible(true);
                this.pn_menhgia_thegame.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case MuaTheGameLayer.BTN_CLOSE_MENHGIA_THEGAME:
                this.pn_menhgia_thegame.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_menhgia_thegame.setVisible(false);
                break;
            case MuaTheGameLayer.BTN_MUATHEGAME_ZING:
                if (this.is_Buy_Zing == true) {
                    this.kind_mua_the_game = "zingxu";
                    this.lb_mua_the_game.setString("Thẻ ZING");
                    this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_game, 0);
                    this.GotoMuaTheGame(this.kind_mua_the_game);
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the_game.setVisible(false);
                break;
            case MuaTheGameLayer.BTN_MUATHEGAME_VCOIN:
                if (this.is_Buy_Vcoin == true) {
                    this.kind_mua_the_game = "vcoin";
                    this.lb_mua_the_game.setString("Thẻ VCOIN");
                    this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_game, 0);
                    this.GotoMuaTheGame(this.kind_mua_the_game);
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the_game.setVisible(false);
                break;
            case MuaTheGameLayer.BTN_MUATHEGAME_GATE:
                if (this.is_Buy_Gate == true) {
                    this.kind_mua_the_game = "gate";
                    this.lb_mua_the_game.setString("Thẻ GATE");
                    this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_game, 0);
                    this.GotoMuaTheGame(this.kind_mua_the_game);
                } else
                    gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the_game.setVisible(false);
                break;
            case MuaTheGameLayer.BTN_TIEPTUC_THEGAME:
                this.funBuyCardMobile_Game(1);
                break;
            case MuaTheGameLayer.BTN_XACNHAN_MUATHE:
                this.pn_notice_mua_the.setVisible(false);
                this.pn_notice_mua_the.runAction(cc.scaleTo(0, 0));
                this.pn_content.removeAllChildren();
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
        if (editBox.getName() == "tf_soluong_thegame") {
            str = replaceAll(".", "", str);
            if (!isNumeric(str)) {
                str = str.substr(0, str.length - 1);
            }
            if (!isNumeric(str)) {
                str = "";
            }
            //if(str == "")
            //    str = 0;

            if (editBox.getName() == "tf_soluong_thegame") {
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

MuaTheGameLayer.BTN_SELECT_THEGAME  = 1;
MuaTheGameLayer.BTN_CLOSE_SELECT_THEGAME = 2;
MuaTheGameLayer.BTN_MENHGIA_THEGAME = 3;
MuaTheGameLayer.BTN_CLOSE_MENHGIA_THEGAME = 4;
MuaTheGameLayer.BTN_MUATHEGAME_ZING = 5;
MuaTheGameLayer.BTN_MUATHEGAME_VCOIN = 6;
MuaTheGameLayer.BTN_MUATHEGAME_GATE = 7;
MuaTheGameLayer.BTN_TIEPTUC_THEGAME = 8;
MuaTheGameLayer.BTN_XACNHAN_MUATHE = 9;


MuaTheGameLayer.arrInfoButtonSelectTheGame = [
    {
        tagButton: MuaTheGameLayer.BTN_MUATHEGAME_GATE,
        nameButton: "btn_muathegame_gate",
        txtBt: "Thẻ GATE"

    },
    {
        tagButton: MuaTheGameLayer.BTN_MUATHEGAME_ZING,
        nameButton: "btn_muathegame_zing",
        txtBt: "Thẻ ZING"

    },
    {
        tagButton: MuaTheGameLayer.BTN_MUATHEGAME_VCOIN,
        nameButton: "btn_muathegame_vcoin",
        txtBt: "Thẻ VCOIN"

    },

];















