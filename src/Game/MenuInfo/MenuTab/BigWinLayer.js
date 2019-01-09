/**
 * Created by PVC on 1/22/2018.
 */
var BigWinLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.pBigWin = null;
            this.pDataRun = null;
            this.arrBroadcast = [];
            this.vtIcon = 20;
            return true;
        },

        customizeGUI: function () {
            this.addLayout(this, "pBigWin", cc.p(0, 597), null, cc.size(1280, 40), true);
            this.pBigWin.setAnchorPoint(0, 0);
            this.pBigWin.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pBigWin.setBackGroundColor(GuiUtil.color("#000000"));
            this.pBigWin.setBackGroundColorOpacity(80);
            this.pBigWin.setClippingEnabled(true);
            this.addLayout(this.pBigWin, "pDataRun", cc.p(1280, 0), null, cc.size(1280, 40), true);
            this["pDataRun"].setAnchorPoint(0, 0);
        },

        onEnter: function () {
            this._super();

        },

        onButtonRelease: function (button, id) {
            switch (id) {
            }
        },
        responseBroadcastMessage: function (message) {
            var jsonData = JSON.parse(message);
            if (this.arrBroadcast != null)
                while (this.arrBroadcast.length > 0) {
                    this.arrBroadcast.pop();
                }
            var RunEvent = jsonData["entries"];
            if (RunEvent == null || RunEvent == "") {
            } else {
                for (var i = 0; i < RunEvent.length; i++) {
                    var counter = RunEvent[i];
                    this.arrBroadcast.push(counter);
                }
                this.insertDataToRunEvent();
            }
        },
        insertDataToRunEvent: function () {
            this.pDataRun.removeAllChildren();
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < this.arrBroadcast.length; i++) {
                var namegame = this.checkIconGame(this.arrBroadcast[i].g);
                var lbgame = cc.LabelTTF.create();
                lbgame.string = namegame;
                lbgame.fontName = fonts.fontName;
                lbgame.fontSize = 15;
                lbgame.textAlign = cc.TEXT_ALIGNMENT_CENTER | cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                this.vtIcon = this.vtIcon + (lbgame.width / 2);
                lbgame.setColor(GuiUtil.color("#90ff00"));
                lbgame.setPosition(cc.p(this.vtIcon, 20));
                this.pDataRun.addChild(lbgame);
                var str = this.arrBroadcast[i].n;
                if (this.pDataRun.getChildByName("lbnickname_" + i) == null) {
                    var lbnickname = cc.LabelTTF.create();
                    lbnickname.string = str;
                    lbnickname.fontName = fonts.fontName;
                    lbnickname.fontSize = 15;
                    lbnickname.textAlign = cc.TEXT_ALIGNMENT_CENTER | cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    lbnickname.setName("lbnickname_" + i);
                    this.vtIcon = this.vtIcon + (lbgame.width / 2) + 5 + (lbnickname.width / 2);
                    lbnickname.setColor(GuiUtil.color("#ff0054"));
                    lbnickname.setPosition(cc.p(this.vtIcon, 20));
                    this.pDataRun.addChild(lbnickname);
                }

                var strThang = "thắng";

                if (this.pDataRun.getChildByName("lbthang_" + i) == null) {
                    var lbthang = cc.LabelTTF.create();
                    lbthang.string = strThang;
                    lbthang.fontName = fonts.fontName;
                    lbthang.fontSize = 15;
                    lbthang.textAlign = cc.TEXT_ALIGNMENT_CENTER | cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    lbthang.setName("lbthang_" + i);
                    lbthang.setColor(GuiUtil.color("#feeaca"));
                    this.vtIcon = this.vtIcon + (lbnickname.width / 2) + 2 + (lbthang.width / 2);
                    lbthang.setPosition(cc.p(this.vtIcon, 20));
                    this.pDataRun.addChild(lbthang);
                }

                var strMoney = formatMoney(0, 3, this.arrBroadcast[i].m);

                if (this.pDataRun.getChildByName("lbmoney_" + i) == null) {
                    var lbmoney = cc.LabelTTF.create();
                    lbmoney.string = strMoney;
                    lbmoney.fontName = fonts.fontName;
                    lbmoney.fontSize = 15;
                    lbmoney.textAlign = cc.TEXT_ALIGNMENT_CENTER | cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    lbmoney.setName("lbmoney_" + i);
                    lbmoney.setColor(GuiUtil.color("#ffeb30"));
                    this.vtIcon = this.vtIcon + (lbthang.width / 2) + 2 + (lbmoney.width / 2)
                    lbmoney.setPosition(cc.p(this.vtIcon, 20));
                    this.pDataRun.addChild(lbmoney);
                }
                this.vtIcon = this.vtIcon + (lbmoney.width / 2) + 80;
            }
            this.vtIcon = 20;
            this.runDataEvent();
        },

        checkIconGame: function (value) {
            var str = "";
            if (value == 1) {
                str = "(MiniPoker)";
            } else if (value == 2) {
                str = "(TaiXiu)";
            } else if (value == 3) {
                str = "(BauCua)";
            } else if (value == 4) {
                str = "(CaoThap)";
            } else if (value == 5) {
                str = "(KimCuong)";
            } else if (value == 7) {
                str = "(VQMM)";
            } else if (value == 8) {
                str = "(Sam)";
            } else if (value == 9) {
                str = "(BaCay)";
            } else if (value == 10) {
                str = "(MauBinh)";
            } else if (value == 11) {
                str = "(TLMN)";
            } else if (value == 12) {
                str = "(TaLa)";
            } else if (value == 13) {
                str = "(Lieng)";
            } else if (value == 14) {
                str = "(XiTo)";
            } else if (value == 15) {
                str = "(XocXoc)";
            } else if (value == 16) {
                str = "(BaiCao)";
            } else if (value == 17) {
                str = "(Poker)";
            } else if (value == 18) {
                str = "(SieuAnhHung)";
            } else if (value == 19) {
                str = "(MyNhanNgu)";
            } else if (value == 20) {
                str = "(KhoBau)";
            } else if (value == 21) {
                str = "(NuDiepVien)";
            } else if (value == 22) {
                str = "(VuongQuocGem)";
            }else if (value == 23)
            {
                str = "(DeCheLaMa)";
            }
            return str;
        },

        runDataEvent: function () {
            cc.log("child run event : " + this.pDataRun.getChildrenCount());
            this.isRunVinhDanh = true;
            this.pDataRun.stopAllActions();
            this.pDataRun.x = 1280;
            var move = cc.MoveTo.create(80, cc.p(this.pDataRun.x - 8200, this.pDataRun.y));
            this.pDataRun.runAction(cc.sequence(move, cc.callFunc(function () {
                for (var i = 1; i < 21; i++) {
                    if (this.pDataRun.getChildByName("icon_" + i) != null) {
                        var icon = this.pDataRun.getChildByName("icon_" + i);
                        icon.setScale(0);
                    }
                    if (this.pDataRun.getChildByName("lbnickname_" + i) != null) {
                        var lbnickname = this.pDataRun.getChildByName("lbnickname_" + i);
                        lbnickname.setString("");
                    }
                    if (this.pDataRun.getChildByName("lbmoney_" + i) != null) {
                        var lbmoney = this.pDataRun.getChildByName("lbmoney_" + i);
                        lbmoney.setString("");
                    }
                }
            }.bind(this))));
        },


    });