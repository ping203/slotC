var LayoutListViewFreeGoldLayer = ccui.Layout.extend({
    ctor: function (layer, arrMenhGia, indexFocus) {
        this._super();
        this._layer = layer;
        this._arrMenhGia = arrMenhGia;


        // List video
        var space = (layer._pContent.width - (214 * arrMenhGia.length)) / (arrMenhGia.length + 1);
        var marginL = space;

        var resCoin = [
            "res/MenuTab/resFreeGold/free-gold-coin-lv1.png",
            "res/MenuTab/resFreeGold/free-gold-coin-lv2.png",
            "res/MenuTab/resFreeGold/free-gold-coin-lv3.png",
            "res/MenuTab/resFreeGold/free-gold-coin-lv4.png"
        ];

        for (var i = 0; i < arrMenhGia.length; i++) {
            var texType = ccui.Widget.LOCAL_TEXTURE;
            var tmpLayer = new ccui.Layout();
            tmpLayer.setContentSize(cc.size(214, 284));
            tmpLayer.y = 92;
            tmpLayer.normalFileName = "res/MenuTab/resFreeGold/bg-box-free-gold.png";
            tmpLayer.clikedFileName = "res/MenuTab/resFreeGold/bg-box-free-gold-active.png";
            tmpLayer.setBackGroundImage(tmpLayer.normalFileName, texType);
            tmpLayer.setTag(i);
            tmpLayer.isSelected = false;
            tmpLayer.setTouchEnabled(true);
            tmpLayer.addTouchEventListener(this.onTouchEventHandler, this);

            // Title Amount
            var lbTitle = new ccui.Text(arrMenhGia[i], RobotoRegular.fontName, 24);
            lbTitle.setPosition(cc.p(tmpLayer.width / 2, tmpLayer.height - 50));
            lbTitle.setOpacity(100);

            // Button Play
            var btn = new ccui.Button();
            btn.ignoreContentAdaptWithSize(false);
            btn.setPressedActionEnabled(false);
            btn.setTag(i);
            btn.setPosition(tmpLayer.width / 2, tmpLayer.height / 2 + 20);
            btn.loadTextures("res/MenuTab/resFreeGold/play.png", "res/MenuTab/resFreeGold/play.png", "res/MenuTab/resFreeGold/play.png", texType);
            btn.normalFileName = "res/MenuTab/resFreeGold/play.png";
            btn.clickedFileName = "res/MenuTab/resFreeGold/play-active.png";

            if (i !== 0)
                marginL += 214;
            tmpLayer.x = marginL;
            marginL += space;

            // Coin
            var coin = new ccui.ImageView(resCoin[i], texType);
            coin.setPosition(tmpLayer.width / 2, 75);
            coin.setOpacity(100);

            // add child
            tmpLayer.addChild(lbTitle, 0, 0);
            tmpLayer.addChild(coin, 0, 1);
            tmpLayer.addChild(btn, 0, 2);


            // add to parent
            this.addChild(tmpLayer);
        }

        // this.onTouchEventHandler(this.getChildByTag(indexFocus).getChildByTag(2), ccui.Widget.TOUCH_ENDED);

        // note
        var lblNote = new ccui.Text("Bấm 'PLAY' phía trên để xem Video", RobotoRegular.fontName, 20);
        lblNote.setPosition(this._layer._pContent.width / 2, 38);

        this.addChild(lblNote);

        return true;
    },
    onTouchEventHandler: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                var texType = ccui.Widget.LOCAL_TEXTURE;
                /*if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/bg-btn-tab.png")) {
                    texType = ccui.Widget.PLIST_TEXTURE;
                }*/
                for (var i = 0; i < this._arrMenhGia.length; i++) {
                    var lbl = this.getChildByTag(i).getChildByTag(0);
                    var btn = this.getChildByTag(i).getChildByTag(2);
                    var coin = this.getChildByTag(i).getChildByTag(1);
                    if (this.getChildByTag(i) === sender) {
                        if (this.getChildByTag(i).isSelected) {
                            return;
                        }
                        this.getChildByTag(i).setBackGroundImage(this.getChildByTag(i).clikedFileName, texType);
                        lbl.setOpacity(255);
                        coin.setOpacity(255);
                        btn.loadTextureNormal(btn.clickedFileName, texType);
                        this._layer.onClickCell(0, this.getChildByTag(i).getTag());
                    } else {
                        this.getChildByTag(i).setBackGroundImage(this.getChildByTag(i).normalFileName, texType);
                        lbl.setOpacity(100);
                        coin.setOpacity(100);
                        btn.loadTextureNormal(btn.normalFileName, texType);
                    }
                }
                break;
        }
    },
});


LayoutListViewFreeGoldLayer.BTN_PLAY_LV1 = 1;
LayoutListViewFreeGoldLayer.BTN_PLAY_LV2 = 2;
LayoutListViewFreeGoldLayer.BTN_PLAY_LV3 = 3;
LayoutListViewFreeGoldLayer.BTN_PLAY_LV4 = 4;