
/**
 * Created by B150M on 3/23/2018.
 */
var QuanLyGameLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            this.arrayStatusGame = [];
            this.arrayIdGame = [];
            this.saveArrayStatusGame = [];
            this.ischeckListgame = false;
            ConfigSercurity.type_otp = 0;
            return true;
        },

        customizeGUI: function () {
            this.addLayout(this, "pn_quan_ly_game", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.createPnQuanLyGame();
            this.createPSMS();

        },
        createPnQuanLyGame: function () {
            this.addText(this.pn_quan_ly_game, "txt6", cc.p(517.5, 435.75), "CẤU HÌNH GAME", RobotoRegular.fontName, 30);
            this.txt6.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_quan_ly_game, "lb1", cc.p(517.5, 402), "Bảo mật cho tài khoản bằng cách thiết lập các game được phép chơi. Ngăn chặn nguy cơ bị mất tài khoản và chuyển tiền qua\n" +
                "các game khác.                 ", RobotoRegular.fontName, 18);
            this.lb1.ignoreContentAdaptWithSize(false);
            this.lb1.setContentSize(cc.size(1020, 42));
            this.lb1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.addImage(this.pn_quan_ly_game, "bg_quan_ly", cc.p(517.5, 290.5), res_ResourceMenuTab_Mail + "/lopmo.png", cc.size(1005, 158));
            this.bg_quan_ly.setScale9Enabled(false);
            this.bg_quan_ly.ignoreContentAdaptWithSize(false);
            this.bg_quan_ly.setContentSize(cc.size(1005, 158));

            this.addText(this.pn_quan_ly_game, "lb2_1", cc.p(230.5, 171), "Mã xác nhận: ", RobotoRegular.fontName, 20);
            this.addSprite(this.pn_quan_ly_game, "bg3", cc.p(419.5, 171), res_ResourceMenuTab_Mail + "/maxacnhan.png");
            this.addText(this.pn_quan_ly_game, "lb_sms_app_qlg", cc.p(411, 169), "SMS OTP", RobotoRegular.fontName, 25);
            this.lb_sms_app_qlg.setColor(GuiUtil.color("#4D4D4D"));
            this.addSprite(this.pn_quan_ly_game, "sp_muiten", cc.p(507, 172), res_ResourceMenuTab_Shopping + '/muiten_xuong.png');
            if(lobby.is_otp == 1){
                this.lb_sms_app_qlg.setString("APP OTP");
                this.sp_muiten.setVisible(false);
                ConfigSercurity.type_otp = 1;
            }
            this.addButton(this.pn_quan_ly_game, "btn_sms_app_qlg", QuanLyGameLayer.BTN_SMS_APP_QLGAME, cc.p(420, 173), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_sms_app_qlg.ignoreContentAdaptWithSize(false);
            this.btn_sms_app_qlg.setContentSize(cc.size(211, 39));
            this.addSprite(this.pn_quan_ly_game, "bg4", cc.p(637.5, 172), res_ResourceMenuTab_Mail + "/maxacnhan.png");
            this.bg4.setScaleX(0.8);
            this.addEditBox(this.pn_quan_ly_game, "tf_otp_config_game", cc.p(637, 172.5), "", "Mã OTP", RobotoRegular.fontName, 25, cc.size(170, 40), null, cc.TEXT_ALIGNMENT_CENTER, 5);
            this.tf_otp_config_game.setFontColor(cc.color("#4D4D4D"));

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(720, 100));
            uiRichGold.setPosition(570, 85);

            if(lobby.is_otp == 1){
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"", RobotoRegular.fontName, 20);

                uiRichGold.pushBackElement(lbgold);
            }else {
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"SMS OTP :", RobotoRegular.fontName, 20);
                var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255," Vui lòng soạn tin", RobotoRegular.fontName, 20);
                var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255,GameManager.webViewLink.OTPMessage, RobotoRegular.fontName, 20);
                var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255," gửi", RobotoRegular.fontName, 20);
                var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," "+ lobby.sms_otp, RobotoRegular.fontName, 20);
                var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để nhận mã xác thực", RobotoRegular.fontName, 20);

                uiRichGold.pushBackElement(lbgold);
                uiRichGold.pushBackElement(lbgold1);
                uiRichGold.pushBackElement(lbgold2);
                uiRichGold.pushBackElement(lbgold3);
                uiRichGold.pushBackElement(lbgold4);
                uiRichGold.pushBackElement(lbgold5);
            }

            this.pn_quan_ly_game.addChild(uiRichGold);

            var uiRichGold2 = new ccui.RichText();
            uiRichGold2.ignoreContentAdaptWithSize(false);
            uiRichGold2.setContentSize(cc.size(720, 100));
            uiRichGold2.setPosition(570, 60);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"APP OTP :", RobotoRegular.fontName, 20);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255," Nếu bạn đã cài", RobotoRegular.fontName, 20);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", RobotoRegular.fontName, 20);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255,". Vui lòng bật", RobotoRegular.fontName, 20);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", RobotoRegular.fontName, 20);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để lấy mã xác thực", RobotoRegular.fontName, 20);

            uiRichGold2.pushBackElement(lbgold);
            uiRichGold2.pushBackElement(lbgold1);
            uiRichGold2.pushBackElement(lbgold2);
            uiRichGold2.pushBackElement(lbgold3);
            uiRichGold2.pushBackElement(lbgold4);
            uiRichGold2.pushBackElement(lbgold5);
            this.pn_quan_ly_game.addChild(uiRichGold2);

            this.addButtonStructure(this.pn_quan_ly_game, "btn_save_qlgame", QuanLyGameLayer.BTN_SAVE_QLGAME, cc.p(517.5, 41), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this.pn_quan_ly_game, "t22", cc.p(517.5, 41), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.t22.setColor(GuiUtil.color(162,105,64));

            this.addLayout(this.pn_quan_ly_game, "pn_qlgame_chua_bm", cc.p(525, 108), null, cc.size(800, 190), true);
            this.pn_qlgame_chua_bm.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_qlgame_chua_bm.setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this.pn_qlgame_chua_bm.setBackGroundColorOpacity(254);
            this.addText(this.pn_qlgame_chua_bm, "Text_86", cc.p(369, 113), "Chức năng chỉ dành cho các tài khoản đã đăng ký bảo mật.\n" +
                "Để đăng ký bảo mật, vui lòng bấm                .", RobotoRegular.fontName, 18);

            this.Text_86.ignoreContentAdaptWithSize(false);
            this.Text_86.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.Text_86.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.Text_86.setContentSize(cc.size(600, 100))
            this.addButton(this.pn_qlgame_chua_bm, "link_qlgame", QuanLyGameLayer.BTN_LINK_QLGAME, cc.p(505, 101), true, res_ResourceMenuTab_BaoMat + "/link_click.png", res_ResourceMenuTab_BaoMat + "/link_click.png");
            this.link_qlgame.ignoreContentAdaptWithSize(false);
            this.link_qlgame.setContentSize(cc.size(63, 22));
            this.pn_qlgame_chua_bm.setVisible(false);
            if (this.check_dangky_baomat == 0) {
                this.pn_qlgame_chua_bm.setVisible(true);
            } else {
                this.pn_qlgame_chua_bm.setVisible(false);
            }
            this.pn_quan_ly_game.setVisible(true);
            this.funGotoQuanLyGame();
        },

        createPSMS: function () {
            this.addLayout(this, "pn_sms_app", cc.p(541.5, 179), null, cc.size(218, 88), true);
            this.pn_sms_app.setLocalZOrder(5000);
            this.pn_sms_app.setVisible(false);
            this.pn_sms_app.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_sms_app.setTag(QuanLyGameLayer.BTN_CLOSE_SMS_APP);
            this.addButton(this.pn_sms_app, "btn_close_sms_app", QuanLyGameLayer.BTN_CLOSE_SMS_APP, cc.p(108, 173), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this.btn_close_sms_app.ignoreContentAdaptWithSize(false);
            this.btn_close_sms_app.setContentSize(cc.size(2560, 2000));

            this.addLayout(this.pn_sms_app, "Panel_77", cc.p(109, 44), null, cc.size(216, 86), true);
            this.Panel_77.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.Panel_77.setBackGroundColor(GuiUtil.color("#4e2b0c"));
            this.Panel_77.setBackGroundColorOpacity(254);
            this.addButton(this.pn_sms_app, "btn_bm_sms", QuanLyGameLayer.BTN_BM_SMS, cc.p(109, 65), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_sms.setTitleText("SMS OTP");
            this.btn_bm_sms.setTitleFontSize(20);
            this.btn_bm_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_sms.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_sms.ignoreContentAdaptWithSize(false);
            this.btn_bm_sms.setContentSize(cc.size(206, 33));
            this.addButton(this.pn_sms_app, "btn_bm_app", QuanLyGameLayer.BTN_BM_APP, cc.p(109, 24), true, res_ResourceMenuTab_Shopping + "/txt_the.png", res_ResourceMenuTab_Shopping + "/txt_the.png");
            this.btn_bm_app.setTitleText("APP OTP");
            this.btn_bm_app.setTitleFontSize(20);
            this.btn_bm_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_bm_app.setTitleColor(GuiUtil.color("#000000"));
            this.btn_bm_app.ignoreContentAdaptWithSize(false);
            this.btn_bm_app.setContentSize(cc.size(206, 33));
        },

        funGotoQuanLyGame: function () {
            var array = userInfo.userData.configGame;
            var vitriX = 42.63;
            var vitriY = 338.55;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            if (this.arrayStatusGame != null)
                while (this.arrayStatusGame.length > 0) {
                    this.arrayStatusGame.pop();
                }
            for (var i = 0; i < array.length; i++) {
                if (this.pn_quan_ly_game.getChildByName("ck_game_" + i) == null) {
                    var texttpe = ccui.Widget.LOCAL_TEXTURE;
                    if (cc.spriteFrameCache.getSpriteFrame("res/ResourceMenuTab/BaoMat/checkbox.png"))
                        texttpe = ccui.Widget.PLIST_TEXTURE;

                    var button2 = new ccui.Button();
                    texttpe = ccui.Widget.PLIST_TEXTURE;
                    button2.loadTextureNormal("res/ResourceMenuTab/BaoMat/checkbox.png",checkLoadtextture("res/ResourceMenuTab/BaoMat/checkbox.png"));
                    button2.setPosition(cc.p(vitriX, vitriY));
                    button2.setName("ck_game_s" + i);
                    button2.setPressedActionEnabled(false);
                    this.pn_quan_ly_game.addChild(button2);

                    //var lb_xacnhan = new cc.Sprite();
                    var lb_xacnhan = GuiUtil.createSprite("res/ResourceMenuTab/BaoMat/click2.png");
                    lb_xacnhan.setName("tich_" + i);
                    lb_xacnhan.setPosition(cc.p(vitriX, vitriY));
                    this.pn_quan_ly_game.addChild(lb_xacnhan);
                    if (array[i].status == 1) {
                        lb_xacnhan.setVisible(false);
                    }

                    var lb_game = new ccui.Text(array[i].name, fonts.fontName, 18);
                    lb_game.setName("ck_game_s" + i);
                    lb_game.setPosition(cc.p((vitriX + 118.26), vitriY));
                    lb_game.setColor(GuiUtil.color("#e8daad"));
                    lb_game.ignoreContentAdaptWithSize(false);
                    lb_game.setContentSize(cc.size(200, 25));
                    this.pn_quan_ly_game.addChild(lb_game);
                    lb_game.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_game(sender.name);
                                break;
                        }

                    }, this);

                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/BaoMat/Chk_game.png",checkLoadtextture("res/ResourceMenuTab/BaoMat/Chk_game.png"));
                    button.setPosition(cc.p(vitriX + 79, vitriY));
                    button.setName("ck_game_" + i);
                    this.pn_quan_ly_game.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_game(sender.name);
                                break;
                        }

                    }, this);

                    this.arrayStatusGame.push(array[i].status);
                    this.arrayIdGame.push(array[i].id);
                    this.saveArrayStatusGame.push(array[i].status);
                    //cc.log("this.arrayStatusGame " + this.arrayStatusGame);

                    vitriX = vitriX + 245;
                    if (i == 3 || i == 7 || i == 11) {
                        vitriX = 42.63;
                        vitriY = vitriY - 48;
                    }
                } else {
                    if (this.pn_quan_ly_game.getChildByName("tich_" + i) != null) {
                        var lb_xacnhan = this.pn_quan_ly_game.getChildByName("tich_" + i);
                        if (array[i].status == 1) {
                            lb_xacnhan.setVisible(false);
                        } else {
                            lb_xacnhan.setVisible(true);
                        }
                    }

                    this.arrayStatusGame.push(array[i].status);
                    this.arrayIdGame.pop();
                    this.arrayIdGame.push(array[i].id);
                    this.saveArrayStatusGame.push(array[i].id);
                    //cc.log("this.arrayStatusGame " + this.arrayStatusGame);
                }
            }
        },
        detail_game: function (value) {
            cc.log("value : "+ value.substring((value.length - 1), value.length));
            var stt = value.substr(8, value.length);
            if (this.pn_quan_ly_game.getChildByName("tich_" + stt) != null) {
                var lb_xacnhan = this.pn_quan_ly_game.getChildByName("tich_" + stt);
                if (this.arrayStatusGame[stt] == 0) {
                    this.arrayStatusGame[stt] = 1;
                    lb_xacnhan.setVisible(false);
                } else {
                    this.arrayStatusGame[stt] = 0;
                    lb_xacnhan.setVisible(true);
                }
                // cc.log("mang sau2 : " + this.arrayStatusGame);
            }
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case QuanLyGameLayer.BTN_SAVE_QLGAME:
                    this.funConfigGame();
                    break;
                case QuanLyGameLayer.BTN_SMS_APP_QLGAME:
                    if(lobby.is_otp == 1){
                        return;
                    }
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case QuanLyGameLayer.BTN_CLOSE_SMS_APP:
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(false);
                    break;
                case QuanLyGameLayer.BTN_BM_SMS:
                    this.lb_sms_app_qlg.setString("SMS OTP");
                    ConfigSercurity.type_otp = 0;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case QuanLyGameLayer.BTN_BM_APP:
                    this.lb_sms_app_qlg.setString("APP OTP");
                    ConfigSercurity.type_otp = 1;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
            }
        },

        funConfigGame: function () {
            var arrObj = [];
            arrObj.pop();
            //cc.log("sercurity_info.arrayIdGame.length " + sercurity_info.arrayIdGame.length);
            for (var i = 0; i < this.arrayIdGame.length; i++) {
                var obj = {
                    id: this.arrayIdGame[i],
                    name: "",
                    status: this.arrayStatusGame[i],
                };
                arrObj.push(obj);
            }
            var json = JSON.stringify(arrObj);
            this.checkArrayListGame();
            var otp = this.tf_otp_config_game.getString();
            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else if (this.ischeckListgame == false) {
                gI.popUp.openPanel_Alert_Lobby("Cấu hình không có thay đổi so với trước!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var sercurity = new CmdSendConfigGames();
                    sercurity.putConfigGames(json);
                    gI.mainSocket.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, ConfigSercurity.type_otp);
                        gI.mainSocket.send(sendOtp);
                        sendOtp.clean();
                    })));
                    //this.btn_save_qlgame.setEnabled(false);
                    this.ischeckListgame = false;

                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },
        responseConfigGames: function (error) {
            //this.btn_save_qlgame.setEnabled(true);
            //cc.log("error config games: " + error);
            if (error == 0) {
                gI.popUp.openPanel_Alert_Lobby("Lưu thay đổi thành công!");
                var array = userInfo.userData.configGame;
                for (var i = 0; i < array.length; i++) {
                    this.saveArrayStatusGame[i].status = this.arrayStatusGame[i];
                    array[i].status = this.arrayStatusGame[i];
                }
            } else {
                gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }
        },
        checkArrayListGame: function () {
            for (var i = 0; i < this.arrayStatusGame.length; i++) {
                if (this.arrayStatusGame[i] != this.saveArrayStatusGame[i]) {
                    this.ischeckListgame = true;
                    return;
                }
            }
        },






    });


QuanLyGameLayer.BTN_SAVE_QLGAME = 1;
QuanLyGameLayer.BTN_SMS_APP_QLGAME = 2;
QuanLyGameLayer.BTN_CLOSE_SMS_APP = 3;
QuanLyGameLayer.BTN_BM_SMS = 4;
QuanLyGameLayer.BTN_BM_APP = 5;
QuanLyGameLayer.BTN_LINK_QLGAME = 6;







