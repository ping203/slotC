/**
 * Created by B150M on 3/23/2018.
 */
var ShoppingLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("ShoppingLayer");
            this.napVinLayer = null;
            this.napVinThelayer = null;
            this.napVinFromBank = null;
            this.napVinFromSms = null;
            this.napVinFromIap= null;
            this.recharge = null;
            this.checkBack = "";
            this.checkDoiThe = 0;
            this.napXulayer = null;
            this.tieuVinLayer = null;
            this.muaMaTheDtLayer = null;
            this.muaTheGameLayer = null;
            this.napTienTraTruoc = null;
            this.napTienTraSau = null;

            return true;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/bank/PlistBank.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/TheDT/PlistTheDT.plist");

            this.texttpe = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame("res/ResourceMenuTab/Shopping/txt_bank.png"))
                this.texttpe = ccui.Widget.PLIST_TEXTURE;
            this.setTitleText("CỬA HÀNG");
            this.createTabView();

            this.addLayout(this, "pn_shopping_napvin", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.addButton(this, "btn_back_shop", ShoppingLayer.BTN_SHOP_BACK, cc.p(133, 639), true, res_Lobby + '/btnBack.png', res_Lobby + '/btnBack.png');
            this.btn_back_shop.setVisible(false);
            this.btn_back_shop.ignoreContentAdaptWithSize(false);
            this.GetConfigBilling();


        },


        createTabView: function () {
            var arrTitleTab = ["MUA " + GameManager.config.moneyNameUpper, "ĐỔI XU", "TIÊU " + GameManager.config.moneyNameUpper];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1, ConfigShopping.check_tab_shopping);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);
        },


        onClickTab: function (tabIndex, index) {
            cc.log(index);
            if (index == 0) {
                ConfigShopping.check_tab_shopping = 0;
               this.openNapVinlayer();
                this.closeNapXuLayer();
                this.closeTabTieuVinLayer();
                this.btn_back_shop.setVisible(false);

            } else if (index == 1) {
                ConfigShopping.check_tab_shopping = 1;
                this.openNapXuLayer();
                this.closeTabNapVinLayer();
                this.closeTabTieuVinLayer();
                this.btn_back_shop.setVisible(false);

            } else if (index == 2) {
                ConfigShopping.check_tab_shopping = 2;
                this.openTieuVinLayer();
                this.closeTabNapVinLayer();
                this.closeNapXuLayer();
                this.btn_back_shop.setVisible(false);
            }
        },
        openNapVinlayer: function () {
            this.napVinLayer = new NapVinlayer(this);
            this.addChild(this.napVinLayer);
        },
        openNapXuLayer:function(){
            this.napXulayer= new NapXulayer(this);
            this.addChild(this.napXulayer);
            funGetMoneyUse();

        },
        openNapVinThelayer:function(){
            this.napVinThelayer = new NapVinThelayer(this);
            this.addChild(this.napVinThelayer);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "napvin";
        },
        openNapVinFromBank:function(){
            this.napVinFromBank = new NapVinFromBank(this);
            this.addChild(this.napVinFromBank);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "napvin";
        },
        openNapVinFromSms:function(){
            this.napVinFromSms = new NapVinFromSMS(this);
            this.addChild(this.napVinFromSms);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "napvin";
        },
        openNapVinFromIap:function(){
            this.napVinFromIap = new NapVinFromIAP(this);
            this.addChild(this.napVinFromIap);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "napvin";
        },


        openTieuVinLayer:function(){
            this.tieuVinLayer = new TieuVinlayer(this);
            this.addChild(this.tieuVinLayer);
        },
        openMuaMaTheDTLayer:function(){
            this.muaMaTheDtLayer = new MuaMaTheDTLayer(this);
            this.addChild(this.muaMaTheDtLayer);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "tieuvin";
        },
        openMuaMaTheGameLayer:function(){
            this.muaTheGameLayer = new MuaTheGameLayer(this);
            this.addChild(this.muaTheGameLayer);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "tieuvin";
        },

        openNapTienTraTruocLayer:function(){
            this.napTienTraTruoc = new NapTienTraTruocLayer(this);
            this.addChild(this.napTienTraTruoc);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "tieuvin";
        },
        openNapTienTraSauLayer:function(){
            this.napTienTraSau = new NapTienTraSauLayer(this);
            this.addChild(this.napTienTraSau);
            this.btn_back_shop.setVisible(true);
            this.checkBack = "tieuvin";
        },

        closeNapVinLayer:function(){
            if(this.napVinLayer){
                this.napVinLayer.removeFromParent(true);
                this.napVinLayer = null;

            }

        },
        closeNapXuLayer:function(){
            if(this.napXulayer){
                this.napXulayer.removeFromParent(true);
                this.napXulayer = null;

            }

        },
        closeTieuVinLayer:function(){
            if(this.tieuVinLayer){
                this.tieuVinLayer.removeFromParent(true);
                this.tieuVinLayer = null;

            }

        },
        closeShopping:function(){
            if(menutab.shoppingLayer){
                menutab.shoppingLayer.removeFromParent(true);
                menutab.shoppingLayer = null;

            }

        },

        closeAllNapVinLayer:function(){
            if(this.napVinFromIap){
                this.napVinFromIap.removeFromParent(true);
                this.napVinFromIap = null;

            }
            if(this.napVinFromBank){
                this.napVinFromBank.removeFromParent(true);
                this.napVinFromBank = null;

            }
            if(this.napVinThelayer){
                this.napVinThelayer.removeFromParent(true);
                this.napVinThelayer = null;

            }
            if(this.napVinFromSms){
                this.napVinFromSms.removeFromParent(true);
                this.napVinFromSms = null;

            }
            this.openNapVinlayer();
        },

        closeTabNapVinLayer:function(){
            if(this.napVinFromIap){
                this.napVinFromIap.removeFromParent(true);
                this.napVinFromIap = null;

            }
            if(this.napVinFromBank){
                this.napVinFromBank.removeFromParent(true);
                this.napVinFromBank = null;

            }
            if(this.napVinThelayer){
                this.napVinThelayer.removeFromParent(true);
                this.napVinThelayer = null;

            }
            if(this.napVinFromSms){
                this.napVinFromSms.removeFromParent(true);
                this.napVinFromSms = null;

            }
            if(this.napVinLayer){
                this.napVinLayer.removeFromParent(true);
                this.napVinLayer = null;

            }

        },

        closeAllTieuVinLayer:function(){
            if(this.muaMaTheDtLayer){
                this.muaMaTheDtLayer.removeFromParent(true);
                this.muaMaTheDtLayer = null;

            }
            if(this.muaTheGameLayer){
                this.muaTheGameLayer.removeFromParent(true);
                this.muaTheGameLayer = null;

            }
            if(this.napTienTraTruoc){
                this.napTienTraTruoc.removeFromParent(true);
                this.napTienTraTruoc = null;

            }
            if(this.napTienTraSau){
                this.napTienTraSau.removeFromParent(true);
                this.napTienTraSau = null;

            }

            this.openTieuVinLayer();
        },

        closeTabTieuVinLayer:function(){
            if(this.muaMaTheDtLayer){
                this.muaMaTheDtLayer.removeFromParent(true);
                this.muaMaTheDtLayer = null;

            }
            if(this.tieuVinLayer){
                this.tieuVinLayer.removeFromParent(true);
                this.tieuVinLayer = null;

            }
            if(this.muaTheGameLayer){
                this.muaTheGameLayer.removeFromParent(true);
                this.muaTheGameLayer = null;

            }
            if(this.napTienTraTruoc){
                this.napTienTraTruoc.removeFromParent(true);
                this.napTienTraTruoc = null;

            }

            if(this.napTienTraSau){
                this.napTienTraSau.removeFromParent(true);
                this.napTienTraSau = null;

            }
        },

        gotoSercurity: function () {
            menutab.shoppingLayer.closeShopping();
            menutab.openSercurityLayer();

        },


        GetConfigBilling: function () {
            this.createLoadingNapVin();
            var url = urlGetConfigBilling();
            sendRequest(url, null, false, this.callBackGetConfig.bind(this), this.callBackError.bind(this));
        },
        callBackError: function () {
            this.hideLoadingNapVin();
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        },

        callBackGetConfig: function (response) {
            this.hideLoadingNapVin();
            cc.log("config billing = " + response);
            var jsonData = JSON.parse(response);

            ConfigShopping.is_recharge = jsonData["is_nap_the"];
            ConfigShopping.is_recharge_card_game = jsonData["is_nap_the"];
            ConfigShopping.is_recharge_bank = jsonData["is_nap_vin_nh"];
            ConfigShopping.is_recharge_iap = jsonData["is_nap_vin_iap"];
            ConfigShopping.is_recharge_xu = jsonData["is_nap_xu"];
            ConfigShopping.is_Exchange_money = jsonData["is_chuyen_vin"];
            ConfigShopping.is_buy_card_game = jsonData["is_mua_the"];
            ConfigShopping.is_recharge_mobile_phone = jsonData["is_nap_dt"];
            ConfigShopping.radio_xu = jsonData["ratio_xu"];
            ConfigShopping.radio_vin = jsonData["ratio_nap_the"];
            ConfigShopping.radio_exchange_card = jsonData["ratio_mua_the"];
            ConfigShopping.radio_tranfer = jsonData["ratio_chuyen"];
            ConfigShopping.radio_bank = jsonData["ratio_nap_tien_nh"];
            ConfigShopping.radio_vin_bank = jsonData["ratio_nap_vin_nh"];
            //shopping_info_test.txt_ratio_bank.setString("                     Nạp 1.000.000 nhận " + formatMoney(0, 3, (1000000 * lobby.radio_vin_bank).toFixed(0)) + " VIN");
            ConfigShopping.home_network = jsonData["nap_the"];
            ConfigShopping.recharge_bank = jsonData["nap_vin_nh"];
            ConfigShopping.buy_card = jsonData["mua_the_dt"];
            ConfigShopping.buy_card_game = jsonData["mua_the_game"];
            ConfigShopping.recharge_mobile = jsonData["nap_tien_dt"];
            ConfigShopping.transfer_min = jsonData["chuyen_vin_min"];
            ConfigShopping.valueRechargeBank = jsonData["i2b"];
            ConfigShopping.is_vin_plus = jsonData["is_vin_plus"];
            ConfigShopping.is_vin_card = jsonData["is_nap_vin_card"];
            ConfigShopping.ratio_vin_card = jsonData["ratio_nap_vin_card"];
            ConfigShopping.is_nap_mega_card = jsonData["is_nap_mega_card"];
            ConfigShopping.ratio_nap_mega_card = jsonData["ratio_nap_mega_card"];

            ConfigShopping.card_Vina = jsonData["Vina"];
            ConfigShopping.card_Mobi = jsonData["Mobi"];
            ConfigShopping.card_Viettel = jsonData["Viettel"];
            ConfigShopping.card_Zing = jsonData["Zing"];
            ConfigShopping.card_Gate = jsonData["Gate"];
            ConfigShopping.card_Vcoin = jsonData["Vcoin"];
            ConfigShopping.card_VnMobi = jsonData["VNM"];
            ConfigShopping.card_Bee = jsonData["Beeline"];
            ConfigShopping.radio_recharge_out_mobile = jsonData["ratio_nap_dt"];
            ConfigShopping.num_recharge_fail = jsonData["num_recharge_fail"];
            ConfigShopping.num_cash_out = jsonData["num_doi_the"];
            ConfigShopping.cashout_limit_user = jsonData["cashout_limit_user"];
            ConfigShopping.configHour = jsonData["cashout_time_block"];
            ConfigShopping.is_sms_plus = jsonData["is_sms_plus"];
            ConfigShopping.is_sms = jsonData["is_sms"];
            ConfigShopping.sms_plus_telco = jsonData["sms_plus_telco"];
            ConfigShopping.sms_telco = jsonData["sms_telco"];
            ConfigShopping.sms_plus_amount = jsonData["sms_plus_amount"];
            ConfigShopping.sms_amount = jsonData["sms_amount"];
            ConfigShopping.ratio_nap_sms = jsonData["ratio_nap_sms"];
            ConfigShopping.is_captcha_nap = jsonData["is_captcha_nap"];
            ConfigShopping.is_daily = jsonData["is_dai_ly"];
            ConfigShopping.is_payment_socket_card = jsonData["is_payment_socket_card"];
            ConfigShopping.is_payment_socket_bank = jsonData["is_payment_socket_bank"];

            if(ConfigShopping.check_tab_shopping == 0){
                this.openNapVinlayer();
            }else if(ConfigShopping.check_tab_shopping == 1){
                this.openNapXuLayer();
            }else if(ConfigShopping.check_tab_shopping == 2){
                this.openTieuVinLayer();
            }

        },

        createLoadingNapVin: function () {
            if (this.pn_shopping_napvin != null && this.pn_shopping_napvin.getChildByName("loadingdatamaster") == null) {
                var loading = GuiUtil.createSprite("res/ResourceMenuTab/Mail/btnRefresh.png");
                var x = this.pn_shopping_napvin.getContentSize().width / 2;
                var y = this.pn_shopping_napvin.getContentSize().height / 2;
                loading.setPosition(cc.p(x, y));
                loading.setName("loadingdatamaster");
                loading.setZOrder(2000);
                this.pn_shopping_napvin.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            } else {
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_shopping_napvin.getChildByName("loadingdatamaster").setVisible(true);
            }
        },



        hideLoadingNapVin: function () {
            if (this.pn_shopping_napvin.getChildByName("loadingdatamaster") == null) {
            } else {
                this.pn_shopping_napvin.getChildByName("loadingdatamaster").setVisible(false);
            }

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
                this.napVinThelayer.sp_captcha_nap.initWithBase64(data);
            } else {
                var that = this;
                cc.loader.loadImg(img, {isCrossOrigin: false}, function (err, img) {
                    var texture2d = self._texture2d = new cc.Texture2D();
                    texture2d.initWithElement(img);
                    texture2d.handleLoadedTexture();
                    if (that.napVinThelayer.sp_captcha_nap)
                        that.napVinThelayer.sp_captcha_nap.initWithTexture(texture2d);

                });

            }
            sceneMgr.clearLoading();
        },
        callBackError: function (response) {
            sceneMgr.clearLoading();
        },
        onButtonRelease: function (button, id) {
            switch (id) {
              case  ShoppingLayer.BTN_SHOP_BACK :
                    if(this.checkBack == "napvin"){
                        this.closeNapVinLayer();
                        this.closeAllNapVinLayer();
                    }else if(this.checkBack == "tieuvin"){
                        this.closeAllTieuVinLayer();
                    }
                    this.btn_back_shop.setVisible(false);

                  break;
            }
        }


    });


ShoppingLayer.BTN_SHOP_BACK = 1;