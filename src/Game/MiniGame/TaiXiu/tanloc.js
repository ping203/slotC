/**
 * Created by Admin on 8/22/2016.
 */
var txTanLoc = null;
var txTanLocX = 0;
var txTanLocY = 0;

var TXTanLocLayer = uc.MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXTanLoc");
            //cc.log("MinigameLayer: 2");
            // this.initWithBinaryFile("res/TXTanLoc.json");
            this.pTanLoc = null;
            this.btn_close_tan_loc = null;
            this.btn_key10k = null;
            this.btn_key50k = null;
            this.btn_key100k = null;
            this.btn_key500k = null;
            this.btn_key1M = null;
            this.btn_key10M = null;
            this.btn_tan_loc = null;
            this.btn_clear_text = null;
            this.tf_bet_tan_loc = null;
            this.lb_bet_tan_loc = null;
            this.betValue = 0;

        },
        customizeGUI: function () {

            this.resourcePath = "res/Minigame/TaiXiu/images/";
            this.pTanLoc = this.addLayoutStructureWithoutResourcePath(this, "_layout", cc.p(640.00, 359.00), this.resourcePath + "bg_tanloc.png", cc.size(473.00, 320.00), true);
            this.pTanLoc.setScale(1/0.7);

            this.initLevelOneLayer();
            this.onCreate();
            return;
        },

        initLevelOneLayer: function () {
            var layout = this.pTanLoc;

            function createText(name, options) {
                return cc.extend({
                    titleText: name,
                    titleColor: GuiUtil.color("#914203"),
                    titleFontName: fontArial.fontName,
                    titleFontSize: 32
                }, options)
            }
            if(!cc.sys.isNative){
                this.addEditBoxStructure(layout, "tf_bet_tan_loc", cc.p(236.00, 209.00), "", "", fontRobotoMedium.fontName, 28, cc.size(230.00, 34.00), null, cc.TEXT_ALIGNMENT_CENTER, 14);
            }
            this.addButtonStructure(layout, "btn_key10k", TXTanLocLayer.BTN_KEY10K, cc.p(108.77, 149.00), true, [this.commonImagePath + "btn_value.png", this.commonImagePath + "btn_value_s.png"], createText("10K"));
            this.addButtonStructure(layout, "btn_tan_loc", TXTanLocLayer.BTN_TAN_LOC, cc.p(237.22, 35.20), true, [this.resourcePath + "btn_tab_tanloc.png", this.resourcePath + "btn_tab_tanloc_s.png"], createText("TÁN LỘC", {titleFontSize: 22}));
            this.addButtonStructure(layout, "btn_key500k", TXTanLocLayer.BTN_KEY500K, cc.p(109.24, 94.00), true, [this.commonImagePath + "btn_value_vip.png", this.commonImagePath + "btn_value_vip_s.png"], createText("500K"));
            this.addButtonStructure(layout, "btn_key1M", TXTanLocLayer.BTN_KEY1M, cc.p(236.22, 94.00), true, [this.commonImagePath + "btn_value_vip.png", this.commonImagePath + "btn_value_vip_s.png"], createText("1M"));
            this.addButtonStructure(layout, "btn_key50k", TXTanLocLayer.BTN_KEY50K, cc.p(236.55, 149.00), true, [this.commonImagePath + "btn_value.png", this.commonImagePath + "btn_value_s.png"], createText("50K"));
            this.addButtonStructure(layout, "btn_key100k", TXTanLocLayer.BTN_KEY100K, cc.p(363.80, 149.00), true, [this.commonImagePath + "btn_value.png", this.commonImagePath + "btn_value_s.png"], createText("100K"));
            this.addButtonStructure(layout, "btn_key10M", TXTanLocLayer.BTN_KEY10M, cc.p(363.80, 94.00), true, [this.commonImagePath + "btn_value_vip.png", this.commonImagePath + "btn_value_vip_s.png"], createText("10M"));
            this.addButtonStructure(layout, "btn_close_tan_loc", TXTanLocLayer.BTN_CLOSE_TAN_LOC, cc.p(447, 294), true, this.resourcePath + "btn_close_tanloc.png");
            this.addTextStructure(layout, "lb_bet_tan_loc", cc.p(236.00, 209.00), "0", RobotoRegular.fontName, "28", GuiUtil.color("#914203"), {__size: cc.size(230.00, 32.00)}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addButtonStructure(layout, "btn_clear_text", TXTanLocLayer.BTN_CLEAR_TEXT, cc.p(80.70, 208.56), true, this.resourcePath + "clear_tanloc.png");
            // this.addTextStructure(layout, "Text_1", cc.p(235.50, 293.00), "TÁN LỘC", fontRobotoBlack.fontName, "32", "#F3D75D", {__size: cc.size(230.00, 38.00)});
        },

        onCreate: function () {
            this.btn_clear_text.setVisible(false);


            if (cc.sys.isNative) {
                // this.tf_bet_tan_loc.setVisible(false);
                this.lb_bet_tan_loc.setVisible(true);
            }
            else {
                this.tf_bet_tan_loc.setFontColor(GuiUtil.color("#914203"));
                this.tf_bet_tan_loc.setVisible(true);
                this.lb_bet_tan_loc.setVisible(false);
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case TXTanLocLayer.BTN_CLOSE_TAN_LOC:
                    closeTXTanLoc();
                    break;
                case TXTanLocLayer.BTN_KEY10K:
                    this.inputKeyNhapNhanh(10000);
                    break;
                case TXTanLocLayer.BTN_KEY50K:
                    this.inputKeyNhapNhanh(50000);
                    break;
                case TXTanLocLayer.BTN_KEY100K:
                    this.inputKeyNhapNhanh(100000);
                    break;
                case TXTanLocLayer.BTN_KEY500K:
                    this.inputKeyNhapNhanh(500000);
                    break;
                case TXTanLocLayer.BTN_KEY1M:
                    this.inputKeyNhapNhanh(1000000);
                    break;
                case TXTanLocLayer.BTN_KEY10M:
                    this.inputKeyNhapNhanh(10000000);
                    break;
                case TXTanLocLayer.BTN_TAN_LOC:
                    if (this.betValue < 1000) {
                         gI.popUp.openPanel_Alert_Lobby("Tán lộc phải lớn hơn 1.000 "+GameManager.config.moneyNameUpper+"!");
                    } else {
                        var taiXiuSend = new uc.TaixiuSocket.CmdSendTanLoc();
                        taiXiuSend.putTanLoc(this.betValue);
                        gI.taixiuSocket.send(taiXiuSend);
                        taiXiuSend.clean();
                        this.lb_bet_tan_loc.setString("");
                        if (!cc.sys.isNative)
                            this.tf_bet_tan_loc.setString("");
                        this.betValue = 0;
                        closeTXTanLoc();
                    }

                    break;
                case TXTanLocLayer.BTN_CLEAR_TEXT:
                    this.betValue = 0;
                    this.changeBetValue(this.betValue);
                    this.btn_clear_text.setVisible(false);
                    break;
            }
        },

        changeBetValue: function (betV) {
            if (cc.sys.isNative) {
                this.lb_bet_tan_loc.setString(formatMoney(0, 3, betV));
                if (!txTanLoc.btn_clear_text.isVisible()) {
                    txTanLoc.btn_clear_text.setVisible(true);
                }
            } else {
                this.tf_bet_tan_loc.setString(formatMoney(0, 3, betV));
                //this.tf_bet_tan_loc.attachWithIME();
                // txTanLoc.btn_clear_text.setVisible(true);
            }
        },
        inputKeyNhapNhanh: function (value) {
            if (this.betValue >= 99999999999) {
            } else {
                this.betValue = this.betValue + value;
                this.changeBetValue(this.betValue);
            }
        },
        editBoxEditingDidBegin: function (editBox) {
        },

        editBoxEditingDidEnd: function (editBox) {
        },

        editBoxTextChanged: function (editBox, text) {
            if(cc.system.isNative) return;
            var str = editBox.getString();
            str = replaceAll(".", "", str);
            if (!isNumeric(str)) {
                str = str.substr(0, str.length - 1);
            }
            if (!isNumeric(str)) {
                str = "0";
            }
            txTanLoc.betValue = Number(str);
            editBox.setString(formatMoney(0, 3, txTanLoc.betValue));
        },

        editBoxReturn: function (editBox) {

            return;
        },
        setNullFromParent: function () {
            txTanLoc = null;
        }
    }
);

openTXTanLoc = function () {

    //cc.log("----> Create mini game layer first time");
    if(txTanLoc) return;
    txTanLoc = new TXTanLocLayer();
    txTanLoc.setPosition(cc.p(-244,-700));
    taiXiu._layout.addChild(txTanLoc);
    if (cc.sys.isNative) {
        txTanLoc.setPosition(cc.p(-244,-200));
    }
    return;

};
closeTXTanLoc = function () {
    if (txTanLoc) {
        txTanLoc.removeFromParent();
        txTanLoc = null;
    }
};


TXTanLocLayer.BTN_CLOSE_TAN_LOC = 1;
TXTanLocLayer.BTN_KEY10K = 2;
TXTanLocLayer.BTN_KEY50K = 3;
TXTanLocLayer.BTN_KEY100K = 4;
TXTanLocLayer.BTN_KEY500K = 5;
TXTanLocLayer.BTN_KEY1M = 6;
TXTanLocLayer.BTN_KEY10M = 7;
TXTanLocLayer.BTN_TAN_LOC = 8;
TXTanLocLayer.BTN_CLEAR_TEXT = 9;