/**
 * Created by B150M on 3/23/2018.
 */
var ChangeAvatarLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super("");
            this.pn_profile = parent;
            this.firstlistavatar = false;
            this.X_avatar = 81;
            this.Y_avatar = 260;
            this.valueAvatar = null;

            return true;
        },

        customizeGUI: function () {
            this.initPnChangeAvatar();

        },


        initPnChangeAvatar: function () {
            var layout = this.addLayoutStructure(this, "pn_change_avatar", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true, {visible: true});

            this.addImage(layout, "pn_content", cc.p(640, 335.32), res_Lobby + "/bg_content.png", cc.size(1049, 552));

            this.addTextStructure(layout, "txtInbox", cc.p(640.00, 570.09), "THAY ĐỔI AVATAR", UTMBebas.fontName, "40", "#FFFFFF", {__size: cc.size(250, 51)}).enableOutline(GuiUtil.color("#B78444"), 2);
            this.addButtonStructure(layout, "btn_quay_lai", ChangeAvatarLayer.BTN_BACK_AVATAR, cc.p(154.21, 571.81), true, res_Lobby + "/btnClose.png");

            this.addScrollViewStructure(layout, "sc_avatar", cc.p(640.29, 537.18), cc.size(1000.00, 385.00), {
                anchorY: 1,
                anchorX: 0.5
            });
            this.addImageStructure(this.sc_avatar, "sp_cirle_ava", cc.p(81.00, 260.00), res_ResourceMenuTab_Profile + "/cirle_avatar.png");

            this.addButtonStructure(layout, "btn_thay_doi", ChangeAvatarLayer.BTN_THAYDOI_AVATAR, cc.p(640.88, 110.25), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.8, 1);

            this.addTextStructure(layout, "txtInbox", cc.p(640.88, 110.25), "THAY ĐỔI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.txtInbox.setColor(GuiUtil.color(162,105,64));

        },
        addListAvatar: function () {
            if (this.firstlistavatar == false) {
                this.firstlistavatar = true;
                for (var i = 0; i < 12; i++) {
                    var button = new ccui.Button();
                    GuiUtil.loadTextureNormal(button,getlinkAvatar(i));
                    GuiUtil.loadTexturePressed(button,getlinkAvatar(i));
                    GuiUtil.loadTextureDisabled(button,getlinkAvatar(i));
                    button.setPosition(cc.p(this.X_avatar, this.Y_avatar));
                    button.setName("avatar_" + i);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.Click_Avatar(sender.name);
                                break;
                        }

                    }, this);
                    this.sc_avatar.addChild(button);
                    cc.log("x =" + parseInt(userInfo.userData.avatar));
                    if (parseInt(userInfo.userData.avatar) == i) {
                        this.sp_cirle_ava.setPosition(cc.p(button.x, button.y));
                    }
                    this.X_avatar = this.X_avatar + 164;
                    if (i == 5) {
                        this.X_avatar = 81;
                        this.Y_avatar = 100;
                    }

                }
            } else {
                for (var i = 0; i < 12; i++) {
                    if (parseInt(userInfo.userData.avatar) == i) {
                        if (this.sc_avatar.getChildByName("avatar_" + i) != null) {
                            var btn = this.sc_avatar.getChildByName("avatar_" + i);
                        }
                        this.sp_cirle_ava.setPosition(cc.p(btn.x, btn.y));
                    }
                }
            }
        },

        Click_Avatar: function (value) {
            if (this.sc_avatar.getChildByName(value) != null) {
                var btn = this.sc_avatar.getChildByName(value);
                this.sp_cirle_ava.setPosition(cc.p(btn.x, btn.y));
                this.valueAvatar = value.substr(7, value.length - 7);
                cc.log("valueAvatar : " + this.valueAvatar);
            }
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case ChangeAvatarLayer.BTN_BACK_AVATAR:
                    menutab.profileLayer._btnExit.setVisible(true);
                    menutab.profileLayer.closeChangeAvatarLayer();
                    break;
                case ChangeAvatarLayer.BTN_THAYDOI_AVATAR:
                    this.changeAvatar();
                    break;

            }
        },
        callBackError: function (response) {
        },
        changeAvatar: function () {
            if (parseInt(this.valueAvatar) == userInfo.userData.avatar) {
                gI.popUp.openPanel_Alert_Lobby("Avatar của bạn không khác trước!");
            } else {
                var url = urlUpdateAvatar(userInfo.userData.nickname, this.valueAvatar);
                //cc.log("url " + url);
                sendRequest(url, null, false, this.callBackChangeAvatar.bind(this), this.callBackError.bind(this));
            }
        },

        callBackChangeAvatar: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                gI.popUp.openPanel_Alert_Lobby("Cập nhật Avatar thành công!");
                userInfo.userData.avatar = this.valueAvatar;
                GuiUtil.changeSprite(menutab.profileLayer.hoSoLayer.sp_avatar,menutab.userManager.getlinkAvatar(userInfo.userData.avatar));

                this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                    menutab.profileLayer._btnExit.setVisible(true);
                    menutab.profileLayer.closeChangeAvatarLayer();
                })));
            } else {
                gI.popUp.openPanel_Alert_Lobby("Cập nhật thất bại!");
            }
        },


    });

ChangeAvatarLayer.BTN_BACK_AVATAR = 1;
ChangeAvatarLayer.BTN_THAYDOI_AVATAR = 2;
