/**
 * Created by PVC on 1/22/2018.
 */
var UserManagerLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();

            // @Declare Variable UI
            this.pTabQuanLy = null;
            this.ui_avatar = null;
            this.ui_hu = null;
            this.ui_lichsu = null;
            this.ui_caidat = null;
            this.ui_username = null;
            this.ui_coins_money = null;
            this.ui_bg_pot = null;
            this.ui_money = null;

            return true;
        },
        customizeGUI: function () {
            var texType = ccui.Widget.LOCAL_TEXTURE;
            this.addLayout(this, 'pTabQuanLy', cc.p(640, 720), 'res/Lobby/logged/bg-logged.png', cc.size(1280, 110), true);
            this.pTabQuanLy.setAnchorPoint(0.5, 1);
            this.addImage(this.pTabQuanLy, 'ui_avatar', cc.p(60, 60), 'res/Lobby/logged/avatar.png', cc.size(89, 89));
            this.addImage(this.pTabQuanLy, 'ui_bg_pot', cc.p(260, 46), 'res/Lobby/logged/bg-pot.png', cc.size(245, 43));
            this.addImage(this.pTabQuanLy, 'ui_coins_money', cc.p(145, 46), 'res/MenuTab/coin-money.png', cc.size(58, 55));
            this.addButton(this.pTabQuanLy, 'ui_hu', UserManagerLayer.BTN_HU, cc.p(960, 56), false, 'res/Lobby/logged/hu-icon.png', 'res/Lobby/logged/hu-icon.png', texType);
            this.addButton(this.pTabQuanLy, 'ui_lichsu', UserManagerLayer.BTN_LICH_SU, cc.p(1128, 62), false, 'res/Lobby/logged/lichsu.png', 'res/Lobby/logged/lichsu.png', texType);
            this.addButton(this.pTabQuanLy, 'ui_caidat', UserManagerLayer.BTN_CAI_DAT, cc.p(1220, 62), false, 'res/Lobby/logged/setting.png', 'res/Lobby/logged/setting.png', texType);
            this.addText(this.pTabQuanLy, 'ui_username', cc.p(260, 85), userInfo.userData.nickname, UTMSwissCondensedBold.fontName, 24);
            this.addText(this.pTabQuanLy, 'ui_money', cc.p(260, 48), StringUtility.pointNumber('80000000'), UTMBebas.fontName, 30);
            this.ui_money.setColor(GuiUtil.color('#fffa8b'));

        },
    });


UserManagerLayer.BTN_HU = 1;
UserManagerLayer.BTN_LICH_SU = 2;
UserManagerLayer.BTN_CAI_DAT = 3;
