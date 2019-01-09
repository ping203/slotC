var BaseLobby = BaseLayer.extend(
    {
        ctor: function () {
            this._super("BaseLobby");
            this.sizeSceen = null;
            this.positionCenter = null;
            this.positionContent = null;
            this.bg = null;
            this.main_content = null;
            this.imageBg = null;
            this.backdrop_popup = null;

            this.bgGuiLayer = null;
            this.gameGuiLayer = null;
            this.infoGuiLayer = null;
            this.banCaGuiLayer = null;
            this.miniGameGuiLayer = null;
            this.popupLowGuiLayer = null;
            this.popupGuiLayer = null;


            if (cc.sys.isNative)
                this.imageBg = "res/Base/Lobby/GUI/mobile-lobby-bg.jpg";
            else
                this.imageBg = "res/Lobby/main-background.png";
            this.addSprite(this, "bg", cc.p(0, 0), this.imageBg);
            this.addLayout(this, "main_content", cc.p(0, 0), null, cc.size(1280, 720), false);
            this.main_content.setAnchorPoint(0.5, 1);
            // GuiUtil.setBackGroundColor(this.main_content, cc.color.BLACK, 100);

            this.bgGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            this.gameGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            this.infoGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            this.banCaGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            this.miniGameGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            // this.popupLowGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);
            this.popupGuiLayer = GuiUtil.createLayout(cc.p(640, 360), null, cc.size(1280, 720), false);

            this.main_content.addChild(this.bgGuiLayer, BaseLobby.INDEX_BG_GUI);
            this.main_content.addChild(this.gameGuiLayer, BaseLobby.INDEX_GAME_GUI);
            this.main_content.addChild(this.infoGuiLayer, BaseLobby.INDEX_INFO_GUI);
            this.main_content.addChild(this.banCaGuiLayer, BaseLobby.INDEX_BAN_CA);
            this.main_content.addChild(this.miniGameGuiLayer, BaseLobby.INDEX_MINIGAME_GUI);
            // this.main_content.addChild(this.popupLowGuiLayer, BaseLobby.INDEX_POP_UP_LOW_GUI);
            this.main_content.addChild(this.popupGuiLayer, BaseLobby.INDEX_POP_UP_GUI);

            /*this.addLayout(this.popupLowGuiLayer, "backdrop_popup", cc.p(-320, -360), null, cc.size(1920, 1080), false);
            this.backdrop_popup.setName('backdrop_popup');
            this.backdrop_popup.setTag(BaseLobby.LAYER_BACKDROP_POPUP);
            this.backdrop_popup.setTouchEnabled(true);
            this.backdrop_popup.setVisible(false);
            this.backdrop_popup.addTouchEventListener(this.onTouchEventHandler, this);
            this.backdrop_popup.setAnchorPoint(0, 0);
            GuiUtil.setBackGroundColor(this.backdrop_popup, cc.color.BLACK, 150);*/

            this.scaleContent();
            return true;
        },
        scaleContent: function () {
            var contenSize = cc.size(1920, 1080);
            var scaleContent = 1;
            var scaleContentX = 1;
            var scaleContentY = 1;

            if (cc.sys.isNative) {
                this.positionCenter = cc.p(640, 360);
                this.positionContent = cc.p(640, 360);
            } else {
                scaleContentX = window.innerWidth / contenSize.width;
                scaleContentY = window.innerHeight / contenSize.height;
                scaleContent = Math.max(scaleContentX, scaleContentY);
                this.positionCenter = cc.p(960 * scaleContentX, 540 * scaleContentY);
                this.positionContent = cc.p(960 * scaleContentX, 1080 * scaleContentY);
            }

            this.main_content.setScale(scaleContent);
            this.bg.setScale(scaleContent);
            // this.backdrop_popup.setScale(scaleContent);
            // this.popupLayer.setScale(scaleContent);
            this.main_content.setPosition(this.positionContent);
            this.bg.setPosition(this.positionCenter);
            // this.popupLayer.setPosition(this.positionCenter);
        },
        onEnter: function () {
            // cc.log("Base Lobby");
            this._super();
            /*var self = this;
            setInterval(function () {
                if (self.popupLowGuiLayer.childrenCount > 1) {
                    self.backdrop_popup.setVisible(true);
                } else {
                    self.backdrop_popup.setVisible(false);
                }
            }, 1);*/
        },

        initGUI: function () {

        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case BaseLobby.LAYER_BACKDROP_POPUP:
                    this.popupLowGuiLayer.children.forEach(function (child) {
                        if (child['backdropTouched']) {
                            child.backdropTouched(child);
                        }
                    });
                    break;
            }
        },
        customizeGUI: function () {
            gI.popUp = new uc.PopUp();
            this.getGuiLayer(BaseLobby.INDEX_POP_UP_GUI).addChild(gI.popUp);
            createLobby();
        },
        addGUI: function (layer, zOrder) {
            this.main_content.addChild(layer, zOrder);
        },
        getGuiLayer: function (index) {
            switch (index) {
                case BaseLobby.INDEX_BG_GUI:
                    return this.bgGuiLayer;
                    break;
                case BaseLobby.INDEX_GAME_GUI:
                    return this.gameGuiLayer;
                    break;
                case BaseLobby.INDEX_INFO_GUI:
                    return this.infoGuiLayer;
                    break;
                case BaseLobby.INDEX_BAN_CA:
                    return this.banCaGuiLayer;
                    break;
                case BaseLobby.INDEX_MINIGAME_GUI:
                    return this.miniGameGuiLayer;
                    break;
                case BaseLobby.INDEX_POP_UP_GUI:
                    return this.popupGuiLayer;
                    break;
            }
        }
    }
);

BaseLobby.INDEX_BG_GUI = 0;
BaseLobby.INDEX_GAME_GUI = 1;
BaseLobby.INDEX_INFO_GUI = 2;
BaseLobby.INDEX_BAN_CA = 3;
BaseLobby.INDEX_MINIGAME_GUI = 4;
BaseLobby.INDEX_POP_UP_GUI = 5;