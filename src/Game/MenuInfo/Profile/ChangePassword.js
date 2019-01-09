/**
 * Created by B150M on 3/23/2018.
 */
var ChangePasswordLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super("");
            this.pn_profile = parent;
            return true;
        },

        customizeGUI: function () {
          this.initPnChangePassword();

        },
        initPnChangePassword: function () {
            var layout = this.addLayoutStructure(this, "pn_doi_pass", cc.p(640.00, 360.00), "", cc.size(1280.00, 720.00), true, {visible: true});

            this.addImage(layout, "bg_tab_menu", cc.p(640.00, 375.13), res_Lobby + "/bground_tab.png", cc.size(574, 326));
            this.bg_tab_menu.setScale9Enabled(false);
            this.bg_tab_menu.ignoreContentAdaptWithSize(false);
            this.bg_tab_menu.setContentSize(cc.size(574, 326));

            this.addLayout(layout,"nen",cc.p(640,355.13),null,cc.size(541,247),true);
            this.nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.nen.setBackGroundColor(GuiUtil.color("#6a3705"));
            this.nen.setBackGroundColorOpacity(0.6*255);

            this.addButtonStructure(layout, "btn_close_doi_pas", ChangePasswordLayer.BTN_CLOSE_DOIPASS, cc.p(887.39, 500.88), true, res_Lobby + "/btnClose.png");
            this.btn_close_doi_pas.setScale(0.9);
            this.addSpriteStructureWithoutResourcePath(layout, "bg_title", cc.p(640, 512.90), res_Lobby + "/titile.png");

            this.addTextStructure(layout, "txtInbox", cc.p(640.00, 515), "ĐỔI MẬT KHẨU", UTMBebas.fontName, "35", GuiUtil.color(162,105,64), {__size: cc.size(400, 45)});
            this.txtInbox.setColor(GuiUtil.color(162,105,64));

            this.addSpriteStructureWithoutResourcePath(layout, "spmaxacnhan", cc.p(425.80, 447.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });
            this.addEditBoxStructure(layout, "tf_old_pass", cc.p(641.29, 445.30), "", "Mật khẩu hiện tại", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            this["tf_old_pass"].setFontColor(cc.color.BLACK);
            this.addSpriteStructureWithoutResourcePath(layout, "sp", cc.p(425.80, 384.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });

            this.addButtonStructure(layout, "btn_change_pass", ChangePasswordLayer.BTN_CHANGE_PASS, cc.p(642.00, 264.53), true,
                [res_ResourceMenuTab_Mail+ "/xbutton.png",res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(layout, "txtInbox", cc.p(640,265.69), "ĐỒNG Ý ĐỔI MẬT KHẨU", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.txtInbox.setColor(GuiUtil.color(162,105,64));

            this.addEditBoxStructure(layout, "tf_new_pass", cc.p(641.29, 382.30), "", "Mật khẩu mới", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            // this.tf_new_pass.setColor(GuiUtil.color("#7F7F7F"));
            this["tf_new_pass"].setFontColor(cc.color.BLACK);
            this.addSpriteStructureWithoutResourcePath(layout, "sp2", cc.p(425.80, 322.27), res_ResourceMenuTab_Shopping + "/bg_2.png", {
                anchorX: 0,
                scaleX: 1.2
            });
            this.addEditBoxStructure(layout, "tf_new_pass_again", cc.p(641.29, 320.30), "", "Nhập lại mật khẩu mới", RobotoRegular.fontName, 20, cc.size(413.00, 40.00), null, cc.TEXT_ALIGNMENT_LEFT, 16).setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            // this.tf_new_pass_again.setColor(GuiUtil.color("#7F7F7F"));
            this["tf_new_pass_again"].setFontColor(cc.color.BLACK);

            this.btn_change_pass.setScale(437.00 / 365.00, 66.00 / 58.00);
        },



        onButtonRelease: function (button, id) {
            switch (id) {
                case ChangePasswordLayer.BTN_CLOSE_DOIPASS:
                    menutab.profileLayer.closeChangePasswordLayer();
                    break;
                case ChangePasswordLayer.BTN_CHANGE_PASS:
                    this.changePassword();
                    break;

            }
        },
        changePassword: function () {
            var oldpass = this.tf_old_pass.getString();
            var newpass = this.tf_new_pass.getString();
            var againpass = this.tf_new_pass_again.getString();
            //cc.log("password: " + lobby.savePassword);

            //cc.log("pass : " + lobby.savePassword);
            if (ConfigProfile.save_password != null && ConfigProfile.save_password != "") {
                if (oldpass != ConfigProfile.save_password) {
                    gI.popUp.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
                    return null;
                }
            }
            if (oldpass == "") {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
            } else if (newpass == null || newpass.length < 6 || newpass.length > 16) {
                gI.popUp.openPanel_Alert_Lobby("Password trong khoảng từ 6 - 16 ký tự!");
            } else if (newpass == "123456" || newpass == "abc123" || newpass == "ABC123" || newpass == "000000" || newpass == "111111" || newpass == "222222"
                || newpass == "333333" || newpass == "444444" || newpass == "555555" || newpass == "666666" || newpass == "777777" || newpass == "888888"
                || newpass == "999999") {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu quá đơn giản. Vui lòng nhập lại!");
            } else if (newpass == "") {
                gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập mật khẩu mới!");
            } else if (oldpass == newpass) {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu mới giống mật khẩu hiện tại của bạn!");
            } else if (againpass == "" || newpass != againpass) {
                gI.popUp.openPanel_Alert_Lobby("Nhập lại mật khẩu không chính xác!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var profileUser = new CmdSendChangePassword();
                    profileUser.putChangePassword(md5(oldpass), md5(newpass));
                    gI.mainSocket.send(profileUser);
                    profileUser.clean();

                    this.btn_change_pass.setEnabled(false);
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },
        responseChangePassword: function (error) {
            //cc.log("error1: " + error);
            this.btn_change_pass.setEnabled(true);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất thay đổi mật khẩu!", 1, 4);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            } else if (error == 2) {
                gI.popUp.open_panel_message_confirm("THÔNG BÁO", "Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", menutab.profileLayer.gotoSercurity, null);
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
            } else if (error == 4 || error == 5) {
                gI.popUp.openPanel_Alert_Lobby("Tài khoản đăng nhập bằng Facebook hoặc Google+\n không thể sử dụng chức năng này!");
            }
        },

        responseResultChangePassword: function (error) {
            cc.log("error2: " + error);
            if (error == 0) {
                gI.popUp.openPanel_Alert_Lobby("Thay đổi mật khẩu thành công!");
                this.pn_doi_pass.runAction(cc.scaleTo(0.2, 0));
                this.tf_old_pass.setString("");
                this.tf_new_pass.setString("");
                this.tf_new_pass_again.setString("");

                this.tf_old_pass.setString("");
                this.tf_old_pass.setPlaceHolder("Mật khẩu hiện tại");
                this.tf_old_pass.setColor(GuiUtil.color("#7F7F7F"));
                this.tf_old_pass.runAction(cc.scaleTo(0.225, 1));

                this.tf_new_pass.setString("");
                this.tf_new_pass.setPlaceHolder("Mật khẩu mới");
                this.tf_new_pass.setColor(GuiUtil.color("#7F7F7F"));
                this.tf_new_pass.runAction(cc.scaleTo(0.225, 1));

                this.tf_new_pass_again.setString("");
                this.tf_new_pass_again.setPlaceHolder("Nhập lại mật khẩu mới");
                this.tf_new_pass_again.setColor(GuiUtil.color("#7F7F7F"));
                this.tf_new_pass_again.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }
        },




    });

ChangePasswordLayer.BTN_CLOSE_DOIPASS = 1;
ChangePasswordLayer.BTN_CHANGE_PASS = 2;

