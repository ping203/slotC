/**
 * Created by B150M on 3/23/2018.
 */

var NapVinlayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;

    },

    customizeGUI: function () {
        this.addLayout(this, "pn_nap_vin", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.pn_nap_vin.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_nap_vin.setBackGroundColor(GuiUtil.color("#1E2D64"));
        this.pn_nap_vin.setBackGroundColorOpacity(0);
        this.CheckConFig();
    },

    CheckConFig: function () {
        var arrCard = [];
       // var arrSelectThe = [];
        if(GameManager.appConfig.recharge == 0){
            if (ConfigShopping.is_recharge == 0) {
                if(ConfigShopping.is_vin_card == 0 || ConfigShopping.is_recharge_card_game == 0 || ConfigShopping.is_nap_mega_card == 0){
                    var itemVin = NapVinlayer.arrInfoNapVin[0];
                    arrCard.push(itemVin);
                }
                if (ConfigShopping.is_recharge_bank == 0) {
                    var itemBank = NapVinlayer.arrInfoColomBank[0];
                    itemBank.ratio = ConfigShopping.radio_vin_bank;
                    arrCard.push(itemBank);
                }

                if (ConfigShopping.is_sms == 0 || ConfigShopping.is_sms_plus == 0) {
                    var itemSms = NapVinlayer.arrInfoColomSms[0];
                    itemSms.ratio = ConfigShopping.ratio_nap_sms;
                    arrCard.push(itemSms);
                }
            }
        }
        if(GameManager.appConfig.recharge == 1 && GameManager.appConfig.cashout == 1){
            if (cc.sys.isNative) {
                if (ConfigShopping.is_recharge_iap == 0) {
                    var itemInApp = NapVinlayer.arrInfoColomPur[0];
                    arrCard.push(itemInApp);
                }
            }
        }
        this.createTabNapVin(arrCard);
        this.shopping.hideLoadingNapVin();
    },
    createTabNapVin: function (arr) {
        this.addListView(this.pn_nap_vin, "sc_btn_homeNet", cc.p(0, 0), cc.size(1035, 469));
        this.sc_btn_homeNet.setAnchorPoint(0, 0);
        for (var i = 0; i < arr.length; i++) {
            var abc = parseInt(i / 5);
            if (i % 5 == 0) {
                this.addListView(this.sc_btn_homeNet, "homnet" + abc, cc.p(0, 0), cc.size(1035, 234));
                this["homnet" + abc].setDirection(ccui.ScrollView.DIR_HORIZONTAL);
                this["homnet" + abc].setTouchEnabled(false);
            }
            this.addLayout(this["homnet" + abc], "theName" + i, cc.p(0, 0), null, cc.size(345, 230), true);
            this["theName" + i].setName("theName");

            this.addButton(this["theName" + i], arr[i].name, arr[i].tag, cc.p(172.5, 115), true, arr[i].image, arr[i].image);

            if(arr[i].ratio > 1) {
                this.addSprite(this[arr[i].name], "sp_khuyenmai", cc.p(36.10, 170.71), res_ResourceMenuTab_Shopping + "/bonus.png");
                this.addText(this[arr[i].name], "lb_khuyenmai", cc.p(36.10, 170.71), parseInt((arr[i].ratio - 1)*100) + "%", fontRobotoBold.fontName, 20);
                this.lb_khuyenmai.ignoreContentAdaptWithSize(false);
                this.lb_khuyenmai.setContentSize(cc.size(50, 23));
                this.lb_khuyenmai.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.lb_khuyenmai.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            }
        }


    },



    onButtonRelease: function (button, id) {
        switch (id) {
            case NapVinlayer.BTN_SHOP_GROUP_NAP_VIN:
                this.shopping.closeNapVinLayer();
                this.shopping.openNapVinThelayer();
                break;
            case NapVinlayer.BTN_SHOP_INTERNETBANKING:
                this.shopping.closeNapVinLayer();
                this.shopping.openNapVinFromBank();
                break;
            case NapVinlayer.BTN_SHOP_NAP_VIN_SMS:
                this.shopping.closeNapVinLayer();
                this.shopping.openNapVinFromSms();

                break;
            case NapVinlayer.BTN_SHOP_IAP:
                this.shopping.closeNapVinLayer();
                this.shopping.openNapVinFromIap();
                break;
        }
    },
});
NapVinlayer.BTN_SHOP_GROUP_NAP_VIN = 1;
NapVinlayer.BTN_SHOP_INTERNETBANKING = 2;
NapVinlayer.BTN_SHOP_NAP_VIN_SMS = 3;
NapVinlayer.BTN_SHOP_IAP = 4;

NapVinlayer.arrInfoNapVin = [
    {
        name: "btn_group_nap_vin",
        image: res_ResourceMenuTab_Shopping + "/TheDT/nap_vin.png",
        tag: NapVinlayer.BTN_SHOP_GROUP_NAP_VIN,
        ratio: 1
    }
];

NapVinlayer.arrInfoColomPur = [
    {
        name: "btn_in_app_purchases",
        image: res_ResourceMenuTab_Shopping + "/TheDT/inAppPurchases.png",
        tag: NapVinlayer.BTN_SHOP_IAP
    },
];

NapVinlayer.arrInfoColomSms = [
    {
        name: "btn_nap_sms",
        image: res_ResourceMenuTab_Shopping + "/TheDT/napvinSMS.png",
        tag: NapVinlayer.BTN_SHOP_NAP_VIN_SMS,
        ratio: 1
    },
];


NapVinlayer.arrInfoColomBank = [
    {
        name: "btn_internet_banking",
        image: res_ResourceMenuTab_Shopping + "/TheDT/InternetBanking.png",
        tag: NapVinlayer.BTN_SHOP_INTERNETBANKING,
        ratio: 1
    }
];







