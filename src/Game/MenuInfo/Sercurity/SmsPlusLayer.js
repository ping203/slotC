
/**
 * Created by B150M on 3/23/2018.
 */
var SmsPlusLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            return true;
        },

        customizeGUI: function () {
            this.createPnSmsPlus();

        },
        createPnSmsPlus: function () {
            this.addLayout(this, "pn_sms_plus", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.addText(this.pn_sms_plus, "txt2", cc.p(517.5, 425.75), "SMS PLUS", RobotoRegular.fontName, 30);
            this.txt2.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_sms_plus, "lb1", cc.p(428, 343), "Tên nhân vật:", RobotoRegular.fontName, 20);
            this.addText(this.pn_sms_plus, "lb_account_smsplus", cc.p(649, 343), " xxxxxxxxxx", RobotoRegular.fontName, 20);
            this.lb_account_smsplus.ignoreContentAdaptWithSize(false);
            this.lb_account_smsplus.setContentSize(cc.size(300, 23));
            this.lb_account_smsplus.setString(userInfo.userData.nickname);
            this.addText(this.pn_sms_plus, "lb2", cc.p(430.5, 306), "Số điện thoại:", RobotoRegular.fontName, 20);
            this.addText(this.pn_sms_plus, "lb_phone_smsplus", cc.p(649, 306), " xxxxxxxxxx", RobotoRegular.fontName, 20);
            this.lb_phone_smsplus.ignoreContentAdaptWithSize(false);
            this.lb_phone_smsplus.setContentSize(cc.size(300, 23));
            this.addCheckBox(this.pn_sms_plus, "ck_bao_mat_otp", cc.p(383.5, 267.75), true, res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png");
            this.ck_bao_mat_otp.setTouchEnabled(false);
            this.addText(this.pn_sms_plus, "lb3", cc.p(460.5, 265.5), "Bảo mật OTP", RobotoRegular.fontName, 20);
            this.addCheckBox(this.pn_sms_plus, "ck_app_otp", cc.p(554.5, 267.75), true, res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png", res_ResourceMenuTab_BaoMat + "/checkbox.png", res_ResourceMenuTab_BaoMat + "/click.png");
            this.ck_app_otp.setTouchEnabled(false);
            if (userInfo.userData.appSecurity == 0) {
                this.ck_app_otp.setSelected(false);
            }
            else {
                this.ck_app_otp.setSelected(true);
            }
            this.addText(this.pn_sms_plus, "lb4", cc.p(613.5, 265.5), "App OTP", RobotoRegular.fontName, 20);
            this.addButtonStructure(this.pn_sms_plus, "btn_thay_doi_sms_plus", SmsPlusLayer.BTN_THAYDOI_SMSPLUS, cc.p(517.5, 153.5), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1.2, 1);

            this.addTextStructure(this.pn_sms_plus, "t17", cc.p(517.5, 153.5), "THAY ĐỔI SỐ ĐIỆN THOẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t17.setColor(GuiUtil.color(162,105,64));
            if (userInfo.userData.mobileSecure == 0) {
                this.lb_phone_smsplus.setString("");
            } else {
                this.lb_phone_smsplus.setString(MahoaNoiDung(userInfo.userData.mobile));
            }

        },

        responseResultActiveNewMobile: function (error) {
            //cc.log("error Result ExchangeMobileActived: " + error);
            if (error == 0) {
                gI.popUp.openPanel_Alert_Lobby("Thay đổi số điện thoại và kích hoạt bảo mật thành công!");
                userInfo.userData.mobile = ConfigSercurity.save_new_phone;
                ConfigSercurity.save_phone = ConfigSercurity.save_new_phone;
                if(this.smsPlusLayer){
                    this.smsPlusLayer.lb_phone_smsplus.setString(MahoaNoiDung(userInfo.userData.mobile));
                }

            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case SmsPlusLayer.BTN_THAYDOI_SMSPLUS:
                    this.sercurity.closeSmsPlusLayer();
                    this.sercurity.openChangeMobileLayer();

                    break;
            }
        },











    });


SmsPlusLayer.BTN_THAYDOI_SMSPLUS = 1;




