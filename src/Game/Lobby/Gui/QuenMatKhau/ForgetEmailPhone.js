/**
 * Created by B150M on 3/16/2018.
 */
var ForgetEmailPhoneLayer = BaseLayer.extend({
    ctor: function (parent){
        this._super();
        this.pn_chose_email_otp = null;
        this.pn_forget_pass = parent;
        this.type_email_phone = 0;


    },

    customizeGUI: function () {
        this.addLayout(this.pn_forget_pass,"pn_chose_email_otp",cc.p(640,360),null,cc.size(1280,720),true);
        this.addText(this.pn_chose_email_otp,"lb_txt_chose_email_otp",cc.p(640,462),"Tài khoản đã đăng ký bảo mật bằng Email và số điện thoại."

            +"\nVui lòng lựa chọn hình thức lấy lại mật khẩu",RobotoRegular.fontName,24);
        this.lb_txt_chose_email_otp.ignoreContentAdaptWithSize(false);
        this.lb_txt_chose_email_otp.setContentSize(cc.size(700,150));
        this.lb_txt_chose_email_otp.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_chose_email_otp.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addButton(this.pn_chose_email_otp,"btn_chose_email_sms_for",ForgetEmailPhoneLayer.BTN_CHOSE_EMAIL_PHONE,cc.p(640,356),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pn_chose_email_otp,"sp_mui_ten_xuong_email_sms_for",cc.p(778,356),res_Lobby + "/muiten_xuong.png",ccui.Widget.PLIST_TEXTURE);
        this.addText(this.pn_chose_email_otp,"txt_email_sms_for",cc.p(640,356),"Qua số điện thoại",RobotoRegular.fontName,25);
        this.txt_email_sms_for.setColor(cc.color.GRAY);

        this.addLayout(this.pn_chose_email_otp,"email_sms_chose",cc.p(640,276),null,cc.size(365,110),true);
        this.email_sms_chose.setVisible(false);
        this.email_sms_chose.addTouchEventListener(this.onTouchEventHandler, this);
        this.email_sms_chose.setTag(ForgetEmailPhoneLayer.BTN_CLOSE_EMAIL_PHONE);

        this.email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.email_sms_chose.setBackGroundColor(cc.color.WHITE);
        this.email_sms_chose.setBackGroundColorOpacity(254);
        this.addLayout(this.email_sms_chose,"l_nen_email_sms_chose",cc.p(182,55),null,cc.size(361,106),false);
        this.l_nen_email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.l_nen_email_sms_chose.setBackGroundColor(cc.color(19,50,112));
        this.l_nen_email_sms_chose.setBackGroundColorOpacity(254);
        this.addButton(this.email_sms_chose,"btn_sl_phone",ForgetEmailPhoneLayer.BTN_SELECT_PHONE,cc.p(182,81),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_phone.setTitleText("Qua số điện thoại");
        this.btn_sl_phone.setTitleColor(cc.color.GRAY);
        this.btn_sl_phone.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_phone.setTitleFontSize(30);
        this.addButton(this.email_sms_chose,"btn_sl_email",ForgetEmailPhoneLayer.BTN_SELECT_EMAIL,cc.p(182,29),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_email.setTitleText("Qua địa chỉ Email");
        this.btn_sl_email.setTitleColor(cc.color.GRAY);
        this.btn_sl_email.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_email.setTitleFontSize(30);
        this.addButton(this.pn_chose_email_otp,"btn_send_chose",ForgetEmailPhoneLayer.BTN_EMAIL_PHONE,cc.p(640,165),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_send_chose.setTitleText("TIẾP TỤC");
        this.btn_send_chose.setTitleColor(cc.color.WHITE);
        this.btn_send_chose.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_chose.setTitleFontSize(32);
        this.addButton(this.pn_forget_pass, "btn_back_forget_pass", ForgetEmailPhoneLayer.BTN_BACK_FORGETPASS, cc.p(133, 630), false, res_Lobby + "/btnBack.png", res_Lobby + "/btnBack.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_back_forget_pass.setVisible(false);

    },


    onButtonRelease: function (button, id) {
        switch (id) {
            case ForgetEmailPhoneLayer.BTN_CHOSE_EMAIL_PHONE:
                this.email_sms_chose.setVisible(true);
                this.email_sms_chose.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case ForgetEmailPhoneLayer.BTN_CLOSE_EMAIL_PHONE:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                break;
                break;
            case ForgetEmailPhoneLayer.BTN_SELECT_PHONE:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                this.type_email_phone = 0;
                this.txt_email_sms_for.setString("Qua số điện thoại");
                break;
            case ForgetEmailPhoneLayer.BTN_SELECT_EMAIL:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                this.type_email_phone = 1;
                this.txt_email_sms_for.setString("Qua địa chỉ Email");
                break;
            case ForgetEmailPhoneLayer.BTN_EMAIL_PHONE:
                this.pn_chose_email_otp.setVisible(false);
                cc.log(this.type_email_phone);
                if (this.type_email_phone == 0) {
                    this.openOtpForgetLayer();
                } else {
                    this.openEmailForgetLayer();
                }
                break;
            case ForgetEmailPhoneLayer.BTN_BACK_FORGETPASS:
                if (this.type_email_phone == 0) {
                    this.pn_forget_pass.openPnOtpForget.pn_otp_forget.setVisible(false);
                } else {
                    this.pn_forget_pass.openPnEmailForget.pn_email_forget.setVisible(false);
                }
                this.type_email_phone = 0;
                this.openForgotEmailPhone();
                break;



        }
    },

    openOtpForgetLayer: function () {
        this.btn_back_forget_pass.setVisible(true);
        this.pn_forget_pass.openPnOtpForget = new OtpQuenMatKhauLayer(this);
        this.addChild(this.pn_forget_pass.openPnOtpForget);
    },
    openEmailForgetLayer: function () {
        this.btn_back_forget_pass.setVisible(true);
        this.pn_forget_pass.openPnEmailForget = new ForgetEmailLayer(this);
        this.addChild(this.pn_forget_pass.openPnEmailForget);
    },

    openForgotEmailPhone:function(){
        this.btn_back_forget_pass.setVisible(false);
        this.pn_forget_pass.forgotEmailPhoneLayer = new ForgetEmailPhoneLayer(this);
        this.addChild(this.pn_forget_pass.forgotEmailPhoneLayer);

    },




});

ForgetEmailPhoneLayer.BTN_CHOSE_EMAIL_PHONE = 1;
ForgetEmailPhoneLayer.BTN_CLOSE_EMAIL_PHONE = 2;
ForgetEmailPhoneLayer.BTN_SELECT_PHONE = 3;
ForgetEmailPhoneLayer.BTN_SELECT_EMAIL = 4;
ForgetEmailPhoneLayer.BTN_EMAIL_PHONE = 5;
ForgetEmailPhoneLayer.BTN_BACK_FORGETPASS = 6;





