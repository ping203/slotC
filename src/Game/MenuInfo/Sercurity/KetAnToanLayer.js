/**
 * Created by B150M on 3/23/2018.
 */
var KetAnToanLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            this.type_safe = 1;
            ConfigSercurity.type_otp = 0;
            this.saveOtp_ketsat = null;
            return true;
        },

        customizeGUI: function () {
            this.addLayout(this, "pn_ket_an_toan", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.addText(this.pn_ket_an_toan, "txt5", cc.p(517.5, 425.75), "KÉT AN TOÀN", RobotoRegular.fontName, 30);
            this.txt5.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_ket_an_toan, "lb1", cc.p(306, 382), "Tên nhân vật:", RobotoRegular.fontName, 20);
            this.addText(this.pn_ket_an_toan, "lb_account_ketsat", cc.p(487, 382), "mintkute", RobotoRegular.fontName, 20);
            this.lb_account_ketsat.setString(userInfo.userData.nickname);
            this.addText(this.pn_ket_an_toan, "lb2", cc.p(317.5, 354), "Số dư khả dụng:", RobotoRegular.fontName, 20);
            this.addText(this.pn_ket_an_toan, "lb_value_kha_dung_ketsat", cc.p(532.5, 354), "0", RobotoRegular.fontName, 20);
            this.lb_value_kha_dung_ketsat.setColor(cc.color.YELLOW);
            this.lb_value_kha_dung_ketsat.ignoreContentAdaptWithSize(false);
            this.lb_value_kha_dung_ketsat.setContentSize(cc.size(246, 23));
            this.lb_value_kha_dung_ketsat.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
            this.addText(this.pn_ket_an_toan, "lb2_0", cc.p(323.5, 325), "Số dư đóng băng: ", RobotoRegular.fontName, 20);
            this.addText(this.pn_ket_an_toan, "lb_value_dong_bang_ketsat", cc.p(532.5, 325), "0", RobotoRegular.fontName, 20);
            this.lb_value_dong_bang_ketsat.setColor(cc.color.YELLOW);
            this.lb_value_dong_bang_ketsat.ignoreContentAdaptWithSize(false);
            this.lb_value_dong_bang_ketsat.setContentSize(cc.size(246, 23));
            this.lb_value_dong_bang_ketsat.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, userInfo.userData.safe));
            this.addText(this.pn_ket_an_toan, "lb2_1", cc.p(311, 294), "Chọn thao tác:", RobotoRegular.fontName, 20);
            this.addCheckBox(this.pn_ket_an_toan, "ck_dong_bang", cc.p(400.5, 296.5), true, res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png");
            this.addText(this.pn_ket_an_toan, "lb2_1_0", cc.p(487, 294), "Đóng băng " + GameManager.config.moneyName + "", RobotoRegular.fontName, 20);
            this.addCheckBox(this.pn_ket_an_toan, "ck_mo_dong_bang", cc.p(594.5, 296.5), false, res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png");
            this.addText(this.pn_ket_an_toan, "lb2_1_0_0", cc.p(697, 294), "Mở đóng băng " + GameManager.config.moneyName + "", RobotoRegular.fontName, 20);
            this.addSprite(this.pn_ket_an_toan, "bg2", cc.p(517.5, 237), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.bg2.setScaleX(1.16);
            this.addEditBox(this.pn_ket_an_toan, "tf_vin_ketsat", cc.p(518, 237), "", "Nhập số " + GameManager.config.moneyName + " cần đóng băng / mở đóng băng", RobotoRegular.fontName, 20, cc.size(408, 40), null, cc.TEXT_ALIGNMENT_LEFT, 15);
            this.tf_vin_ketsat.setName("tf_vin_ketsat");
            this.tf_vin_ketsat.setFontColor(cc.color("#3E3E3E"));
            this.tf_vin_ketsat.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(720, 100));
            uiRichGold.setPosition(570, 85);

            if (lobby.is_otp == 1) {
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "", RobotoRegular.fontName, 20);

                uiRichGold.pushBackElement(lbgold);
            } else {
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "SMS OTP :", RobotoRegular.fontName, 20);
                var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255, " Vui lòng soạn tin", RobotoRegular.fontName, 20);
                var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, GameManager.webViewLink.OTPMessage, RobotoRegular.fontName, 20);
                var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255, " gửi", RobotoRegular.fontName, 20);
                var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " " + lobby.sms_otp, RobotoRegular.fontName, 20);
                var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255, " để nhận mã xác thực", RobotoRegular.fontName, 20);

                uiRichGold.pushBackElement(lbgold);
                uiRichGold.pushBackElement(lbgold1);
                uiRichGold.pushBackElement(lbgold2);
                uiRichGold.pushBackElement(lbgold3);
                uiRichGold.pushBackElement(lbgold4);
                uiRichGold.pushBackElement(lbgold5);
            }
            this.pn_ket_an_toan.addChild(uiRichGold);

            var uiRichGold2 = new ccui.RichText();
            uiRichGold2.ignoreContentAdaptWithSize(false);
            uiRichGold2.setContentSize(cc.size(720, 100));
            uiRichGold2.setPosition(570, 60);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "APP OTP :", RobotoRegular.fontName, 20);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255, " Nếu bạn đã cài", RobotoRegular.fontName, 20);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " APP OTP", RobotoRegular.fontName, 20);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255, ". Vui lòng bật", RobotoRegular.fontName, 20);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " APP OTP", RobotoRegular.fontName, 20);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255, " để lấy mã xác thực", RobotoRegular.fontName, 20);

            uiRichGold2.pushBackElement(lbgold);
            uiRichGold2.pushBackElement(lbgold1);
            uiRichGold2.pushBackElement(lbgold2);
            uiRichGold2.pushBackElement(lbgold3);
            uiRichGold2.pushBackElement(lbgold4);
            uiRichGold2.pushBackElement(lbgold5);
            this.pn_ket_an_toan.addChild(uiRichGold2);

            this.addButtonStructure(this.pn_ket_an_toan, "btn_tiep_tuc_ketsat", KetAnToanLayer.BTN_TIEPTUC_KETSAT, cc.p(517.5, 41), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_ket_an_toan, "t21", cc.p(517.5, 41), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t21.setColor(GuiUtil.color(162, 105, 64));

            this.addLayout(this.pn_ket_an_toan, "pn_otp_ket_sat", cc.p(541, 156), null, cc.size(0, 0), true);
            this.pn_otp_ket_sat.setVisible(false);
            this.pn_otp_ket_sat.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_otp_ket_sat.setBackGroundColor(GuiUtil.color("#96C8FF"));
            this.pn_otp_ket_sat.setBackGroundColorOpacity(0.4 * 254);
            this.addSprite(this.pn_otp_ket_sat, "bg3", cc.p(-121, 13), res_ResourceMenuTab_Mail + '/maxacnhan.png');
            this.addText(this.pn_otp_ket_sat, "lb_sms_app_ketsat", cc.p(-128, 11), "SMS OTP", RobotoRegular.fontName, 25);
            this.lb_sms_app_ketsat.setColor(GuiUtil.color("#4D4D4D"));
            this.addSprite(this.pn_otp_ket_sat, "sp_muiten", cc.p(-32, 14), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
            if (lobby.is_otp == 1) {
                this.lb_sms_app_ketsat.setString("APP OTP");
                this.sp_muiten.setVisible(false);
                ConfigSercurity.type_otp = 1;
            }
            this.addButton(this.pn_otp_ket_sat, "btn_sms_app_ketsat", KetAnToanLayer.BTN_SMS_APP_KETSAT, cc.p(-120.5, 13), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_sms_app_ketsat.ignoreContentAdaptWithSize(false);
            this.btn_sms_app_ketsat.setContentSize(cc.size(211, 39));
            this.addSprite(this.pn_otp_ket_sat, "bg4", cc.p(97, 14), res_ResourceMenuTab_Mail + '/maxacnhan.png');
            this.bg4.setScaleX(0.8);
            this.addEditBox(this.pn_otp_ket_sat, "tf_ma_ketsat", cc.p(97, 14), "", "Mã OTP", RobotoRegular.fontName, 25, cc.size(167, 40), null, cc.TEXT_ALIGNMENT_CENTER, 5);
            this.tf_ma_ketsat.setFontColor(cc.color("#3E3E3E"));
            this.ck_dong_bang.addEventListener(this.DongBangKetSat.bind(this));
            this.ck_mo_dong_bang.addEventListener(this.MoDongBangKetSat.bind(this));

            this.createPSMS();

        },
        createPSMS: function () {
            this.addLayout(this, "pn_sms_app", cc.p(541.5, 179), null, cc.size(218, 88), true);
            this.pn_sms_app.setLocalZOrder(5000);
            this.pn_sms_app.setVisible(false);
            this.pn_sms_app.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_sms_app.setTag(KetAnToanLayer.BTN_CLOSE_SMS_APP);
            this.addButton(this.pn_sms_app, "btn_close_sms_app", KetAnToanLayer.BTN_CLOSE_SMS_APP, cc.p(108, 173), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_close_sms_app.ignoreContentAdaptWithSize(false);
            this.btn_close_sms_app.setContentSize(cc.size(2560, 2000));

            this.addLayout(this.pn_sms_app, "Panel_77", cc.p(109, 44), null, cc.size(216, 86), true);
            this.Panel_77.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.Panel_77.setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this.Panel_77.setBackGroundColorOpacity(254);
            this.addButton(this.pn_sms_app, "btn_bm_sms", KetAnToanLayer.BTN_BM_SMS, cc.p(109, 65), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_sms.setTitleText("SMS OTP");
            this.btn_bm_sms.setTitleFontSize(20);
            this.btn_bm_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_sms.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_sms.ignoreContentAdaptWithSize(false);
            this.btn_bm_sms.setContentSize(cc.size(206, 33));
            this.addButton(this.pn_sms_app, "btn_bm_app", KetAnToanLayer.BTN_BM_APP, cc.p(109, 24), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_app.setTitleText("APP OTP");
            this.btn_bm_app.setTitleFontSize(20);
            this.btn_bm_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_app.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_app.ignoreContentAdaptWithSize(false);
            this.btn_bm_app.setContentSize(cc.size(206, 33));
        },

        DongBangKetSat: function (sender, eventType) {
            if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                this.ck_mo_dong_bang.setSelected(false);
                this.type_safe = 1;

                this.pn_otp_ket_sat.setVisible(false);
            } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                this.ck_mo_dong_bang.setSelected(true);

                this.type_safe = 0;
                this.pn_otp_ket_sat.setVisible(true);
            }
        },
        MoDongBangKetSat: function (sender, eventType) {
            if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                this.ck_dong_bang.setSelected(false);
                this.type_safe = 0;
                this.pn_otp_ket_sat.setVisible(true);
            } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                this.ck_dong_bang.setSelected(true);
                this.type_safe = 1;
                this.pn_otp_ket_sat.setVisible(false);
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case KetAnToanLayer.BTN_TIEPTUC_KETSAT:
                    this.funSafeMoney();
                    break;
                case KetAnToanLayer.BTN_SMS_APP_KETSAT:
                    if (lobby.is_otp == 1) {
                        return;
                    }
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case KetAnToanLayer.BTN_CLOSE_SMS_APP:
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(false);
                    break;
                case KetAnToanLayer.BTN_BM_SMS:
                    this.lb_sms_app_ketsat.setString("SMS OTP");
                    ConfigSercurity.type_otp = 0;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case KetAnToanLayer.BTN_BM_APP:
                    this.lb_sms_app_ketsat.setString("APP OTP");
                    ConfigSercurity.type_otp = 1;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
            }
        },


        funSafeMoney: function () {
            //cc.log("sent ket sat");
            var otp = this.tf_ma_ketsat.getString();
            var money = this.tf_vin_ketsat.getString();
            if (money != "") {
                money = replaceAll(".", "", money);
            }

            if (this.type_safe == 1) {
                if (money > userInfo.userData.moneyUse) {
                    gI.popUp.openPanel_Alert_Lobby("Bạn không thể đóng băng quá số dư khả dụng!");
                    return null;
                }
            } else {
                if (money > userInfo.userData.safe) {
                    gI.popUp.openPanel_Alert_Lobby("Bạn không thể mở đóng băng quá số tiền trong két sắt!");
                    return null;
                }
                else if (otp == "" || otp.length < 5) {
                    gI.popUp.openPanel_Alert_Lobby("Mã Otp gồm 5 ký tự!");
                    return null;
                }
            }
            if (money == "" || money <= 0) {
                gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập số tiền cần giao dịch!");
            }
            else {
                if (gI.mainSocket.listener.isLogged) {
                    var sercurity = new CmdSendSafeMoney();
                    //cc.log("type_safe " + sercurity_info.type_safe + " money " + money);
                    sercurity.putSafeMoney(this.type_safe, money);
                    gI.mainSocket.send(sercurity);
                    sercurity.clean();
                    this.btn_tiep_tuc_ketsat.setEnabled(false);
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }

        },
        responseSafeMoney: function (error, moneyUse, safe) {
            //cc.log("error safe money: " + error + " moneyUse : " + moneyUse + " safe : " + safe);
            var otp = this.tf_ma_ketsat.getString();
            userInfo.userData.moneyUse = moneyUse;
            userInfo.userData.safe = safe;
            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, userInfo.userData.safe));
            if (error == 0) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    if (gI.mainSocket.listener.isLogged) {
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, ConfigSercurity.type_otp);
                        gI.mainSocket.send(sendOtp);
                        sendOtp.clean();
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
                        gI.mainSocket.connectSocket();
                    }
                })));
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                if (this.type_safe == 1) {
                    gI.popUp.openPanel_Alert_Lobby("Bạn không thể đóng băng quá số dư khả dụng!");
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Bạn không thể mở đóng băng quá số tiền trong két sắt!");
                }
            }
            //openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch!");
        },
        responseResultSafeMoney: function (error, moneyUse, safe, currentMoney) {
            //cc.log("error result safe money: " + error + " moneyUse : " + moneyUse + " safe : " + safe + " currentMoney : " + currentMoney);
            this.btn_tiep_tuc_ketsat.setEnabled(true);
            userInfo.userData.moneyUse = moneyUse;
            userInfo.userData.safe = safe;
            userInfo.userData.vinTotal = currentMoney;
            if (userInfo == null) {
            } else {
                menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
            }

            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, userInfo.userData.safe));
            if (error == 0) {
                gI.popUp.openPanel_Alert_Lobby("Giao dịch thành công!");
                this.tf_vin_ketsat.setString("");
                this.tf_vin_ketsat.setPlaceHolder("Nhập số " + GameManager.config.moneyName + " cần đóng băng / mở đóng băng");
                this.tf_vin_ketsat.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_vin_ketsat.runAction(cc.scaleTo(0.225, 1));

                this.tf_ma_ketsat.setString("");
                this.tf_ma_ketsat.setPlaceHolder("Mã OTP");
                this.tf_ma_ketsat.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_ma_ketsat.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            }
        },
        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if (editBox.getName() == "tf_vin_ketsat") {
                str = replaceAll(".", "", str);
                if (!isNumeric(str)) {
                    str = str.substr(0, str.length - 1);
                }
                if (!isNumeric(str)) {
                    str = "";
                }

                editBox.setString(str);
            }

            if (editBox.getName() == "tf_vin_ketsat") {
                editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
            }
        },
        editBoxTextChanged: function (editBox, text) {

        },

        editBoxReturn: function (editBox) {
            return;
        },


    });
KetAnToanLayer.BTN_TIEPTUC_KETSAT = 3;
KetAnToanLayer.BTN_SMS_APP_KETSAT = 4;
KetAnToanLayer.BTN_CLOSE_SMS_APP = 5;
KetAnToanLayer.BTN_BM_SMS = 6;
KetAnToanLayer.BTN_BM_APP = 7;








