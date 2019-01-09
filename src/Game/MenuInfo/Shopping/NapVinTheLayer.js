/**
 * Created by B150M on 3/23/2018.
 */

var NapVinThelayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.numberFail = null;
        this.kind_card_mobile = "";
        this.provider = null;
        this.is_Vina = false;
        this.is_Mobile = false;
        this.is_Viettel = false;
        this.is_VietnamMobile = false;
        this.is_Bee = false;
        this.is_Zing = false;
        this.is_Gate = false;
        this.is_Vcoin = false;
        this.numberFail_vinplay = null;
    },

    customizeGUI: function () {
        this.createPnNapThe();
        this.CheckConFig();
    },

    CheckConFig: function () {

        var arrSelectThe = [];
        if (ConfigShopping.is_recharge == 0) {

            if(ConfigShopping.is_captcha_nap == 1){
                this.tf_captcha_nap.setVisible(false);
                this.sp_captcha_nap.setVisible(false);
                this.btn_refresh_nap.setVisible(false);

            }else{
                this.tf_captcha_nap.setVisible(true);
                this.sp_captcha_nap.setVisible(true);
                this.btn_refresh_nap.setVisible(true);

                this.shopping.parserDataCaptcha();

            }
            if (ConfigShopping.is_vin_card == 0) {
                var itemSelect = NapVinThelayer.arrInfoColomVincard[0];
                arrSelectThe.push(itemSelect);

            }
            if (ConfigShopping.is_recharge_card_game == 0) {
                for (var i = 0; i < NapVinThelayer.arrInfoColom.length; i++) {
                    if (ConfigShopping.home_network.indexOf(i) > -1 ) {
                        var itemSelect = NapVinThelayer.arrInfoColom[i];
                        arrSelectThe.push(itemSelect);

                    }
                }
                for(var i = 0; i < ConfigShopping.home_network.length; i++){
                    this.getHomeNetWork(ConfigShopping.home_network[i]);
                }
            }

            if (ConfigShopping.is_nap_mega_card == 0) {
                var itemSelect = NapVinThelayer.arrInfoColomMega[0];
                arrSelectThe.push(itemSelect);
            }
        }
        this.checkHistoryExchange();
        this.createPnSelectThe(arrSelectThe);
        this.shopping.hideLoadingNapVin();
    },

    createPnSelectThe: function (arr) {
        for (var k = 0; k < arr.length; k++) {
            this.addLayout(this.lv_select_the, "pn_select_the" + k, cc.p(0, 0), null, cc.size(278, 41), true);
            this["pn_select_the" + k].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this["pn_select_the" + k].setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this["pn_select_the" + k].setBackGroundColorOpacity(255);
            this.addButton(this["pn_select_the" + k], arr[k].nameButton, arr[k].tagButton, cc.p(139, 19), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this[arr[k].nameButton].ignoreContentAdaptWithSize(false);
            this[arr[k].nameButton].setContentSize(cc.size(272, 35));
            this[arr[k].nameButton].setTitleColor(GuiUtil.color("#000000"));
            this[arr[k].nameButton].setTitleFontSize(20);
            this[arr[k].nameButton].setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this[arr[k].nameButton].setTitleText(arr[k].txtBt);
        }
    },


    createPnNapThe: function () {
        this.addLayout(this, "pn_nap_the", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.addText(this.pn_nap_the, "txt_title_napthe", cc.p(522, 426), "NẠP THẺ ĐIỆN THOẠI, THẺ GAME VÀ THẺ "+GameManager.webViewLink.productName2, RobotoRegular.fontName, 30);
        this.txt_title_napthe.setColor(GuiUtil.color("#FFDF58"));
        this.txt_title_napthe.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txt_title_napthe.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addSprite(this.pn_nap_the, "bg", cc.p(240, 352), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_the, "lb_the_selected", cc.p(207.5, 354), "Thẻ Vinaphone                 ", RobotoRegular.fontName, 24);
        this.lb_the_selected.setColor(GuiUtil.color("#4D4D4D"));
        this.lb_the_selected.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_the_selected.ignoreContentAdaptWithSize(false);
        this.lb_the_selected.setContentSize(cc.size(260, 28));
        this.lb_the_selected.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addSprite(this.pn_nap_the, "sp_muiten", cc.p(397.5, 356.5), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
        this.addButton(this.pn_nap_the, "btn_select_the", NapVinThelayer.BTN_SELECT_ARROW, cc.p(242, 352.5), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_select_the.ignoreContentAdaptWithSize(false);
        this.btn_select_the.setContentSize(cc.size(351, 39));
        this.addSprite(this.pn_nap_the, "bg1", cc.p(240, 282), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addEditBox(this.pn_nap_the, "tf_serial", cc.p(238.5, 282), "", "Nhập số serial", RobotoRegular.fontName, 22, cc.size(330, 40), null, cc.TEXT_ALIGNMENT_LEFT,100);
        this.tf_serial.setFontColor(cc.color("#4D4D4D"));
        this.tf_serial.setName("tf_serial");
        this.addButton(this.pn_nap_the, "btn_clear_serial", NapVinThelayer.BTN_CLEAR_SERIAL, cc.p(441, 282), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
        this.addSprite(this.pn_nap_the, "bg2", cc.p(240, 212), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addEditBox(this.pn_nap_the, "tf_ma_the", cc.p(238.5, 212), "", "Nhập mã thẻ", RobotoRegular.fontName, 22, cc.size(330, 40), null, cc.TEXT_ALIGNMENT_LEFT, 100);
        this.tf_ma_the.setFontColor(cc.color("#4D4D4D"));
        this.tf_ma_the.setName("tf_ma_the");
        this.addButton(this.pn_nap_the, "btn_clear_mathe", NapVinThelayer.BTN_CLEAR_MATHE, cc.p(441, 212), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
        this.addEditBox(this.pn_nap_the, "tf_captcha_nap", cc.p(150, 142), "", "Mã xác nhận", RobotoRegular.fontName, 22, cc.size(178, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 3);
        this.tf_captcha_nap.setFontColor(cc.color.BLACK);
        this.addSprite(this.pn_nap_the, "sp_captcha_nap", cc.p(360, 142), res_Lobby + "/Default/Sprite.png");

        this.addButton(this.pn_nap_the, "btn_refresh_nap", NapVinThelayer.BTN_REFRSH, cc.p(460, 142), true, res_Lobby + "/btnRefresh.png", res_Lobby + "/btnRefresh.png");
        this.addButtonStructure(this.pn_nap_the, "btn_nap_the_dt", NapVinThelayer.BTN_NAP_THE_DT, cc.p(240, 77), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_nap_the, "lb_nap_the_btn", cc.p(240, 77), "NẠP THẺ", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_nap_the_btn.setColor(GuiUtil.color(162,105,64));
        this.addSprite(this.pn_nap_the, "bg_menhgia", cc.p(736, 220), res_ResourceMenuTab_Shopping + "/bg_menhgiathe.png");
        this.addListView(this.pn_nap_the, "lv_gia_the_nap", cc.p(736, 186.5), cc.size(463, 240));
        this.lv_gia_the_nap.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.lv_gia_the_nap.setBackGroundColor(GuiUtil.color("#9696FF"));
        this.lv_gia_the_nap.setBackGroundColorOpacity(0);
        this.lv_gia_the_nap.setScrollBarEnabled(false);
        this.lv_gia_the_nap.setTouchEnabled(false);
        this.lv_gia_the_nap.setScrollBarEnabled(false);

        this.addLayout(this.pn_nap_the, "pn_select_the", cc.p(211, 166), null, cc.size(280, 333), true);
        this.pn_select_the.setVisible(false);
        this.addButton(this.pn_select_the, "btn_close_select_the", NapVinThelayer.BTN_CLOSE_SELECT_THE, cc.p(446.5, 291), true, null, null);
        this.btn_close_select_the.ignoreContentAdaptWithSize(false);
        this.btn_close_select_the.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_select_the, "bg_pn_select_the", cc.p(140, 166.5), null, cc.size(278, 331), true);

        this.addListView(this.pn_select_the, "lv_select_the", cc.p(140, 166.5), cc.size(278, 331));
        this.lv_select_the.setScrollBarEnabled(false);
    },


    getHomeNetWork: function (value) {
        if (value == 0) {
            this.is_Viettel = true;
            return;
        } else if (value == 1) {
            this.is_Vina = true;
            return;
        } else if (value == 2) {
            this.is_Mobile = true;
            return;
        } else if (value == 3) {
            this.is_VietnamMobile = true;
            return;
        } else if (value == 4) {
            this.is_Bee = true;
            return;
        } else if (value == 5) {
            this.is_Gate = true;
            return;
        } else if (value == 6) {
            this.is_Zing = true;
            return;
        } else if (value == 7) {
            this.is_Vcoin = true;
            return;
        }
    },

    RechargeVinplayCard: function () {
        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if (serial == null || serial == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
        else if (serial.length < 5 || serial.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
        else if (mathe == null || mathe == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
        else if (mathe.length < 5 || mathe.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
        else if (captcha == null || captcha == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã xác nhận!");
        else {
            if (this.numberFail_vinplay == (ConfigShopping.num_recharge_fail - 1) || this.numberFail_vinplay == (ConfigShopping.num_recharge_fail - 2)) {
                gI.popUp.open_panel_message_confirm("Thông báo","Bạn đã nạp sai " + this.numberFail_vinplay + " lần liên tiếp.\nNếu nạp sai " + ConfigShopping.num_recharge_fail
                    + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVinplayCard, null);
            } else {
                this.confirmRechargeVinplayCard();
            }
        }
    },
    confirmRechargeVinplayCard: function () {

        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if(ConfigShopping.is_payment_socket_card == 0){
            if (gI.mainSocket.listener.isLogged) {
                this.shopping.createLoadingNapVin();
                var rechargeVin = new CmdSendRechargeVinPlayCard();
                rechargeVin.putRechargeVinPlayCard(serial, mathe, captcha, this.shopping.idcaptcha);
                gI.mainSocket.send(rechargeVin);
                rechargeVin.clean();

                this.btn_nap_the_dt.setEnabled(false);
                userGameData.setItem("history_nap_the", "vincard");
                this.shopping.parserDataCaptcha();
            } else {
                this.shopping.hideLoadingNapVin();
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        }else{
            this.callApiNap("vincard", captcha, this.shopping.idcaptcha, serial, mathe,1000);
            this.shopping.parserDataCaptcha();
        }

    },

    responseRechargeVinplayCard: function (error, currentMoney, timefail, numberfail) {
        this.shopping.hideLoadingNapVin();
        cc.log("error nap the vinplay: " + error + " currentMoney: " + currentMoney + " timefail: " + timefail + " intfail: " + numberfail);
        this.numberFail_vinplay = numberfail;
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
             gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo.userData == null) {
            } else {
                userInfo.userData.vinTotal = currentMoney;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
             gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 30) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
             gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 36) {
             gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 37 || error == 38) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
        } else if (error == 39) {
             gI.popUp.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ " + GameManager.webViewLink.productName+" Card!");
        } else if (error == 8) {
             gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + formartHourMinus(timefail));
        }else if (error == 11) {
             gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }

    },



    RechargeMegaCard: function () {
        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if (serial == null || serial == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
        else if (serial.length < 5 || serial.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
        else if (mathe == null || mathe == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
        else if (mathe.length < 5 || mathe.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
        else if (captcha == null || captcha == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã xác nhận!");
        else {
            if (this.numberFail_mega == (ConfigShopping.num_recharge_fail - 1) || this.numberFail_mega == (ConfigShopping.num_recharge_fail - 2)) {
                gI.popUp.open_panel_message_confirm("Thông báo","Bạn đã nạp sai " + this.numberFail_mega + " lần liên tiếp.\nNếu nạp sai " + ConfigShopping.num_recharge_fail
                    + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVinplayCard, null);
            } else {
                this.confirmRechargeMegaCard();
            }
        }
    },
    confirmRechargeMegaCard: function () {
        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if(ConfigShopping.is_payment_socket_card == 0){
            if (gI.mainSocket.listener.isLogged) {
                this.shopping.createLoadingNapVin();
                var rechargeMega = new CmdSendRechargeMegaCard();
                rechargeMega.putdata(serial, mathe, captcha, this.shopping.idcaptcha);
                gI.mainSocket.send(rechargeMega);
                rechargeMega.clean();
                this.btn_nap_the_dt.setEnabled(false);
                userGameData.setItem("history_nap_the", "megacard");
                this.shopping.parserDataCaptcha();
            } else {
                this.shopping.hideLoadingNapVin();
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        }else{
            this.callApiNap("megacard", captcha, this.shopping.idcaptcha, serial, mathe,1000);
            this.shopping.parserDataCaptcha();
        }

    },
    responseRechargeMegaCard: function (error, currentMoney, timefail, numberfail) {
        this.shopping.hideLoadingNapVin();
        cc.log("error nap the mega: " + error + " currentMoney: " + currentMoney + " timefail: " + timefail + " intfail: " + numberfail);
        this.numberFail_mega = numberfail;
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
             gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = currentMoney;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
             gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 30) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
             gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 36) {
             gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 37 || error == 38) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
        } else if (error == 39) {
             gI.popUp.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ " + GameManager.webViewLink.productName+" Card!");
        } else if (error == 8) {
             gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + formartHourMinus(timefail));
        }else if (error == 11) {
             gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }
    },

    RechargeVinFromCard: function () {
        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if (this.kind_card_mobile == "viettel")
            this.provider = 0;
        else if (this.kind_card_mobile == "vina")
            this.provider = 1;
        else if (this.kind_card_mobile == "mobi")
            this.provider = 2;
        else if (this.kind_card_mobile == "vnmobile")
            this.provider = 3;
        else if (this.kind_card_mobile == "vbee")
            this.provider = 4;
        else if (this.kind_card_mobile == "gate")
            this.provider = 5;
        else if (this.kind_card_mobile == "zingxu")
            this.provider = 6;
        else if (this.kind_card_mobile == "vcoin")
            this.provider = 7;
        //cc.log("provide :" + this.provider);

        if (this.provider == null || this.provider > 8 || this.provider < 0)
             gI.popUp.openPanel_Alert_Lobby("Vui lòng chọn nhà mạng!");
        else if (serial == null || serial == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
        else if (serial.length < 5 || serial.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
        else if (mathe == null || mathe == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
        else if (mathe.length < 5 || mathe.length > 20)
             gI.popUp.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
        else if (captcha == null || captcha == "")
             gI.popUp.openPanel_Alert_Lobby("Vui lòng nhập mã xác nhận!");
        else {
            if (this.numberFail == (ConfigShopping.num_recharge_fail - 1) || this.numberFail == (ConfigShopping.num_recharge_fail - 2)) {
                gI.popUp.open_panel_message_confirm("Thông báo","Bạn đã nạp sai " + this.numberFail + " lần liên tiếp.\nNếu nạp sai " + ConfigShopping.num_recharge_fail
                    + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVin, null);
            } else {
                this.confirmRechargeVin();
            }
        }
    },
    confirmRechargeVin: function () {
        var serial = this.tf_serial.getString();
        var mathe = this.tf_ma_the.getString();
        var captcha = this.tf_captcha_nap.getString();

        if(ConfigShopping.is_payment_socket_card == 0){
            if (gI.mainSocket.listener.isLogged) {
                this.shopping.createLoadingNapVin();
                //cc.log("gui nap the");
                var rechargeVin = new CmdSendRechargeVin();
                rechargeVin.putRechargeVin(this.provider, serial, mathe,captcha, this.shopping.idcaptcha);
                gI.mainSocket.send(rechargeVin);
                rechargeVin.clean();
                this.btn_nap_the_dt.setEnabled(false);
                userGameData.setItem("history_nap_the", this.kind_card_mobile);
                this.shopping.parserDataCaptcha();
            } else {
                this.shopping.hideLoadingNapVin();
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        }else{
            this.callApiNap("napthe", captcha, this.shopping.idcaptcha, serial, mathe,this.provider);
            this.shopping.parserDataCaptcha();
        }

    },




    responseRechargeVin: function (error, currentMoney, timefail, numberfail) {
        this.shopping.hideLoadingNapVin();
        cc.log("error nap the: " + error + " currentMoney: " + currentMoney + " timefail: "+ timefail + " intfail: " + numberfail);
        this.numberFail = numberfail;
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
             gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = currentMoney;
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
        } else if (error == 30) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
             gI.popUp.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
             gI.popUp.openPanel_Alert_Lobby("Mã thẻ không đúng!");
        } else if (error == 36) {
             gI.popUp.openPanel_Alert_Lobby("Số serial không đúng!");
        } else if (error == 8) {
             gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + formartHourMinus(timefail));
        }
        else if (error == 11) {
             gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }
    },

    checkHistoryExchange : function(){
        var history = userGameData.getItem("history_nap_the");
        if (history != null && history != undefined && history != "undefined" && history != "null" && history != "") {
            if(history == "viettel")
                this.lb_the_selected.setString("Thẻ Viettel");
            else if(history == "vina")
                this.lb_the_selected.setString("Thẻ Vinaphone");
            else if(history == "mobi")
                this.lb_the_selected.setString("Thẻ Mobifone");
            else if(history == "zingxu")
                this.lb_the_selected.setString("Thẻ ZingXu");
            else if(history == "vcoin")
                this.lb_the_selected.setString("Thẻ VCoin");
            else if(history == "vnmobile")
                this.lb_the_selected.setString("Thẻ VietNamMobile");
            else if(history == "vbee")
                this.lb_the_selected.setString("Thẻ G Mobile");
            else if(history == "gate")
                this.lb_the_selected.setString("Thẻ Gate");
            else if(history == "vincard")
                this.lb_the_selected.setString("Thẻ " + GameManager.webViewLink.productName);
            else if(history == "megacard")
                this.lb_the_selected.setString("Thẻ Mega");

            this.kind_card_mobile = history;
        }else{
            this.lb_the_selected.setString("Thẻ Viettel");
            this.kind_card_mobile = "viettel";
        }
        this.current_menu_shop = "napvin";
        this.openPanel_NapThe();
        this.LoadMenhGiaThe(this.kind_card_mobile);
    },

    openPanel_NapThe: function () {
        if (this.kind_card_mobile == "vina") {
            this.lb_the_selected.setString("Thẻ Vinaphone");
        } else if (this.kind_card_mobile == "mobi") {
            this.lb_the_selected.setString("Thẻ Mobifone");
        } else if (this.kind_card_mobile == "viettel") {
            this.lb_the_selected.setString("Thẻ Viettel");
        } else if (this.kind_card_mobile == "zingxu") {
            this.lb_the_selected.setString("Thẻ ZingXu");
        } else if (this.kind_card_mobile == "vcoin") {
            this.lb_the_selected.setString("Thẻ VCoin");
        } else if (this.kind_card_mobile == "vnmobile") {
            this.lb_the_selected.setString("Thẻ VietNamMobile");
        } else if (this.kind_card_mobile == "gate") {
            this.lb_the_selected.setString("Thẻ Gate");
        } else if (this.kind_card_mobile == "vbee") {
            this.lb_the_selected.setString("Thẻ G Mobile");
        } else if (this.kind_card_mobile == "vincard") {
            this.lb_the_selected.setString("Thẻ " + GameManager.webViewLink.productName);
        } else if (this.kind_card_mobile == "megacard") {
            this.lb_the_selected.setString("Thẻ Mega");
        }
    },


    LoadMenhGiaThe: function (str) {
        var array = "";
        this.lv_gia_the_nap.removeAllItems();
        if (str == "vina" || str == "mobi" || str == "viettel" || str == "vcoin" || str == "vnmobile" || str == "vbee") {
            array = [0, 1, 2, 3, 4, 5];
            if(str == "vcoin")
                array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.txt_title_napthe.setString("NẠP THẺ ĐIỆN THOẠI");
        } else if (str == "vincard") {
            array = [0, 1, 2, 3, 4, 5, 6, 7];
            this.txt_title_napthe.setString("NẠP THẺ " + GameManager.webViewLink.productName2);
        } else if (str == "megacard") {
            array = [0, 1, 2, 3, 4, 5, 6, 7];
            this.txt_title_napthe.setString("NẠP THẺ MEGA");
        } else {
            array = [1, 2, 3, 4, 5, 6, 7, 8];
            this.txt_title_napthe.setString("NẠP THẺ GAME");
        }
        //cc.log("array : " + array);

        var cellHeight = 30;
        var positionY = 12;
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        for (var i = 0; i < array.length; i++) {
            var cl1 = new ccui.Layout();
            cl1.height = cellHeight;
            cl1.width = this.lv_gia_the_nap.width;

            var lbMenhGia = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbMenhGia.setPosition(cc.p(70, positionY));
            var menhgia = getMenhGiaThe(array[i]);
            lbMenhGia.setString(formatMoney(0, 3, menhgia));
            lbMenhGia.setColor(GuiUtil.color("#e8daad"));

            var lbKhuyenMai = new cc.LabelTTF('', fonts.fontName, 14, cc.size(137, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbKhuyenMai.setPosition(cc.p(210, positionY));
            if (str == "vincard") {
                lbKhuyenMai.setString(((ConfigShopping.ratio_vin_card * 100).toFixed(0) - 100) + "%");
                lbKhuyenMai.setColor(GuiUtil.color("#e8daad"));
            } else if (str == "megacard") {
                lbKhuyenMai.setString(((ConfigShopping.ratio_nap_mega_card * 100).toFixed(0) - 100) + "%");
                lbKhuyenMai.setColor(GuiUtil.color("#e8daad"));
            } else {
                lbKhuyenMai.setString(((ConfigShopping.radio_vin * 100).toFixed(0) - 100) + "%");
                lbKhuyenMai.setColor(GuiUtil.color("#e8daad"));
            }

            var lbVin = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbVin.setPosition(cc.p(370, positionY));
            if (str == "vincard")
                var heso = menhgia * ConfigShopping.ratio_vin_card;
            else if (str == "megacard")
                var heso = menhgia * ConfigShopping.ratio_nap_mega_card;
            else
                var heso = menhgia * ConfigShopping.radio_vin;
            lbVin.setString(formatMoney(0, 3, heso.toFixed(0)));
            lbVin.setColor(GuiUtil.color("#FFFF00"));

            cl1.addChild(lbMenhGia);
            cl1.addChild(lbKhuyenMai);
            cl1.addChild(lbVin);

            this.lv_gia_the_nap.pushBackCustomItem(cl1);
        }



    },


    funRechargeBank: function () {
        if (this.save_select_bank == null)
             gI.popUp.openPanel_Alert_Lobby("Vui lòng lựa chọn ngân hàng của bạn!");
        else if (this.save_menhgia_bank == null)
             gI.popUp.openPanel_Alert_Lobby("Vui lòng lựa chọn mệnh giá bạn muốn nạp!");
        else {
            this.shopping.createLoadingNapVin();
            if (gI.mainSocket.listener.isLogged) {
                var rechargeBank = new CmdSendRechargeBank();
                rechargeBank.putRechargeBank(this.save_select_bank, this.save_menhgia_bank);
                //cc.log("bank : " + this.save_select_bank + " menh gia: " + this.save_menhgia_bank);
                gI.mainSocket.send(rechargeBank);
                rechargeBank.clean();
            } else {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        }
    },
    responseRechargeBank: function (error, url) {
        //cc.log("error nap bank : " + error + " url : " + url );
        this.shopping.hideLoadingNapVin()
        if (error == 1)
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
        else if (error == 3)
             gI.popUp.openPanel_Alert_Lobby("Hiện tại ngân hàng này đang không hỗ trợ!");
        else if (error == 0) {
            if (cc.sys.isNative) {
                ConnectNative.openWebView(url, false);
            } else {
                window.location = url;
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


    onButtonRelease: function (button, id) {
        switch (id) {
            case NapVinThelayer.BTN_SELECT_ARROW:
                this.pn_select_the.setVisible(true);
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 1));
                this.tf_serial.setVisible(false);
                this.tf_ma_the.setVisible(false);
                break;
            case NapVinThelayer.BTN_CLOSE_SELECT_THE:
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VINA:
                if (this.is_Vina == true) {
                    this.lb_the_selected.setString("Thẻ Vinaphone");
                    this.kind_card_mobile = "vina";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_MOBI:
                if (this.is_Mobile == true) {
                    this.lb_the_selected.setString("Thẻ Mobifone");
                    this.kind_card_mobile = "mobi";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VIETTEL:
                if (this.is_Viettel == true) {
                    this.lb_the_selected.setString("Thẻ Viettel");
                    this.kind_card_mobile = "viettel";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_ZING:
                if (this.is_Zing == true) {
                    this.lb_the_selected.setString("Thẻ ZingXu");
                    this.kind_card_mobile = "zingxu";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VCOIN:
                if (this.is_Vcoin == true) {
                    this.lb_the_selected.setString("Thẻ VCoin");
                    this.kind_card_mobile = "vcoin";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VNMOBILE:
                if (this.is_VietnamMobile == true) {
                    this.lb_the_selected.setString("Thẻ VietNamMobile");
                    this.kind_card_mobile = "vnmobile";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VBEE:
                if (this.is_Bee == true) {
                    this.lb_the_selected.setString("Thẻ G Mobile");
                    this.kind_card_mobile = "vbee";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_GATE:
                if (this.is_Gate == true) {
                    this.lb_the_selected.setString("Thẻ Gate");
                    this.kind_card_mobile = "gate";
                    this.LoadMenhGiaThe(this.kind_card_mobile);
                } else
                     gI.popUp.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_VIN_CARD:
                this.lb_the_selected.setString("Thẻ " + GameManager.config.moneyName+ "play");
                this.kind_card_mobile = "vincard";
                this.LoadMenhGiaThe(this.kind_card_mobile);
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_SELECT_MEGA_CARD:
                this.lb_the_selected.setString("Thẻ Mega");
                this.kind_card_mobile = "megacard";
                this.LoadMenhGiaThe(this.kind_card_mobile);
                this.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                this.pn_select_the.setVisible(false);
                this.tf_serial.setVisible(true);
                this.tf_ma_the.setVisible(true);
                break;
            case NapVinThelayer.BTN_NAP_THE_DT:
                if (this.kind_card_mobile == "vincard")
                    this.RechargeVinplayCard();
                else if (this.kind_card_mobile == "megacard")
                    this.RechargeMegaCard();
                else
                    this.RechargeVinFromCard();
                break;

            case NapVinThelayer.BTN_CLEAR_SERIAL:
                this.tf_serial.setString("");
                this.tf_serial.setPlaceHolder("Nhập số serial");
                this.btn_clear_serial.setVisible(false);
                this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_serial.runAction(cc.scaleTo(0.225, 1));
                break;
            case NapVinThelayer.BTN_CLEAR_MATHE:
                this.tf_ma_the.setString("");
                this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
                this.btn_clear_mathe.setVisible(false);
                this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
                break;
            case NapVinThelayer.BTN_REFRSH:
                this.shopping.parserDataCaptcha();
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

    editBoxTextChanged: function (editBox, text) {


    },

    editBoxReturn: function (editBox) {
        return;
    },
    callApiNap: function (kind, captcha, captchaId, serial, pin, provider) {
        var url = "";
        var callback = null;
        if (kind == "vincard") {
            url = urlnapVinCard(captcha, captchaId, serial, pin, userInfo.userData.nickname, lobby.platform)
            callback = this.callbackNapVinCard.bind(this);
        }else if (kind == "megacard") {
            url = urlnapMegaCard(captcha, captchaId, serial, pin, userInfo.userData.nickname, lobby.platform)
            callback = this.callbackMegaCard.bind(this);
        }else {
            url = urlnapTheDienThoai(captcha, captchaId, serial, pin, provider, userInfo.userData.nickname, lobby.platform)
            callback = this.callbackNapThe.bind(this);
        }

        sendRequest(url, null, false, callback, this.shopping.callBackError.bind(this));
    },

    callbackNapThe : function(response){
        var jsonData = JSON.parse(response);
        var error = jsonData["error"];
        this.numberFail = jsonData["numberFail"];
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
            gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = jsonData["currentMoney"];
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
        } else if (error == 30) {
            gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
            gI.popUp.openPanel_Alert_Lobby("Mã thẻ không đúng!");
        } else if (error == 36) {
            gI.popUp.openPanel_Alert_Lobby("Số serial không đúng!");
        } else if (error == 8) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info_test.formartHourMinus(jsonData["timefail"]));
        } else if (error == 11) {
            gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }
    },
    callbackNapVinCard : function(response){
        var jsonData = JSON.parse(response);
        var error = jsonData["error"];
        this.numberFail_vinplay = jsonData["numberfail"];
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
            gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = jsonData["currentMoney"];
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 30) {
            gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
            popup.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
            gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 36) {
            gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 37 || error == 38) {
            gI.popUp.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
        } else if (error == 39) {
            gI.popUp.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ " + GameManager.webViewLink.productName+" Card!");
        } else if (error == 8) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info_test.formartHourMinus(jsonData["timefail"]));
        }else if (error == 11) {
            gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }

    },
    callbackMegaCard : function(response){
        var jsonData = JSON.parse(response);
        var error = jsonData["error"];
        this.numberFail_mega = jsonData["numberfail"];
        this.btn_nap_the_dt.setEnabled(true);
        if (error == 0) {
            gI.popUp.openPanel_Alert_Lobby("Nạp thẻ thành công!");
            if (userInfo == null) {
            } else {
                userInfo.userData.vinTotal = jsonData["currentMoney"];
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
            funGetMoneyUse();

            this.tf_serial.setString("");
            this.tf_serial.setPlaceHolder("Nhập số serial");
            this.tf_serial.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_serial.runAction(cc.scaleTo(0.225, 1));

            this.tf_ma_the.setString("");
            this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
            this.tf_ma_the.setColor(GuiUtil.color("#FFFFFF"));
            this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
        } else if (error == 1) {
            gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 30) {
            gI.popUp.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
        } else if (error == 31) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
        } else if (error == 32) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
        } else if (error == 33) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
        } else if (error == 34) {
            gI.popUp.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
        } else if (error == 35) {
            gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 36) {
            gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
        } else if (error == 37 || error == 38) {
            gI.popUp.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
        } else if (error == 39) {
            gI.popUp.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ " + GameManager.webViewLink.productName+" Card!");
        } else if (error == 8) {
            gI.popUp.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info_test.formartHourMinus(jsonData["timefail"]));
        }else if (error == 11) {
            gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }
    }


});
NapVinThelayer.BTN_NAP_THE_DT = 1;
NapVinThelayer.BTN_SELECT_ARROW = 2;
NapVinThelayer.BTN_CLOSE_SELECT_THE =3;
NapVinThelayer.BTN_SELECT_VINA = 4;
NapVinThelayer.BTN_SELECT_MOBI = 5;
NapVinThelayer.BTN_SELECT_VIETTEL = 6;
NapVinThelayer.BTN_SELECT_ZING = 7;
NapVinThelayer.BTN_SELECT_VCOIN = 8;
NapVinThelayer.BTN_SELECT_VNMOBILE = 9;
NapVinThelayer.BTN_SELECT_VBEE = 10;
NapVinThelayer.BTN_SELECT_GATE = 11;
NapVinThelayer.BTN_SELECT_MEGA_CARD = 12;
NapVinThelayer.BTN_CLEAR_SERIAL = 13;
NapVinThelayer.BTN_CLEAR_MATHE = 14;
NapVinThelayer.BTN_REFRSH = 15;

NapVinThelayer.arrInfoColom = [

    {
        name: "btn_vietel",
        image: res_ResourceMenuTab_Shopping + "/TheDT/vietel.png",
        tag: NapVinThelayer.BTN_SHOP_VIETTEL,
        tagButton: NapVinThelayer.BTN_SELECT_VIETTEL,
        nameButton: "btn_select_viettel",
        txtBt: "Thẻ Viettel",
        ratio: 1
    },
    {
        name: "btn_vinaphone",
        image: res_ResourceMenuTab_Shopping + "/TheDT/vina.png",
        tag: NapVinThelayer.BTN_SHOP_VINA,
        tagButton: NapVinThelayer.BTN_SELECT_VINA,
        nameButton: "btn_select_vina",
        txtBt: "Thẻ Vinaphone",
        ratio: 1
    },
    {
        name: "btn_mobilecard",
        image: res_ResourceMenuTab_Shopping + "/TheDT/mobi.png",
        tag: NapVinThelayer.BTN_SHOP_MOBI,
        tagButton: NapVinThelayer.BTN_SELECT_MOBI,
        nameButton: "btn_select_mobi",
        txtBt: "Thẻ Mobifone",
        ratio: 1
    },
    {
        name: "btn_vietnameMobile",
        image: res_ResourceMenuTab_Shopping + "/TheDT/The_vietnamMobile.png",
        tag: NapVinThelayer.BTN_SHOP_VNMOBILE,
        tagButton: NapVinThelayer.BTN_SELECT_VNMOBILE,
        nameButton: "btn_select_vnMobile",
        txtBt: "Thẻ VietNamMobile",
        ratio: 1
    },
    {
        name: "btn_BeeLine",
        image: res_ResourceMenuTab_Shopping + "/TheDT/The_bee.png",
        tag: NapVinThelayer.BTN_SHOP_BEELINE,
        tagButton: NapVinThelayer.BTN_SELECT_VBEE,
        nameButton: "btn_select_vBee",
        txtBt: "Thẻ G Mobile",
        ratio: 1
    },

    {
        name: "btn_gate",
        image: res_ResourceMenuTab_Shopping + "/TheDT/The_gate.png",
        tag: NapVinThelayer.BTN_SHOP_GATE,
        tagButton: NapVinThelayer.BTN_SELECT_GATE,
        nameButton: "btn_select_Gate",
        txtBt: "Thẻ Gate",
        ratio: 1
    },
    {
        name: "btn_zing_xu",
        image: res_ResourceMenuTab_Shopping + "/TheDT/ZingXu.png",
        tag: NapVinThelayer.BTN_SHOP_ZING,
        tagButton: NapVinThelayer.BTN_SELECT_ZING,
        nameButton: "btn_select_zingxu",
        txtBt: "Thẻ ZingXu",
        ratio: 1
    },
    {
        name: "btn_vcoin",
        image: res_ResourceMenuTab_Shopping + "/TheDT/Vcoin.png",
        tag: NapVinThelayer.BTN_SHOP_VCOIN,
        tagButton: NapVinThelayer.BTN_SELECT_VCOIN,
        nameButton: "btn_select_vcoin",
        txtBt: "Thẻ VCoin",
        ratio: 1
    },

];





NapVinThelayer.arrInfoColomVincard = [
    {
        name: "btn_nap_VinCard",
        image: res_ResourceMenuTab_Shopping + "/TheDT/vin_card.png",
        tag: NapVinThelayer.BTN_SHOP_NAP_VIN_CARD,
        tagButton: NapVinThelayer.BTN_SELECT_VIN_CARD,
        nameButton: "btn_select_VinCard",
        txtBt: "Thẻ "+GameManager.webViewLink.productName,
        ratio: 1
    },
];
NapVinThelayer.arrInfoColomMega = [
    {
        name: "btn_nap_megaCard",
        image: res_ResourceMenuTab_Shopping + "/TheDT/MegaCard.png",
        tag: NapVinThelayer.BTN_SHOP_NAP_MEGA,
        tagButton: NapVinThelayer.BTN_SELECT_MEGA_CARD,
        nameButton: "btn_select_megaCard",
        txtBt: "Thẻ Mega",
        ratio: 1
    }
];










