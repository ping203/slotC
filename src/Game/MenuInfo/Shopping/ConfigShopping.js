/**
 * Created by B150M on 3/23/2018.
 */
var ConfigShopping = {
    is_recharge: 0,
    is_recharge_card_game: 0,
    is_recharge_bank: 0,
    is_recharge_iap: 0,
    is_recharge_xu: 0,
    is_Exchange_money: 0,
    is_buy_card_game: 0,
    is_vin_card: 0,
    is_nap_mega_card: 0,
    home_network: [],
    radio_vin_bank: 0,
    is_sms: 0,
    is_sms_plus: 0,
    ratio_nap_sms: 0,
    is_vin_plus: 0,
    num_recharge_fail: 0,
    is_captcha_nap: 0,
    valueRechargeBank: [],
    recharge_bank: [],
    sms_plus_amount: [],
    sms_amount: [],
    sms_plus_telco: [],
    sms_telco: [],
    sku_iap: "",
    radio_xu: 0,
    transfer_min: 0,
    radio_tranfer: 0,
    is_daily: 0,
    configHour: 0,
    check_tab_shopping: 0,
    buy_card: [],
    card_Vina: [],
    card_Mobi: [],
    card_Viettel: [],
    card_Zing: [],
    card_Gate: [],
    card_Vcoin: [],
    card_VnMobi: [],
    card_Bee: [],
    radio_exchange_card: 0,
    radio_recharge_out_mobile: 0,
    cashout_limit_user: 0,
    is_payment_socket_card: 0,
    is_payment_socket_bank: 0,
    buy_card_game:[]


};

var formartHourMinus = function (value) {
    var h = parseInt(value / 60);
    var m = value - (h * 60);
    var strM = "";
    if (m < 10) strM = "0" + m;
    else strM = m;

    var str = "";
    if (h == 0)
        str = strM + " phút";
    else if (h < 10)
        str = "0" + h + " giờ : " + strM + " phút";
    else
        str = h + " giờ : " + strM + " phút";
    return str
};

var initRichText = function (parent, array) {
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
                var lbgold = new ccui.RichElementText(1, GuiUtil.color(color), 255, noidung, RobotoRegular.fontName, 19);
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
};

var getDauSo8x98 = function (value) {
    var str = "";
    if (value == 1000)  return str = "8198";
    else if (value == 2000)  return str = "8298";
    else if (value == 3000)  return str = "8398";
    else if (value == 4000)  return str = "8498";
    else if (value == 5000)  return str = "8598";
    else if (value == 10000)  return str = "8698";
    else if (value == 15000)  return str = "8798";
};
var getGoiNap9029 = function (value) {
    var str = "";
    if (value == 1000) return str = "NAP1";
    else if (value == 2000) return str = "NAP2";
    else if (value == 3000) return str = "NAP3";
    else if (value == 4000) return str = "NAP4";
    else if (value == 5000) return str = "NAP5";
    else if (value == 10000) return str = "NAP10";
    else if (value == 15000) return str = "NAP15";
    else if (value == 20000) return str = "NAP20";
    else if (value == 30000) return str = "NAP30";
    else if (value == 50000) return str = "NAP50";
    else if (value == 100000) return str = "NAP100";
};

var funGetMoneyUse = function () {
    if (gI.mainSocket.listener.isLogged) {
        var getMoneyUse = new CmdSendGetMoneyUse();
        getMoneyUse.putGetMoneyUse();
        gI.mainSocket.send(getMoneyUse);
        getMoneyUse.clean();
    } else {
         gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        gI.mainSocket.connectSocket();
    }
};

var responseGetMoneyUse = function (moneyUse) {
    //cc.log("moneyUse : " + moneyUse);
    userInfo.userData.moneyUse = moneyUse;
    if (menutab.shoppingLayer != null) {
        if (menutab.shoppingLayer.napXulayer != null) {
            menutab.shoppingLayer.napXulayer.lb_sodu_kd_napxu.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
        } else if (menutab.shoppingLayer.muaMaTheDtLayer) {
            menutab.shoppingLayer.muaMaTheDtLayer.lb_sodu_kd_muathe_dt.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
        }
        else if (menutab.shoppingLayer.muaTheGameLayer) {
            menutab.shoppingLayer.muaTheGameLayer.lb_sodu_kd_muathe_game.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
        }
        else if (menutab.shoppingLayer.napTienTraTruoc) {
            menutab.shoppingLayer.napTienTraTruoc.lb_sodu_kd_nap_dt.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
        }
        else if (menutab.shoppingLayer.napTienTraSau) {
            menutab.shoppingLayer.napTienTraSau.lb_sodu_kd_nap_dt.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
        }

    }
    if (menutab.chuyenKhoanLayer != null) {
        menutab.chuyenKhoanLayer.lb_so_du_vin.setString(formatMoney(0, 3, userInfo.userData.moneyUse));
    }

};

var getMenhGiaThe = function (value) {
    // cc.log("menhgia: " + value);
    var menhgia = 0;
    if (value == 0)
        menhgia = 10000;
    else if (value == 1)
        menhgia = 20000;
    else if (value == 2)
        menhgia = 50000;
    else if (value == 3)
        menhgia = 100000;
    else if (value == 4)
        menhgia = 200000;
    else if (value == 5)
        menhgia = 500000;
    else if (value == 6)
        menhgia = 1000000;
    else if (value == 7)
        menhgia = 2000000;
    else if (value == 8)
        menhgia = 5000000;
    else if (value == 9)
        menhgia = 10000000;
    return parseInt(menhgia);
};
