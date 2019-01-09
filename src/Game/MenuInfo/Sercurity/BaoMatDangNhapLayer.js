/**
 * Created by B150M on 3/23/2018.
 */
var BaoMatDangNhapLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            ConfigSercurity.type_otp = 0;
            this.isRegisterOrRemoveOtpLogin = false;
            return true;
        },

        customizeGUI: function () {

            this.addLayout(this, "pn_bao_mat_dang_nhap", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.addText(this.pn_bao_mat_dang_nhap, "txt4", cc.p(517.5, 425.75), "BẢO MẬT ĐĂNG NHẬP", RobotoRegular.fontName, 30);
            this.txt4.setColor(GuiUtil.color("#FFDF58"));
            this.addLayout(this.pn_bao_mat_dang_nhap, "pn_da_dang_ky_bm_dang_nhap", cc.p(0, 0), null, cc.size(0, 0), true);
            this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb1", cc.p(517.5, 375), "Bạn đã đăng ký chức năng bảo mật đăng nhập tài khoản OTP.\n" +
                "Khi đăng nhập vào tài khoản, bạn phải nhập OTP xác nhận", RobotoRegular.fontName, 20);
            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb2", cc.p(294, 337), "Trạng thái:", RobotoRegular.fontName, 20);
            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb_trang_thai", cc.p(446.5, 337), "Đã kích hoạt bảo mật", RobotoRegular.fontName, 20);
            this.addSprite(this.pn_da_dang_ky_bm_dang_nhap, "bg2", cc.p(519, 292), res_ResourceMenuTab_Shopping + "/bg_2.png");
            this.bg2.setScaleX(1.16);
            this.addEditBox(this.pn_da_dang_ky_bm_dang_nhap, "tf_vin_toi_thieu", cc.p(516.5, 292), "", "Số " + GameManager.config.moneyName + " tối thiểu", fontRobotoBold.fontName, 22, cc.size(405, 40), null, cc.TEXT_ALIGNMENT_LEFT, 15);
            this.tf_vin_toi_thieu.setFontColor(cc.color("#3E3E3E"));
            this.tf_vin_toi_thieu.setName("tf_vin_toi_thieu");
            this.tf_vin_toi_thieu.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb2_0", cc.p(517.5, 244.5), "Số dư tài khoản lớn hơn số " + GameManager.config.moneyName + " tối thiểu mới yêu cầu nhập mã đăng nhập", RobotoRegular.fontName, 20);
            this.lb2_0.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb2_1", cc.p(517.5, 216.5), "Mã xác nhận", RobotoRegular.fontName, 20);
            this.lb2_1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addSprite(this.pn_da_dang_ky_bm_dang_nhap, "bg3", cc.p(419.5, 171), res_ResourceMenuTab_Mail + '/maxacnhan.png');
            this.addText(this.pn_da_dang_ky_bm_dang_nhap, "lb_sms_app_bmdn", cc.p(412, 168), "SMS OTP", RobotoRegular.fontName, 26);
            this.lb_sms_app_bmdn.setColor(GuiUtil.color("#3B3B3B"));
            this.addSprite(this.pn_da_dang_ky_bm_dang_nhap, "sp_muiten", cc.p(508, 171), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
            if(lobby.is_otp == 1){
                this.lb_sms_app_bmdn.setString("APP OTP");
                this.sp_muiten.setVisible(false);
                ConfigSercurity.type_otp = 1;
            }
            this.addButton(this.pn_da_dang_ky_bm_dang_nhap, "btn_sms_app_bmdn", BaoMatDangNhapLayer.BTN_SMS_APP_BMDN, cc.p(419.5, 170), true, res_ResourceMenuTab_BaoMat + '/bt2.png', res_ResourceMenuTab_BaoMat + '/bt2.png');
            this.btn_sms_app_bmdn.ignoreContentAdaptWithSize(false);
            this.btn_sms_app_bmdn.setContentSize(211, 39);
            this.btn_sms_app_bmdn.setTitleFontSize(14);
            this.addSprite(this.pn_da_dang_ky_bm_dang_nhap, "bg4", cc.p(637.5, 172), res_ResourceMenuTab_Mail + '/maxacnhan.png');
            this.bg4.setScaleX(0.8);

            //var uiRichGold = new ccui.RichText();
            //uiRichGold.ignoreContentAdaptWithSize(false);
            //uiRichGold.setContentSize(cc.size(720, 100));
            //uiRichGold.setPosition(570, 85);
            //
            //var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "SMS OTP :", RobotoRegular.fontName, 20);
            //var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255, " Vui lòng soạn tin", RobotoRegular.fontName, 20);
            //var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, GameManager.webViewLink.OTPMessage, RobotoRegular.fontName, 20);
            //var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255, " gửi", RobotoRegular.fontName, 20);
            //var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " " + GameManager.webViewLink.sms_otp, RobotoRegular.fontName, 20);
            //var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255, " để nhận mã xác thực", RobotoRegular.fontName, 20);
            //
            //uiRichGold.pushBackElement(lbgold);
            //uiRichGold.pushBackElement(lbgold1);
            //uiRichGold.pushBackElement(lbgold2);
            //uiRichGold.pushBackElement(lbgold3);
            //uiRichGold.pushBackElement(lbgold4);
            //uiRichGold.pushBackElement(lbgold5);
            //this.pn_da_dang_ky_bm_dang_nhap.addChild(uiRichGold);

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
            this.pn_da_dang_ky_bm_dang_nhap.addChild(uiRichGold2);

            this.addEditBox(this.pn_da_dang_ky_bm_dang_nhap, "tf_ma_otp_bmdn", cc.p(637, 170), "", "Mã OTP", fontRobotoBold.fontName, 24, cc.size(166, 44), null, cc.TEXT_ALIGNMENT_CENTER, 5);
            this.tf_ma_otp_bmdn.setFontColor(cc.color("#3E3E3E"));

            this.addButtonStructure(this.pn_da_dang_ky_bm_dang_nhap, "btn_luu_lai_bmdn", BaoMatDangNhapLayer.BTN_LUU_LAI_BMDN, cc.p(409, 41), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_da_dang_ky_bm_dang_nhap, "t18", cc.p(409, 41), "LƯU LẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t18.setColor(GuiUtil.color(162, 105, 64));
            this.addButtonStructure(this.pn_da_dang_ky_bm_dang_nhap, "btn_huy_dang_ky_bmdn", BaoMatDangNhapLayer.BTN_HUY_DANGKY_BMDN, cc.p(625.5, 41), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_da_dang_ky_bm_dang_nhap, "t19", cc.p(625.5, 41), "HỦY ĐĂNG KÝ", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t19.setColor(GuiUtil.color(162, 105, 64));

            this.addLayout(this.pn_bao_mat_dang_nhap, "pn_chua_dang_ky", cc.p(0, 0), null, cc.size(0, 0), true);
            this.addText(this.pn_chua_dang_ky, "lb1", cc.p(517.5, 349), "Chức năng này chỉ dành cho những tài khoản đã kích hoạt bảo mật điện thoại.\n" +
                "Khi đăng nhập vào tài khoản, bản phải đăng nhập OTP xác nhận", RobotoRegular.fontName, 20);

            this.addButtonStructure(this.pn_chua_dang_ky, "btn_dang_ky_bmdn", BaoMatDangNhapLayer.BTN_DANKY_BMDN, cc.p(517.5, 253), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_chua_dang_ky, "t17", cc.p(517.5, 253), "ĐĂNG KÝ", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t17.setColor(GuiUtil.color(162, 105, 64));

            this.addLayout(this.pn_bao_mat_dang_nhap, "pn_dang_ky_thanh_cong", cc.p(0, 0), null, cc.size(0, 0), true);
            this.pn_dang_ky_thanh_cong.setVisible(false);
            this.addText(this.pn_dang_ky_thanh_cong, "lb1", cc.p(517.5, 349), "Bạn đã đăng ký thành công chức năng Bảo mật đăng nhập tài khoản bằng OTP.\n" +
                "Khi đăng nhập vào tài khoản bạn phải nhập mã OTP để xác nhận", RobotoRegular.fontName, 20);

            this.addButtonStructure(this.pn_dang_ky_thanh_cong, "btn_quay_lai_bmdn", BaoMatDangNhapLayer.BTN_QUAYLAI_BMDN, cc.p(517.5, 253), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_dang_ky_thanh_cong, "t20", cc.p(517.5, 253), "QUAY LẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t20.setColor(GuiUtil.color(162, 105, 64));
            this.createPSMS();

        },
        createPSMS: function () {
            this.addLayout(this, "pn_sms_app", cc.p(541.5, 179), null, cc.size(218, 88), true);
            this.pn_sms_app.setLocalZOrder(5000);
            this.pn_sms_app.setVisible(false);
            this.pn_sms_app.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_sms_app.setTag(BaoMatDangNhapLayer.BTN_CLOSE_SMS_APP);
            this.addButton(this.pn_sms_app, "btn_close_sms_app", BaoMatDangNhapLayer.BTN_CLOSE_SMS_APP, cc.p(108, 173), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_close_sms_app.ignoreContentAdaptWithSize(false);
            this.btn_close_sms_app.setContentSize(cc.size(2560, 2000));

            this.addLayout(this.pn_sms_app, "Panel_77", cc.p(109, 44), null, cc.size(216, 86), true);
            this.Panel_77.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.Panel_77.setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this.Panel_77.setBackGroundColorOpacity(254);
            this.addButton(this.pn_sms_app, "btn_bm_sms", BaoMatDangNhapLayer.BTN_BM_SMS, cc.p(109, 65), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_sms.setTitleText("SMS OTP");
            this.btn_bm_sms.setTitleFontSize(20);
            this.btn_bm_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_sms.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_sms.ignoreContentAdaptWithSize(false);
            this.btn_bm_sms.setContentSize(cc.size(206, 33));
            this.addButton(this.pn_sms_app, "btn_bm_app", BaoMatDangNhapLayer.BTN_BM_APP, cc.p(109, 24), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_app.setTitleText("APP OTP");
            this.btn_bm_app.setTitleFontSize(20);
            this.btn_bm_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_app.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_app.ignoreContentAdaptWithSize(false);
            this.btn_bm_app.setContentSize(cc.size(206, 33));
        },


        onButtonRelease: function (button, id) {
            switch (id) {
                case BaoMatDangNhapLayer.BTN_DANKY_BMDN:
                    this.pn_chua_dang_ky.setVisible(false);
                    this.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                    break;
                case BaoMatDangNhapLayer.BTN_LUU_LAI_BMDN:
                    this.funRegisterSercurityLogin();
                    this.isRegisterOrRemoveOtpLogin = false;
                    break;
                case BaoMatDangNhapLayer.BTN_HUY_DANGKY_BMDN:
                    this.funRemoveSercurityLogin();
                    this.isRegisterOrRemoveOtpLogin = true;
                    break;
                case BaoMatDangNhapLayer.BTN_SMS_APP_BMDN:
                    if(lobby.is_otp == 1){
                        return;
                    }
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case BaoMatDangNhapLayer.BTN_CLOSE_SMS_APP:
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(false);
                    break;
                case BaoMatDangNhapLayer.BTN_BM_SMS:
                    this.lb_sms_app_bmdn.setString("SMS OTP");
                    ConfigSercurity.type_otp = 0;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case BaoMatDangNhapLayer.BTN_BM_APP:
                    this.lb_sms_app_bmdn.setString("APP OTP");
                    ConfigSercurity.type_otp = 1;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case BaoMatDangNhapLayer.BTN_QUAYLAI_BMDN:
                    this.pn_dang_ky_thanh_cong.setVisible(false);
                    this.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                    break;
            }
        },


        funRegisterSercurityLogin: function () {

            var vinmin = this.tf_vin_toi_thieu.getString();
            if (vinmin != "") {
                vinmin = replaceAll(".", "", vinmin);
            }
            var otp = this.tf_ma_otp_bmdn.getString();
            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else {
                var input = 0;
                if (vinmin == "" || parseInt(vinmin) <= 0)
                    input = 0;
                else
                    input = parseInt(vinmin);

                if (gI.mainSocket.listener.isLogged) {
                    var sercurity = new CmdSendSercurityLogin();
                    sercurity.putSercurityLogin(input, 1);
                    gI.mainSocket.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, ConfigSercurity.type_otp);
                        gI.mainSocket.send(sendOtp);
                        sendOtp.clean();
                    })));
                    this.btn_luu_lai_bmdn.setEnabled(false);
                    this.btn_huy_dang_ky_bmdn.setEnabled(false);
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },

        responseSercurityLogin: function (error) {
            this.btn_luu_lai_bmdn.setEnabled(true);
            this.btn_huy_dang_ky_bmdn.setEnabled(true);
            if (error == 0) {
                if (this.isRegisterOrRemoveOtpLogin == false) {
                    if (userInfo.userData.loginSecure == 0) {
                        this.pn_dang_ky_thanh_cong.setVisible(true);
                        this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
                        userInfo.userData.loginSecure = 1;
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Cài đặt mức " + GameManager.config.moneyName + " tối thiểu đăng nhập thành công!");
                    }
                    var vinmin = this.tf_vin_toi_thieu.getString();
                    if (vinmin != "") {
                        vinmin = replaceAll(".", "", vinmin);
                    }
                    if (vinmin == "")
                        this.tf_vin_toi_thieu.setString("0");
                    userInfo.userData.moneyLoginOtp = parseInt(vinmin);
                    this.lb_trang_thai.setString("Đã kích hoạt bảo mật");
                } else {
                    this.tf_vin_toi_thieu.setString("");
                    this.tf_vin_toi_thieu.setPlaceHolder("Số " + GameManager.config.moneyName + " tối thiểu");
                    this.tf_vin_toi_thieu.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_vin_toi_thieu.runAction(cc.scaleTo(0.225, 1));
                    userInfo.userData.loginSecure = 0;
                    userInfo.userData.moneyLoginOtp = 0;
                    this.pn_chua_dang_ky.setVisible(true);
                    this.pn_dang_ky_thanh_cong.setVisible(false);
                    this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
                    gI.popUp.openPanel_Alert_Lobby("Bạn đã hủy chức năng bảo mật đăng nhập!");
                    this.lb_trang_thai.setString("Đang đăng ký ...!");
                }
                this.tf_ma_otp_bmdn.setString("");
                this.tf_ma_otp_bmdn.setPlaceHolder("Mã OTP");
                this.tf_ma_otp_bmdn.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_ma_otp_bmdn.runAction(cc.scaleTo(0.225, 1));
            } else {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },

        funRemoveSercurityLogin: function () {
            var otp = this.tf_ma_otp_bmdn.getString();
            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var sercurity = new CmdSendSercurityLogin();
                    sercurity.putSercurityLogin(0, 0);
                    gI.mainSocket.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, ConfigSercurity.type_otp);
                        gI.mainSocket.send(sendOtp);
                        sendOtp.clean();
                    })));
                    this.btn_luu_lai_bmdn.setEnabled(false);
                    this.btn_huy_dang_ky_bmdn.setEnabled(false);
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },
        funGotoSercurityLogin: function () {
            //cc.log("loginSecure : "+ userInfo.userData.loginSecure);
            if (userInfo.userData.loginSecure == 0) {
                this.lb_trang_thai.setString("Đang đăng ký ...!");
                this.pn_chua_dang_ky.setVisible(true);
                this.pn_dang_ky_thanh_cong.setVisible(false);
                this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
            } else {
                this.lb_trang_thai.setString("Đã kích hoạt bảo mật");
                this.pn_chua_dang_ky.setVisible(false);
                this.pn_dang_ky_thanh_cong.setVisible(false);
                this.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                this.tf_vin_toi_thieu.setString(formatMoney(0, 3, parseInt(userInfo.userData.moneyLoginOtp)));
                this.tf_vin_toi_thieu.setColor(GuiUtil.color("#3E3E3E"));
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if (editBox.getName() == "tf_vin_toi_thieu") {
                if (str != "") {
                    str = replaceAll(".", "", str);
                }
                if (!isNumeric(str)) {
                    str = str.substr(0, str.length - 1);
                }
                if (!isNumeric(str)) {
                    str = "";
                }

                editBox.setString(str);
            }

            if (editBox.getName() == "tf_vin_toi_thieu") {
                editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
            }
        },
        editBoxTextChanged: function (editBox, text) {

        },

        editBoxReturn: function (editBox) {
            return;
        },


    });

BaoMatDangNhapLayer.BTN_DANKY_BMDN = 1;
BaoMatDangNhapLayer.BTN_LUU_LAI_BMDN = 2;
BaoMatDangNhapLayer.BTN_HUY_DANGKY_BMDN = 3;
BaoMatDangNhapLayer.BTN_SMS_APP_BMDN = 4;
BaoMatDangNhapLayer.BTN_CLOSE_SMS_APP = 5;
BaoMatDangNhapLayer.BTN_BM_SMS = 6;
BaoMatDangNhapLayer.BTN_BM_APP = 7;
BaoMatDangNhapLayer.BTN_QUAYLAI_BMDN = 8;








