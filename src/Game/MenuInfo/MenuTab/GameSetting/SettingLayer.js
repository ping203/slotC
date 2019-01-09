/**
 * Created by PVC on 1/22/2018.
 */
var SettingLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.pSetting = null;
            this.bgSetting = null;
            this.sp_mute = null;
            this.btn_gop_y = null;

            return true;
        },

        customizeGUI: function () {
            this.addLayout(this, "pSetting", cc.p(640, 360), null, cc.size(1280, 720), true);
            this.pSetting.setTag(SettingLayer.BTN_CLOSE_PANEL_SETTING);
            this.pSetting.setTouchEnabled(false);
            this.pSetting.addTouchEventListener(this.onTouchEventHandler, this);
            this.addImage(this.pSetting, "bgSetting", cc.p(1157, 639), res_ResourceMenuTab_Profile + "/bg_setting.png", cc.size(226, 85));
            // this.bgSetting.setScale9Enabled(false);
            this.bgSetting.ignoreContentAdaptWithSize(false);
            this.bgSetting.setTouchEnabled(true);
            this.bgSetting.setAnchorPoint(0.5,1);

            this.addButton(this.bgSetting, "btn_dieukhoansudung", SettingLayer.BTN_DIEUKHOANSUDUNG, cc.p(113, 24), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this["btn_dieukhoansudung"].setTitleText("ĐIỀU KHOẢN SỬ DỤNG");
            this["btn_dieukhoansudung"].setContentSize(cc.size(207, 39));
            this["btn_dieukhoansudung"].setTitleFontSize(20);

            this.addButton(this.bgSetting, "btn_sound", SettingLayer.BTN_SOUND_MENU, cc.p(113, 61), true, res_ResourceMenuTab_BaoMat + "/bt2.png", res_ResourceMenuTab_BaoMat + "/bt2.png");
            this["btn_sound"].setTitleText("         ÂM THANH");
            this["btn_sound"].setTitleFontSize(20);
            this["btn_sound"].setContentSize(cc.size(207, 39));

            this.addSprite(this["btn_sound"], "Sprite_1", cc.p(34.5, 20), res_ResourceMenuTab + "/sound.png");
            this.addSprite(this["btn_sound"], "sp_mute", cc.p(34.5, 20), res_ResourceMenuTab + "/NO.png");
            this.sp_mute.setVisible(false);
            this.bgSetting.setScaleY(0);
            this.setVisible(false);
        },

        onEnter: function () {
            this._super();

        },

        onButtonRelease: function (button, id) {
            switch (id) {

                case SettingLayer.BTN_CLOSE_PANEL_SETTING:

                    break;
                case SettingLayer.BTN_DIEUKHOANSUDUNG:
                    if (cc.sys.isNative) {
                        ConnectNative.openWebView(GameManager.webViewLink.dieuKhoanSD);
                    } else
                        window.open(GameManager.webViewLink.dieuKhoanSD);
                    break;
                case SettingLayer.BTN_SOUND_MENU:
                    if (!this.sp_mute.isVisible()) {
                        this.sp_mute.setVisible(true);
                        lobby.menuLayer.audioMenuSlots.offSoundEffect();

                    } else {
                        this.sp_mute.setVisible(false);
                        lobby.menuLayer.audioMenuSlots.onSoundEffect();
                    }
                    break;
            }
            this.closeSetting();
        },
        closeSetting:function () {
            this.pSetting.setTouchEnabled(false);
            this.bgSetting.runAction(cc.sequence(cc.scaleTo(0.2, 1, 0),cc.callFunc(function () {
                this.setVisible(false);
            }.bind(this))));
        },
        openSetting:function () {
            this.setVisible(true);
            this.bgSetting.runAction(cc.sequence(cc.scaleTo(0.2, 1, 1),cc.callFunc(function () {
                this.pSetting.setTouchEnabled(true);
            }.bind(this))));
        }

    });
SettingLayer.BTN_CLOSE_PANEL_SETTING = 1;
SettingLayer.BTN_DIEUKHOANSUDUNG = 2;
SettingLayer.BTN_SOUND_MENU = 3;