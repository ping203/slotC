/**
 * Created by B150M on 3/23/2018.
 */

var TieuVinlayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.shopping = parent;


    },

    customizeGUI: function () {
        this.addLayout(this, "pn_tieu_vin", cc.p(640, 304.5), null, cc.size(1035, 469), true);
        this.pn_tieu_vin.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_tieu_vin.setBackGroundColor(GuiUtil.color("#1E2D64"));
        this.pn_tieu_vin.setBackGroundColorOpacity(0);
        this.addListView(this.pn_tieu_vin, "lv_tieu_vin", cc.p(0, 0), cc.size(1035, 469));
        this.lv_tieu_vin.setAnchorPoint(0, 0);
        this.CheckConFig();
    },

    CheckConFig: function () {
        var arrCashOut = [];
         if(GameManager.appConfig.cashout == 0){
             if (ConfigShopping.is_buy_card_game == 0) {
                 for (var i = 0; i < 2; i++) {
                     var itemCard = TieuVinlayer.arrInfoTieuVin[i];
                     arrCashOut.push(itemCard);
                 }
             }
             if (ConfigShopping.is_recharge_mobile_phone == 0) {
                 for (var i = 2; i < 4; i++) {
                     var itemCard = TieuVinlayer.arrInfoTieuVin[i];
                     arrCashOut.push(itemCard);
                 }
             }

             if (ConfigShopping.is_Exchange_money == 0) {
                 var itemCard = TieuVinlayer.arrInfoTieuVin[4];
                 arrCashOut.push(itemCard);
             }
         }

        this.createPnTieuVin(arrCashOut);
        this.shopping.hideLoadingNapVin();
    },
    createPnTieuVin: function (arr) {

        for (var m = 0; m < arr.length; m++) {
            var abc = parseInt(m / 4);
            if (m % 4 == 0) {
                this.addListView(this.lv_tieu_vin, "lv_con_tieuvin" + abc, cc.p(0, 0), cc.size(1035, 234));
                this["lv_con_tieuvin" + abc].setDirection(ccui.ScrollView.DIR_HORIZONTAL);
                this["lv_con_tieuvin" + abc].setTouchEnabled(false);
            }
            this.addLayout(this["lv_con_tieuvin" + abc], "layout_con_tv" + m, cc.p(0, 0), null, cc.size(258, 230), true);
            this.addButton(this["layout_con_tv" + m], arr[m].name, arr[m].tag, cc.p(129, 115), true, arr[m].image, arr[m].image);
        }
    },



    onButtonRelease: function (button, id) {
        switch (id) {
            case TieuVinlayer.BTN_CHUYEN_KHOAN:
                    this.shopping.closeShopping();
                    menutab.openChuyenKhoanLayer();
                    funGetMoneyUse();

                break;
            case TieuVinlayer.BTN_MUA_MA_THE:
                this.shopping.checkDoiThe = 1;
                this.shopping.closeTieuVinLayer();
                this.shopping.openMuaMaTheDTLayer();

                funGetMoneyUse();
                break;
            case TieuVinlayer.BTN_MUA_THE_GAME:
                this.shopping.checkDoiThe = 2;
                this.shopping.closeTieuVinLayer();
                this.shopping.openMuaMaTheGameLayer();
                funGetMoneyUse();
                break;
            case TieuVinlayer.BTN_NAPTIEN_TRATRUOC:
                this.shopping.checkDoiThe = 3;
                this.shopping.closeTieuVinLayer();
                this.shopping.openNapTienTraTruocLayer();
                funGetMoneyUse();
                break;
            case TieuVinlayer.BTN_NAPTIEN_TRASAU:
                this.shopping.checkDoiThe = 4;
                this.shopping.closeTieuVinLayer();
                this.shopping.openNapTienTraSauLayer();
                funGetMoneyUse();
                break;
        }
    },
});


TieuVinlayer.BTN_CHUYEN_KHOAN = 1;
TieuVinlayer.BTN_MUA_MA_THE = 2;
TieuVinlayer.BTN_MUA_THE_GAME = 3;
TieuVinlayer.BTN_NAPTIEN_TRATRUOC =4;
TieuVinlayer.BTN_NAPTIEN_TRASAU = 5;


TieuVinlayer.arrInfoTieuVin = [
    {
        name: "btn_mua_ma_the",
        image: res_ResourceMenuTab_Shopping + "/MuaMaTheDT.png",
        tag: TieuVinlayer.BTN_MUA_MA_THE
    },
    {
        name: "btn_ma_the_game",
        image: res_ResourceMenuTab_Shopping + "/MuaMaTheGame.png",
        tag: TieuVinlayer.BTN_MUA_THE_GAME

    },
    {
        name: "btn_nap_tien_tra_truoc",
        image: res_ResourceMenuTab_Shopping + "/NapTienTraTruoc.png",
        tag: TieuVinlayer.BTN_NAPTIEN_TRATRUOC

    },
    {
        name: "btn_nap_tien_tra_sau",
        image: res_ResourceMenuTab_Shopping + "/NapTienTraSau.png",
        tag: TieuVinlayer.BTN_NAPTIEN_TRASAU

    },
    {
        name: "btn_chuyen_khoan",
        image: res_ResourceMenuTab_Shopping + "/ChuyenKhoan.png",
        tag: TieuVinlayer.BTN_CHUYEN_KHOAN,

    },

];






