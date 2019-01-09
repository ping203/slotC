/**
 * Created by B150M on 3/23/2018.
 */

var NapVinFromIAP = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;
        this.platform = null;
    },

    customizeGUI: function () {
        this.createPnInappPurchase();
        this.CheckConFig();
        if (cc.sys.os == cc.sys.OS_ANDROID)
            this.platform = 0;
        else  if (cc.sys.os == cc.sys.OS_IOS)
            this.platform = 1;
    },

    CheckConFig: function () {
        if (ConfigShopping.is_recharge == 0) {

        }else{
            if(ConfigShopping.is_vin_plus == 0){
                this.pn_vinplus.setVisible(true);
            }
        }
        this.shopping.hideLoadingNapVin();
    },

    createPnInappPurchase: function () {
        this.addLayout(this, "pn_in_app_purchase", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.pn_in_app_purchase.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_in_app_purchase.setBackGroundColor(GuiUtil.color("#1C4579"));
        this.pn_in_app_purchase.setBackGroundColorOpacity(0);
        this.addListView(this.pn_in_app_purchase, "lv_in_app_purchase", cc.p(0, 0), cc.size(1035, 469));
        this.lv_in_app_purchase.setAnchorPoint(0, 0);
        this.lv_in_app_purchase.setTouchEnabled(false);
        this.lv_in_app_purchase.setScrollBarEnabled(false);
        for (var j = 0; j < NapVinFromIAP.arrInfoInApp.length; j++) {
            var abc = parseInt(j / 4);
            if (j % 4 == 0) {
                this.addListView(this.lv_in_app_purchase, "lv_con_in_app" + abc, cc.p(0, 0), cc.size(1035, 234));
                this["lv_con_in_app" + abc].setDirection(ccui.ScrollView.DIR_HORIZONTAL);
                this["lv_con_in_app" + abc].setTouchEnabled(false);
                this["lv_con_in_app" + abc].setScrollBarEnabled(false);
            }
            this.addLayout(this["lv_con_in_app" + abc], "layout_con" + j, cc.p(0, 0), null, cc.size(258, 230), true);
            this.addButton(this["layout_con" + j], "btn_inApp_" + (j + 1), NapVinFromIAP.arrInfoInApp[j].tagInApp, cc.p(129, 115), true, res_ResourceMenuTab_Shopping + "/TheDT/inapp.png", res_ResourceMenuTab_Shopping + "/TheDT/inapp.png");
            this.addText(this["layout_con" + j], "lb" + j, cc.p(129, 50), NapVinFromIAP.arrInfoInApp[j].txtInApp, RobotoRegular.fontName, 16);
            this["lb" + j].setColor(GuiUtil.color("#F9DB5C"));
        }

        this.addLayout(this.pn_in_app_purchase, "pn_vinplus", cc.p(0, 7), null, cc.size(0, 0), true);
        if(ConfigShopping.is_vin_plus == 1)
            this.pn_vinplus.setVisible(false);
        this.addButton(this.pn_vinplus, "btn_vinplus", NapVinFromIAP.BTN_DOWNLOAD_VINPLUS, cc.p(515.5, 119), true, res_ResourceMenuTab_Shopping + "/button_vinplus.png", res_ResourceMenuTab_Shopping + "/button_vinplus.png");
        this.btn_vinplus.ignoreContentAdaptWithSize(false);
        this.btn_vinplus.setContentSize(cc.size(100, 100));
        this.addText(this.pn_vinplus, "Text_1", cc.p(515.5, 204.5), "Vui lòng tải App "+GameManager.webViewLink.OTPApp+" để thực hiện các giao dịch của "+GameManager.webViewLink.productName, RobotoRegular.fontName, 20);
        //this.addText(this.pn_vinplus, "Text_1", cc.p(515.5, 31.5), "Click để tải App", RobotoRegular.fontName, 20);
        this.addText(this.pn_in_app_purchase, "Text_2", cc.p(515, 255), "* Nếu thanh toán qua Nhà mạng (Viettel) sẽ bị thu thêm 10% phí giao dịch", RobotoRegular.fontName, 16);
        this.Text_2.setColor(GuiUtil.color("#F9DB5C"))

    },

    funCheckIAP : function(sku){
        if (gI.mainSocket.listener.isLogged) {
            var checkiap = new CmdSendCheckIAP();
            checkiap.putCheckIAP(sku, this.platform);
            gI.mainSocket.send(checkiap);
            checkiap.clean();
        }else{
             gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            gI.mainSocket.connectSocket();
        }
    },

    onPurchaseGG: function(errorCode, signedData,signature,purchaseData)        {
        //popup.openPanel_Alert_Lobby("signedData: " + signedData + "\n signature : " + signature + "\n purchaseData: " + purchaseData);
        if(errorCode == 0) {
            if (Minigame.isLoginSocket) {
                var send_purchase = new CmdSendResultIAP();
                send_purchase.putResultIAP(signedData, signature, this.platform);
                Minigame.miniGameClient.send(send_purchase);
                send_purchase.clean();
            } else {
                popup.openPanel_Alert_Lobby("Hệ thống tạm thời gián đoạn!");
                Minigame.connectSocket();
            }
        }else {
            popup.openPanel_Alert_Lobby("Giao dịch bị gián đoạn!");
        }
    },

    responseCheckIAP : function (error){
        if(error == 0){
            iapManager.setTarget(menutab.shoppingLayer.napVinFromIap,menutab.shoppingLayer.napVinFromIap.onPurchaseGG.bind(menutab.shoppingLayer.napVinFromIap));
            iapManager.purchase(lobby.sku_iap,userInfo.userData.nickname);
        }else if(error == 1){
            popup.openPanel_Alert_Lobby("Kênh nạp IAP đang bảo trì!");
        }else if(error == 2){
            popup.openPanel_Alert_Lobby("Quá hạn mức nạp tiền trong ngày. Bạn vui lòng quay lại sau!");
        }
    },

    responseResultIAP : function (error, sku, currentMoney){
        if(error == 0){
            popup.openPanel_Alert_Lobby("Nạp tiền thành công!");
            if (userInfo._isLogged == true) {
            } else {
                userInfo.userData.vinTotal = currentMoney;
                menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(userInfo.userData.vinTotal)));
                menutab.changeFontMoney();
            }
        }else if(error == 1){
            popup.openPanel_Alert_Lobby("Hệ thống tạm thời gián đoạn!");
        }else if(error == 2){
            popup.openPanel_Alert_Lobby("Phiên giao dịch đã được xử lý!");
        }

        if(error == 0 || error == 2){
            var strSku = "";
            if(sku == 1)
                strSku = IAPManager.SKU_1;
            else if(sku == 2)
                strSku = IAPManager.SKU_2;
            else if(sku == 3)
                strSku = IAPManager.SKU_3;
            else if(sku == 4)
                strSku = IAPManager.SKU_4;
            iapManager.setTarget(menutab.shoppingLayer.napVinFromIap,menutab.shoppingLayer.napVinFromIap.CloseItemCallback.bind(menutab.shoppingLayer.napVinFromIap));
            iapManager.closeItem(strSku);
        }
    },

    CloseItemCallback : function (errorcode, message){
        if(errorcode != 0){
            popup.openPanel_Alert_Lobby("Hệ thống tạm thời gián đoạn!");
        }
    },

    onButtonRelease: function (button, id) {
        switch (id) {
            case NapVinFromIAP.BTN_DOWNLOAD_VINPLUS:
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    //ConnectNative.openWebView("https://play.google.com/store/apps/details?id=com.vinotp");
                }
                break;
            case NapVinFromIAP.BTN_SHOP_IAP_1:
                ConfigShopping.sku_iap = IAPManager.SKU_1;
                this.funCheckIAP(1);
                break;
            case NapVinFromIAP.BTN_SHOP_IAP_2:
                ConfigShopping.sku_iap = IAPManager.SKU_2;
                this.funCheckIAP(2);
                break;
        }
    },
});


NapVinFromIAP.BTN_DOWNLOAD_VINPLUS = 1;
NapVinFromIAP.BTN_SHOP_IAP_1 = 2;
NapVinFromIAP.BTN_SHOP_IAP_2 = 3;
NapVinFromIAP.BTN_SHOP_IAP_3 = 4;
NapVinFromIAP.BTN_SHOP_IAP_4 = 5;
NapVinFromIAP.BTN_SHOP_IAP_5 = 6;
NapVinFromIAP.BTN_SHOP_IAP_6 = 7;
NapVinFromIAP.BTN_SHOP_IAP_7 = 8;
NapVinFromIAP.BTN_SHOP_IAP_8 = 9;



NapVinFromIAP.arrInfoInApp = [
    {
        tagInApp: NapVinFromIAP.BTN_SHOP_IAP_1,
        txtInApp: "15 "+GameManager.config.moneyNameUpper+" / 0.99 USD"
    },
    {
        tagInApp: NapVinFromIAP.BTN_SHOP_IAP_2,
        txtInApp: "30 "+GameManager.config.moneyNameUpper+" / 1.99 USD"
    }

];





