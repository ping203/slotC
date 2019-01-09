
/**
 * Created by B150M on 3/16/2018.
 */
var OtpQuenMatKhauLayer = BaseLayer.extend({
    ctor: function (parent){
        this._super();
        this.pn_otp_forget = null;
        this.pn_forget_pass = parent;
        this.btn_send_otp_forget = null;
        this.openThongBao = null;


    },

    customizeGUI: function () {

        this.addLayout(this.pn_forget_pass,"pn_otp_forget",cc.p(640,360),null,cc.size(1280,720),true);
        this.pn_otp_forget.addTouchEventListener(this.onTouchEventHandler, this);
        this.pn_otp_forget.setTag(OtpQuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET);
        this.addText(this.pn_otp_forget,"lb_txt_forget_content",cc.p(640,473),"Tài khoản đã đăng ký bảo mật."
            +"\nVui lòng nhập OTP để được hỗ trợ nhanh nhất",RobotoRegular.fontName,24);
        this.lb_txt_forget_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_forget_content.setContentSize(cc.size(600,56));
        this.lb_txt_forget_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_forget_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addButton(this.pn_otp_forget,"btn_select_otp_forget",OtpQuenMatKhauLayer.BTN_SHOW_OTP_FORGET,cc.p(640,409),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pn_otp_forget,"sp_mui_ten_xuong_forget",cc.p(778,409),res_Lobby + "/muiten_xuong.png",ccui.Widget.PLIST_TEXTURE);
        this.addText(this.pn_otp_forget,"txt_otp_forget",cc.p(640,409),"SMS OTP",RobotoRegular.fontName,25);
        this.txt_otp_forget.setColor(cc.color.GRAY);
        this.addEditBox(this.pn_otp_forget,"tf_input_otp_for",cc.p(640,316),"","Nhập mã xác thực",RobotoRegular.fontName,24,cc.size(357,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,5);
        this.tf_input_otp_for.setFontColor(cc.color.BLACK);

        if(lobby.is_otp == 1){
            this.txt_otp_forget.setString("APP OTP");
            this.sp_mui_ten_xuong_forget.setVisible(false);
            this.btn_select_otp_forget.setEnabled(false);
        }

       this.changeTypeOTP();

        this.addLayout(this.pn_otp_forget,"pn_chose_otp_for",cc.p(640,330),null,cc.size(365,110),true);
        this.pn_chose_otp_for.setVisible(false);
        this.addButton(this.pn_otp_forget,"btn_send_otp_forget",OtpQuenMatKhauLayer.BTN_SEND_OTP_FORGET,cc.p(640,141),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname.png",ccui.Widget.PLIST_TEXTURE);

        this.btn_send_otp_forget.setTitleText("TIẾP TỤC");
        this.btn_send_otp_forget.setTitleColor(cc.color.WHITE);
        this.btn_send_otp_forget.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_otp_forget.setTitleFontSize(30);

        this.pn_chose_otp_for.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_chose_otp_for.setBackGroundColor(cc.color.WHITE);
        this.pn_chose_otp_for.setBackGroundColorOpacity(254);
        this.addLayout(this.pn_chose_otp_for,"l_nen1",cc.p(182,55),null,cc.size(361,106),false);
        this.l_nen1.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.l_nen1.setBackGroundColor(cc.color(19,50,112));
        this.l_nen1.setBackGroundColorOpacity(254);
        this.addButton(this.pn_chose_otp_for,"btn_sl_sms_for",OtpQuenMatKhauLayer.BTN_SELECT_SMS_FORGET,cc.p(182,81),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_sms_for.setTitleText("SMS OTP");
        this.btn_sl_sms_for.setTitleColor(cc.color.GRAY);
        this.btn_sl_sms_for.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_sms_for.setTitleFontSize(30);
        this.addButton(this.pn_chose_otp_for,"btn_sl_app_for",OtpQuenMatKhauLayer.BTN_SELECT_APP_FORGET,cc.p(182,29),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_app_for.setTitleText("APP OTP");
        this.btn_sl_app_for.setTitleColor(cc.color.GRAY);
        this.btn_sl_app_for.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_app_for.setTitleFontSize(30);


    },
    changeTypeOTP : function(){
        var uiRichGold = new ccui.RichText();
        uiRichGold.ignoreContentAdaptWithSize(false);
        uiRichGold.setContentSize(cc.size(900, 100));
        uiRichGold.setPosition(700, 200);

        if(lobby.is_otp == 1){
            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"", RobotoRegular.fontName, 24);

            uiRichGold.pushBackElement(lbgold);
        }else {
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
        }

        this.pn_otp_forget.addChild(uiRichGold);

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
        this.pn_otp_forget.addChild(uiRichGold2);
    },


    onButtonRelease: function (button, id) {
        switch (id) {
            case OtpQuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                break;
            case OtpQuenMatKhauLayer.BTN_SHOW_OTP_FORGET:
                this.pn_chose_otp_for.setVisible(true);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case OtpQuenMatKhauLayer.BTN_SEND_OTP_FORGET:

                this.funSendOTPForgetPass();
                break;
            case OtpQuenMatKhauLayer.BTN_SELECT_SMS_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                this.txt_otp_forget.setString("SMS OTP");
                break;
            case OtpQuenMatKhauLayer.BTN_SELECT_APP_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                this.txt_otp_forget.setString("APP OTP");
                break;

        }
    },
    funSendOTPForgetPass: function () {
        var otp = this.tf_input_otp_for.getString();
        var lbtype = this.txt_otp_forget.getString();
        if (otp == "" || otp.length != 5) {
             gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
        } else if (!checkKyTuSpecial(otp, false)) {
             gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
        } else {
            var type = 0;
            if (lbtype == "SMS OTP")
                type = 0;
            else
                type = 1;
            sceneMgr.addLoading();
            var url = urlOTP_ForgetPassword(ForgotPassWordLayer.save_username, otp, type);
            sendRequest(url, null, false, this.callBackOTPForgetPass.bind(this), this.callBackError.bind(this));
            this.btn_send_otp_forget.setEnabled(false);
        }
    },
    callBackOTPForgetPass: function (response) {

        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        this.btn_send_otp_forget.setEnabled(true);
        if (success) {
            this.pn_otp_forget.setVisible(false);
            if (this.pn_forget_pass.btn_back_forget_pass) {
                this.pn_forget_pass.btn_back_forget_pass.setVisible(false);
            }
            this.openThongBaoLayer();


        } else {
            if (errorCode == 1001) {
                 gI.popUp.openPanel_Alert_Lobby("Hệ thống tạm thời bị gián đoạn!");
            } else if (errorCode == 1008) {
                 gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
            } else if (errorCode == 1021) {
                 gI.popUp.openPanel_Alert_Lobby("Mã xác nhận đã hết hạn sử dụng!");
            } else if (errorCode == 1114) {
                 gI.popUp.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }
        }
        sceneMgr.clearLoading();
    },

    callBackError: function (response) {
        sceneMgr.clearLoading();
    },

    openThongBaoLayer: function () {
        this.openThongBao = new ThongBaoOtpLayer(this);
        this.addChild(this.openThongBao);
    },




});




OtpQuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET = 1;
OtpQuenMatKhauLayer.BTN_SHOW_OTP_FORGET = 2;
OtpQuenMatKhauLayer.BTN_SEND_OTP_FORGET = 3;
OtpQuenMatKhauLayer.BTN_SELECT_SMS_FORGET = 4;
OtpQuenMatKhauLayer.BTN_SELECT_APP_FORGET = 5;




