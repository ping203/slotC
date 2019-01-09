/**
 * Created by B150M on 7/29/2017.
 */
var chuyenkhoan = null;
var chuyenkhoanX = null;
var chuyenkhoanY = null;
var chuyenkhoanAppear = null;

//var MNIFChuyenKhoanLayer = BaseLayer.extend(
var ChuyenKhoanLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this.chuyenKhoanLayer = null;
            this.pn_chuyen_khoan = null;
            this.lb_so_du_vin = null;
            this.tf_nickname = null;
            this.tf_nickname_again = null;
            this.tf_so_vin_chuyen = null;
            this.lb_vin_nhan_duoc = null;
            this.tf_ly_do = null;
            this.sp_ma_capcha = null;
            this.btn_daily = null;
            this.btn_tiep_tuc = null;
            this.pn_dai_ly = null;
            this.pn_quy_dinh = null;
            this.btn_back_ck = null;
            this.save_nickname = "";
            this.save_money = 0;
            this.save_description = "";
            this.btn_close_chuyenkhoan = null;
            this.lb_phigiaodich = null;
            this.lb_quydinh_chuyenkhoan = null;
            this.isfirstChuyenKhoan = false;
            this.arrDaiLy = [];
            this.panel_dai_ly = null;
            this.btn_close_daily = null;
            this._super("ChuyenKhoanLayer");
            this.commonImagePath = "res/ResourceMenuTab/";
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/BaoMat/PlistBaoMat.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/ChuyenKhoan/PlistChuyenKhoan.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            this.setTitleText("CHUYỂN KHOẢN");
            this.addButton(this, "btn_back_ck", ChuyenKhoanLayer.BTN_CHUYENKHOAN_BACK, cc.p(133, 639), true, res_Lobby + "/btnBack.png", res_Lobby + "/btnBack.png");

            this.addButton(this, "btn_close_chuyenkhoan", ChuyenKhoanLayer.BTN_CLOSE_ALL_CHUYENKHOAN, cc.p(this._btnExit.getPositionX(), this._btnExit.getPositionY()), true, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png");
            this._btnExit.setVisible(false);
            this._bgLayer.setBackGroundColorOpacity(0);

            this.addSprite(this, "bg", cc.p(351, 518), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addText(this, "lb", cc.p(233, 516), "Số dư KD:", RobotoRegular.fontName, 22);
            this["lb"].setColor(GuiUtil.color("#292929"));
            this.addText(this, "lb_so_du_vin", cc.p(375, 516), formatMoney(0, 3, userInfo.userData.vinTotal), RobotoRegular.fontName, 23);
            this["lb_so_du_vin"].setName("lb_so_du_vin");
            this.lb_so_du_vin.setColor(colorVinShopping);
            this.lb_so_du_vin.ignoreContentAdaptWithSize(false);
            this.lb_so_du_vin.setContentSize(cc.size(189, 30));
            this.lb_so_du_vin.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_so_du_vin.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.lb_so_du_vin.enableOutline(GuiUtil.color("#BFBFBF"), 1);

            this.addSprite(this, "sp_xeng", cc.p(504, 516), this.commonImagePath + "iconVin.png");
            this.sp_xeng.setScale(0.7);

            this.addButton(this, "btn_clear_nickname_ck", ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_CK, cc.p(147, 456), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.addSprite(this, "bg_0", cc.p(351, 458), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addEditBox(this, "tf_nickname", cc.p(350, 457), "", "Nickname:", RobotoRegular.fontName, 21, cc.size(333, 40), null, cc.TEXT_ALIGNMENT_LEFT, 16);
            this.tf_nickname.setName("tf_nickname");
            this.tf_nickname.setFontColor(cc.color.BLACK);
            this.addText(this, "lb_check_daily", cc.p(480, 458), "(dl_cap1)", RobotoRegular.fontName, 21);
            this.lb_check_daily.setColor(GuiUtil.color("#C200FF"));
            this.lb_check_daily.ignoreContentAdaptWithSize(false);
            this.lb_check_daily.setContentSize(cc.size(100, 25));
            this.lb_check_daily.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.lb_check_daily.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            this.addButton(this, "btn_clear_nickname_again_ck", ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_AGAIN_CK, cc.p(147, 394), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.addSprite(this, "bg2", cc.p(351, 397.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addEditBox(this, "tf_nickname_again", cc.p(350, 398), "", "Nhập lại Nickname:", RobotoRegular.fontName, 21, cc.size(333, 40), null, cc.TEXT_ALIGNMENT_LEFT, 16);
            this.tf_nickname_again.setName("tf_nickname_again");
            this.tf_nickname_again.setFontColor(cc.color.BLACK);
            this.addSprite(this, "bg2_0", cc.p(351, 336.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addEditBox(this, "tf_so_vin_chuyen", cc.p(350, 337), "", "Nhập số " + GameManager.config.moneyName + " cần chuyển", RobotoRegular.fontName, 21, cc.size(333, 40), null, cc.TEXT_ALIGNMENT_LEFT, 15);
            this.tf_so_vin_chuyen.setName("tf_so_vin_chuyen");
            this.tf_so_vin_chuyen.setFontColor(colorVinShopping);
            this.tf_so_vin_chuyen.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

            this.addText(this, "lb_0", cc.p(244, 283.5), "Phí giao dịch:", RobotoRegular.fontName, 20);
            this.addText(this, "lb_phigiaodich", cc.p(337, 283.5), "", RobotoRegular.fontName, 22);
            this["lb_phigiaodich"].setColor(GuiUtil.color(255, 223, 83));
            this.addSprite(this, "bg_1", cc.p(351, 231), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addText(this, "lb_vin", cc.p(249.5, 229), "Số " + GameManager.config.moneyName + " nhận :", RobotoRegular.fontName, 22);
            this["lb_vin"].setColor(GuiUtil.color("#292929"));
            this.addEditBox(this, "lb_vin_nhan_duoc", cc.p(426.5, 230), "", "", RobotoRegular.fontName, 21, cc.size(196, 40), null, cc.TEXT_ALIGNMENT_RIGHT, 15);
            this.lb_vin_nhan_duoc.setName("lb_vin_nhan_duoc");
            this.lb_vin_nhan_duoc.setFontColor(colorVinShopping);
            this.addButton(this, "btn_clear_lydo", ChuyenKhoanLayer.BTN_CLEAR_LYDO, cc.p(147, 169), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.addSprite(this, "bg2_0_0", cc.p(351, 170.5), res_ResourceMenuTab_Shopping + '/bg_2.png');
            this.addEditBox(this, "tf_ly_do", cc.p(350, 170), "", "Lý do chuyển khoản", RobotoRegular.fontName, 21, cc.size(333, 40), null, cc.TEXT_ALIGNMENT_LEFT, 100);
            this.tf_ly_do.setFontColor(cc.color.BLACK);

            this.addButtonStructure(this, "btn_tiep_tuc", ChuyenKhoanLayer.BTN_CHUYENKHOAN_TIEPTUC, cc.p(351, 105.5), true,
                [this.commonImagePath + "Mail/xbutton.png", this.commonImagePath + "Mail/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this, "lb_tt", cc.p(351, 105.5), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_tt.setColor(GuiUtil.color(162, 105, 64));

            this.addImage(this, "Image_2", cc.p(848, 308), res_ResourceMenuTab_Mail + "/lopmo.png", cc.size(575, 452));
            this.Image_2.setScale9Enabled(false);
            this.Image_2.ignoreContentAdaptWithSize(false);
            this.Image_2.setContentSize(cc.size(575, 452));
            this.Image_2.setColor(GuiUtil.color("#4e2b0c"));

            this.addLayout(this, "pn_quy_dinh", cc.p(847.5, 283), null, cc.size(544, 434), true);
            this.addSprite(this["pn_quy_dinh"], "bg", cc.p(272, 460), res_ResourceMenuTab_ChuyenKhoan + "/bg_daily.png");
            this.addText(this["pn_quy_dinh"], "lb_notice_0", cc.p(272, 457), "QUY ĐỊNH", RobotoRegular.fontName, 24);
            this.lb_notice_0.setColor(GuiUtil.color("#FFDF58"));
            this.addButtonStructure(this, "btn_daily", ChuyenKhoanLayer.BTN_CHUYENKHOAN_DAILY, cc.p(854.5, 96.5), true,
                [this.commonImagePath + "Mail/xbutton.png", this.commonImagePath + "Mail/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(this, "lb_dl", cc.p(854.5, 96.5), "ĐẠI LÝ", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_dl.setColor(GuiUtil.color(162, 105, 64));

            this.btn_daily.setVisible(false);
            this.lb_dl.setVisible(false);

            this.lb_phigiaodich.setString((100 - Number(ConfigShopping.radio_tranfer * 100)) + "%");
            this.lb_check_daily.setVisible(false);
        //    this.lb_so_du_vin.setString(formatMoney(0, 3,userInfo.userData.moneyUse));
            this.btn_clear_nickname_ck.setVisible(false);
            this.btn_clear_nickname_again_ck.setVisible(false);
            this.btn_clear_lydo.setVisible(false);
            this.addListView(this.pn_quy_dinh, "lv_quydinh_chuyenkhoan", cc.p(271.35, 226.70), cc.size(560, 410));
            this.lv_quydinh_chuyenkhoan.setScrollBarEnabled(false);
            this.lv_quydinh_chuyenkhoan.setTouchEnabled(false);
            this.lv_quydinh_chuyenkhoan.setScrollBarEnabled(false);
            var array = guildChuyenKhoan();
            this.initRichText(this.lv_quydinh_chuyenkhoan, array);
            this.createTabView();
            this.tf_nickname.nextTabFocus = this.tf_nickname_again;
            this.tf_nickname_again.nextTabFocus = this.tf_so_vin_chuyen;
            this.tf_so_vin_chuyen.nextTabFocus =  this.lb_vin_nhan_duoc;
            this.lb_vin_nhan_duoc.nextTabFocus = this.tf_ly_do;
            this.lb_vin_nhan_duoc.tf_ly_do =  this.tf_nickname;
        },
        createTabView: function () {
            if (ConfigShopping.is_daily == 0)
                var arrTitleTab = ["CHUYỂN KHOẢN", "ĐẠI LÝ"];
            else
                var arrTitleTab = ["CHUYỂN KHOẢN"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1, 0);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);
        },
        onClickTab: function (tabIndex, index) {
            cc.log(index);
            if (index == 0) {
                this.closeDaiLy();
            } else if (index == 1) {
                menutab.openDaiLyLayer();
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_CK:
                    this.tf_nickname.setString("");
                    this.tf_nickname.setPlaceHolder("Nickname:");
                    this.btn_clear_nickname_ck.setVisible(false);
                    this.tf_nickname.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_nickname.runAction(cc.scaleTo(0.225, 1));
                    this.lb_check_daily.setVisible(false);
                    if (this.getChildByName("checkNickname") != null) {
                        var aSprite4 = this.getChildByName("checkNickname");
                        aSprite4.setVisible(false);
                    }
                    break;
                case ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_AGAIN_CK:
                    this.tf_nickname_again.setString("");
                    this.tf_nickname_again.setPlaceHolder("Nhập lại Nickname:");
                    this.btn_clear_nickname_again_ck.setVisible(false);
                    this.tf_nickname_again.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_nickname_again.runAction(cc.scaleTo(0.225, 1));
                    break;
                case ChuyenKhoanLayer.BTN_CLEAR_LYDO:
                    this.tf_ly_do.setString("");
                    this.tf_ly_do.setPlaceHolder("Lý do chuyển khoản");
                    this.btn_clear_lydo.setVisible(false);
                    this.tf_ly_do.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_ly_do.runAction(cc.scaleTo(0.225, 1));
                    break;
                // chuyen khoan
                case ChuyenKhoanLayer.BTN_CHUYENKHOAN_BACK:
                    ConfigShopping.check_tab_shopping = 2;
                    this.closeChuyenKhoanLayer();
                    this.closeDaiLy();

                    menutab.openShoppingLayer();

                    break;
                case ChuyenKhoanLayer.BTN_CLOSE_ALL_CHUYENKHOAN:
                   this.closeDaiLy();
                    this.closeChuyenKhoanLayer();
                    break;
                case ChuyenKhoanLayer.BTN_CHUYENKHOAN_DAILY:
                    closechuyenkhoanTest();
                    openDaiLytest(menutab);
                    break;
                case ChuyenKhoanLayer.BTN_CHUYENKHOAN_TIEPTUC:
                    this.funExchangeVin();
                    break;
            }
        },

        funExchangeVin: function () {
            var nickname = this.tf_nickname.getString();
            var nickname_again = this.tf_nickname_again.getString();
            var money = this.tf_so_vin_chuyen.getString();
            if(money != "") {
                money = replaceAll(".", "", money);
            }
            var description = this.tf_ly_do.getString();

            this.save_nickname = nickname;
            this.save_money = money;
            this.save_description = description;

            if (nickname == null || nickname.length < 6 || nickname.length > 16) {
                 gI.popUp.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái, số và dấu _");
            } else if (!checkKyTuSpecial(nickname, true)) {
                 gI.popUp.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái,số và dấu _!");
            } else if (nickname != nickname_again) {
                 gI.popUp.openPanel_Alert_Lobby("NickName nhập lại không đúng!");
            } else if (nickname.toLowerCase() == (userInfo.userData.nickname).toLowerCase()) {
                 gI.popUp.openPanel_Alert_Lobby("Không thể chuyển khoản cho chính mình!");
            } else if (money == "" || parseInt(money) < ConfigShopping.transfer_min) {
                 gI.popUp.openPanel_Alert_Lobby("Số " + GameManager.config.moneyName + " tối thiểu chuyển khoản là " + formatMoney(0, 3, ConfigShopping.transfer_min) + " " + GameManager.config.moneyName + "!");
            } else if (parseInt(money) > userInfo.userData.vinTotal) {
                 gI.popUp.openPanel_Alert_Lobby("Không thể chuyển vượt quá số dư khả dụng!");
            }  else if (description == "") {
                 gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập nội dung chuyển khoản!");
            } else {
                if (this.ischeckDaiLy == true) {

                    var dailyLayer = new BaseLayer();
                    dailyLayer.setContentSize(cc.size(1280,720));
                    dailyLayer.addText(dailyLayer,"txt_content",cc.p(627,471),
                        "Bạn có chắc chắn muốn\nchuyển cho tài khoản: " + this.save_nickname,RobotoRegular.fontName,20);
                    dailyLayer.setPosition(cc.p(-640,-360));
                    dailyLayer.txt_content.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.addText(dailyLayer,"txt_note_daily",cc.p(627,428),"(Đại lý)",RobotoRegular.fontName,20);
                    dailyLayer.txt_note_daily.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_note_daily.setContentSize(cc.size(750,30));
                    dailyLayer.txt_note_daily.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.txt_note_daily.setColor(cc.color("#1BFF00"));
                    dailyLayer.addText(dailyLayer,"txt_so_tien",cc.p(565,385),"Số tiền:",RobotoRegular.fontName,20);
                    dailyLayer.txt_so_tien.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_so_tien.setContentSize(cc.size(750,30));
                    dailyLayer.txt_so_tien.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.addText(dailyLayer,"txt_money",cc.p(690,385),formatMoney(0, 3, parseInt(this.save_money)) + " "+GameManager.config.moneyName+"",RobotoRegular.fontName,20);
                    dailyLayer.txt_money.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_money.setContentSize(cc.size(750,30));
                    dailyLayer.txt_money.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.txt_money.setColor(cc.color(231,2,254));
                    dailyLayer.addText(dailyLayer,"txt_lydo",cc.p(627,342),"Lý do: " + this.save_description + "!",RobotoRegular.fontName,20);
                    dailyLayer.txt_lydo.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_lydo.setContentSize(cc.size(750,30));
                    dailyLayer.txt_lydo.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                     gI.popUp.open_panel_message_confirm("THÔNG BÁO", dailyLayer, "ĐỒNG Ý", "HỦY", this.confirmRechargeMoney.bind(this), null);
                } else {
                    var dailyLayer = new BaseLayer();
                    dailyLayer.setContentSize(cc.size(1280,720));
                    dailyLayer.addText(dailyLayer,"txt_content",cc.p(627,471),
                        "Bạn có chắc chắn muốn\nchuyển cho tài khoản: " + this.save_nickname,RobotoRegular.fontName,20);
                    dailyLayer.setPosition(cc.p(-640,-360));
                    dailyLayer.txt_content.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.addText(dailyLayer,"txt_note_daily",cc.p(627,400),"(Không phải là đại lý)\nChỉ nên giao dịch với đại lý để tránh lừa đảo!!!",RobotoRegular.fontName,20);
                    dailyLayer.txt_note_daily.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_note_daily.setContentSize(cc.size(750,60));
                    dailyLayer.txt_note_daily.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.txt_note_daily.setColor(cc.color("#FF0000"));
                    dailyLayer.addText(dailyLayer,"txt_so_tien",cc.p(565,345),"Số tiền:",RobotoRegular.fontName,20);
                    dailyLayer.txt_so_tien.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_so_tien.setContentSize(cc.size(750,30));
                    dailyLayer.txt_so_tien.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.addText(dailyLayer,"txt_money",cc.p(690,345),formatMoney(0, 3, parseInt(this.save_money)) + " "+GameManager.config.moneyName+"",RobotoRegular.fontName,20);
                    dailyLayer.txt_money.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_money.setContentSize(cc.size(750,30));
                    dailyLayer.txt_money.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    dailyLayer.txt_money.setColor(cc.color(231,2,254));
                    dailyLayer.addText(dailyLayer,"txt_lydo",cc.p(627,302),"Lý do: " + this.save_description + "!",RobotoRegular.fontName,20);
                    dailyLayer.txt_lydo.ignoreContentAdaptWithSize(false);
                    dailyLayer.txt_lydo.setContentSize(cc.size(750,30));
                    dailyLayer.txt_lydo.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

                    gI.popUp.open_panel_message_confirm("THÔNG BÁO",dailyLayer, "ĐỒNG Ý", "HỦY", this.confirmRechargeMoney.bind(this), null);
                }

            }


        },



        editBoxEditingDidBegin: function (editBox) {


        },

        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if (editBox.getName() == "tf_nickname") {
                if (str.length >= 6 && str.length <= 16) {
                    this.checkNickName();
                } else {
                    this.lb_check_daily.setVisible(false);
                    if (this.getChildByName("checkNickname") != null) {
                        this.getChildByName("checkNickname").setVisible(false);
                    }
                }
            }
            else if (editBox.getName() == "tf_so_vin_chuyen" || editBox.getName() == "lb_vin_nhan_duoc") {
                str = replaceAll(".", "", str);
                if (!isNumeric(str)) {
                    str = str.substr(0, str.length - 1);
                }
                if (!isNumeric(str)) {
                    str = "";
                }
                if (editBox.getName() == "tf_so_vin_chuyen") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                    if (Number(str) >= Number(ConfigShopping.transfer_min))
                        this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, parseInt(Number(str) * ConfigShopping.radio_tranfer)));
                    else
                        this.lb_vin_nhan_duoc.setString("");
                } else if (editBox.getName() == "lb_vin_nhan_duoc") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                    if (Number(str) >= parseInt(ConfigShopping.transfer_min * ConfigShopping.radio_tranfer)) {
                        this.tf_so_vin_chuyen.setString(formatMoney(0, 3, Math.round(Number(str) / ConfigShopping.radio_tranfer)));
                    }
                }

            }
        },

        editBoxTextChanged: function (editBox, text) {


        },

        editBoxReturn: function (editBox) {
            if(!cc.sys.isNative) {
                var str = editBox.getString();
                if (editBox.getName() == "tf_nickname") {
                    if (str.length >= 6 && str.length <= 16) {
                        this.checkNickName();
                    } else {
                        this.lb_check_daily.setVisible(false);
                        if (this.getChildByName("checkNickname") != null) {
                            this.getChildByName("checkNickname").setVisible(false);
                        }
                    }
                }
            }
            return;
        },

        checkNickName: function () {
            var str = this.tf_nickname.getString();
            this.isSameNickName = false;
            this.ischeckDaiLy = false;
            if (this.isSameNickName == false) {
                if (gI.mainSocket.listener.isLogged) {
                    var checkNick = new CmdSendCheckNickName();
                    checkNick.putCheckNickName(str);
                    gI.mainSocket.send(checkNick);
                    checkNick.clean();
                } else {
                    if (this.getChildByName("checkNickname") != null) {
                        var aSprite4 = this.getChildByName("checkNickname");
                        aSprite4.setVisible(false);

                    }
                }
            }
        },

        detail_daily_test: function (nickname, fullname) {
            funGetMoneyUse();
            this.tf_nickname.setString(nickname);
            this.tf_nickname_again.setString(nickname);
            this.lb_check_daily.setVisible(true);
            this.btn_clear_nickname_ck.setVisible(true);
            this.btn_clear_nickname_again_ck.setVisible(true);
            this.btn_clear_lydo.setVisible(true);

            this.tf_ly_do.setString("Chuyển khoản " + GameManager.config.moneyName + " cho " + fullname);
            this.checkNickName();
            this.tf_nickname.setColor(GuiUtil.color("#3E3E3E"));
            this.tf_nickname_again.setColor(GuiUtil.color("#3E3E3E"));
            this.tf_ly_do.setColor(GuiUtil.color("#3E3E3E"));
        },


        responsenickname: function (error, type, fee) {
            //cc.log("error responsenickname : " + error + " type : " + type + " fee : " +fee);
            var str = this.tf_nickname.getString();
            this.lb_check_daily.setVisible(false);
            if (error == 0) {
                if (this.getChildByName("checkNickname") != null) {
                    var aSprite4 = this.getChildByName("checkNickname");
                     aSprite4.setVisible(false);
                     this.tf_nickname_again.setString("");
                } else {
                    var aSprite4 = GuiUtil.createSprite("res/ResourceMenuTab/BaoMat/click2.png");
                    aSprite4.setPosition(cc.p(540.59, 458.80));
                    aSprite4.setName("checkNickname");
                    this.addChild(aSprite4);
                }
            } else {
                ConfigShopping.radio_tranfer = (100 - fee) / 100;
                this.lb_phigiaodich.setString((100 - Number(ConfigShopping.radio_tranfer * 100)) + "%");
                this.isSameNickName = true;
                if (this.getChildByName("checkNickname") == null) {
                    var aSprite4 = GuiUtil.createSprite("res/ResourceMenuTab/BaoMat/click2.png");
                    aSprite4.setPosition(cc.p(540.59, 458.80));
                    aSprite4.setName("checkNickname");
                    this.addChild(aSprite4);
                } else {
                    var aSprite4 = this.getChildByName("checkNickname");
                    aSprite4.setVisible(true);
                    //this.tf_nickname_again.setString(str);
                }
                if (type == 1) {
                    this.ischeckDaiLy = true;
                    this.lb_check_daily.setVisible(true);
                } else {
                    this.ischeckDaiLy = false;
                    this.lb_check_daily.setVisible(false);
                }
                var money_put = this.tf_so_vin_chuyen.getString();
                var money_receive = this.lb_vin_nhan_duoc.getString();
                if(Number(money_put)>0) {
                    money_put = replaceAll(".", "", money_put);
                }

                if (Number(money_receive) > 0) {
                    money_receive = replaceAll(".", "", money_receive);
                    this.tf_so_vin_chuyen.setString(formatMoney(0, 3, Math.round(Number(money_receive) / ConfigShopping.radio_tranfer)));
                } else {
                    if (Number(money_put) > Number(ConfigShopping.transfer_min)) {
                        this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, Math.round(Number(str) * ConfigShopping.radio_tranfer)));
                    }
                }

            }
        },

        encode_utf8: function (s) {
            return unescape(encodeURIComponent(s));
        },
        confirmRechargeMoney: function () {
            if (gI.mainSocket.listener.isLogged) {
                var shopping = new CmdSendExchangeVin();
                //cc.log("ly do chuyen: " + chuyenkhoan.encode_utf8(chuyenkhoan.save_description));
                shopping.putExchangeVin(this.save_nickname, parseInt(this.save_money), this.encode_utf8(this.save_description));
                gI.mainSocket.send(shopping);
                shopping.clean();
            } else {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        },
        responseExchangeMoneyTest: function (error, moneyUse) {
            //cc.log("error: " + error  + " moneyUse : " + moneyUse);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch chuyển khoản!", 1, 4);
            userInfo.userData.moneyUse = moneyUse;
            } else if (error == 1) {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 2) {
                 gI.popUp.openPanel_Alert_Lobby("Số tiền tối thiểu chuyển khoản là " + formatMoney(0, 3, ConfigShopping.transfer_min) + " " + GameManager.config.moneyName + "!");
            } else if (error == 3) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                     gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", menutab.chuyenKhoanLayer.gotoSercurity, null);
                })));
            } else if (error == 4) {
                 gI.popUp.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (error == 5) {
                 gI.popUp.openPanel_Alert_Lobby("Tài khoản bị cấm chuyển tiền!");
            } else if (error == 6) {
                 gI.popUp.openPanel_Alert_Lobby("Nickname nhận chuyển khoản không tồn tại!");
            } else if (error == 10) {
                 gI.popUp.openPanel_Alert_Lobby("Chức năng bảo mật sẽ tự động kích hoạt sau " + ConfigShopping.configHour + "h kể từ thời điểm đăng\nký thành công!");
            } else if (error == 11) {
                 gI.popUp.openPanel_Alert_Lobby("Bạn chỉ được chuyển cho Đại lý tổng trong khoảng tiền quy định!");
            }
        },

        gotoSercurity: function () {
            menutab.chuyenKhoanLayer.closeChuyenKhoanLayer();
            menutab.openSercurityLayer();

        },
        responseResultExchangeMoneyTest: function (error, moneyUse, currentMoney) {
            //cc.log("error: " + error  + " moneyUse : " + moneyUse + " currentMoney : " + currentMoney);

            if (error == 0) {
                 gI.popUp.openPanel_Alert_Lobby("Giao dịch chuyển khoản thành công!");
                funGetMoneyUse();
                this.tf_nickname.setString("");
                this.tf_nickname.setPlaceHolder("Nickname:");
                this.tf_nickname.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_nickname.runAction(cc.scaleTo(0.225, 1));

                this.lb_check_daily.setVisible(false);

                if (this.getChildByName("checkNickname") != null) {
                    var aSprite4 = this.getChildByName("checkNickname");
                    aSprite4.setVisible(false);
                }

                this.tf_nickname_again.setString("");
                this.tf_nickname_again.setPlaceHolder("Nhập lại Nickname:");
                this.tf_nickname_again.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_nickname_again.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_nickname_ck.setVisible(false);

                this.tf_so_vin_chuyen.setString("");
                this.tf_so_vin_chuyen.setPlaceHolder("Nhập số " + GameManager.config.moneyName + " cần chuyển");
                this.tf_so_vin_chuyen.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_so_vin_chuyen.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_nickname_again_ck.setVisible(false);

                this.lb_vin_nhan_duoc.setString("");
                this.isSameNickName = false;

                this.tf_ly_do.setString("");
                this.tf_ly_do.setPlaceHolder("Lý do chuyển khoản");
                this.tf_ly_do.setColor(GuiUtil.color("#FFFFFF"));
                this.tf_ly_do.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_lydo.setVisible(false);

                userInfo.userData.moneyUse = moneyUse;
                userInfo.userData.vinTotal = currentMoney;

                this.lb_so_du_vin.setString(formatMoney(0, 3,userInfo.userData.moneyUse));

                if (userInfo == null) {
                } else {
                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                    menutab.changeFontMoney();
                }
            } else if (error == 1) {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },
        initRichText: function (parent, array) {
            parent.removeAllItems();
            parent.removeAllChildren();

            for (var j = 0; j < array.length; j++) {
                var cellList = new ccui.Layout();
                cellList.height = 20;
                cellList.width = parent.width;
                cellList.setPosition(cc.p(0, 0));

                var uiRichGold = new ccui.RichText();
                uiRichGold.ignoreContentAdaptWithSize(false);
                uiRichGold.setContentSize(cc.size(cellList.width, 20));
                uiRichGold.setPosition(cc.p(cellList.width / 2, cellList.height / 2));

                var content = array[j];
                var kc = 0;

                for (var i = 0; i < content.length; i++) {
                    var noidung = content[i][0];
                    var color = content[i][1];
                    if (color.search("sprite_") == -1) {
                        var lbgold = new ccui.RichElementText(1, GuiUtil.color(color), 255, noidung, RobotoRegular.fontName, 17);
                    } else {
                        var lbgold = new ccui.RichElementImage(1, cc.color.WHITE, 255, noidung);
                        kc = kc + color.substring(7, color.length);
                    }
                    uiRichGold.pushBackElement(lbgold);
                }

                cc.log("cell height " + kc);
                var numcell = Math.round(kc / 20);
                cc.log("cell num " + numcell);
                cellList.addChild(uiRichGold);
                parent.pushBackCustomItem(cellList);
                if (numcell > 0) {
                    for (var h = 0; h < numcell; h++) {
                        var cellList = new ccui.Layout();
                        cellList.height = 20;
                        cellList.width = parent.width;
                        cellList.setPosition(cc.p(0, 0));
                        parent.pushBackCustomItem(cellList);
                    }
                }
            }
        },
        closeChuyenKhoanLayer:function(){
            if(menutab.chuyenKhoanLayer != null){
                menutab.chuyenKhoanLayer .removeFromParent(true);
                menutab.chuyenKhoanLayer  = null;
            }
        },


        closeDaiLy: function () {
            if (menutab.dailyLayer != null) {
                menutab.dailyLayer.removeFromParent(true);
                menutab.dailyLayer = null;
            }
        },


    }
);

ChuyenKhoanLayer.BTN_CHUYENKHOAN_BACK = 1;
ChuyenKhoanLayer.BTN_CHUYENKHOAN_DAILY = 2;
ChuyenKhoanLayer.BTN_CHUYENKHOAN_TIEPTUC = 4;
ChuyenKhoanLayer.BTN_CLOSE_ALL_CHUYENKHOAN = 96;
ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_CK = 97;
ChuyenKhoanLayer.BTN_CLEAR_NICKNAME_AGAIN_CK = 98;
ChuyenKhoanLayer.BTN_CLEAR_LYDO = 99;
ChuyenKhoanLayer.BTN_CLOSE_DAILY = 5;





