/**
 * Created by B150M on 3/16/2018.
 */
var NhapUsernameLayer = BaseLayer.extend({
    ctor: function (parent){
        this._super();
        this.pn_otp_information = null;
        this.lb_txt_information_content = null;
        this.tf_username_for = null;
        this.tf_captcha_forget = null;
        this.btn_send_information = null;
        this.sp_show_captcha_for = null;
        this.pn_forget_pass = parent;

    },

    customizeGUI: function () {
        this.addLayout(this.pn_forget_pass,"pn_otp_information",cc.p(640,360),null,cc.size(1280,720),true);
        this.addText(this.pn_otp_information,"lb_txt_information_content",cc.p(640,486),"Để nhận được hỗ trợ."
            +"Vui lòng nhập đầy đủ các thông tin dưới đây:",RobotoRegular.fontName,24);
        this.lb_txt_information_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_information_content.setContentSize(cc.size(600,56));
        this.lb_txt_information_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_information_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addEditBox(this.pn_otp_information,"tf_username_for",cc.p(640,396),"","Nhập tên đăng nhập:",RobotoRegular.fontName,24,cc.size(357,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,16);
        this.tf_username_for.setFontColor(cc.color.BLACK);
        this.addEditBox(this.pn_otp_information,"tf_captcha_forget",cc.p(555,290),"","Mã xác nhận",RobotoRegular.fontName,24,cc.size(178,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,5);
        this.tf_captcha_forget.setFontColor(cc.color.BLACK);
        this.addSprite(this.pn_otp_information,"sp_show_captcha_for",cc.p(703,290),res_Lobby + "/Default/Sprite.png");
        this.addButton(this.pn_otp_information,"btn_refresh_forget",NhapUsernameLayer.BTN_REFRESH_CAPTCHA_FORGET,cc.p(790,290),true,res_Lobby + "/btnRefresh.png",res_Lobby + "/btnRefresh.png",ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_otp_information,"btn_send_information",NhapUsernameLayer.BTN_SEND_INFORMATION_FORGET,cc.p(640,205.),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname.png",ccui.Widget.PLIST_TEXTURE);
        this.btn_send_information.setTitleText("GỬI THÔNG TIN");
        this.btn_send_information.setTitleColor(cc.color.WHITE);
        this.btn_send_information.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_information.setTitleFontSize(32);
        this.parserDataCaptcha();
       // this.pn_otp_information.setVisible(true);
    },

    openOtpQuenMatKhau: function () {
        this.pn_forget_pass.otpQuenMKLayer = new OtpQuenMatKhauLayer(this);
        this.addChild(this.pn_forget_pass.otpQuenMKLayer);
    },

    openForgetEmailLayer: function () {
        this.pn_forget_pass.forgotEmailLayer = new ForgetEmailLayer(this);
        this.addChild(this.pn_forget_pass.forgotEmailLayer);
    },
    openForgetEmailPhoneLayer: function () {
        this.pn_forget_pass.forgotEmailPhoneLayer = new ForgetEmailPhoneLayer(this);
        this.addChild(this.pn_forget_pass.forgotEmailPhoneLayer);
    },
    parserDataCaptcha: function () {
        sceneMgr.addLoading();
        var url = urlGetCaptcha();
        sendRequest(url, null, false, this.callBackCaptcha.bind(this), this.callBackError.bind(this));
    },
    callBackCaptcha: function (response) {
        var jsonData = JSON.parse(response);
        this.idcaptcha = jsonData["id"];
        var img = "data:image/png;base64," + jsonData["img"];

        if (cc.sys.isNative) {
            var data = jsonData["img"];
            this.sp_show_captcha_for.initWithBase64(data);
        } else {
            var that = this;
            cc.loader.loadImg(img, {isCrossOrigin: false}, function (err, img) {
                var texture2d = self._texture2d = new cc.Texture2D();
                texture2d.initWithElement(img);
                texture2d.handleLoadedTexture();
                if(that.sp_show_captcha_for)
                    that.sp_show_captcha_for.initWithTexture(texture2d);

            });

        }
        sceneMgr.clearLoading();
    },
    callBackError: function(response)
    {
        sceneMgr.clearLoading();
    },
    funSendInformationForgetPass: function () {
        var username = this.tf_username_for.getString();
        var captcha = this.tf_captcha_forget.getString();
        this.parserDataCaptcha();
        //this.tf_captcha_forget.setString("");
        if (username == null || username.length < 6 || username.length > 16) {
             gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (!checkKyTuSpecial(username, false)) {
             gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (this.tf_captcha_forget.getString() == "" || this.tf_captcha_forget.getString() == null) {
             gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập mã xác thực!");
        } else {
            sceneMgr.addLoading();
            var url = urlForgetPassword(username, captcha, this.idcaptcha);
            sendRequest(url, null, false, this.callBackInformationForgetPass.bind(this), this.callBackError.bind(this));
            ForgotPassWordLayer.save_username = username;
            this.btn_send_information.setEnabled(false);
        }
    },
    callBackInformationForgetPass: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        this.btn_send_information.setEnabled(true);
        if (errorCode == 1001) {
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        } else if (errorCode == 115) {
             gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        } else if (errorCode == 1005) {
             gI.popUp.openPanel_Alert_Lobby("Thông tin không hợp lệ!");
        } else if (errorCode == 2001) {
             gI.popUp.openPanel_Alert_Lobby("Hệ thống không hỗ trợ các tài khoản chưa cập nhật Nickname!");
        } else if (errorCode == 1022) {
             gI.popUp.openPanel_Alert_Lobby("Tài khoản chưa đăng ký sử dụng chức năng bảo mật. "
                +"\nXin vui lòng liên hệ đến tổng đài "+ GameManager.webViewLink.cskh +" để được hỗ trợ!");
        } else if (errorCode == 1023) {
            this.pn_otp_information.setVisible(false);
            this.openOtpQuenMatKhau();


        } else if (errorCode == 1026) {
            this.pn_otp_information.setVisible(false);
            this.openForgetEmailLayer();
        } else if (errorCode == 1027) {
            this.pn_otp_information.setVisible(false);
            this.openForgetEmailPhoneLayer();
        }
        sceneMgr.clearLoading();
    },

    onButtonRelease: function (button, id) {
        switch (id) {
            case NhapUsernameLayer.BTN_REFRESH_CAPTCHA_FORGET:
                this.parserDataCaptcha();
                break;
            case NhapUsernameLayer.BTN_SEND_INFORMATION_FORGET:

                this.funSendInformationForgetPass();
                break;
        }
    }

});


NhapUsernameLayer.BTN_REFRESH_CAPTCHA_FORGET = 1;
NhapUsernameLayer.BTN_SEND_INFORMATION_FORGET = 2;