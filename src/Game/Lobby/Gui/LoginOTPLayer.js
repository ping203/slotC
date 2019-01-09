/**
 * Created by PVC on 1/20/2018.
 */
var LoginOTPLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            return true;
        },
        customizeGUI: function () {
            this.initPLoginOTP();

        },

        initPLoginOTP: function () {
            this.addLayout(this.pn_login_otp, "bg_login_otp", cc.p(640, 326), res_Lobby + "/bg_content.png", cc.size(1035, 499), true);

            this.pn_login_otp.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_login_otp.setTag(LoginOTPLayer.BTN_CLOSE_PANEL_SELECT_OTP);
            //btn_close_pn_otp
            this.addButton(this.pn_login_otp, "btn_close_pn_otp", LoginOTPLayer.BTN_CLOSE_PANEL_OTP, cc.p(1146, 630.), false, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png", ccui.Widget.PLIST_TEXTURE);

            //this.addSprite(this.pn_login_otp,"bg_title_otp",cc.p(640,647),"res/Minigame/ImageChung/Title.png");
            this.addText(this.pn_login_otp, "lb_title_login_otp", cc.p(640, 655), "ĐĂNG NHẬP BẰNG OTP", UTMBebas.fontName, 35);
            this.lb_title_login_otp.setColor(cc.color(162, 105, 64));
            this.addText(this.pn_login_otp, "lb_nhap_ma_otp", cc.p(640, 597), "NHẬP MÃ OTP", RobotoRegular.fontName, 30);
            this.lb_nhap_ma_otp.setColor(GuiUtil.color("#ffde00"));
            this.addText(this.pn_login_otp, "lb_txt_content", cc.p(640, 500), "Bạn đang sử dụng tính năng bảo mật bằng OTP."
                + "\nVui lòng nhập OTP để đăng nhập", RobotoRegular.fontName, 24);
            this.lb_txt_content.ignoreContentAdaptWithSize(false);
            this.lb_txt_content.setContentSize(cc.size(600, 56));
            this.lb_txt_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.addButton(this.pn_login_otp, "btn_select_otp_lobby", LoginOTPLayer.BTN_SELECT_OTP, cc.p(640, 395), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.addSprite(this.pn_login_otp, "sp_mui_ten_xuong", cc.p(778, 395), res_Lobby + "/muiten_xuong.png", ccui.Widget.PLIST_TEXTURE);
            this.addText(this.pn_login_otp, "txt_sms_otp_lobby", cc.p(640, 395), "SMS OTP", RobotoRegular.fontName, 25);
            this.txt_sms_otp_lobby.setColor(cc.color.GRAY);

            this.addEditBox(this.pn_login_otp, "tf_login_otp", cc.p(640, 303), "", "Nhập mã xác thực", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 5);
            this.tf_login_otp.setFontColor(cc.color.BLACK);

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(900, 100));
            uiRichGold.setPosition(700, 200);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "SMS OTP :", RobotoRegular.fontName, 24);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255, " Vui lòng soạn tin", RobotoRegular.fontName, 24);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " " + GameManager.webViewLink.OTPMessage, RobotoRegular.fontName, 24);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255, " gửi", RobotoRegular.fontName, 24);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " " + lobby.sms_otp, RobotoRegular.fontName, 24);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255, " để nhận mã xác thực", RobotoRegular.fontName, 24);

            uiRichGold.pushBackElement(lbgold);
            uiRichGold.pushBackElement(lbgold1);
            uiRichGold.pushBackElement(lbgold2);
            uiRichGold.pushBackElement(lbgold3);
            uiRichGold.pushBackElement(lbgold4);
            uiRichGold.pushBackElement(lbgold5);
            this.pn_login_otp.addChild(uiRichGold);

            var uiRichGold2 = new ccui.RichText();
            uiRichGold2.ignoreContentAdaptWithSize(false);
            uiRichGold2.setContentSize(cc.size(900, 100));
            uiRichGold2.setPosition(700, 160);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "APP OTP :", RobotoRegular.fontName, 24);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255, " Nếu bạn đã cài", RobotoRegular.fontName, 24);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " APP OTP", RobotoRegular.fontName, 20);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255, ". Vui lòng bật", RobotoRegular.fontName, 24);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255, " APP OTP", RobotoRegular.fontName, 24);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255, " để lấy mã xác thực", RobotoRegular.fontName, 24);

            uiRichGold2.pushBackElement(lbgold);
            uiRichGold2.pushBackElement(lbgold1);
            uiRichGold2.pushBackElement(lbgold2);
            uiRichGold2.pushBackElement(lbgold3);
            uiRichGold2.pushBackElement(lbgold4);
            uiRichGold2.pushBackElement(lbgold5);
            this.pn_login_otp.addChild(uiRichGold2);

            this.addButton(this.pn_login_otp, "btn_dang_nhap_otp", LoginOTPLayer.BTN_LOGIN_OTP, cc.p(640, 133), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);

            this.addLayout(this.pn_login_otp, "pn_sms_app_lobby", cc.p(640, 313), null, cc.size(365, 110), true);
            this.pn_sms_app_lobby.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_sms_app_lobby.setBackGroundColor(cc.color.WHITE);
            this.pn_sms_app_lobby.setBackGroundColorOpacity(254);
            this.addLayout(this.pn_sms_app_lobby, "l_nen", cc.p(182, 55), null, cc.size(361, 106), false);
            this.l_nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.l_nen.setBackGroundColor(GuiUtil.color("#482503"));
            this.l_nen.setBackGroundColorOpacity(254);


            this.addButton(this.pn_sms_app_lobby, "btn_sl_sms", LoginOTPLayer.BTN_SELECT_SMS_OTP, cc.p(182, 81), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_sms.setTitleText("SMS OTP");
            this.btn_sl_sms.setTitleColor(cc.color.GRAY);
            this.btn_sl_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_sl_sms.setTitleFontSize(30);

            this.addButton(this.pn_sms_app_lobby, "btn_sl_app", LoginOTPLayer.BTN_SELECT_APP_OTP, cc.p(182, 29), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_app.setTitleText("APP OTP");
            this.btn_sl_app.setTitleColor(cc.color.GRAY);
            this.btn_sl_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_sl_app.setTitleFontSize(30);

            this.pn_sms_app_lobby.setScaleY(0);
            this.pn_sms_app_lobby.setVisible(false);

        },

        onEnter: function () {
            this._super();

        },

    });