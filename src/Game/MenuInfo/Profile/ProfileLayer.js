/**
 * Created by B150M on 3/23/2018.
 */
var ProfileLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("ProfileLayer");
            this.hoSoLayer = null;
            this.baoMatLayer = null;
            this.hopThuLayer = null;
            this.changeAvatarLayer = null;
            this.changePasswordLayer = null;
            return true;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Vip/PlistVip.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Profile/PlistProfile.plist");
            cc.spriteFrameCache.addSpriteFrames("res/common/PlistCommon.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
            this.setTitleText("THÔNG TIN CÁ NHÂN");
            this.createTabView();
            this.addLayout(this, "pn_profile", cc.p(640, 360), null, cc.size(1280, 720), false);
            // this.openHoSoLayer();
            this.openBaoMat();
        },


        createTabView: function () {
            var arrTitleTab = ["CÁ NHÂN", "BẢO MẬT", "HỘP THƯ"];
            this._pTab = new LayoutTabView(this, cc.size(163 * 3, 65), arrTitleTab, 0, 0);
            this._pTab.setAnchorPoint(0.5, 0);
            this._pTab.setPosition(this._size.width / 2, this.height - 450);
            this.addChild(this._pTab);
        },

        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this.closeBaoMatLayer();
                this.closeHopThuLayer();
                this.openHoSoLayer();
            } else if (index == 1) {
                this.closeHoSoLayer();
                this.closeHopThuLayer();
                this.openBaoMat();
            } else if (index == 2) {
                this.closeHoSoLayer();
                this.closeBaoMatLayer();
                this.openHopThu();
            }
        },
        openHoSoLayer: function () {
            if (this.hoSoLayer) {
                this.hoSoLayer.setVisible(true);
            } else {
                this.hoSoLayer = new HoSoLayer(this);
                this.addChild(this.hoSoLayer);
            }
        },
        openBaoMat: function () {
            if (this.baoMatLayer) {
                this.baoMatLayer.setVisible(true);
            } else {
                this.baoMatLayer = new SercurityLayer(this);
                this.addChild(this.baoMatLayer);
            }
        },
        openHopThu: function () {
            if (this.hopThuLayer) {
                this.hopThuLayer.setVisible(true);
            } else {

            }
        },

        openChangeAvatarLayer: function () {
            this.changeAvatarLayer = new ChangeAvatarLayer();
            this.addChild(this.changeAvatarLayer);
        },
        openChangePasswordLayer: function () {
            this.changePasswordLayer = new ChangePasswordLayer();
            this.addChild(this.changePasswordLayer);
        },

        closeProfileLayer: function () {
            if (menutab.profileLayer) {
                menutab.profileLayer.removeFromParent(true);
                menutab.profileLayer = null;

            }
        },

        closeChangeAvatarLayer: function () {
            if (this.changeAvatarLayer) {
                this.changeAvatarLayer.removeFromParent(true);
                this.changeAvatarLayer = null;

            }
        },
        closeChangePasswordLayer: function () {
            if (this.changePasswordLayer) {
                this.changePasswordLayer.removeFromParent(true);
                this.changePasswordLayer = null;

            }
        },
        closeHoSoLayer: function () {
            if (this.hoSoLayer) {
                this.hoSoLayer.setVisible(false);
            }
        },
        closeBaoMatLayer: function () {
            if (this.baoMatLayer) {
                this.baoMatLayer.setVisible(false);
            }
        },
        closeHopThuLayer: function () {
            if (this.hopThuLayer) {
                this.hopThuLayer.setVisible(false);
            }
        },


        gotoSercurity: function () {
            menutab.profileLayer.closeProfileLayer();
            menutab.openBaoMatLayer();

        },
        createLoadingProfile: function () {
            if (this.pn_profile != null && this.pn_profile.getChildByName("loadingdatamaster") == null) {
                var loading = GuiUtil.createSprite("res/ResourceMenuTab/Mail/btnRefresh.png");
                var x = this.pn_profile.getContentSize().width / 2;
                var y = this.pn_profile.getContentSize().height / 2;
                loading.setPosition(cc.p(x, y));
                loading.setName("loadingdatamaster");
                this.pn_profile.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            } else {
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_profile.getChildByName("loadingdatamaster").setVisible(true);
            }
        },


        hideLoadingProfile: function () {
            if (this.pn_profile.getChildByName("loadingdatamaster") == null) {
            } else {
                this.pn_profile.getChildByName("loadingdatamaster").setVisible(false);
            }

        },


        onButtonRelease: function (button, id) {
            switch (id) {

            }
        }


    });


