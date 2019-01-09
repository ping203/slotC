/**
 * Created by PVC on 7/31/2017.
 */
var ForgotPassWordLayer = BaseLayerTable.extend(
    {

        ctor: function (parent) {
            this._super();
            this.pn_forget_pass = null;
            this.nhapUsernameLayer = null;
            this.save_username = null;
            this.otpQuenMKLayer = null;
            this.forgotEmailLayer = null;
            this.openPnOtpForget = null;
            this.openPnEmailForget = null;
            this.forgotEmailPhoneLayer = null;
            this.lobby = parent;

        },
        customizeGUI: function () {
            this.setTitleText("QUÊN MẬT KHẨU");
            this.initPForgetPass();
            this.openNhapUsername();

        },
        initPForgetPass: function () {
            this._btnExit.setLocalZOrder(567);
            this.addLayout(this, "pn_forget_pass", cc.p(640, 360), null, cc.size(1280, 720), true);
            this._pContent = this.pn_forget_pass;
            this._bgImg = new ccui.ImageView("res/ResourceMenuTab/Mail/lopmo.png", cc.spriteFrameCache.getSpriteFrame("res/ResourceMenuTab/Mail/lopmo.png") ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE);
            this._bgImg.setScale9Enabled(false);
            this._bgImg.ignoreContentAdaptWithSize(false);
            this._bgImg.setPosition(cc.p(640, 326));
            this._bgImg.setAnchorPoint(0.5, 0.5);
            this._bgImg.setContentSize(cc.size(1035, 499));
            this.pn_forget_pass.addChild(this._bgImg);


        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case  ForgotPassWordLayer.BTN_BACK_FORGETPASS:
                    this.openNhapUsername();
                    break;

            }
        },

        openNhapUsername: function () {
            this.nhapUsernameLayer = new NhapUsernameLayer(this);
            this.addChild(this.nhapUsernameLayer);
        },


    }
);
ForgotPassWordLayer.BTN_BACK_FORGETPASS = 1;
