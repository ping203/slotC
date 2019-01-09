/**
 * Created by B150M on 3/23/2018.
 */

var NapXulayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;


    },

    customizeGUI: function () {
        this.createPnNapXu();

    },

    CheckConFig: function () {



    },

    createPnNapXu: function () {
        this.addLayout(this, "pn_nap_xu", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.addText(this.pn_nap_xu, "txt_01", cc.p(240, 426), "ĐỔI XU (KHUYẾN MẠI 100%)", RobotoRegular.fontName, 30);
        this.txt_01.setColor(GuiUtil.color("#FFDF58"));
        this.addSprite(this.pn_nap_xu, "bg_0_0", cc.p(240, 361.5), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_xu, "txt_0_1", cc.p(122, 360.5), "Số dư KD:", RobotoRegular.fontName, 22);
        this.txt_0_1.setColor(GuiUtil.color("#121212"));
        this.addText(this.pn_nap_xu, "lb_sodu_kd_napxu", cc.p(265, 360.5), formatMoney(0, 3, userInfo.userData.vinTotal), RobotoRegular.fontName, 22);
        this.lb_sodu_kd_napxu.setColor(GuiUtil.color("#121212"));
        this.lb_sodu_kd_napxu.enableOutline(cc.color.BLACK,1);
        this.lb_sodu_kd_napxu.ignoreContentAdaptWithSize(false);
        this.lb_sodu_kd_napxu.setContentSize(cc.size(186, 26));
        this.lb_sodu_kd_napxu.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_sodu_kd_napxu.enableOutline(GuiUtil.color("#8B6914"), 1);

        this.addSprite(this.pn_nap_xu, "sp_xeng", cc.p(395, 362.5), res_Minigame_ImageChung + "/iconVin.png");
        this.sp_xeng.setScale(0.7);

        this.addSprite(this.pn_nap_xu, "bg_0_1", cc.p(240, 297), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addEditBox(this.pn_nap_xu, "tf_money_vin", cc.p(238.5, 297), "", "Nhập số "+ GameManager.config.moneyName +" cần đổi", RobotoRegular.fontName, 22, cc.size(320, 40), res_ResourceMenuTab_Shopping + "/bg_2.png", cc.TEXT_ALIGNMENT_LEFT,15);
        this.tf_money_vin.setFontColor(cc.color("#121212"));
        this.tf_money_vin.setName("tf_money_vin");
        this.tf_money_vin.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

        this.addSprite(this.pn_nap_xu, "bg_0_2", cc.p(240, 231), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addEditBox(this.pn_nap_xu, "tf_money_again", cc.p(238.5, 231), "", "Nhập lại số "+ GameManager.config.moneyName +" cần đổi", RobotoRegular.fontName, 22, cc.size(320, 40), res_ResourceMenuTab_Shopping + "/bg_2.png", cc.TEXT_ALIGNMENT_LEFT,15);
        this.tf_money_again.setFontColor(cc.color("#121212"));
        this.tf_money_again.setName("tf_money_again");
        this.tf_money_again.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this.addSprite(this.pn_nap_xu, "bg_0_3", cc.p(240, 164.5), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_xu, "txt_0_2", cc.p(134, 161), "Số Xu nhận:", RobotoRegular.fontName, 22);
        this.txt_0_2.setColor(GuiUtil.color("#121212"));
        this.addText(this.pn_nap_xu, "lb_xu_nhan_duoc", cc.p(304, 161.5), "", RobotoRegular.fontName, 21);
        this.lb_xu_nhan_duoc.setColor(GuiUtil.color("#373737"));
        this.lb_xu_nhan_duoc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.lb_xu_nhan_duoc.ignoreContentAdaptWithSize(false);
        this.lb_xu_nhan_duoc.setContentSize(cc.size(215, 26));

        this.addButtonStructure(this.pn_nap_xu, "btn_doi_xu", NapXulayer.BTN_NAPXU_DOIXU, cc.p(240, 95), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);


        this.addTextStructure(this.pn_nap_xu, "lb_doi_xu", cc.p(240, 95), "ĐỔI XU", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_doi_xu.setColor(GuiUtil.color(162,105,64));
        this.addText(this.pn_nap_xu, "txt_02", cc.p(726, 426), "TIỀN XU LÀ GÌ?", RobotoRegular.fontName, 30, {isDebug : true});

        this.addListView(this.pn_nap_xu, "lv_quydinh_xu", cc.p(738.9, 218.84), cc.size(570, 350));
        this.lv_quydinh_xu.setScrollBarEnabled(false);
        this.lv_quydinh_xu.setTouchEnabled(false);
        this.lv_quydinh_xu.setScrollBarEnabled(false);
        var array = guildShopExchangeXu();
        initRichText(this.lv_quydinh_xu, array);

        if (cc.sys.isNative) {
            //this.txt_vin_1.setPosition(cc.p(91,264));
            //this.lb_tile_vin_to_xu.setPosition(cc.p(350,264));
        }


    },

    RechargeVinToXu: function () {
        var str = this.tf_money_vin.getString();
        str = replaceAll(".", "", str);

        var xunhan = this.lb_xu_nhan_duoc.getString();
        xunhan = replaceAll(".", "", xunhan);
        if (str == null || str == "")
            str = 0;
        //cc.log("chuyen len " + parseInt(str));
        if (str == "") {
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập số "+GameManager.config.moneyNameUpper+" cần chuyển!");
        } else if (this.tf_money_vin.getString() != this.tf_money_again.getString()) {
             gI.popUp.openPanel_Alert_Lobby("Số "+GameManager.config.moneyNameUpper+" nhập lại chưa chính xác!");
        } else {
            if (parseInt(str) > userInfo.userData.moneyUse) {
                 gI.popUp.openPanel_Alert_Lobby("Bạn không đủ số dư để chuyển!");
            } else {
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn\nđổi " + formatMoney(0, 3, parseInt(str)) + " "+GameManager.config.moneyNameUpper+" thành " + formatMoney(0, 3, parseInt(xunhan)) + " XU không?", "ĐỒNG Ý", "HỦY", this.confirmRechargeVintoXu.bind(this), null);
            }

        }
    },
    confirmRechargeVintoXu: function () {
        this.btn_doi_xu.setEnabled(false);
        var str = this.tf_money_vin.getString();
        str = replaceAll(".", "", str);
        this.shopping.createLoadingNapVin();
        if (gI.mainSocket.listener.isLogged) {
            var rechargeXu = new CmdSendRechargeXu();
            rechargeXu.putRechargeXu(parseInt(str));
            gI.mainSocket.send(rechargeXu);
            rechargeXu.clean();
        } else {
            this.shopping.hideLoadingNapVin();
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            gI.mainSocket.connectSocket();;
        }
    },
    responseRechargeXu: function (error) {
        cc.log("error: " + error);
        this.shopping.hideLoadingNapVin();
        this.btn_doi_xu.setEnabled(true);
        if (error == 1) {
             gI.popUp.openPanel_Alert_Lobby("Chuyển "+GameManager.config.moneyName+" sang Xu thất bại!");
        } else if (error == 2) {
             gI.popUp.openPanel_Alert_Lobby("Bạn không đủ số dư để chuyển!");
        } else if (error == 3) {
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                 gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", menutab.shoppingLayer.gotoSercurity, null);
            }.bind(this))));
        } else if (error == 0) {
            openpn_otp("Vui lòng nhập mã OTP để hoàn tất chuyển "+GameManager.config.moneyName+" sang Xu!", 1, 4);
        } else if (error == 10) {
             gI.popUp.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau " + ConfigShopping.configHour + "h kích hoạt bảo mật thành công!");
        }
    },

    responseResultRechargeXu: function (error, currentVin, currentXu) {
        //cc.log("error: " + error + " currentVin : " + currentVin + " currentXu : "+ currentXu);
        this.shopping.hideLoadingNapVin();
        if (error == 0) {
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = currentVin;
                userInfo.userData.xuTotal = currentXu;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.userManager.lb_blance_xu.setString(formatMoney(0, 3, parseInt(userInfo.userData.xuTotal)));
                menutab.changeFontMoney();
            }
            this.tf_money_vin.setString("");
            this.tf_money_vin.setPlaceHolder("Nhập số "+GameManager.config.moneyName+" cần đổi");
            this.tf_money_vin.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_money_vin.runAction(cc.scaleTo(0.225, 1));

            this.tf_money_again.setString("");
            this.tf_money_again.setPlaceHolder("Nhập lại số "+GameManager.config.moneyName+" cần đổi");
            this.tf_money_again.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_money_again.runAction(cc.scaleTo(0.225, 1));

            this.lb_xu_nhan_duoc.setString("");

            gI.popUp.openPanel_Alert_Lobby("Giao dịch thành công!");
            funGetMoneyUse();
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Giao dịch thất bại!");
        } else if (error == 2) {
            gI.popUp.openPanel_Alert_Lobby("Bạn không đủ số dư!");
        }
    },

    onButtonRelease: function (button, id) {
        switch (id) {
            case NapXulayer.BTN_NAPXU_DOIXU:
                this.RechargeVinToXu();
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
        if ( editBox.getName() == "tf_money_vin" || editBox.getName() == "tf_money_again" ) {
            str = replaceAll(".", "", str);
            if (!isNumeric(str)) {
                str = str.substr(0, str.length - 1);
            }
            if (!isNumeric(str)) {
                str = "";
            }
            //if(str == "")
            //    str = 0;
            if (editBox.getName() == "tf_money_vin") {
                editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                if (parseInt(Number(str)) > 0)
                    this.lb_xu_nhan_duoc.setString(formatMoney(0, 3, parseInt(parseInt(str) * ConfigShopping.radio_xu)));
                else
                    this.lb_xu_nhan_duoc.setString("");
            } else if (editBox.getName() == "tf_money_again") {
                editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
            } else {
                editBox.setString(str);
            }
        }
    },

    editBoxTextChanged: function (editBox, text) {


    },

    editBoxReturn: function (editBox) {
        return;
    },



});

NapXulayer.BTN_NAPXU_DOIXU = 1;











