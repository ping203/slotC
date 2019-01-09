/**
 * Created by PVC on 1/22/2018.
 */
var SubpotLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.pn_suppot = null;
            this.pn_download = null;
            this.linkFanpage = GameManager.webViewLink.fanpage;
            return true;
        },
        customizeGUI: function () {
            this.addLayout(this, "pn_suppot", cc.p(640, 0), res_Lobby + '/bg-menuduoi.png', cc.size(1280, 194), false);
            this.addLayout(this, "pn_download", cc.p(640, 0), null, cc.size(1280, 120), false);
            this.pn_suppot.setAnchorPoint(.5, 0);
            this.pn_download.setAnchorPoint(.5, 1);
            // this.addSprite(this.pn_suppot, "bg_hotline", cc.p(1152, 44), res_Lobby + "/bg_hotline.png");
            // this.addText(this.pn_suppot, "lb_hotline", cc.p(1152, 44), "Tel: " + GameManager.webViewLink.cskh, RobotoRegular.fontName, 24);
            this.addButton(this.pn_suppot, "btn_fanpage", SubpotLayer.BTN_FANPAGE, cc.p(987.5, 62), false, res_Lobby + "/support/fanpage.png", res_Lobby + "/support/fanpage.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_suppot, "btn_giftcode", SubpotLayer.BTN_GIFTCODE, cc.p(459.8, 62), true, res_Lobby + "/support/giftcode.png", res_Lobby + "/support/giftcode.png");
            this.addButton(this.pn_suppot, "btn_gift", SubpotLayer.BTN_VONGQUAY_LOBBY, cc.p(313.15, 62), true, res_Lobby + "/support/vqmm.png", res_Lobby + "/support/vqmm.png");
            this.addButton(this.pn_suppot, "btn_quydinh", SubpotLayer.BTN_QUYDINH, cc.p(828, 62), true, res_Lobby + "/support/quydinh.png", res_Lobby + "/support/quydinh.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_suppot, "btn_shop", SubpotLayer.BTN_SHOP, cc.p(640.05, 74), true, res_Lobby + "/support/shop.png", res_Lobby + "/support/shop.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_suppot, "btn_free_gold", SubpotLayer.BTN_FREEGOLD, cc.p(160, 62), true, res_Lobby + "/support/freegold.png", res_Lobby + "/support/freegold.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_suppot, "btn_friend", SubpotLayer.BTN_FRIENDS, cc.p(1140, 62), true, res_Lobby + "/support/friends.png", res_Lobby + "/support/friends.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_download, "btn_ios", SubpotLayer.BTN_IOS, cc.p(424, 30), true, res_Lobby + "/apple-store.png", res_Lobby + "/apple-store.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_download, "btn_android", SubpotLayer.BTN_ANDROID, cc.p(639.75, 30), true, res_Lobby + "/google-play.png", res_Lobby + "/google-play.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_download, "btn_windowfone", SubpotLayer.BTN_WINDOWFONE, cc.p(856, 30), true, res_Lobby + "/winphone-store.png", res_Lobby + "/winphone-store.png", ccui.Widget.PLIST_TEXTURE);
            // this.addButton(this.pn_suppot, "btn_pc", SubpotLayer.BTN_PC, cc.p(1070, -53), true, res_Lobby + "/btn_pc.png", res_Lobby + "/btn_pc.png");
            // this.btn_windowfone.setVisible(false);
            // this.addText(this.pn_suppot, "lb_tongdai", cc.p(878, -94), "Email: " + GameManager.webViewLink.email, RobotoRegular.fontName, 18);
            // this.lb_tongdai.setColor(GuiUtil.color("#fbee8d"));
            // this.lb_tongdai.ignoreContentAdaptWithSize(false);
            // this.lb_tongdai.setContentSize(cc.size(400, 24));
            // this.lb_tongdai.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            // this.lb_tongdai.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (parseInt(ConnectNative.versionCode()) == 15) {
                    this.btn_giftcode.setVisible(false);
                }
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                if (ConnectNative.versionCode() == "1.0.2") {
                    this.btn_giftcode.setVisible(false);
                }
            } if (cc.sys.isNative) {
                this.btn_giftcode.setVisible(true);
                this.btn_giftcode.setPosition(cc.p(400,47));
            }
        },
        onEnter: function () {
            this._super();

        },
        updateContent: function () {
            // this.lb_hotline.setString("Tel: " + GameManager.webViewLink.cskh);
            // this.lb_tongdai.setString("Email: " + GameManager.webViewLink.email);
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case SubpotLayer.BTN_FANPAGE:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(this.linkFanpage);
                    } else
                        window.open(this.linkFanpage);

                    break;
                case SubpotLayer.BTN_GIFTCODE:
                    if (menutab) {
                        menutab.openGiftcodelayer();
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Vui lòng đăng nhập vào hệ thống!");
                    }
                    break;
                case SubpotLayer.BTN_VONGQUAY_LOBBY:
                    if (gI.mainSocket.listener.isLogged == true) {
                        gI.magicDoor.openMiniGame(uc.MagicDoor.BTN_VONG_QUAY);
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Vui lòng đăng nhập vào hệ thống!");
                    }
                    break;
                case SubpotLayer.BTN_QUYDINH:

                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.dieuKhoanSD);
                    } else
                        window.open(GameManager.webViewLink.dieuKhoanSD);
                    break;

                    break;
                case SubpotLayer.BTN_IOS:
                    window.open(GameManager.webViewLink.downloadIOS);
                    break;
                case SubpotLayer.BTN_ANDROID:
                    window.open(GameManager.webViewLink.downloadAndroid);
                    break;
                case SubpotLayer.BTN_WINDOWFONE:
                    window.open(GameManager.webViewLink.downloadWindowPhone);
                    break;
                case SubpotLayer.BTN_PC:
                    window.open(GameManager.webViewLink.downloadPC);
                    break;
            }
        },

    });
SubpotLayer.BTN_FANPAGE = 1;
SubpotLayer.BTN_GIFTCODE = 2;
SubpotLayer.BTN_VONGQUAY_LOBBY = 3;
SubpotLayer.BTN_QUYDINH = 4;
SubpotLayer.BTN_IOS = 5;
SubpotLayer.BTN_ANDROID = 6;
SubpotLayer.BTN_WINDOWFONE = 7;
SubpotLayer.BTN_PC = 8;
SubpotLayer.BTN_SHOP = 9;
SubpotLayer.BTN_FREEGOLD = 10;
SubpotLayer.BTN_FRIENDS =11;
