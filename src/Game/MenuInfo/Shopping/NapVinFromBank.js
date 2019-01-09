/**
 * Created by B150M on 3/23/2018.
 */

var NapVinFromBank = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.positionY_bank = 303;
    },

    customizeGUI: function () {
        this.createPnNapBanking();
        this.CheckConFig();
    },

    CheckConFig: function () {
        if (ConfigShopping.is_recharge == 0) {
            if (ConfigShopping.is_recharge_bank == 0) {
                var array = guildShopExchangeBank();
                initRichText(this.lv_quydinh_bank, array);
            }
        }
        this.gotoNapBank();
        this.shopping.hideLoadingNapVin();
    },
    createPnNapBanking: function () {
        this.addLayout(this, "pn_nap_banking", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.addText(this.pn_nap_banking, "txt1", cc.p(240, 426), "MUA "+GameManager.config.moneyNameUpper+" QUA NGÂN HÀNG", RobotoRegular.fontName, 30);
        this.txt1.setColor(GuiUtil.color("#FFDF58"));
        this.txt1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txt1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addSprite(this.pn_nap_banking, "bg_1", cc.p(240, 357), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_banking, "lb_chose_bank", cc.p(240, 357), "Lựa chọn ngân hàng", RobotoRegular.fontName, 20);
        this.lb_chose_bank.setColor(GuiUtil.color("#666666"));
        this.lb_chose_bank.ignoreContentAdaptWithSize(false);
        this.lb_chose_bank.setContentSize(cc.size(347, 26));
        this.lb_chose_bank.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addButton(this.pn_nap_banking, "btn_chose_bank", NapVinFromBank.BTN_SELECT_BANK, cc.p(240, 357), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_chose_bank.ignoreContentAdaptWithSize(false);
        this.btn_chose_bank.setContentSize(cc.size(351, 46));
        this.addSprite(this.pn_nap_banking, "mt", cc.p(437, 357), res_ResourceMenuTab_Shopping + "/muiten_xuong.png");
        this.addSprite(this.pn_nap_banking, "bg_2", cc.p(240, 284), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_banking, "lb_chose_mg_bank", cc.p(240, 284), "Lựa chọn mệnh giá", RobotoRegular.fontName, 20);
        this.lb_chose_mg_bank.setColor(GuiUtil.color("#666666"));
        this.lb_chose_mg_bank.ignoreContentAdaptWithSize(false);
        this.lb_chose_mg_bank.setContentSize(cc.size(347, 26));
        this.lb_chose_mg_bank.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addButton(this.pn_nap_banking, "btn_chose_mg_bank", NapVinFromBank.BTN_SELECT_MG_BANK, cc.p(240, 284), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_chose_mg_bank.ignoreContentAdaptWithSize(false);
        this.btn_chose_mg_bank.setContentSize(cc.size(351, 46));
        this.addSprite(this.pn_nap_banking, "mt_0", cc.p(437, 284), res_ResourceMenuTab_Shopping + "/muiten_xuong.png");
        this.addSprite(this.pn_nap_banking, "bg_3", cc.p(240, 211), res_ResourceMenuTab_Shopping + "/bg_2.png");
        this.addText(this.pn_nap_banking, "txt_vin_nhan_duoc", cc.p(130, 209), "Số "+GameManager.config.moneyName+" nhận:", RobotoRegular.fontName, 20);
        this.txt_vin_nhan_duoc.setColor(GuiUtil.color("#666666"));
        this.addText(this.pn_nap_banking, "txt_vin_nhan_bank", cc.p(307.5, 209), "", RobotoRegular.fontName, 22);
        this.txt_vin_nhan_bank.setColor(GuiUtil.color("#C100FF"));
        this.txt_vin_nhan_bank.ignoreContentAdaptWithSize(false);
        this.txt_vin_nhan_bank.setContentSize(cc.size(208, 26));
        this.txt_vin_nhan_bank.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);

        this.addButtonStructure(this.pn_nap_banking, "btn_nap_vin_bank", NapVinFromBank.BTN_NAP_VIN_BANKING, cc.p(240, 109), true,
            [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

        this.addTextStructure(this.pn_nap_banking, "lb_bank", cc.p(240, 109), "MUA "+GameManager.config.moneyNameUpper+"", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
        this.lb_bank.setColor(GuiUtil.color(162,105,64));

        this.addText(this.pn_nap_banking, "txt2", cc.p(726, 426), "QUY ĐỊNH MUA "+GameManager.config.moneyNameUpper+" QUA NGÂN HÀNG", RobotoRegular.fontName, 30);
        this.txt2.setColor(GuiUtil.color("#FFDF58"));
        this.txt2.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txt2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addListView(this.pn_nap_banking, "lv_quydinh_bank", cc.p(758.9, 210.84), cc.size(570, 350));
        this.lv_quydinh_bank.setScrollBarEnabled(false);
        this.lv_quydinh_bank.setTouchEnabled(false);
        this.lv_quydinh_bank.setScrollBarEnabled(false);

        this.addListView(this.pn_nap_banking, "sc_bank", cc.p(736.5, 92), cc.size(490, 160));
        this.sc_bank.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.sc_bank.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.sc_bank.setBackGroundColor(GuiUtil.color("#9696FF"));
        this.sc_bank.setBackGroundColorOpacity(0);
        this.addButton(this.pn_nap_banking, "btn_previous", 0, cc.p(467.5, 91), false, res_ResourceMenuTab_Shopping + '/bank/back.png', res_ResourceMenuTab_Shopping + '/bank/back.png');
        this.btn_previous.ignoreContentAdaptWithSize(false);
        this.btn_previous.setContentSize(cc.size(24, 33));
        this.addButton(this.pn_nap_banking, "btn_next", 0, cc.p(1003, 91), false, res_ResourceMenuTab_Shopping + '/bank/next.png', res_ResourceMenuTab_Shopping + '/bank/next.png');
        this.btn_next.ignoreContentAdaptWithSize(false);
        this.btn_next.setContentSize(cc.size(24, 33));
        this.addLayout(this.pn_nap_banking, "pn_select_bank", cc.p(241, 131.5), null, cc.size(350, 401), true);
        this.pn_select_bank.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_select_bank.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.pn_select_bank.setBackGroundColorOpacity(255);
        this.pn_select_bank.setVisible(false);
        this.addButton(this.pn_select_bank, "btn_close_pn_select_bank", NapVinFromBank.BTN_CLOSE_SELECT_BANK, cc.p(451, 359), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_pn_select_bank.ignoreContentAdaptWithSize(false);
        this.btn_close_pn_select_bank.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_select_bank, "bg_pn_select_bank", cc.p(175, 398), null, cc.size(350, 6), true);

        this.addListView(this.pn_select_bank, "lv_list_bank", cc.p(175, 200.5), cc.size(346, 397));
        this.addLayout(this.pn_nap_banking, "pn_menh_gia_bank", cc.p(241, 94), null, cc.size(350, 328), true);
        this.pn_menh_gia_bank.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_menh_gia_bank.setBackGroundColor(GuiUtil.color("#4e2b0c"));
        this.pn_menh_gia_bank.setBackGroundColorOpacity(255);
        this.pn_menh_gia_bank.setVisible(false);
        this.addButton(this.pn_menh_gia_bank, "btn_close_pn_mg_bank", NapVinFromBank.BTN_CLOSE_SELECT_MG_BANK, cc.p(451, 359), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
        this.btn_close_pn_mg_bank.ignoreContentAdaptWithSize(false);
        this.btn_close_pn_mg_bank.setContentSize(cc.size(1280, 720));
        this.addLayout(this.pn_menh_gia_bank, "bg_pn_menh_gia_bank", cc.p(175, 224), null, cc.size(350, 208), true);

    },

    gotoNapBank: function () {
        this.lv_list_bank.removeAllChildren();
        this.sc_bank.removeAllChildren();
        for (var i = 0; i < ConfigShopping.valueRechargeBank.length; i++) {
            if (this.pn_menh_gia_bank.getChildByName("value_bank_" + i) != null) {
                var button = this.pn_menh_gia_bank.getChildByName("value_bank_" + i);
                button.setVisible(false);
            }
        }

        for (var i = 0; i < ConfigShopping.recharge_bank.length; i++) {
            var cl1 = new ccui.Layout();
            cl1.height = 42;
            cl1.width = this.lv_list_bank.width;

            if (this.lv_list_bank.getChildByName("btn_bank" + ConfigShopping.recharge_bank[i]) == null) {
                var button = new ccui.Button();

                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_bank.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_bank.png");
                button.setPosition(cc.p(173, 20));
                var str = this.getNameBank(ConfigShopping.recharge_bank[i]);
                button.setTitleText(str);
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(15);
                button.setName("btn_bank" + ConfigShopping.recharge_bank[i]);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonSelectBank(sender.getName());
                            break;
                    }

                }, this);
                cl1.addChild(button);
                this.lv_list_bank.pushBackCustomItem(cl1);
                if (ConfigShopping.recharge_bank.length >= 10)
                    this.bg_pn_select_bank.height = 401;
                else
                    this.bg_pn_select_bank.height = this.bg_pn_select_bank.height + 42;
            }
        }

        for (var i = 0; i <= ConfigShopping.recharge_bank.length; i++) {
            if (i % 2 == 1) {
                var lblLayer = new ccui.Layout();
                lblLayer.height = this.sc_bank.height;
                lblLayer.width = 70;

                var btnItem = new ccui.Button();
                btnItem.setName("logo_" + ConfigShopping.recharge_bank[i - 1]);
                GuiUtil.loadTextureNormal(btnItem,"res/ResourceMenuTab/Shopping/bank/bank_" + ConfigShopping.recharge_bank[i - 1] + ".png");
                GuiUtil.loadTexturePressed(btnItem,"res/ResourceMenuTab/Shopping/bank/bank_" + ConfigShopping.recharge_bank[i - 1] + ".png");
                btnItem.setTouchEnabled(true);
                btnItem.setPosition(cc.p(35, 120));
                btnItem.setTag(i - 1);
                lblLayer.addChild(btnItem);
                btnItem.addTouchEventListener(this.onTouchLogo, this);

                if (i < ConfigShopping.recharge_bank.length) {
                    var btnItem1 = new ccui.Button();
                    btnItem1.setName("logo_" + ConfigShopping.recharge_bank[i]);
                    GuiUtil.loadTextureNormal(btnItem1,"res/ResourceMenuTab/Shopping/bank/bank_" + ConfigShopping.recharge_bank[i] + ".png");
                    GuiUtil.loadTexturePressed(btnItem1,"res/ResourceMenuTab/Shopping/bank/bank_" + ConfigShopping.recharge_bank[i] + ".png");
                    btnItem1.setTouchEnabled(true);
                    btnItem1.setPosition(cc.p(35, 40));
                    btnItem1.setTag(i);
                    lblLayer.addChild(btnItem1);
                    btnItem1.addTouchEventListener(this.onTouchLogo, this);
                }

                this.sc_bank.pushBackCustomItem(lblLayer);
            }
        }

        for (var i = 0; i < ConfigShopping.valueRechargeBank.length; i++) {
            if (this.pn_menh_gia_bank.getChildByName("value_bank_" + i) == null) {
                var button = new ccui.Button();
                GuiUtil.loadTextureNormal(button,"res/ResourceMenuTab/Shopping/txt_bank.png");
                GuiUtil.loadTexturePressed(button,"res/ResourceMenuTab/Shopping/txt_bank.png");
                button.setPosition(cc.p(175, this.positionY_bank));
                var str = ConfigShopping.valueRechargeBank[i];
                button.setTitleText(formatMoney(0, 3, str));
                button.setTitleColor(GuiUtil.color("#000000"));
                button.setTitleFontName(GuiUtil.getFontNameButton("Roboto-Regular"));
                button.setTitleFontSize(20);
                button.setName("value_bank_" + i);

                this.pn_menh_gia_bank.addChild(button);

                button.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonMenhGiaBank(sender.titleText);
                            break;
                    }

                }, this);
                this.positionY_bank = this.positionY_bank - 48;
            } else {
                var button = this.pn_menh_gia_bank.getChildByName("value_bank_" + i);
                button.setVisible(true);
                var str = ConfigShopping.valueRechargeBank[i];
                button.setTitleText(formatMoney(0, 3, str));
            }
        }
        this.positionY_bank = 303;
        this.bg_pn_menh_gia_bank.height = 12 + ConfigShopping.valueRechargeBank.length * 40 + (ConfigShopping.valueRechargeBank.length - 1) * 8;
    },
    getNameBank: function (value) {
        var str = "";
        if (value == 0)
            return str = "Ngân hàng đầu tư và phát triển Việt Nam - BIDV";
        else if (value == 1)
            return str = "Ngân Hàng TMCP Công Thương VN - VietinBank";
        else if (value == 2)
            return str = "Ngân hàng TMCP Ngoại thương VN - Vietcombank";
        else if (value == 3)
            return str = "Ngân hàng TMCP Hàng Hải VN - Maritime Bank";
        else if (value == 4)
            return str = "Ngân hàng Việt Nam Thịnh vượng - VPBank";
        else if (value == 5)
            return str = "Ngân hàng thương mại cổ phần Việt Á";
        else if (value == 6)
            return str = "Ngân hàng TMCP Kỹ thương VN - TechcomBank";
        else if (value == 7)
            return str = "Ngân hàng TMCP xuất nhập khẩu VN - EximBank";
        else if (value == 8)
            return str = "Ngân Hàng Quốc Tế - VIB";
        else if (value == 9)
            return str = "Ngân hàng TMCP Tiên Phong - TPBank";
        else if (value == 10)
            return str = "Ngân hàng TMCP Sài Gòn – Hà Nội - SHB";
        else if (value == 11)
            return str = "Ngân Hàng TMCP Đông Nam Á - SeaBank";
        else if (value == 12)
            return str = "Ngân Hàng TMCP SG Thương Tín - SacomBank";
        else if (value == 13)
            return str = "Ngân Hàng TMCP Đại Dương - OceanBank";
        else if (value == 14)
            return str = "Ngân Hàng TMCP Quân Đội - MBBank";
        else if (value == 15)
            return str = "Ngân hàng TM TNHH MTV Dầu Khí TC - GPBank";
        else if (value == 16)
            return str = "Ngân hàng TMCP Bắc Á - BacA Bank";
        else if (value == 17)
            return str = "Ngân hàng NN và PT Nông thôn VN - Agribank";
        else if (value == 18)
            return str = "Ngân Hàng TMCP An Bình - ABBank";
        else if (value == 19)
            return str = "Ngân Hàng TMCP Á Châu - ACB";
        else if (value == 20)
            return str = "Ngân Hàng TMCP Phương Đông VN - OricomBank";
        else if (value == 21)
            return str = "Ngân hàng Bưu điện Liên Việt - LienVietPostBank";
        else if (value == 22)
            return str = "Ngân hàng TMCP Đông Á - DongA Bank";
        else if (value == 23)
            return str = "Ngân Hàng TMCP Bảo Việt - Baovietbank";
        else if (value == 24)
            return str = "Ngân Hàng TMCP PT Nhà TP HCM - HDBank";
        else if (value == 25)
            return str = "Ngân hàng TMCP Kiên Long - KienLong Bank";
        else if (value == 26)
            return str = "Ngân hàng TMCP Nam Á - Nam A Bank";
        else if (value == 27)
            return str = "Ngân hàng Quốc Dân - NCB";
        else if (value == 28)
            return str = "Ngân hàng Liên doanh Việt - Nga - VRB";
        else if (value == 50)
            return str = "Ngân hàng SmartlinkCard - SML";
    },

    buttonSelectBank: function (value) {
        this.save_select_bank = value.substr(8, value.length);
        //cc.log("stt bank " + shopping_info.save_select_bank);
        this.pn_select_bank.setVisible(false);
        this.pn_select_bank.runAction(cc.scaleTo(0, 1, 0));
        this.lb_chose_bank.setFontSize(15);
        this.lb_chose_bank.setString(this.getNameBank(this.save_select_bank));
    },
    buttonMenhGiaBank: function (value) {
        this.lb_chose_mg_bank.setString(value);
        this.save_menhgia_bank = replaceAll(".", "", value);
        //cc.log("menh gia bank: " + shopping_info.save_menhgia_bank);
        this.pn_menh_gia_bank.setVisible(false);
        this.pn_menh_gia_bank.runAction(cc.scaleTo(0, 1, 0));
        var str = Number(this.save_menhgia_bank * ConfigShopping.radio_vin_bank).toFixed(0);
        this.txt_vin_nhan_bank.setString(formatMoney(0, 3, str));
    },

    onTouchLogo: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.save_select_bank = sender.getName().substr(5, sender.getName().length);
                //cc.log("bank: " + shopping_info.save_select_bank);
                this.lb_chose_bank.setFontSize(15);
                this.lb_chose_bank.setString(this.getNameBank(this.save_select_bank));
                break;
        }
    },

    funRechargeBank: function () {
        if (this.save_select_bank == null)
             gI.popUp.openPanel_Alert_Lobby("Vui lòng lựa chọn ngân hàng của bạn!");
        else if (this.save_menhgia_bank == null)
             gI.popUp.openPanel_Alert_Lobby("Vui lòng lựa chọn mệnh giá bạn muốn nạp!");
        else {
            if(ConfigShopping.is_payment_socket_bank == 0){
                if (gI.mainSocket.listener.isLogged) {
                    var rechargeBank = new CmdSendRechargeBank();
                    rechargeBank.putRechargeBank(this.save_select_bank, this.save_menhgia_bank);
                    //cc.log("bank : " + this.save_select_bank + " menh gia: " + this.save_menhgia_bank);
                    gI.mainSocket.send(rechargeBank);
                    rechargeBank.clean();
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }else{
                this.callApiBank(this.save_menhgia_bank, this.save_select_bank);
            }
        }
    },
    responseRechargeBank: function (error, url) {
        //cc.log("error nap bank : " + error + " url : " + url );
        if (error == 1)
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
        else if (error == 3)
             gI.popUp.openPanel_Alert_Lobby("Hiện tại ngân hàng này đang không hỗ trợ!");
        else if (error == 0) {
            if (cc.sys.isNative) {
                ConnectNative.openWebView(url, false);
            } else {
                window.location = url;
            }
        }
    },



    onButtonRelease: function (button, id) {
        switch (id) {

            case NapVinFromBank.BTN_SELECT_BANK:
                this.pn_select_bank.setVisible(true);
                this.pn_select_bank.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case NapVinFromBank.BTN_SELECT_MG_BANK:
                this.pn_menh_gia_bank.setVisible(true);
                this.pn_menh_gia_bank.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case NapVinFromBank.BTN_CLOSE_SELECT_MG_BANK:
                this.pn_menh_gia_bank.setVisible(false);
                this.pn_menh_gia_bank.runAction(cc.scaleTo(0, 1, 0));
                break;
            case NapVinFromBank.BTN_CLOSE_SELECT_BANK:
                this.pn_select_bank.setVisible(false);
                this.pn_select_bank.runAction(cc.scaleTo(0, 1, 0));
                break;
            case NapVinFromBank.BTN_NAP_VIN_BANKING:
                this.funRechargeBank();
                break;
        }
    },
    callApiBank: function (money, bank) {
        var url = urlnapQuaNganHang(userInfo.userData.nickname, money, bank, userInfo.userData.IP, lobby.platform);
        sendRequest(url, null, false, this.callbackNapBank.bind(this), this.shopping.callBackError.bind(this));
    },

    callbackNapBank : function(response) {
        var jsonData = JSON.parse(response);
        var error = jsonData["error"];
        var url = jsonData["url"];
        if (error == 1)
            gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
        else if (error == 3)
            gI.popUp.openPanel_Alert_Lobby("Hiện tại ngân hàng này đang không hỗ trợ!");
        else if (error == 0) {
            if (cc.sys.isNative) {
                ConnectNative.openWebView(url, false);
            } else {
                window.location = url;
            }
        }
    },




});


NapVinFromBank.BTN_SELECT_BANK = 1;
NapVinFromBank.BTN_CLOSE_SELECT_BANK = 2;
NapVinFromBank.BTN_CLOSE_SELECT_MG_BANK = 3;
NapVinFromBank.BTN_SELECT_MG_BANK = 4;
NapVinFromBank.BTN_NAP_VIN_BANKING = 5;













