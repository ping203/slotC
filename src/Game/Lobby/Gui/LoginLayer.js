/**
 * Created by PVC on 1/19/2018.
 */

var LoginLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.lobby = parent;
            this.pLogin = null;
            this.lb_dang_nhap_voi = null;
            this.btn_facebook_tab = null;
            this.btn_google_tab = null;
            this.tf_user_name_tab = null;
            this.tf_pass_tab = null;
            this.btn_dang_nhap_tab = null;
            this.btn_dang_ky_tab = null;
            this.btn_quen_mk = null;
            this.loginBy = LoginLayer.LOGIN_THUONG;
            this.isLoginAccessToken = false;
            this.saveUserName = "";
            this.pn_login_otp = null;
            this.type_otp_login = LoginLayer.TYPE_SMS_OTP;
            this.pn_doi_pass = null;
            this.pTaoNhanVat = null;
            return true;
        },
        customizeGUI: function () {
            // cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/Mail.plist");
            this.addLayout(this, "pLogin", cc.p(640, 720), res_Lobby + '/login/bgheader.png', cc.size(1280, 115), true);
            this.pLogin.setAnchorPoint(.5, 1);
            this.addText(this.pLogin, "lb_dang_nhap_voi", cc.p(60, 70), "Đăng nhập\nvới", RobotoRegular.fontName, 22);
            this.lb_dang_nhap_voi.setColor(cc.color("#ffe600"));
            this.lb_dang_nhap_voi.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addButton(this.pLogin, "btn_facebook_tab", LoginLayer.BTN_FACEBOOK_TAB, cc.p(170, 70), true, res_Lobby + "/login/FB.png", res_Lobby + "/login/FB.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pLogin, "btn_google_tab", LoginLayer.BTN_GOOGLE_TAB, cc.p(260, 70), true, res_Lobby + "/login/google.png", res_Lobby + "/login/google.png", ccui.Widget.PLIST_TEXTURE);
            if (cc.sys.platform == cc.sys.WIN32) {
                this.btn_facebook_tab.setVisible(false);
                this.btn_google_tab.setVisible(false);
            }
            this.addEditBox(this.pLogin, "tf_user_name_tab", cc.p(442, 58), "", "Tên đăng nhập", RobotoRegular.fontName, 20, cc.size(214, 59), res_Lobby + "/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 21);
            this.addEditBox(this.pLogin, "tf_pass_tab", cc.p(665, 58), "", "Mật khẩu", RobotoRegular.fontName, 20, cc.size(214, 59), res_Lobby + "/login/input.png", cc.TEXT_ALIGNMENT_CENTER, 21);
            // this.tf_user_name_tab.children[1].setPosition(cc.p(20, 40));
            // this.tf_pass_tab.children[1].setPosition(20, 40);
            this.tf_pass_tab.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            this.tf_user_name_tab.nextTabFocus = this.tf_pass_tab;
            this.tf_pass_tab.nextTabFocus = this.tf_user_name_tab;
            this.tf_user_name_tab.setPlaceholderFontColor(cc.color("#b2b2b2"));
            this.tf_pass_tab.setPlaceholderFontColor(cc.color("#b2b2b2"));
            if (!cc.sys.isNative) {
                this.tf_user_name_tab.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_pass_tab.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
            }
            this.addButton(this.pLogin, "btn_dang_nhap_tab", LoginLayer.BTN_DANG_NHAP_TAB, cc.p(862, 58), false, res_Lobby + "/login/btn-dangnhap.png", res_Lobby + "/login/btn-dangnhap.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pLogin, "btn_dang_ky_tab", LoginLayer.BTN_DANG_KY_TAB, cc.p(1072, 66), false, res_Lobby + "/login/btn-dangky.png", res_Lobby + "/login/btn-dangky.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pLogin, "btn_quen_mk", LoginLayer.BTN_QUEN_MK, cc.p(1212, 70), true, res_Lobby + "/login/btn-quenmatkhau.png", res_Lobby + "/login/btn-quenmatkhau.png", ccui.Widget.PLIST_TEXTURE);
        },
        onEnter: function () {
            this._super();
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case LoginLayer.BTN_FACEBOOK_TAB:
                    this.onClickFBTab();
                    break;
                case LoginLayer.BTN_GOOGLE_TAB:
                    this.onClickGGTab();
                    break;
                case LoginLayer.BTN_DANG_NHAP_TAB:
                    this.sendLogin();
                    break;
                case LoginLayer.BTN_DANG_KY_TAB:
                    this.lobby.openDangKy();
                    break;
                case LoginLayer.BTN_QUEN_MK:
                    this.lobby.openQuenMatKhau();
                    break;
                case LoginLayer.BTN_CLOSE_PANEL_SELECT_OTP:
                    this.closePSelectOpt();
                    break;
                case LoginLayer.BTN_CLOSE_PANEL_OTP:
                    this.closePOtp();
                    break;
                case LoginLayer.BTN_SELECT_OTP:
                    this.openSelectOtp();
                    break;
                case LoginLayer.BTN_LOGIN_OTP:
                    this.loginWithOtp();
                    break;
                case LoginLayer.BTN_SELECT_SMS_OTP:
                    this.selectSmsOtp();
                    break;
                case LoginLayer.BTN_SELECT_APP_OTP:
                    this.selectAppOtp();
                    break;
                case LoginLayer.BTN_CLEAR_NICKNAME:
                    this.clearNickName();
                    break;
                case LoginLayer.BTN_TAO_TEN_NHAN_VAT:
                    this.createNickName();
                    break;
                case LoginLayer.BTN_CLOSE_DOIPASS:
                    this.closeChangePass();
                    break;
                case LoginLayer.BTN_CHANGE_PASS:
                    this.funChangePass();
                    break;
            }
        },
        initPLoginOTP: function () {
            this.addLayout(this, "pn_login_otp", cc.p(640, 360), res_Lobby + "/bground_tab.png", cc.size(1280, 720), true);
            this.addLayout(this.pn_login_otp, "bg_login_otp", cc.p(640, 326), res_Lobby + "/bg_content.png", cc.size(1035, 499), true);

            this.pn_login_otp.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_login_otp.setTag(LoginLayer.BTN_CLOSE_PANEL_SELECT_OTP);
            //btn_close_pn_otp
            this.addButton(this.pn_login_otp, "btn_close_pn_otp", LoginLayer.BTN_CLOSE_PANEL_OTP, cc.p(1146, 630.), false, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png", ccui.Widget.PLIST_TEXTURE);

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

            this.addButton(this.pn_login_otp, "btn_select_otp_lobby", LoginLayer.BTN_SELECT_OTP, cc.p(640, 395), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.addSprite(this.pn_login_otp, "sp_mui_ten_xuong", cc.p(778, 395), res_Lobby + "/muiten_xuong.png", ccui.Widget.PLIST_TEXTURE);
            this.addText(this.pn_login_otp, "txt_sms_otp_lobby", cc.p(640, 395), "SMS OTP", RobotoRegular.fontName, 25);
            this.txt_sms_otp_lobby.setColor(cc.color.GRAY);

            this.addEditBox(this.pn_login_otp, "tf_login_otp", cc.p(640, 303), "", "Nhập mã xác thực", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 5);
            this.tf_login_otp.setFontColor(cc.color.BLACK);

            this.addButton(this.pn_login_otp, "btn_dang_nhap_otp", LoginLayer.BTN_LOGIN_OTP, cc.p(640, 133), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);

            this.addLayout(this.pn_login_otp, "pn_sms_app_lobby", cc.p(640, 313), null, cc.size(365, 110), true);
            this.pn_sms_app_lobby.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_sms_app_lobby.setBackGroundColor(cc.color.WHITE);
            this.pn_sms_app_lobby.setBackGroundColorOpacity(254);
            this.addLayout(this.pn_sms_app_lobby, "l_nen", cc.p(182, 55), null, cc.size(361, 106), false);
            this.l_nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.l_nen.setBackGroundColor(GuiUtil.color("#482503"));
            this.l_nen.setBackGroundColorOpacity(254);


            this.addButton(this.pn_sms_app_lobby, "btn_sl_sms", LoginLayer.BTN_SELECT_SMS_OTP, cc.p(182, 81), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_sms.setTitleText("SMS OTP");
            this.btn_sl_sms.setTitleColor(cc.color.GRAY);
            this.btn_sl_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_sl_sms.setTitleFontSize(30);

            this.addButton(this.pn_sms_app_lobby, "btn_sl_app", LoginLayer.BTN_SELECT_APP_OTP, cc.p(182, 29), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_app.setTitleText("APP OTP");
            this.btn_sl_app.setTitleColor(cc.color.GRAY);
            this.btn_sl_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_sl_app.setTitleFontSize(30);

            this.pn_sms_app_lobby.setScaleY(0);
            this.pn_sms_app_lobby.setVisible(false);
            this.changeTypeOTP();
        },

        changeTypeOTP: function () {
            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(900, 100));
            uiRichGold.setPosition(700, 200);

            if (lobby.is_otp == 1) {
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255, "", RobotoRegular.fontName, 24);

                uiRichGold.pushBackElement(lbgold);
            } else {
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

            if (lobby.is_otp == 1) {
                this.txt_sms_otp_lobby.setString("APP OTP");
                this.sp_mui_ten_xuong.setVisible(false);
                this.type_otp_login = LoginLayer.TYPE_APP_OTP;
                this.btn_select_otp_lobby.setEnabled(false);
            }
        },

        initPTaoNhanVat: function () {
            this.addLayout(this, "pTaoNhanVat", cc.p(640, 360), "", cc.size(1280, 720), true);
            this.pTaoNhanVat.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pTaoNhanVat.setBackGroundColor(cc.color.BLACK);
            this.pTaoNhanVat.setBackGroundColorOpacity(200);
            this.addImage(this.pTaoNhanVat, "bg_d", cc.p(640, 360), res_Lobby + "/bg_content.png", cc.size(560, 256));
            this.addImage(this.pTaoNhanVat, "bg_d", cc.p(640, 464), res_Lobby + "/titile.png", cc.size(366, 49));
            //this.addSprite(this.pTaoNhanVat,"sp_title_tao_nhan_vat",cc.p(640,464),"res/Minigame/ImageChung/Title.png");
            //this.sp_title_tao_nhan_vat.setScale(0.7);
            this.addText(this.pTaoNhanVat, "lb_title_tao_nhan_vat", cc.p(640, 464), "TÊN NHÂN VẬT", UTMBebas.fontName, 33);
            this.lb_title_tao_nhan_vat.setColor(cc.color(162, 105, 64));
            this.addText(this.pTaoNhanVat, "lb_tt_bat_buoc", cc.p(640, 428), "(*) Thông tin bắt buộc", RobotoRegular.fontName, 20);
            this.addEditBox(this.pTaoNhanVat, "tf_tao_ten_nhan_vat", cc.p(640, 381), "", "Tên nhân vật", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 16);
            this.tf_tao_ten_nhan_vat.setFontColor(cc.color.BLACK);
            this.addText(this.pTaoNhanVat, "lb_tt_bat_buoc", cc.p(640, 328), "(*) Tên nhân vật trong khoảng từ 6-16 ký tự, không chứa các ký tự nhạy cảm,"
                + "\nký tự đặc biệt và không có khoảng trắng", RobotoRegular.fontName, 15);
            this.lb_tt_bat_buoc.ignoreContentAdaptWithSize(false);
            this.lb_tt_bat_buoc.setContentSize(cc.size(544, 38));
            this.lb_tt_bat_buoc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_tt_bat_buoc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addButton(this.pTaoNhanVat, "btn_clear_nick", LoginLayer.BTN_CLEAR_NICKNAME, cc.p(837, 381), true, res_Lobby + "/closetf.png", res_Lobby + "/closetf.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pTaoNhanVat, "btn_tao_ten_nhan_vat", LoginLayer.BTN_TAO_TEN_NHAN_VAT, cc.p(640, 276), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_tao_ten_nhan_vat.setTitleColor(GuiUtil.color("#933e00"));
            this.btn_tao_ten_nhan_vat.setTitleFontName(GuiUtil.getFontNameButton(UTMBebas.fontName));
            this.btn_tao_ten_nhan_vat.setTitleText("TẠO NHÂN VẬT");
            this.btn_tao_ten_nhan_vat.setTitleFontSize(35);
            this.btn_tao_ten_nhan_vat.setPressedActionEnabled(true);

            this.btn_clear_nick.setVisible(false);
        },
        openUpdateNN: function () {
            if (this.pTaoNhanVat) {
                this.pTaoNhanVat.removeFromParent(true);
                this.pTaoNhanVat = null;
            } else {
                this.initPTaoNhanVat();
            }
        },
        clearNickName: function () {
            this.tf_tao_ten_nhan_vat.setString("");
        },
        createNickName: function () {
            var nickName = this.tf_tao_ten_nhan_vat.getString();
            if (lobby.loginLayer.invalidateNickName(nickName)) {
                var url = "";
                if (userInfo.loginBy == loginBy.LOGIN_THUONG) {
                    var userName = userInfo.userName;
                    var pass = md5(userInfo.passWord);
                    if (userInfo.passWordLD != "")
                        pass = userInfo.passWordLD;
                    url = urlUpdateNick(userName, pass, nickName, GameManager.platform);
                } else {
                    var url = urlUpdateNickFBGG(userInfo.loginBy, userInfo.accessTokenFBGG, nickName, GameManager.platform);
                }
                sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
            }
        },
        invalidateNickName: function (nn) {
            var check = false;
            if (nn == null || nn.length < 6 || nn.length > 16) {
                gI.popUp.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái, số và dấu _");
            } else if (!checkKyTuSpecial(nn, true)) {
                gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái,số và dấu _!");
            } else if (!checkNickNameNhayCam(nn)) {
                gI.popUp.openPanel_Alert_Lobby("Không chọn NickName nhạy cảm!");
            } else
                check = true;
            return check;
        },

        closePSelectOpt: function () {
            this.pn_sms_app_lobby.setVisible(false);
            this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 0));
        },
        closePOtp: function () {
            this.pn_login_otp.runAction(cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc(function () {
                this.pn_login_otp.removeFromParent(true);
                this.pn_login_otp = null;
            }.bind(this))));
        },
        openSelectOtp: function () {
            this.pn_sms_app_lobby.setVisible(true);
            this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 1));
        },
        selectSmsOtp: function () {
            this.txt_sms_otp_lobby.setString("SMS OTP");
            this.closePSelectOpt();
            this.type_otp_login = LoginLayer.TYPE_SMS_OTP;
        },
        selectAppOtp: function () {
            this.txt_sms_otp_lobby.setString("APP OTP");
            this.closePSelectOpt();
            this.type_otp_login = LoginLayer.TYPE_APP_OTP;
        },
        loginWithOtp: function () {
            var otp = this.tf_login_otp.getString();
            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else if (!checkKyTuSpecial(otp, false)) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else {
                this.sendLoginOtp(otp);
            }
        },
        sendLoginOtp: function (strOtp) {
            sceneMgr.addLoading();
            if (userInfo.loginBy == loginBy.LOGIN_THUONG) {
                var url = urlLoginWithOtp(userInfo.userName, md5(userInfo.passWord), strOtp, this.type_otp_login, GameManager.platform);
                sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
            } else {
                var url = urlLoginFB_GG_Otp(userInfo.loginBy, userInfo.accessTokenFBGG, strOtp, this.type_otp_login, GameManager.platform);
                sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
            }
        },
        sendLogin: function () {
            userInfo.loginBy = loginBy.LOGIN_THUONG;
            var url = this.getUrlLogin();
            if (url != null) {
                sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
                sceneMgr.addLoading();
            }
        },
        getUrlLogin: function () {
            var user = this.tf_user_name_tab.getString();
            var pass = this.tf_pass_tab.getString();
            this.saveUserName = user;
            if (user == null || user.length < 6) {
                gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập tên đăng nhập hoặc sai tên đăng nhập!...");
                return null;
            }
            if (pass == null || pass.length < 6) {
                gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập mật khẩu hoặc sai mật khẩu!...");
                return null;
            }
            userInfo.userName = user;
            userInfo.passWord = pass;
            pass = md5(pass);
            var url = urlLogin(user, pass, GameManager.platform);
            return url;

        },
        onClickFBTab: function () {
            userInfo.loginBy = loginBy.LOGIN_FB;
            if (!cc.sys.isNative) {
                this.loginFBWeb();
            } else {
                socialMgr.setTarget(this, this.onGetAcsessToken.bind(this));
                socialMgr.loginFacebook();
            }
        },
        onClickGGTab: function () {
            userInfo.loginBy = loginBy.LOGIN_GG;
            if (!cc.sys.isNative) {
                this.loginGGWeb();
            } else {
                socialMgr.setTarget(this, this.onGetAcsessToken.bind(this));
                socialMgr.loginGoogle();
            }
        },

        loginGGWeb: function () {
            var that = this;
            gapi.auth2.getAuthInstance().signIn().then(function () {
                userInfo.accessTokenFBGG = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
                that.sendLoginFBGG(userInfo.accessTokenFBGG);
                sceneMgr.addLoading();

            });

        },

        loginFBWeb: function () {
            var that = this;
            FB.login(function (response) {
                if (response.status === 'connected') {
                    userInfo.accessTokenFBGG = response.authResponse.accessToken;
                    cc.log(userInfo.accessTokenFBGG);
                    that.sendLoginFBGG(userInfo.accessTokenFBGG);
                    sceneMgr.addLoading();

                } else if (response.status === 'not_authorized') {
                    //document.getElementById('status').innerHTML = 'We are not logged in.'
                } else {
                    //document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
                }
            });
        },
        sendLoginFBGG: function (accessToken) {
            var url = urlLoginGGFB(userInfo.loginBy, accessToken, GameManager.platform);
            sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
            sceneMgr.addLoading();
        },
        getConfigSuccess: function () {
            if (!cc.sys.isNative) {
                var facebookcanvas = window.location.href;
                if (facebookcanvas.search("a=") != -1) {
                    var vt = facebookcanvas.search("a=");
                    var nx = facebookcanvas.search("&b");
                    var username = facebookcanvas.substring(vt + 2, nx);
                    username = Jacob__Codec__Base64__decode(username);
                    cc.log("username : " + username);

                    var pass = facebookcanvas.substring(nx + 3, facebookcanvas.length);
                    cc.log("pass : " + pass);
                    pass = Jacob__Codec__Base64__decode(pass);
                    userInfo.userName = username;
                    userInfo.passWordLD = pass;
                    var url = urlLogin(username, pass, GameManager.platform);
                    sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
                    userGameData.removeItem("current_user_info_login");
                }
                if (facebookcanvas.search("nn=") != -1) {
                    userGameData.removeItem("current_user_info_login");
                    var vt = facebookcanvas.search("nn=");
                    var nx = facebookcanvas.search("&at");

                    var nn = facebookcanvas.substring(vt + 3, nx);
                    nn = Jacob__Codec__Base64__decode(nn);
                    cc.log("username : " + nn);

                    var at = facebookcanvas.substring(nx + 4, facebookcanvas.length);

                    var url = urlLoginAcccessToken(nn, at);
                    this.isLoginAccessToken = true;
                    sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
                }
                if (facebookcanvas.search("s=fb") != -1 || facebookcanvas.search("s=gg") != -1) {
                    if (facebookcanvas.search("s=fb") != -1) {
                        userInfo.loginBy = loginBy.LOGIN_FB;
                        this.loginFBWeb();
                    } else {
                        userInfo.loginBy = loginBy.LOGIN_GG;
                        this.loginGGWeb();
                    }
                    return;
                }
            }

            var data = userGameData.getItem("current_user_info_login");
            if (data != null && data != undefined) {
                this.loginAccessToken(data);
            }
        },
        loginAccessToken: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                var sessionKey = jsonData["sessionKey"];
                userInfo.accessToken = jsonData["accessToken"];
                var userData = JSON.parse(Jacob__Codec__Base64__decode(sessionKey));
                userInfo.userData = userData;
                this.sendLoginAccessToken(userInfo.userData.nickname, userInfo.accessToken);
                cc.log("nickname = " + userInfo.userData.nickname + ",accessToken = " + userInfo.accessToken);
            }

        },
        sendLoginAccessToken: function (nickname, accessTokenUrl) {
            var url = urlLoginAcccessToken(nickname, accessTokenUrl);
            this.isLoginAccessToken = true;
            sendRequest(url, null, false, this.callBackLogIn.bind(this), this.callBackError.bind(this));
        },

        onGetAcsessToken: function (socialID, data) {
            var obj = JSON.parse(data);
            var token = "";
            if (obj["error"] == 0) {
                token = obj["token"];
                if (token == null || token == undefined) {
                    token = obj["access_token"];
                }
                userInfo.accessTokenFBGG = token;
                this.sendLoginFBGG(token);
                sceneMgr.addLoading("Đang đăng nhập vui lòng chờ xíu...");
            }
            else {
                gI.popUp.openPanel_Alert_Lobby("Xảy ra lỗi khi đăng nhập vui lòng thử lại...");
            }
        },
        callBackError: function () {
            sceneMgr.clearLoading();
            gI.popUp.openPanel_Alert_Lobby("Xảy ra lỗi khi đăng nhập vui lòng thử lại...");
        },
        openPLoginOtp: function () {
            if (!this.pn_login_otp) {
                this.initPLoginOTP();
            }
        },
        callBackLogIn: function (response) {
            if (!response) {
                gI.popUp.openPanel_Alert_Lobby("Lỗi đăng nhập vui lòng thử lại");
            }
            var jsonData = JSON.parse(response);
            //cc.log("login : " + response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            sceneMgr.clearLoading();
            if (success) {
                if (this.isLoginAccessToken) {
                    this.isLoginAccessToken = false;
                }
                userGameData.setItem("current_user_info_login", response);
                if (this.saveUserName != "")
                    userGameData.setItem("current_username", this.saveUserName);
                ConfigProfile.save_password = this.tf_pass_tab.getString();
                var sessionKey = jsonData["sessionKey"];
                userInfo.accessToken = jsonData["accessToken"];
                var userData = JSON.parse(Jacob__Codec__Base64__decode(sessionKey));
                userInfo.userData = userData;
                if (userInfo.userData.avatar == null || userInfo.userData.avatar == "")
                    userInfo.userData.avatar = "0";
                this.tf_user_name_tab.setString("");
                this.tf_pass_tab.setString("");
                this.lobby.loginSuccess();
                if (this.pTaoNhanVat) {
                    this.pTaoNhanVat.removeFromParent(true);
                    this.pTaoNhanVat = null;
                }
                if (this.pn_login_otp) {
                    this.pn_login_otp.removeFromParent(true);
                    this.pn_login_otp = null;
                }

                if (cc.sys.isNative) {
                    lobby.isNewUser = false;
                } else {
                    if (userInfo.userData.mobileSecure == 0)
                        lobby.isNewUser = true;
                }

            } else {
                userInfo.userData = null;
                if (this.isLoginAccessToken) {
                    this.isLoginAccessToken = false;
                } else {
                    switch (parseInt(errorCode)) {
                        case 1001:
                            gI.popUp.openPanel_Alert_Lobby("Mất kết nối máy chủ!");
                            break;
                        case 1005:
                            gI.popUp.openPanel_Alert_Lobby("Thông tin đăng nhập không hợp lệ!");
                            break;
                        case 1007:
                            gI.popUp.openPanel_Alert_Lobby("Thông tin đăng nhập không hợp lệ!");
                            break;
                        case 1109:
                            gI.popUp.openPanel_Alert_Lobby("Tài khoản đang bị khóa!");
                            break;
                        case 2001:
                            this.lobby.openUpdateNN();
                            break;
                        case 1012:
                            this.openPLoginOtp();
                            break;
                        case 1008:
                            gI.popUp.openPanel_Alert_Lobby("Mã xác thực không chính xác!");
                            break;
                        case 1021:
                            gI.popUp.openPanel_Alert_Lobby("Mã xác thực đã hết thời gian sử dụng!");
                            break;
                        case 1114:
                            gI.popUp.openPanel_Alert_Lobby("Hệ thống bảo trì vui lòng quay lại sau!");
                            break;
                        case 106:
                            gI.popUp.openPanel_Alert_Lobby("NickName không hợp lệ!");
                            break;
                        case 1010:
                            gI.popUp.openPanel_Alert_Lobby("NickName đã tồn tại!");
                            break;
                        case 1011:
                            gI.popUp.openPanel_Alert_Lobby("NickName không được trùng với UserName!");
                            break;
                        case 1013:
                            gI.popUp.openPanel_Alert_Lobby("Đã có NickName rồi!");
                            break;
                        case 116:
                            gI.popUp.openPanel_Alert_Lobby("Không chọn NickName nhạy cảm!");
                            break;
                        case 1014:
                            break;
                        case 1015:
                            break;
                        case 2002:
                            this.initChangePassword();
                            break;
                    }

                }

            }
        },


        initChangePassword: function () {
            if (this.pn_doi_pass == null) {
                var layout = this.addLayoutStructure(this, "pn_doi_pass", cc.p(640.00, 360.00), "", cc.size(1920.00, 1280.00), true, {visible: true});
                this.pn_doi_pass.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                this.pn_doi_pass.setBackGroundColor(cc.color.BLACK);
                this.pn_doi_pass.setBackGroundColorOpacity(180);
                this.pn_doi_pass.setLocalZOrder(500);
            } else
                this.pn_doi_pass.setVisible(true);

            this.addImage(layout, "bg_tab_menu", cc.p(960.00, 655.13), res_Lobby + "/bground_tab.png", cc.size(574, 326));
            this.bg_tab_menu.setScale9Enabled(false);
            this.bg_tab_menu.ignoreContentAdaptWithSize(false);
            this.bg_tab_menu.setContentSize(cc.size(574, 326));

            this.addLayout(layout, "nen", cc.p(960, 635.13), null, cc.size(541, 247), true);
            this.nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.nen.setBackGroundColor(GuiUtil.color("#6a3705"));
            this.nen.setBackGroundColorOpacity(0.6 * 255);

            this.addButtonStructure(layout, "btn_close_doi_pas", LoginLayer.BTN_CLOSE_DOIPASS, cc.p(887.39, 500.88), true, res_Lobby + "/btnClose.png");
            this.btn_close_doi_pas.setScale(0.9);
            this.btn_close_doi_pas.setVisible(false);
            this.addSpriteStructureWithoutResourcePath(layout, "bg_title", cc.p(960, 792.90), res_Lobby + "/titile.png");

            this.addTextStructure(layout, "txtInbox", cc.p(960.00, 795), "ĐỔI MẬT KHẨU", UTMBebas.fontName, "35", GuiUtil.color(162, 105, 64), {__size: cc.size(400, 45)});
            this.txtInbox.setColor(GuiUtil.color(162, 105, 64));

            this.addSpriteStructureWithoutResourcePath(layout, "spmaxacnhan", cc.p(745.80, 727.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });
            this.addEditBoxStructure(layout, "tf_old_pass", cc.p(961.29, 725.30), "", "Mật khẩu hiện tại", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            this["tf_old_pass"].setFontColor(cc.color.BLACK);
            this.addSpriteStructureWithoutResourcePath(layout, "sp", cc.p(745.80, 664.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });

            this.addButtonStructure(layout, "btn_change_pass", LoginLayer.BTN_CHANGE_PASS, cc.p(962.00, 544.53), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(layout, "txtInbox", cc.p(960, 545.69), "ĐỒNG Ý ĐỔI MẬT KHẨU", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.txtInbox.setColor(GuiUtil.color(162, 105, 64));

            this.addEditBoxStructure(layout, "tf_new_pass", cc.p(961.29, 662.30), "", "Mật khẩu mới", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            // this.tf_new_pass.setColor(GuiUtil.color("#7F7F7F"));
            this["tf_new_pass"].setFontColor(cc.color.BLACK);
            this.addSpriteStructureWithoutResourcePath(layout, "sp2", cc.p(745.80, 602.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });
            this.addEditBoxStructure(layout, "tf_new_pass_again", cc.p(961.29, 600.30), "", "Nhập lại mật khẩu mới", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            // this.tf_new_pass_again.setColor(GuiUtil.color("#7F7F7F"));
            this["tf_new_pass_again"].setFontColor(cc.color.BLACK);

            this.btn_change_pass.setScale(437.00 / 365.00, 66.00 / 58.00);
            if (!cc.sys.isNative) {
                this.tf_old_pass.nextTabFocus = this.tf_new_pass;
                this.tf_new_pass.nextTabFocus = this.tf_new_pass_again;
                this.tf_new_pass_again.nextTabFocus = this.tf_old_pass;
            }
        },

        closeChangePass: function () {
            this.pn_doi_pass.removeAllChildren();
            this.pn_doi_pass.setVisible(false);
        },

        funChangePass: function () {
            var oldpass = this.tf_old_pass.getString();
            var newpass = this.tf_new_pass.getString();
            var againpass = this.tf_new_pass_again.getString();

            if (ConfigProfile.save_password != null && ConfigProfile.save_password != "") {
                if (oldpass != ConfigProfile.save_password) {
                    gI.popUp.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
                    return null;
                }
            }
            if (oldpass == "") {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
            } else if (newpass == null || newpass.length < 6 || newpass.length > 16) {
                gI.popUp.openPanel_Alert_Lobby("Password trong khoảng từ 6 - 16 ký tự!");
            } else if (newpass == "123456" || newpass == "abc123" || newpass == "ABC123" || newpass == "000000" || newpass == "111111" || newpass == "222222"
                || newpass == "333333" || newpass == "444444" || newpass == "555555" || newpass == "666666" || newpass == "777777" || newpass == "888888"
                || newpass == "999999") {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu quá đơn giản. Vui lòng nhập lại!");
            } else if (newpass == "") {
                gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập mật khẩu mới!");
            } else if (oldpass == newpass) {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu mới giống mật khẩu hiện tại của bạn!");
            } else if (againpass == "" || newpass != againpass) {
                gI.popUp.openPanel_Alert_Lobby("Nhập lại mật khẩu không chính xác!");
            } else {
                var url = urlchangePassword(userInfo.userName, md5(oldpass), md5(newpass));
                sendRequest(url, null, false, this.callbackChangePass.bind(this), this.callBackError.bind(this));
                sceneMgr.addLoading("Vui lòng đợi!");
            }
        },

        callbackChangePass: function (response) {
            if (!response) {
                GameToast.makeToast(2, "Xảy ra lỗi, vui lòng thử lại!", this);
            }
            var jsonData = JSON.parse(response);
            var errorCode = jsonData["errorCode"];
            sceneMgr.clearLoading();
            if (errorCode == 0) {
                //gI.popUp.openPanel_Alert_Lobby("Đổi mật khẩu thành công!");
                this.callBackLogIn(response);
                this.closeChangePass();
            } else if (errorCode == 1001) {
                gI.popUp.openPanel_Alert_Lobby("Xảy ra lỗi, vui lòng thử lại!");
            } else if (errorCode == 1053) {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu mới phải khác với mật khẩu cũ!");
            } else if (errorCode == 1007) {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu cũ không chính xác!");
            } else if (errorCode == 1007) {
                gI.popUp.openPanel_Alert_Lobby("Tài khoản bị khóa. Vui lòng liên hệ tổng đài!");
            }
        },

        editBoxTextChanged: function (editBox, text) {

            if (editBox == this.tf_tao_ten_nhan_vat) {
                var str = this.tf_tao_ten_nhan_vat.getString();
                if (str != "")
                    this.btn_clear_nick.setVisible(true);
                else
                    this.btn_clear_nick.setVisible(false);
            }
        },
        editBoxReturn: function (editBox) {
            if (!cc.sys.isNative) {
                if (editBox == this.tf_tao_ten_nhan_vat) {
                    this.createNickName();
                } else if (editBox == this.tf_user_name_tab || editBox == this.tf_pass_tab)
                    this.sendLogin();
            }
            return;
        }
    });

LoginLayer.BTN_FACEBOOK_TAB = 1;
LoginLayer.BTN_GOOGLE_TAB = 2;
LoginLayer.BTN_DANG_NHAP_TAB = 3;
LoginLayer.BTN_DANG_KY_TAB = 4;
LoginLayer.BTN_QUEN_MK = 5;
LoginLayer.BTN_CLOSE_PANEL_SELECT_OTP = 6;
LoginLayer.BTN_CLOSE_PANEL_OTP = 7;
LoginLayer.BTN_SELECT_OTP = 8;
LoginLayer.BTN_LOGIN_OTP = 9;
LoginLayer.BTN_SELECT_SMS_OTP = 10;
LoginLayer.BTN_SELECT_APP_OTP = 11;
LoginLayer.BTN_CLEAR_NICKNAME = 12;
LoginLayer.BTN_TAO_TEN_NHAN_VAT = 13;
LoginLayer.BTN_CLOSE_DOIPASS = 14;
LoginLayer.BTN_CHANGE_PASS = 15;

LoginLayer.TYPE_SMS_OTP = 0;
LoginLayer.TYPE_APP_OTP = 1;


