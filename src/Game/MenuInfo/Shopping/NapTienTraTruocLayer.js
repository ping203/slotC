/**
 * Created by B150M on 3/23/2018.
 */

var NapTienTraTruocLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.is_Buy_Vina = false;
        this.is_Buy_Mobile = false;
        this.is_Buy_Viettel = false;
        this.is_Buy_VietnamMobile = false;
        this.is_Buy_Bee = false;
        this.is_Buy_Zing = false;
        this.is_Buy_Gate = false;
        this.is_Buy_Vcoin = false;
        this.positionY_dauso = 207;
        this.saveArray_dauso = [];
        this.kind_mua_the_dt = "vina";
        this.arrayVina = ["091", "094", "0123", "0125", "0127", "0129", "0124", "088"];
        this.arrayMobi = ["090", "093", "0121", "0122", "0126", "0128", "0120", "089"];
        this.arrayViettel = ["097", "098", "0165", "0166", "0167", "0168", "0169", "0164", "096", "0162", "0163", "086"];
        this.arrayBee = ["099", "0199"];
        this.arrayVnMobile = ["092", "0188", "0186"];
        this.saveArray_nap_dt = [];
        this.kind_panel_shop = "";
        this.positionY_napdt = 187.15;
        this.dauso_chose = "";
        this.save_fone_naptien = null;
        this.menhgia_nap_dt = 0;
        this.typeRechargeMobile = null;

    },

    customizeGUI: function () {
        this.createPnNapTienTraTruoc();
        this.createPnDauSoMobi();
        this.CheckConFig();

    },

    CheckConFig: function () {
        this.lb_nttt_loai_the.setString(this.getLabelTheDT(ConfigShopping.recharge_mobile[0], 1));
        this.typeRechargeMobile = 1;
        this.LoadDauSo(this.kind_mua_the_dt);
        this.kind_panel_shop = "nap_dt";
        this.LoadMenhGiaThe_Buy_Card(this.kind_mua_the_dt, 1);
        this.txt_title_nap_dt.setString("NẠP TIỀN TRẢ TRƯỚC");
        this.loadNhaMang(ConfigShopping.recharge_mobile);
        this.changeButtonNhaMang(1, ConfigShopping.recharge_mobile);
        this.resetCheckNhaMang();
        this.checkNhaMang(ConfigShopping.recharge_mobile);


    },


    createPnNapTienTraTruoc: function () {
        this.addLayout(this, "pn_nap_tien_tra_truoc", cc.p(640, 304.5), null, cc.size(1035.00, 469.00), true);
        this.pn_nap_tien_tra_truoc.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_nap_tien_tra_truoc.setBackGroundColor(GuiUtil.color("#1C4579"));
        this.pn_nap_tien_tra_truoc.setBackGroundColorOpacity(0);
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg_2_0", cc.p(240, 375.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_nap_tien_tra_truoc, "txt_2_1_0_0", cc.p(122, 375), "Số dư KD:", RobotoRegular.fontName, 22);
        this.txt_2_1_0_0.setColor(GuiUtil.color("#2F2F2F"));
        this.addText(this.pn_nap_tien_tra_truoc, "lb_sodu_kd_nap_dt", cc.p(265, 375), formatMoney(0, 3, userInfo.userData.vinTotal), RobotoRegular.fontName, 22);
        this.lb_sodu_kd_nap_dt.setColor(cc.color("#1A1A1A"));
        this.lb_sodu_kd_nap_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_sodu_kd_nap_dt.ignoreContentAdaptWithSize(false);
        this.lb_sodu_kd_nap_dt.setContentSize(cc.size(186, 26));
        this.lb_sodu_kd_nap_dt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_nap_tien_tra_truoc, "sp_nap_drt", cc.p(395, 375), res_Minigame_ImageChung + "/iconVin.png");
        this.sp_nap_drt.setScale(0.7);

        //this.addText(this.pn_nap_tien_tra_truoc, "lb_sodu_kd_napxu_0_2", cc.p(385, 375), "VIN", RobotoRegular.fontName, 22);
        //this.lb_sodu_kd_napxu_0_2.setColor(GuiUtil.color("#C200FF"));
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg_2_1", cc.p(240, 312), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_nap_tien_tra_truoc, "lb_nttt_loai_the", cc.p(220, 309.5), "Thẻ Vinaphone                     ", RobotoRegular.fontName, 24);
        this.lb_nttt_loai_the.setColor(GuiUtil.color("#4D4D4D"));
        this.lb_nttt_loai_the.ignoreContentAdaptWithSize(false);
        this.lb_nttt_loai_the.setContentSize(cc.size(284, 28));
        this.lb_nttt_loai_the.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addSprite(this.pn_nap_tien_tra_truoc, "sp_muiten3", cc.p(397.5, 312), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_nap_tien_tra_truoc, "btn_nttt_select_loaithe", NapTienTraTruocLayer.BTN_SELECT_NHAMANG_NTTT, cc.p(241.5, 312.5), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_nttt_select_loaithe.ignoreContentAdaptWithSize(false);
        this.btn_nttt_select_loaithe.setContentSize(cc.size(351, 39));
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg1_0", cc.p(115, 248), res_ResourceMenuTab_Shopping + "/bg_3.png");
        this.addText(this.pn_nap_tien_tra_truoc, "lb_dau_so_nttt", cc.p(98.5, 247.5), "0123", RobotoRegular.fontName, 24);
        this.lb_dau_so_nttt.setColor(GuiUtil.color("#4D4D4D"));
        this.lb_dau_so_nttt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.addSprite(this.pn_nap_tien_tra_truoc, "sp_muiten4", cc.p(154.5, 248.5), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_nap_tien_tra_truoc, "btn_dau_so_nttt", NapTienTraTruocLayer.BTN_SELECT_DAUSO_NTTT, cc.p(115, 249), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_dau_so_nttt.ignoreContentAdaptWithSize(false);
        this.btn_dau_so_nttt.setContentSize(cc.size(99, 39));
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg2_0", cc.p(297, 248), res_ResourceMenuTab_Mail + "/maxacnhan.png");
        this.bg2_0.setScaleX(1.1);
        this.addEditBox(this.pn_nap_tien_tra_truoc, "tf_phone_number_nttt", cc.p(297, 249), "", "Nhập số điện thoại", RobotoRegular.fontName, 22, cc.size(223, 40), res_ResourceMenuTab_Mail + "/maxacnhan.png", cc.TEXT_ALIGNMENT_LEFT, 11);
        this.tf_phone_number_nttt.setName("tf_phone_number_nttt");
        this.tf_phone_number_nttt.setFontColor(cc.color("#4D4D4D"));
        this.tf_phone_number_nttt.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this.addButton(this.pn_nap_tien_tra_truoc, "btn_clear_fone", NapTienTraTruocLayer.BTN_CLEAR_FONE, cc.p(437.5, 247), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
        this.btn_clear_fone.setVisible(false);
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg_2_2", cc.p(240, 181.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_nap_tien_tra_truoc, "lb_mg2", cc.p(123.5, 180), "Mệnh giá:", RobotoRegular.fontName, 22);
        this.lb_mg2.setColor(GuiUtil.color("#4D4D4D"));
        this.addText(this.pn_nap_tien_tra_truoc, "lb_menh_gia_nap_dt", cc.p(275, 180), "", RobotoRegular.fontName, 22);
        this.lb_menh_gia_nap_dt.setColor(cc.color("#1A1A1A"));
        this.lb_menh_gia_nap_dt.ignoreContentAdaptWithSize(false);
        this.lb_menh_gia_nap_dt.setContentSize(cc.size(210, 26));
        this.lb_menh_gia_nap_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_menh_gia_nap_dt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_nap_tien_tra_truoc, "sp_muiten22", cc.p(398, 182), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_nap_tien_tra_truoc, "btn_chon_muc_nap_dt", NapTienTraTruocLayer.BTN_OPEN_MENHGIA_NAP_DT, cc.p(240, 182), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_chon_muc_nap_dt.ignoreContentAdaptWithSize(false);
        this.btn_chon_muc_nap_dt.setContentSize(cc.size(351, 39));
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg_2_3", cc.p(240, 115.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
        this.addText(this.pn_nap_tien_tra_truoc, "lb_gb2", cc.p(115, 114), "Giá bán:", RobotoRegular.fontName, 22);
        this.lb_gb2.setColor(GuiUtil.color("#4D4D4D"));
        this.addText(this.pn_nap_tien_tra_truoc, "lb_gia_ban_nttt", cc.p(285, 114), "", RobotoRegular.fontName, 22);
        this.lb_gia_ban_nttt.setColor(cc.color("#1A1A1A"));
        this.lb_gia_ban_nttt.ignoreContentAdaptWithSize(false);
        this.lb_gia_ban_nttt.setContentSize(cc.size(231, 26));
        this.lb_gia_ban_nttt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_gia_ban_nttt.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addButtonStructure(this.pn_nap_tien_tra_truoc, "btn_tiep_tuc_nttt", NapTienTraTruocLayer.BTN_TIEPTUC_NTTT, cc.p(240, 43), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_nap_tien_tra_truoc, "lb_nnnn", cc.p(240, 43), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_nnnn.setColor(GuiUtil.color(162, 105, 64));

        this.addLayout(this.pn_nap_tien_tra_truoc, "pn_menhgia_nap_dt", cc.p(295.5, 52), null, cc.size(246, 210), true);
        this.pn_menhgia_nap_dt.setVisible(false);
        this.addButton(this.pn_menhgia_nap_dt, "btn_close_menhgia_nap_dt", NapTienTraTruocLayer.BTN_CLOSE_MENHGIA_NAP_DT, cc.p(344, 342), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
        this.btn_close_menhgia_nap_dt.ignoreContentAdaptWithSize(false);
        this.btn_close_menhgia_nap_dt.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_menhgia_nap_dt, "bg_pn_menhgia_nap_dt", cc.p(1, 209), null, cc.size(244, 166), true);
        this.bg_pn_menhgia_nap_dt.setAnchorPoint(0, 1);
        this.bg_pn_menhgia_nap_dt.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_pn_menhgia_nap_dt.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.bg_pn_menhgia_nap_dt.setBackGroundColorOpacity(255);

        this.addText(this.pn_nap_tien_tra_truoc, "txt_title_nap_dt", cc.p(736, 426), "NẠP TIỀN TRẢ TRƯỚC", RobotoRegular.fontName, 30);
        this.txt_title_nap_dt.setColor(GuiUtil.color("#FFDF58"));
        this.addSprite(this.pn_nap_tien_tra_truoc, "bg_menhgia12", cc.p(735, 222), res_ResourceMenuTab_Shopping + "/menhgia2.png");
        this.addListView(this.pn_nap_tien_tra_truoc, "lv_menhgia_nap_dt", cc.p(736, 185), cc.size(463, 240));
        this.lv_menhgia_nap_dt.setScrollBarEnabled(false);
        this.lv_menhgia_nap_dt.setTouchEnabled(false);
        this.addText(this.pn_nap_tien_tra_truoc, "lb_notice", cc.p(736, 45), "Chú ý: Mỗi lần nạp được tối đa 3 lần", RobotoRegular.fontName, 18);
        this.lb_notice.setColor(GuiUtil.color("#FFDF58"));
        this.addText(this.pn_nap_tien_tra_truoc, "lb_notice_trasau", cc.p(736, 22), "Thuê bao phải đăng ký thanh toán cước bằng thẻ cào với nhà mạng ", RobotoRegular.fontName, 18);
        this.lb_notice_trasau.setColor(GuiUtil.color("#FFDF58"));
        this.lb_notice_trasau.setVisible(false);


    },

    createPnDauSoMobi: function () {
        this.addLayout(this, "pn_dau_so_mobi", cc.p(232, 181), null, cc.size(91, 227), true);
        this.pn_dau_so_mobi.setVisible(false);
        this.addButton(this.pn_dau_so_mobi, "btn_close_dau_so_mobi", NapTienTraTruocLayer.BTN_CLOSE_DAUSO_MOBI, cc.p(454, 292), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_dau_so_mobi.ignoreContentAdaptWithSize(false);
        this.btn_close_dau_so_mobi.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_dau_so_mobi, "bg_pn_dau_so_mobi", cc.p(45.5, 225), null, cc.size(93, 225), true);
        this.bg_pn_dau_so_mobi.setAnchorPoint(0.5, 1);
        this.bg_pn_dau_so_mobi.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_pn_dau_so_mobi.setBackGroundColor(GuiUtil.color("#133270"));
        this.bg_pn_dau_so_mobi.setBackGroundColorOpacity(255);
        this.addListView(this.pn_dau_so_mobi, "lv_dau_so", cc.p(45.5, 79), cc.size(91, 288));
        this.lv_dau_so.setScrollBarEnabled(false);
        if (!cc.sys.isNative) {
            this.lv_dau_so.setVisible(false);
        }
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

    loadNhaMang: function (str) {
        var array = [];
        array = str;
        var arrNhamang = [];
        for (var i = 0; i < array.length; i++) {
            var itemNhamang = NapTienTraTruocLayer.arrInfoButtonSelectNhaMang[array[i]];
            arrNhamang.push(itemNhamang);
        }
        this.createPnNhaMang(arrNhamang);

    },
    createPnNhaMang: function (arr) {
        this.addLayout(this, "pn_nha_mang", cc.p(332, 293.5), null, cc.size(280, 127), true);
        this.pn_nha_mang.setVisible(false);
        this.addButton(this.pn_nha_mang, "btn_close_select_mua_the_dt", NapTienTraTruocLayer.BTN_CLOSE_SELECT_MUA_THE_DT, cc.p(447.5, 130), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
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
    changeButtonNhaMang: function (kind, arr) {
        var array = [];
        array = arr;
        if (kind == 0) {

            for (var i = 0; i < array.length; i++) {
                this[NapTienTraTruocLayer.arrInfoButtonSelectNhaMang[array[i]].nameButton].setTitleText(NapTienTraTruocLayer.arrInfoButtonSelectNhaMang[array[i]].txtBt);
            }

        } else {
            for (var i = 0; i < array.length; i++) {
                this[NapTienTraTruocLayer.arrInfoButtonSelectNhaMang[array[i]].nameButton].setTitleText(NapTienTraTruocLayer.arrInfoButtonSelectNhaMang[array[i]].txtNT);
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

    LoadDauSo: function (str) {
        for (var j = 0; j < this.saveArray_dauso.length; j++) {
            if (this.pn_dau_so_mobi.getChildByName("btn_dauso_" + j) != null) {
                var button = this.pn_dau_so_mobi.getChildByName("btn_dauso_" + j);
                button.setVisible(false);
            }
        }

        var array = "";
        if (str == "vina") {
            array = this.arrayVina;
        } else if (str == "mobi") {
            array = this.arrayMobi;
        } else if (str == "viettel") {
            array = this.arrayViettel;
        } else if (str == "vnmobile") {
            array = this.arrayVnMobile;
        } else if (str == "vbee") {
            array = this.arrayBee;
        }
        this.saveArray_dauso = array;
        //cc.log("array : " + array);

        if (this.saveArray_dauso.length != 0) {
            this.dauso_chose = this.saveArray_dauso[0];
            this.lb_dau_so_nttt.setString(this.saveArray_dauso[0]);
        } else {
            this.dauso_chose = "";
            this.lb_dau_so_nttt.setString("");
        }
        if (cc.sys.isNative) {
            this.lv_dau_so.removeAllItems();
            this.lv_dau_so.removeAllChildren();
            for (var i = 0; i < this.saveArray_dauso.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = 30;
                cl1.width = this.lv_dau_so.width;

                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_dauso.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_dauso.png");
                button.setPosition(cc.p(45, 15));
                button.setTitleText(this.saveArray_dauso[i]);
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(20);
                button.setName("btn_dauso_" + i);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonDauSo(sender.titleText);
                            break;
                    }

                }, this);

                cl1.addChild(button);
                this.lv_dau_so.pushBackCustomItem(cl1);
            }
            this.positionY_dauso = 207;
            this.bg_pn_dau_so_mobi.height = 4 + this.saveArray_dauso.length * 28 + (this.saveArray_dauso.length - 1) * 4;
        } else {
            for (var i = 0; i < this.saveArray_dauso.length; i++) {
                if (this.pn_dau_so_mobi.getChildByName("btn_dauso_" + i) == null) {
                    var button = new ccui.Button();
                    GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_dauso.png");
                    GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_dauso.png");
                    button.setPosition(cc.p(45, this.positionY_dauso));
                    button.setTitleText(this.saveArray_dauso[i]);
                    button.setTitleColor(GuiUtil.color("#000000"));
                    button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                    button.setTitleFontSize(20);
                    button.setName("btn_dauso_" + i);

                    this.pn_dau_so_mobi.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonDauSo(sender.titleText);
                                break;
                        }

                    }, this);
                    this.positionY_dauso = this.positionY_dauso - 32;
                } else {
                    var button = this.pn_dau_so_mobi.getChildByName("btn_dauso_" + i);
                    button.setVisible(true);
                    var str = this.saveArray_dauso[i];
                    button.setTitleText(str);
                }
            }
            this.positionY_dauso = 207;
            this.bg_pn_dau_so_mobi.height = 8 + this.saveArray_dauso.length * 28 + (this.saveArray_dauso.length - 1) * 4;
        }
        this.GotoNapDienThoai(str);

    },
    buttonDauSo: function (value) {
        //cc.log("dau so :" + value);
        this.dauso_chose = value;
        this.lb_dau_so_nttt.setString(value);
        this.pn_dau_so_mobi.setVisible(false);
        this.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 0));
    },
    GotoNapDienThoai: function (str) {
        for (var j = 0; j < this.saveArray_nap_dt.length; j++) {
            if (this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + j) != null) {
                var button = this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + j);
                button.setVisible(false);
            }
        }

        if (str == "vina") {
            this.saveArray_nap_dt = ConfigShopping.card_Vina;
        } else if (str == "mobi") {
            this.saveArray_nap_dt = ConfigShopping.card_Mobi;
        } else if (str == "viettel") {
            this.saveArray_nap_dt = ConfigShopping.card_Viettel;
        } else if (str == "zingxu") {
            this.saveArray_nap_dt = ConfigShopping.card_Zing;
        } else if (str == "vcoin") {
            this.saveArray_nap_dt = ConfigShopping.card_Vcoin;
        } else if (str == "vnmobile") {
            this.saveArray_nap_dt = ConfigShopping.card_VnMobi;
        } else if (str == "vbee") {
            this.saveArray_nap_dt = ConfigShopping.card_Bee;
        } else if (str == "gate") {
            this.saveArray_nap_dt = ConfigShopping.card_Gate;
        }
        //cc.log("array : " + this.saveArray_nap_dt);
        if (this.saveArray_nap_dt.length != 0) {
            this.menhgia_nap_dt = getMenhGiaThe(this.saveArray_nap_dt[0]);
            this.lb_menh_gia_nap_dt.setString(formatMoney(0, 3, getMenhGiaThe(this.saveArray_nap_dt[0])));
        } else {
            this.menhgia_nap_dt = 0;
            this.lb_menh_gia_nap_dt.setString("");
        }

        for (var i = 0; i < this.saveArray_nap_dt.length; i++) {
            if (this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + i) == null) {
                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_the2.png");
                button.setPosition(cc.p(123.03, this.positionY_napdt));
                var str = getMenhGiaThe(this.saveArray_nap_dt[i]);
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(20);
                button.setName("btn_nap_dt" + i);

                this.pn_menhgia_nap_dt.addChild(button);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonNapDienThoai(sender.titleText);
                            break;
                    }

                }, this);
                this.positionY_napdt = this.positionY_napdt - 41;
            } else {
                var button = this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + i);
                button.setVisible(true);
                var str = getMenhGiaThe(this.saveArray_nap_dt[i]);
                button.setTitleText(formatMoney(0, 3, str));
            }
        }
        this.positionY_napdt = 187.15;
        this.bg_pn_menhgia_nap_dt.height = 12 + this.saveArray_nap_dt.length * 33 + (this.saveArray_nap_dt.length - 1) * 8;
        this.showMoneyBuyCard();
    },
    buttonNapDienThoai: function (value) {
        value = replaceAll(".", "", value);
        this.menhgia_nap_dt = value;
        this.lb_menh_gia_nap_dt.setString(formatMoney(0, 3, value));
        this.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 0));
        this.pn_menhgia_nap_dt.setVisible(false);
        this.showMoneyBuyCard();
        //cc.log("menh gia the: " + value);
    },
    showMoneyBuyCard: function () {
        var str3 = this.lb_menh_gia_nap_dt.getString();
        str3 = replaceAll(".", "", str3);
        this.lb_gia_ban_nttt.setString(formatMoney(0, 3, (Number(str3) * ConfigShopping.radio_recharge_out_mobile).toFixed(0)));
    },


    funRechargeMobile : function(){
        var fone = this.tf_phone_number_nttt.getString();
        var str3 = this.lb_menh_gia_nap_dt.getString();
        str3 = replaceAll(".", "", str3);
        var money = Number(str3).toFixed(0);
        var fullfone = this.dauso_chose + fone;
        this.save_fone_naptien = fullfone;
        //cc.log("fone: " + this.save_fone_naptien);

        if(fone == ""){
            gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập số điện thoại!");
        }else if(money > userInfo.userData.moneyUse) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        }else if(money > ConfigShopping.cashout_limit_user) {
            gI.popUp.openPanel_Alert_Lobby("Hạn mức đổi thưởng tối đa "+formatMoney(0,3,ConfigShopping.cashout_limit_user)+"!\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch");
        }else{
            gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn thực hiện giao dịch nạp tiền điện thoại!", "ĐỒNG Ý", "HỦY", this.confirmRechargeMobile.bind(this), null);
        }
    },
    confirmRechargeMobile : function(){
        if (gI.mainSocket.listener.isLogged) {
            var rechargeVin = new CmdSendRechargeMobile();
            rechargeVin.putRechargeMobile(this.save_fone_naptien ,this.ReGetMenhGia(this.menhgia_nap_dt),this.typeRechargeMobile);
            //cc.log("fone : " + shopping_info.save_fone_naptien + " menh gia: " + shopping_info.ReGetMenhGia(shopping_info.menhgia_nap_dt) +
            //"loai : " + shopping_info.typeRechargeMobile);
            gI.mainSocket.send(rechargeVin);
            rechargeVin.clean();
        }else{
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            gI.mainSocket.connectSocket();
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
    responseRechargeMobile : function(error){
        //cc.log("error nap dien thoai: " + error);
        if(error == 0){
            openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch nạp tiền điện thoại!",1, 4);
        }else if(error == 1){
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        }else if(error == 2){
            gI.popUp.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
        }else if(error == 3){
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        }else if(error == 9){
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                gI.popUp.open_panel_message_confirm("THÔNG BÁO","Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?","ĐỒNG Ý","HỦY", menutab.shoppingLayer.gotoSercurity, null);
            })));
        }else if(error == 20){
            gI.popUp.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        }else if(error == 21){
            gI.popUp.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau thực hiện lại giao dịch!");
        }else if(error == 23){
            gI.popUp.openPanel_Alert_Lobby("Số điện thoại nhập không chính xác!");
        }else if(error == 10){
            gI.popUp.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau "+ConfigShopping.configHour+"h kích hoạt bảo mật thành công!");
        }
    },
    responseResultRechargeMobile : function(error, currentMoney){
        //cc.log("error nap dien thoai: " + error + " currentMoney: " + currentMoney);.
        this.shopping.hideLoadingNapVin();
        if(error == 0){
            gI.popUp.openPanel_Alert_Lobby("Giao dịch thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = currentMoney;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            this.tf_phone_number_nttt.setString("");
            this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
            this.tf_phone_number_nttt.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
            this.lb_gia_ban_nttt.setString("");

            funGetMoneyUse();
        }else if(error == 1){
            gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        }else if(error == 2){
            gI.popUp.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
        }else if(error == 3){
            gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
        }else if(error == 9){
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                gI.popUp.open_panel_message_confirm("THÔNG BÁO","Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?","ĐỒNG Ý","HỦY",menutab.shoppingLayer.gotoSercurity, null);
            })));
        }else if(error == 20){
            gI.popUp.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
        }else if(error == 21){
            gI.popUp.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau thực hiện lại giao dịch!");
        }else if(error == 23){
            gI.popUp.openPanel_Alert_Lobby("Số điện thoại nhập không chính xác!");
        }else if(error == 30){
            gI.popUp.openPanel_Alert_Lobby("Giao dịch đang chờ xử lý!");
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
    onButtonRelease: function (button, id) {
        switch (id) {
            case NapTienTraTruocLayer.BTN_SELECT_NHAMANG_NTTT:
                this.pn_nha_mang.setVisible(true);
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case NapTienTraTruocLayer.BTN_SELECT_DAUSO_NTTT:
                this.pn_dau_so_mobi.setVisible(true);
                this.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 1));
                break;
            case NapTienTraTruocLayer.BTN_CLOSE_DAUSO_MOBI:
                this.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_dau_so_mobi.setVisible(false);
                break;
            case NapTienTraTruocLayer.BTN_CLOSE_SELECT_MUA_THE_DT:
                this.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_nha_mang.setVisible(false);
                break;
            case NapTienTraTruocLayer.BTN_MUATHEDT_VINA:
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
            case NapTienTraTruocLayer.BTN_MUATHEDT_MOBI:
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
            case NapTienTraTruocLayer.BTN_MUATHEDT_VIETTEL:
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
            case NapTienTraTruocLayer.BTN_MUATHEDT_VNMOBILE:
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
            case NapTienTraTruocLayer.BTN_MUATHEDT_BEELINE:
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
            case NapTienTraTruocLayer.BTN_CLOSE_MENHGIA_NAP_DT:
                this.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_menhgia_nap_dt.setVisible(false);
                break;
            case NapTienTraTruocLayer.BTN_OPEN_MENHGIA_NAP_DT:
                this.pn_menhgia_nap_dt.setVisible(true);
                this.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 1));
                break;

            case NapTienTraTruocLayer.BTN_CLEAR_FONE:
                this.tf_phone_number_nttt.setString("");
                this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
                this.btn_clear_fone.setVisible(false);
                this.tf_phone_number_nttt.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
                break;
            case NapTienTraTruocLayer.BTN_TIEPTUC_NTTT:
                this.funRechargeMobile();
                break;


        }
    },
    editBoxEditingDidBegin: function (editBox) {
        var str = editBox.getString();
        if (editBox.getName() == "tf_phone_number_nttt") {
            if (str != "")
                this.btn_clear_fone.setVisible(true);
            else
                this.btn_clear_fone.setVisible(false);
        }
    },

    editBoxEditingDidEnd: function (editBox) {
        var str = editBox.getString();
        if (editBox.getName() == "tf_phone_number_nttt") {
            if (str != "")
                this.btn_clear_fone.setVisible(true);
            else
                this.btn_clear_fone.setVisible(false);
        }
    },

    editBoxTextChanged: function (editBox, text) {


    },

    editBoxReturn: function (editBox) {
        return;
    },


});


NapTienTraTruocLayer.BTN_SELECT_NHAMANG_NTTT = 1;
NapTienTraTruocLayer.BTN_SELECT_DAUSO_NTTT = 2;
NapTienTraTruocLayer.BTN_CLOSE_DAUSO_MOBI = 3;
NapTienTraTruocLayer.BTN_CLOSE_SELECT_MUA_THE_DT = 4;
NapTienTraTruocLayer.BTN_MUATHEDT_VINA = 5;
NapTienTraTruocLayer.BTN_MUATHEDT_MOBI = 6;
NapTienTraTruocLayer.BTN_MUATHEDT_VIETTEL = 7;
NapTienTraTruocLayer.BTN_MUATHEDT_VNMOBILE = 8;
NapTienTraTruocLayer.BTN_MUATHEDT_BEELINE = 9;
NapTienTraTruocLayer.BTN_CLOSE_MENHGIA_NAP_DT = 10;
NapTienTraTruocLayer.BTN_OPEN_MENHGIA_NAP_DT = 11;
NapTienTraTruocLayer.BTN_CLEAR_FONE = 12;
NapTienTraTruocLayer.BTN_TIEPTUC_NTTT = 13


NapTienTraTruocLayer.arrInfoButtonSelectNhaMang = [
    {
        tagButton: NapTienTraTruocLayer.BTN_MUATHEDT_VIETTEL,
        nameButton: "btn_muathedt_viettel",
        txtBt: "Thẻ Viettel",
        txtNT: "Viettel",


    },

    {
        tagButton: NapTienTraTruocLayer.BTN_MUATHEDT_VINA,
        nameButton: "btn_muathedt_vina",
        txtBt: "Thẻ Vinaphone",
        txtNT: "Vinaphone"


    },
    {
        tagButton: NapTienTraTruocLayer.BTN_MUATHEDT_MOBI,
        nameButton: "btn_muathedt_mobi",
        txtBt: "Thẻ Mobifone",
        txtNT: "Mobifone"

    },

    {
        tagButton: NapTienTraTruocLayer.BTN_MUATHEDT_VNMOBILE,
        nameButton: "btn_muathedt_vnmobile",
        txtBt: "Thẻ VietnamMobile",
        txtNT: "VietNamMobile"

    },
    {
        tagButton: NapTienTraTruocLayer.BTN_MUATHEDT_BEELINE,
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










