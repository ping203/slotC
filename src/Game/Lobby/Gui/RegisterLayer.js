/**
 * Created by B150M on 1/22/2018.
 */
var RegisterLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.pDangKy = null;
        this.tf_user_name_dk = null;
        this.tf_mat_khau_dk = null;
        this.tf_ma_xac_nhan_dk = null;
        this.tf_nhap_lai_mk_dk = null;
        this.btn_refresh = null;
        this.btn_close = null;
        this.cb_dong_y = null;
        this.btn_dieukhoan_sudung = null;
        this.btn_dang_ky = null;
        this.btn_dangnhap_ngay = null;
        this.idcaptcha = null;
        this.sp_ma_xac_nhan = null;
        this.lobby = parent;

    },
    customizeGUI: function () {
        this.addLayout(this, "pDangKy", cc.p(640, 360), res_Lobby + "/reg/bg-reg.png", cc.size(1280, 720), true);//tab Dang Ky
        this.addEditBox(this.pDangKy, "tf_user_name_dk", cc.p(764, 524), "", "TÊN ĐĂNG NHẬP", RobotoRegular.fontName, 20, cc.size(385, 57), res_Lobby + "/reg/bg-editbox.png", cc.TEXT_ALIGNMENT_CENTER, 16);
        this.addEditBox(this.pDangKy, "tf_mat_khau_dk", cc.p(764, 443.33), "", "MẬT KHẨU", RobotoRegular.fontName, 20, cc.size(385, 57), res_Lobby + "/reg/bg-editbox.png", cc.TEXT_ALIGNMENT_CENTER, 16);
        this.addEditBox(this.pDangKy, "tf_nhap_lai_mk_dk", cc.p(764, 362.67), "", "NHẬP LẠI MẬT KHẨU", RobotoRegular.fontName, 20, cc.size(385, 57), res_Lobby + "/reg/bg-editbox.png", cc.TEXT_ALIGNMENT_CENTER, 16);
        this.addEditBox(this.pDangKy, "tf_ma_xac_nhan_dk", cc.p(764, 282), "", "MÃ XÁC NHẬN", RobotoRegular.fontName, 20, cc.size(385, 57), res_Lobby + "/reg/bg-editbox.png", cc.TEXT_ALIGNMENT_CENTER, 3);

        this.tf_mat_khau_dk.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.tf_nhap_lai_mk_dk.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        /*this.tf_user_name_dk.setFontColor(cc.color.BLACK);
        this.tf_mat_khau_dk.setFontColor(cc.color.BLACK);
        this.tf_nhap_lai_mk_dk.setFontColor(cc.color.BLACK);
        this.tf_ma_xac_nhan_dk.setFontColor(cc.color.BLACK);*/

        this.tf_user_name_dk.nextTabFocus = this.tf_mat_khau_dk;
        this.tf_mat_khau_dk.nextTabFocus = this.tf_nhap_lai_mk_dk;
        this.tf_nhap_lai_mk_dk.nextTabFocus = this.tf_ma_xac_nhan_dk;
        this.tf_ma_xac_nhan_dk.nextTabFocus = this.tf_user_name_dk;

        this.addSprite(this.pDangKy, "sp_ma_xac_nhan", cc.p(1030, 283), res_Lobby + "/Default/Sprite.png");
        this.sp_ma_xac_nhan.scaleY = 1.3;
        GuiUtil.useControl(this.sp_ma_xac_nhan);

        this.addSprite(this.pDangKy, "text-dang-ky-tai-khoan", cc.p(754.43, 613.37), res_Lobby + "/reg/txtDangkytaikhoan.png");
        this.addButton(this.pDangKy, "btn_refresh", RegisterLayer.BTN_REFRSH, cc.p(1130, 282), true, res_Lobby + "/reg/reload.png", res_Lobby + "/reg/reload.png");
        this.addButton(this.pDangKy, "btn_close", RegisterLayer.BTN_CLOSE_REG, cc.p(1162, 623), true, res_Lobby + "/reg/btn-close.png", res_Lobby + "/reg/btn-close.png");

        this.btn_refresh.setScale(0.8);
        this.addCheckBox(this.pDangKy, "cb_dong_y", cc.p(640, 215), true, res_Lobby + "/reg/checkbox.png", res_Lobby + "/reg/checkbox.png", res_Lobby + "/reg/checked.png", res_Lobby + "/reg/checkbox.png", res_Lobby + "/reg/checked.png");
        /*this.addButton(this.pDangKy, "btn_dieukhoan_sudung", RegisterLayer.BTN_DIEUKHOAN_SD, , false, "", "", ccui.Widget.PLIST_TEXTURE);
        this.btn_dieukhoan_sudung.setTitleText('Điều khoản sử dụng');
        this.btn_dieukhoan_sudung.setTitleColor(GuiUtil.color(255, 255, 255));
        this.btn_dieukhoan_sudung.setTitleFontSize(16);*/

        this.addText(this.pDangKy, 'btn_dieukhoan_sudung', cc.p(730, 215.33), "Điều khoản sử dụng", RobotoRegular.fontName, 16);
        this.btn_dieukhoan_sudung.setTag(RegisterLayer.BTN_DIEUKHOAN_SD);
        this.btn_dieukhoan_sudung.setTouchEnabled(true);
        this.btn_dieukhoan_sudung.addTouchEventListener(this.onTouchEventHandler, this);

        // this.btn_dieukhoan_sudung.setScale(1.5, 0.7);
        this.addButton(this.pDangKy, "btn_dang_ky", RegisterLayer.BTN_DANG_KY, cc.p(713, 150), true, res_Lobby + "/reg/btn-dangky.png", res_Lobby + "/reg/btn-dangky.png");
        this.addButton(this.pDangKy, "btn_huy", RegisterLayer.BTN_HUY_DANGKY, cc.p(871, 150), true, res_Lobby + "/reg/btn-huy.png", res_Lobby + "/reg/btn-huy.png");
        // this.btn_dang_ky.setTitleText('ĐĂNG KÝ');
        // this.btn_dang_ky.setTitleColor(GuiUtil.color(36, 27, 15));
        // this.btn_dang_ky.setTitleFontSize(22);
        this.parserDataCaptcha();
    },
    onEnter: function () {
        this._super();
    },
    backdropTouched: function (sender) {
        if (sender === this) {
            this.lobby.closeDangKy();
        }
    },
    onButtonRelease: function (button, id) {
        switch (id) {
            case RegisterLayer.BTN_REFRSH:
                this.parserDataCaptcha();
                break;
            case RegisterLayer.BTN_DANG_KY:
                this.funCreateAccount();
                break;
            case RegisterLayer.BTN_DIEUKHOAN_SD:
                alert('asdfdf');
                break;
            case RegisterLayer.BTN_CLOSE_REG:
                this.lobby.closeDangKy();
                break;
        }
    },

    funCreateAccount: function () {
        var str = this.tf_mat_khau_dk.getString();
        this.IsRegister = true;
        if (!checkKyTuSpecial(this.tf_user_name_dk.getString(), false)) {
            gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (!checkKyTuVN(this.tf_mat_khau_dk.getString())) {
            gI.popUp.openPanel_Alert_Lobby("Mật khẩu phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (str == "123456" || str == "abc123" || str == "ABC123" || str == "000000" || str == "111111" || str == "222222"
            || str == "333333" || str == "444444" || str == "555555" || str == "666666" || str == "777777" || str == "888888"
            || str == "999999") {
            gI.popUp.openPanel_Alert_Lobby("Mật khẩu quá đơn giản. Vui lòng nhập lại!");
        } else {
            var url = this.getUrlDangKy();
            if (url != null) {
                sendRequest(url, null, false, this.callBackDangKy.bind(this), this.callBackError.bind(this));
                sceneMgr.addLoading();
            }
        }
    },
    getUrlDangKy: function () {
        var userName = this.tf_user_name_dk.getString();
        var pass = this.tf_mat_khau_dk.getString();
        var repass = this.tf_nhap_lai_mk_dk.getString();
        var captcha = this.tf_ma_xac_nhan_dk.getString();
        // var address = this.tf_ma_xac_nhan_dk.getString();

        if (userName == null || userName.length < 6 || userName.length > 16) {
            gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập trong khoảng từ 6 - 16 ký tự!");
            return null;
        }
        if (pass == null || pass.length < 6 || pass.length > 15) {
            gI.popUp.openPanel_Alert_Lobby("Password trong khoảng từ 6 - 16 ký tự!");
            return null;
        }
        if (pass == userName) {
            gI.popUp.openPanel_Alert_Lobby("Mật khẩu không được giống với Tên đăng nhập!");
            return null;
        }
        if (pass != repass) {
            gI.popUp.openPanel_Alert_Lobby("Nhập lại mật khẩu không giống mật khẩu!");
            return null;
        }
        if (this.cb_dong_y.isSelected() == false) {
            gI.popUp.openPanel_Alert_Lobby("Hãy đọc và đồng ý với các điều khoản của " + GameManager.webViewLink.productName + "!");
            return null;
        }
        if (this.tf_ma_xac_nhan_dk.getString() == "" || this.tf_ma_xac_nhan_dk.getString() == null) {
            gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }
        userInfo.userName = userName;
        userInfo.passWord = pass;
        pass = md5(pass);

        return urlQuickRegiste(userName, pass, captcha, this.idcaptcha);
    },
    callBackDangKy: function (response) {
        sceneMgr.clearLoading();
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];

        if (success) {


            this.lobby.openUpdateNN();
        } else {
            this.parserDataCaptcha();

            if (errorCode == 1001) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
            if (errorCode == 101) {
                gI.popUp.openPanel_Alert_Lobby("UserName không hợp lệ!");
            }
            if (errorCode == 1006) {
                gI.popUp.openPanel_Alert_Lobby("UserName đã tồn tại!");
            }
            if (errorCode == 102) {
                gI.popUp.openPanel_Alert_Lobby("Password không đúng!");
            }
            if (errorCode == 108) {
                gI.popUp.openPanel_Alert_Lobby("Password phải khác UserName!");
            }
            if (errorCode == 115) {
                gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
            }
            if (errorCode == 1114) {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }

        }
    },
    callBackError: function (response) {
        gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        sceneMgr.clearLoading();
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
            if (this.sp_ma_xac_nhan)
                this.sp_ma_xac_nhan.initWithBase64(data);
        } else {
            var that = this;
            cc.loader.loadImg(img, {isCrossOrigin: false}, function (err, img) {
                var texture2d = self._texture2d = new cc.Texture2D();
                texture2d.initWithElement(img);
                texture2d.handleLoadedTexture();
                if (that.sp_ma_xac_nhan)
                    that.sp_ma_xac_nhan.initWithTexture(texture2d);

            });
        }
        sceneMgr.clearLoading();
    },
    editBoxEditingDidBegin: function (editBox) {
    },

    editBoxEditingDidEnd: function (editBox) {
    },

    editBoxTextChanged: function (editBox, text) {
    },

    editBoxReturn: function (editBox) {
        if (!cc.sys.isNative) {
            if (editBox == this.tf_user_name_dk || editBox == this.tf_mat_khau_dk || editBox == this.tf_nhap_lai_mk_dk || editBox == this.tf_ma_xac_nhan_dk)
                this.funCreateAccount();
        }

        return;
    },


});

/*openRegisterLayer = function(layer)
{
    Register = new RegisterLayer();
    layer.addChild(Register);
};
closeRegisterLayer = function()
{
    Register.removeFromParent(true);

};*/
RegisterLayer.BTN_REFRSH = 1;
RegisterLayer.BTN_DANG_KY = 2;
RegisterLayer.BTN_DIEUKHOAN_SD = 3;
RegisterLayer.BTN_HUY_DANGKY = 4;
RegisterLayer.BTN_CLOSE_REG = 5;