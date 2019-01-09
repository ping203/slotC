/**
 * Created by B150M on 3/16/2018.
 */
var ForgetEmailLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.pn_email_forget = null;
        this.pn_forget_pass = parent;
        this.openThongBao = null;

    },

    customizeGUI: function () {
        this.addLayout(this.pn_forget_pass, "pn_email_forget", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.pn_email_forget, "lb_txt_email_content", cc.p(640, 483), "Tài khoản kích hoạt bảo mật bằng Email."
            + "Xin vui lòng nhập chính xác Email dùng để bảo mật!", RobotoRegular.fontName, 23);
        this.lb_txt_email_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_email_content.setContentSize(cc.size(600, 56));
        this.lb_txt_email_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_email_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addEditBox(this.pn_email_forget, "tf_input_email_for", cc.p(640, 360), "", "Nhập Email:", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 100);
        this.tf_input_email_for.setFontColor(cc.color.BLACK);
        this.addButton(this.pn_email_forget, "btn_clear_email_forget", ForgetEmailLayer.BTN_CLEAR_EMAIL_FORGETPASS, cc.p(875, 360.), false, res_Lobby + "/closetf.png", res_Lobby + "/closetf.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_email_forget, "btn_send_email_forget", ForgetEmailLayer.BTN_SEND_EMAIL_FORGETPASS, cc.p(640, 213.), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_send_email_forget.setTitleText("GỬI THÔNG TIN");
        this.btn_send_email_forget.setTitleColor(cc.color.WHITE);
        this.btn_send_email_forget.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_email_forget.setTitleFontSize(32);


    },


    onButtonRelease: function (button, id) {
        switch (id) {
            case ForgetEmailLayer.BTN_CLEAR_EMAIL_FORGETPASS:
                this.tf_input_email_for.setString("");
                this.tf_input_email_for.setPlaceHolder("Nhập Email:");
                this.btn_clear_email_forget.setVisible(false);
                this.tf_input_email_for.runAction(cc.scaleTo(0.225, 1));
                if (cc.sys.os == cc.sys.OS_ANDROID)
                    this.tf_input_email_for.setColor(GuiUtil.color("#FFFFFF"));
                break;
            case ForgetEmailLayer.BTN_SEND_EMAIL_FORGETPASS:
                this.funSendEmailForGetPass();
                break;
        }
    },


    funSendEmailForGetPass: function () {

        var email = this.tf_input_email_for.getString();
        if (email == "") {
             gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập email đã dùng bảo mật tài khoản!");
        } else if (!checkNoiDungEmail(email)) {
             gI.popUp.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
        } else {
            sceneMgr.addLoading();
            var url = urlSendEmailForgetPassword(ForgotPassWordLayer.save_username, email);
            sendRequest(url, null, false, this.callBackSendEmailForgetPass.bind(this), this.callBackError.bind(this));

            this.btn_send_email_forget.setEnabled(false);
        }
    },
    callBackSendEmailForgetPass: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        this.btn_send_email_forget.setEnabled(true);
        if (success) {
            this.pn_email_forget.setVisible(false);
            if (this.pn_forget_pass.btn_back_forget_pass) {
                this.pn_forget_pass.btn_back_forget_pass.setVisible(false);
            }
            this.openThongBaoLayer();
        } else {
            if (errorCode == 1001) {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (errorCode == 103) {
                 gI.popUp.openPanel_Alert_Lobby("Email nhập không đúng định dạng!");
            } else if (errorCode == 1028) {
                 gI.popUp.openPanel_Alert_Lobby("Email nhập không phải là Email dùng để đăng ký!");
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

ForgetEmailLayer.BTN_CLEAR_EMAIL_FORGETPASS = 1;
ForgetEmailLayer.BTN_SEND_EMAIL_FORGETPASS = 2;




