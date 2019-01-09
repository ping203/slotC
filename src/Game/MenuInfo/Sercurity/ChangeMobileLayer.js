
/**
 * Created by B150M on 3/23/2018.
 */
var ChangeMobileLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            return true;
        },

        customizeGUI: function () {
            this.createPnSmsPlusChange();

        },

        createPnSmsPlusChange: function () {
            this.addLayout(this, "pn_sms_plus_thay_doi", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.addText(this.pn_sms_plus_thay_doi, "txt3", cc.p(517.5, 425.75), "THAY ĐỔI THÔNG TIN SỐ ĐIỆN THOẠI", RobotoRegular.fontName, 30);
            this.txt3.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_sms_plus_thay_doi, "lb1", cc.p(401.5, 375), "Tên tài khoản:", RobotoRegular.fontName, 20);
            this.addText(this.pn_sms_plus_thay_doi, "lb_account_thaydoi_sms", cc.p(620, 375), " xxxxxxxxxx", RobotoRegular.fontName, 20);
            this.lb_account_thaydoi_sms.ignoreContentAdaptWithSize(false);
            this.lb_account_thaydoi_sms.setContentSize(cc.size(300, 23));
            this.lb_account_thaydoi_sms.setString(userInfo.userData.nickname);
            this.addText(this.pn_sms_plus_thay_doi, "lb2", cc.p(401.5, 338), "Số điện thoại:", RobotoRegular.fontName, 20);
            this.addText(this.pn_sms_plus_thay_doi, "lb_phone_thaydoi_sms", cc.p(620, 338), " xxxxxxxxxx", RobotoRegular.fontName, 20);
            this.lb_phone_thaydoi_sms.ignoreContentAdaptWithSize(false);
            this.lb_phone_thaydoi_sms.setContentSize(cc.size(300, 23));
            this.addSprite(this.pn_sms_plus_thay_doi, "bg2", cc.p(537, 248), res_ResourceMenuTab_Shopping + "/bg_2.png");
            this.bg2.setScaleX(1.1);
            this.addEditBox(this.pn_sms_plus_thay_doi, "tf_new_phone_thaydoi_sms", cc.p(536, 248), "", "Số điện thoại mới", fontRobotoBold.fontName, 22, cc.size(367, 40), null, cc.TEXT_ALIGNMENT_LEFT, 15);
            this.tf_new_phone_thaydoi_sms.setName("tf_new_phone_thaydoi_sms");
            this.tf_new_phone_thaydoi_sms.setFontColor(cc.color("#666666"));
            this.tf_new_phone_thaydoi_sms.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this.addButton(this.pn_sms_plus_thay_doi, "btn_clear_newphone", ChangeMobileLayer.BTN_CLEAR_NEWPHONE, cc.p(756, 247), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.btn_clear_newphone.setVisible(false);
            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(720, 100));
            uiRichGold.setPosition(570, 120);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"APP OTP :", fontRobotoBold.fontName, 17);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255," Nếu bạn đã cài", fontRobotoBold.fontName, 17);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", fontRobotoBold.fontName, 17);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255,". Vui lòng bật", fontRobotoBold.fontName, 17);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", fontRobotoBold.fontName, 17);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để lấy mã xác thực", fontRobotoBold.fontName, 17);

            uiRichGold.pushBackElement(lbgold);
            uiRichGold.pushBackElement(lbgold1);
            uiRichGold.pushBackElement(lbgold2);
            uiRichGold.pushBackElement(lbgold3);
            uiRichGold.pushBackElement(lbgold4);
            uiRichGold.pushBackElement(lbgold5);
            this.pn_sms_plus_thay_doi.addChild(uiRichGold);

            this.addButtonStructure(this.pn_sms_plus_thay_doi, "btn_hoantat_otp_sms", ChangeMobileLayer.BTN_QUAYLAI_THAYDOI_SMS, cc.p(434, 74), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_sms_plus_thay_doi, "t15", cc.p(434, 74), "QUAY LẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t15.setColor(GuiUtil.color(162,105,64));

            this.addButtonStructure(this.pn_sms_plus_thay_doi, "btn_tiep_tuc_thaydoi_sms", ChangeMobileLayer.BTN_TIEPTUC_THAYDOI_SMS, cc.p(640, 74), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_sms_plus_thay_doi, "t16", cc.p(640, 74), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t16.setColor(GuiUtil.color(162,105,64));
            if (userInfo.userData.mobileSecure == 0) {
                this.lb_phone_thaydoi_sms.setString("");
            } else {
                this.lb_phone_thaydoi_sms.setString(MahoaNoiDung(userInfo.userData.mobile));
            }

            this.addLayout(this.pn_sms_plus_thay_doi, "pn_otp_sms", cc.p(517, 283.5), null, cc.size(1280, 720), true);
            this.pn_otp_sms.setVisible(false);
            this.addImage(this.pn_otp_sms, "Image_2", cc.p(645, 302.5), res_ResourceMenuTab_Mail + '/bg_supersmaill_mail.png', cc.size(560, 355));

            this.addText(this.pn_otp_sms, "lb_notice_0", cc.p(644.5, 443), "Nhập mã xác thực", UTMBebas.fontName, 30);
            this.lb_notice_0.setColor(GuiUtil.color("#FFDF58"));

            this.addButton(this.pn_otp_sms, "btn_close_otp_sms", ChangeMobileLayer.BTN_CLOSE_SMS_OTP, cc.p(887, 444), true, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png");
            this.addImage(this.pn_otp_sms, "Image_2_0", cc.p(646, 312), res_ResourceMenuTab_Mail + "/lopmo.png", cc.size(535, 200));
            this.Image_2_0.setScale9Enabled(false);
            this.Image_2_0.ignoreContentAdaptWithSize(false);
            this.Image_2_0.setContentSize(cc.size(535, 200));
            this.addText(this.pn_otp_sms, "lb3_0_0", cc.p(644.5, 387), "Kích hoạt bảo mật cho số điện thoại mới. \n" +
                "Bạn dùng số điện thoại mới để lấy mã xác thực", RobotoRegular.fontName, 20);
            this.lb3_0_0.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.addSprite(this.pn_otp_sms, "sp", cc.p(644.5, 327), res_ResourceMenuTab_Profile + "/bg_hoso.png");
            this.addEditBox(this.pn_otp_sms, "tf_otp_sms", cc.p(645, 326.5), "", " _ _ _ _ _", fontRobotoBold.fontName, 26, cc.size(277, 55), null, cc.TEXT_ALIGNMENT_CENTER, 5);

            this.addButtonStructure(this.pn_otp_sms, "btn_get_otp", ChangeMobileLayer.BTN_GET_OTHER_OTP, cc.p(850, 326.5), true,
                ["res/ResourceMenuTab/Mail/xbutton.png", "res/ResourceMenuTab/Mail/xbutton.png"]).setScale(0.5, 1);
            this.addTextStructure(this.pn_otp_sms, "lb_otp", cc.p(850, 326.5), "LẤY OTP", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_otp.setColor(GuiUtil.color(162,105,64));

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(500, 100));
            uiRichGold.setPosition(650, 210);

            var lbgold = new ccui.RichElementText(1, cc.color.WHITE, 255,"Vui lòng nhập mã xác thực hệ thống đã gửi vào số điện thoại!", RobotoRegular.fontName, 20);

            uiRichGold.pushBackElement(lbgold);
            this.pn_otp_sms.addChild(uiRichGold);

            this.addButtonStructure(this.pn_otp_sms, "btn_hoantat_otp_sms", ChangeMobileLayer.BTN_HOANTAT_SMS_OTP, cc.p(645, 170), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_otp_sms, "txxxx", cc.p(645, 170), "HOÀN TẤT", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.txxxx.setColor(GuiUtil.color(162,105,64));
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case ChangeMobileLayer.BTN_CLOSE_SMS_OTP:
                    this.pn_otp_sms.setVisible(false);
                    break;
                case ChangeMobileLayer.BTN_CLEAR_NEWPHONE:
                    this.tf_new_phone_thaydoi_sms.setString("");
                    this.tf_new_phone_thaydoi_sms.setPlaceHolder("Số điện thoại mới");
                    this.btn_clear_newphone.setVisible(false);
                    this.tf_new_phone_thaydoi_sms.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_new_phone_thaydoi_sms.runAction(cc.scaleTo(0.225, 1));
                    break;
                case ChangeMobileLayer.BTN_QUAYLAI_THAYDOI_SMS:
                    this.sercurity.closeChangeMobileLayer();
                    this.sercurity.openSmsPlusLayer();
                    break;
                case ChangeMobileLayer.BTN_TIEPTUC_THAYDOI_SMS:
                    this.funExchangeMobileActived();
                    break;
                case ChangeMobileLayer.BTN_HOANTAT_SMS_OTP:
                    this.funSendOTP(true);
                    this.sercurity.closeChangeMobileLayer();
                    this.sercurity.openSmsPlusLayer();
                    break;
                case ChangeMobileLayer.BTN_GET_OTHER_OTP:
                    menutab.GetOtherOtp(2);
                    break;
            }
        },
        funSendOTP: function (value) {
            var otp = this.tf_otp_sms.getString();

            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else if (!checkKyTuSpecial(otp, false)) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var sendOtp = new CmdSendOTP();
                    sendOtp.putSendOTP(otp, 0);
                    gI.mainSocket.send(sendOtp);
                    sendOtp.clean();
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },

        funExchangeMobileActived: function () {
            //cc.log("vao");
            var newphone = this.tf_new_phone_thaydoi_sms.getString();
            if (newphone == "" || newphone.length < 10 || newphone.length > 15 || parseInt(newphone.substr(0, 1)) != 0) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại phải bắt đầu bằng 0 và độ dài từ 10 - 15 số!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var sercurity = new CmdSendExchangeMobileActived();
                    sercurity.putExchangeMobileActived(newphone);
                    gI.mainSocket.send(sercurity);
                    sercurity.clean();

                    //ConfigSercurity.save_phone = newphone;
                    this.btn_tiep_tuc_thaydoi_sms.setEnabled(false);
                    ConfigSercurity.save_new_phone = newphone;
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },
        responseExchangeMobileActived: function (error) {
            this.btn_tiep_tuc_thaydoi_sms.setEnabled(true);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP (Số điện thoại cũ) để hoàn tất thay đổi số điện thoại\nbảo mật!", 1, 4);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại mới trùng với số điện thoại cũ!");
            } else if (error == 4) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            }
        },
        responseResultExchangeMobileActived: function (error) {
            //cc.log("error Result ExchangeMobileActived: " + error);
            if (error == 0) {
                this.pn_otp_sms.setVisible(true);
                this.tf_new_phone_thaydoi_sms.setString("");
                this.tf_new_phone_thaydoi_sms.setPlaceHolder("Số điện thoại mới");
                this.btn_clear_newphone.setVisible(false);
                this.tf_new_phone_thaydoi_sms.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_new_phone_thaydoi_sms.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }
        },

        editBoxEditingDidBegin: function (editBox) {
            var str = editBox.getString();
           if (editBox.getName() == "tf_new_phone_thaydoi_sms") {
                if (str != "")
                    this.btn_clear_newphone.setVisible(true);
                else
                    this.btn_clear_newphone.setVisible(false);
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if ( editBox.getName() == "tf_new_phone_thaydoi_sms" ) {
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
            if (editBox.getName() == "tf_new_phone_thaydoi_sms") {
                if (str != "")
                    this.btn_clear_newphone.setVisible(true);
                else
                    this.btn_clear_newphone.setVisible(false);
            } else if (editBox.getName() == "tf_vin_ketsat" || editBox.getName() == "tf_vin_toi_thieu") {
                editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
            }
        },

        editBoxTextChanged: function (editBox, text) {

        },

        editBoxReturn: function (editBox) {
            return;
        },




    });

ChangeMobileLayer.BTN_CLOSE_SMS_OTP = 1;
ChangeMobileLayer.BTN_CLEAR_NEWPHONE = 2;
ChangeMobileLayer.BTN_QUAYLAI_THAYDOI_SMS = 3;
ChangeMobileLayer.BTN_TIEPTUC_THAYDOI_SMS = 4;
ChangeMobileLayer.BTN_HOANTAT_SMS_OTP = 5;
ChangeMobileLayer.BTN_GET_OTHER_OTP = 6;



