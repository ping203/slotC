/**
 * Created by PVC on 7/19/2017.
 */
var LayoutTabView = ccui.Layout.extend(
    {
        _layer: null,
        _arrTitleTab: null,
        _size: null,
        _tabIndex: 1,
        _titleTab: '',
        ctor: function (layer, size, arrTitleTab, tabIndex, indexFocus) {
            this._super();
            this._layer = layer;
            this._size = size;
            this._arrTitleTab = arrTitleTab;
            this._tabIndex = tabIndex;
            this.setContentSize(this._size);
            //var w = this._size.width/this._arrTitleTab.length;
            var w = 175;
            var sizeTab = cc.size(parseFloat(w), this._size.height);
            var indexFocus1 = 0;
            if (indexFocus) {
                indexFocus1 = indexFocus;
            }

            for (var i = 0; i < this._arrTitleTab.length; i++) {

                var btnTab = new ccui.Button();
                btnTab.ignoreContentAdaptWithSize(false);
                btnTab.setContentSize(sizeTab);
                btnTab.setPressedActionEnabled(false);
                btnTab.setTag(i);
                btnTab.setTitleFontName(UTMBebas.fontName);
                btnTab.setTitleFontSize(24);
                btnTab.setTitleText(this._arrTitleTab[i]);
                btnTab.getTitleRenderer().setColor(cc.color.WHITE);
                var texType = ccui.Widget.LOCAL_TEXTURE;
                if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/bg-btn-tab.png")) {
                    texType = ccui.Widget.PLIST_TEXTURE;
                }
                if (i == 0) {
                    btnTab.loadTextures("res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", texType);
                    btnTab.normalFileName = "res/MenuTab/bg-btn-tab.png";
                    btnTab.clickedFileName = "res/MenuTab/bg-btn-tab-active.png";
                    btnTab.isSelected = false;
                } else if (i == this._arrTitleTab.length - 1) {
                    btnTab.loadTextures("res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", texType);
                    //btnTab.setRotation(180);
                    //btnTab.getTitleRenderer().setRotation(180);
                    //btnTab._titleRenderer.setRotation(180);

                    btnTab.normalFileName = "res/MenuTab/bg-btn-tab.png";
                    btnTab.clickedFileName = "res/MenuTab/bg-btn-tab-active.png";
                    btnTab.isSelected = false;
                } else {
                    btnTab.loadTextures("res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", "res/MenuTab/bg-btn-tab.png", texType);
                    btnTab.normalFileName = "res/MenuTab/bg-btn-tab.png";
                    btnTab.clickedFileName = "res/MenuTab/bg-btn-tab-active.png";
                    btnTab.isSelected = false;
                }

                if (i == indexFocus1) {
                    var texType = ccui.Widget.LOCAL_TEXTURE;
                    if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/bg-btn-tab.png")) {
                        texType = ccui.Widget.PLIST_TEXTURE;
                    }
                    btnTab.getTitleRenderer().setColor(GuiUtil.color("#000000"));
                    btnTab.isSelected = true;
                    btnTab.loadTextureNormal(btnTab.clickedFileName, texType);
                }
                btnTab.addTouchEventListener(this.onTouchEventHandler, this);
                btnTab.setPosition(cc.p(sizeTab.width / 2 + i * sizeTab.width, sizeTab.height / 2 - 2));

                if (cc.sys.isNative) {
                    btnTab.setTitleFontName("res/Font/" + btnTab.getTitleFontName() + ".ttf");
                }
                this.addChild(btnTab);
            }

            this._titleTab = new ccui.Text('', RobotoRegular.fontName, 20);
            this._titleTab.setAnchorPoint(0, 0.5);
            this._titleTab.setPosition(cc.p(this._size.width, this._size.height / 2));
            this.addChild(this._titleTab);
        },
        setTitleTab: function (text) {
            this._titleTab.setText(text);
        },
        setIndexTabFocus: function (index) {
            var texType = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/bg-btn-tab.png")) {
                texType = ccui.Widget.PLIST_TEXTURE;
            }
            for (var i = 0; i < this._arrTitleTab.length; i++) {
                if (i == index) {
                    if (this.getChildByTag(i).isSelected) {
                        return;
                    }
                    this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).clickedFileName, texType);
                    this.getChildByTag(i).isSelected = true;
                } else {
                    this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).normalFileName, texType);
                    this.getChildByTag(i).isSelected = false;
                }
            }
        },

        onTouchEventHandler: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    var texType = ccui.Widget.LOCAL_TEXTURE;
                    if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/bg-btn-tab.png")) {
                        texType = ccui.Widget.PLIST_TEXTURE;
                    }
                    for (var i = 0; i < this._arrTitleTab.length; i++) {
                        if (this.getChildByTag(i) == sender) {
                            if (this.getChildByTag(i).isSelected) {
                                return;
                            }
                            this.getChildByTag(i).getTitleRenderer().setColor(GuiUtil.color("#000000"));
                            this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).clickedFileName, texType);
                            this.getChildByTag(i).isSelected = true;
                            this._layer.onClickTab(0, sender.getTag());
                        } else {
                            this.getChildByTag(i).getTitleRenderer().setColor(cc.color.WHITE);
                            if (this.getChildByTag(i).isSelected) {
                                this.getChildByTag(i).isSelected = false;
                                this.getChildByTag(i).loadTextureNormal(this.getChildByTag(i).normalFileName, texType);
                            }

                        }
                    }
                    break;
            }
        },


    }
)