/**
 * Created by B150M on 3/23/2018.
 */
var SercurityLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("SercurityLayer");
            this.informationLayer = null;
            this.smsPlusLayer = null;
            this.changeMobileLayer = null;
            this.baoMatDangNhapLayer = null;
            this.ketAnToanLayer = null;
            this.quanLyGameLayer = null;
            return true;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/BaoMat/PlistBaoMat.plist");
            this.setTitleText("BẢO MẬT");
            this.addLayout(this, "pn_bao_mat", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.funGetInformation();
        },


        createTabView: function () {

            if (userInfo.userData.mobileSecure == 0) {
                var arrTitleTab = ["Thông tin", "Quản lý game"];
            } else {
                var arrTitleTab = ["Thông tin", "SMS Plus", "BM đăng nhập", "Két an toàn", "Quản lý game"];
            }

            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1, 0);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);

        },

        onClickTab: function (tabIndex, index) {
            if (userInfo.userData.mobileSecure == 0) {
                if (index == 0) {
                    this.closeQuanLyGameLayer();
                    this.openInformationLayer();

                } else if (index == 1) {
                    this.closeInformationLayer();
                    this.openQuanLyGameLayer();

                }

            } else {
                if (index == 0) {
                    this.closeSmsPlusLayer();
                    this.closeChangeMobileLayer();
                    this.closeBaoMatDangNhapLayer();
                    this.closeKetAnToanLayer();
                    this.closeQuanLyGameLayer();
                    this.openInformationLayer();


                } else if (index == 1) {
                    this.closeInformationLayer();
                    this.closeChangeMobileLayer();
                    this.closeBaoMatDangNhapLayer();
                    this.closeKetAnToanLayer();
                    this.closeQuanLyGameLayer();
                    this.openSmsPlusLayer();



                } else if (index == 2) {
                    this.closeInformationLayer();
                    this.closeSmsPlusLayer();
                    this.closeChangeMobileLayer();
                    this.closeKetAnToanLayer();
                    this.closeQuanLyGameLayer();
                    this.openBaoMatDangNhapLayer();
                    if(this.baoMatDangNhapLayer){
                        this.baoMatDangNhapLayer.funGotoSercurityLogin();
                    }

                }
                else if (index == 3) {
                    this.closeInformationLayer();
                    this.closeSmsPlusLayer();
                    this.closeChangeMobileLayer();
                    this.closeBaoMatDangNhapLayer();
                    this.closeQuanLyGameLayer();
                    this.openKetAnToanLayer();

                } else if (index == 4) {
                    this.closeInformationLayer();
                    this.closeSmsPlusLayer();
                    this.closeChangeMobileLayer();
                    this.closeBaoMatDangNhapLayer();
                    this.closeKetAnToanLayer();
                    this.openQuanLyGameLayer();
                }

            }
        },
        funGetInformation: function () {
            this.createLoadingSercurity();
            if (gI.mainSocket.listener.isLogged) {
                var sendOtp = new CmdSendGetInformationSercurity();
                sendOtp.putGetInformationSercurity();
                gI.mainSocket.send(sendOtp);
                sendOtp.clean();
                //cc.log("send get info");
            } else {
                this.hideLoadingSercurity();
                gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
                gI.mainSocket.connectSocket();

            }
        },
        responseGetInformationSercurity: function (error, username, cmt, email, mobile, mobileSecure, emailSecure, appSecure, loginSecure, moneyLoginOtp, moneyUse, safe, configGame) {
            this.hideLoadingSercurity();
            if (error == 0) {
                cc.log("mobile + " + mobile);
                userInfo.userData.username = username;
                userInfo.userData.identification = cmt;
                userInfo.userData.email = email;
                userInfo.userData.mobile = mobile;
                userInfo.userData.mobileSecure = mobileSecure;
                userInfo.userData.emailSecurity = emailSecure;
                userInfo.userData.appSecurity = appSecure;
                userInfo.userData.loginSecure = loginSecure;
                userInfo.userData.moneyLoginOtp = moneyLoginOtp;
                userInfo.userData.moneyUse = moneyUse;
                userInfo.userData.safe = safe;
                userInfo.userData.configGame = JSON.parse(configGame);
                this.createTabView();
                this.openInformationLayer();


            } else {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                this.closeSercurityLayer();
            }
        },

        openInformationLayer: function () {
            this.informationLayer = new InformationLayer(this);
            this.addChild(this.informationLayer);
        },
        openSmsPlusLayer: function () {
            this.smsPlusLayer = new SmsPlusLayer(this);
            this.addChild(this.smsPlusLayer);
        },
        openChangeMobileLayer: function () {
            this.changeMobileLayer = new ChangeMobileLayer(this);
            this.addChild(this.changeMobileLayer);
        },
        openBaoMatDangNhapLayer: function () {
            this.baoMatDangNhapLayer = new BaoMatDangNhapLayer(this);
            this.addChild(this.baoMatDangNhapLayer);
        },
        openKetAnToanLayer: function () {
            this.ketAnToanLayer = new KetAnToanLayer(this);
            this.addChild(this.ketAnToanLayer);
        },
        openQuanLyGameLayer: function () {
            this.quanLyGameLayer = new QuanLyGameLayer(this);
            this.addChild(this.quanLyGameLayer);
        },

        closeSercurityLayer: function () {
            if (menutab.sercurityLayer) {
                menutab.sercurityLayer.removeFromParent(true);
                menutab.sercurityLayer = null;

            }
        },

        closeInformationLayer: function () {
            if (this.informationLayer) {
                this.informationLayer.removeFromParent(true);
                this.informationLayer = null;

            }
        },
        closeSmsPlusLayer: function () {
            if (this.smsPlusLayer) {
                this.smsPlusLayer.removeFromParent(true);
                this.smsPlusLayer = null;

            }
        },
        closeChangeMobileLayer: function () {
            if (this.changeMobileLayer) {
                this.changeMobileLayer.removeFromParent(true);
                this.changeMobileLayer = null;

            }
        },
        closeBaoMatDangNhapLayer: function () {
            if (this.baoMatDangNhapLayer) {
                this.baoMatDangNhapLayer.removeFromParent(true);
                this.baoMatDangNhapLayer = null;

            }
        },
        closeKetAnToanLayer: function () {
            if (this.ketAnToanLayer) {
                this.ketAnToanLayer.removeFromParent(true);
                this.ketAnToanLayer = null;

            }
        },
        closeQuanLyGameLayer: function () {
            if (this.quanLyGameLayer) {
                this.quanLyGameLayer.removeFromParent(true);
                this.quanLyGameLayer = null;

            }
        },

        createLoadingSercurity: function () {
            if (this.pn_bao_mat != null && this.pn_bao_mat.getChildByName("loadingdatamaster") == null) {
                var loading = GuiUtil.createSprite("res/ResourceMenuTab/Mail/btnRefresh.png");
                var x = this.pn_bao_mat.getContentSize().width / 2;
                var y = this.pn_bao_mat.getContentSize().height / 2;
                loading.setPosition(cc.p(x, y));
                loading.setName("loadingdatamaster");
                this.pn_bao_mat.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            } else {
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_bao_mat.getChildByName("loadingdatamaster").setVisible(true);
            }
        },


        hideLoadingSercurity: function () {
            if (this.pn_bao_mat.getChildByName("loadingdatamaster") == null) {
            } else {
                this.pn_bao_mat.getChildByName("loadingdatamaster").setVisible(false);
            }

        },


        onButtonRelease: function (button, id) {
            switch (id) {

            }
        }


    });


