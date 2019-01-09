/**
 * Created by B150M on 3/23/2018.
 */
var HoSoLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.pn_profile = parent;
            return true;
        },

        customizeGUI: function () {

                this.initPnHoSo();
                this.showprofileUser();

        },
        initPnHoSo: function () {
            var layout = this.addLayoutStructure(this, "pn_hoso", cc.p(0, 0), "", cc.size(0.00, 0.00), true);

            this.addImage(layout, "Image_1", cc.p(121.00, 552.84), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(320, 250));
            this.addImage(layout, "Image_2", cc.p(121.00, 297.32), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(320, 233));
            this.Image_1.setAnchorPoint(0, 1);
            this.Image_2.setAnchorPoint(0, 1);

            this.addImage(layout, "Image_3", cc.p(804.94, 307.58), res_ResourceMenuTab_Profile + "/nen_hoso.png", cc.size(714, 488.53));

            this.initPnAvatar();
            this.initPnMoney();
            this.initPnTable();

            this.addSpriteStructure(layout, "sp_clan", cc.p(1043.03, 530.73),res_ResourceMenuTab_Profile+ "/btn_clan.png");
            this.addSpriteStructure(layout, "sp_gioi_thieu", cc.p(805.95, 530.73),res_ResourceMenuTab_Profile+ "/btn_gioithieu.png");
            this.addSpriteStructure(layout, "sp_thanh_tich", cc.p(566.95, 530.73), res_ResourceMenuTab_Profile+"/btn_thanhtich.png");

            this.addButtonStructure(layout, "btn_thanh_tich", "-1", cc.p(566.95, 530.73), false, [res_ResourceMenuTab_Profile + "/btn_t.png", res_ResourceMenuTab_Profile + "/btn_thanhtich.png"]);
            this.addButtonStructure(layout, "btn_gioi_thieu", "-1", cc.p(805.95, 530.73), false, [res_ResourceMenuTab_Profile + "/btn_t.png", res_ResourceMenuTab_Profile + "/btn_gioithieu.png"]);
            this.addButtonStructure(layout, "btn_clan", "-1", cc.p(1043.03, 530.73), false, [res_ResourceMenuTab_Profile + "/btn_t.png", res_ResourceMenuTab_Profile + "/btn_clan.png"]);
        },

        initPnAvatar: function () {
            var layout = this.addLayoutStructure(this.pn_hoso, "pn_avatar", cc.p(121.00, 554.34), "", cc.size(320.00, 250.00), false, {
                anchorX: 0,
                anchorY: 1
            });

            this.addSpriteStructureWithoutResourcePath(layout, "sp_avatar", cc.p(160.00, 169.91), "res/common/avatar/Avatar_1.png");
            this.addTextStructure(layout, "lb_nickname", cc.p(160.00, 80.21), "          mintkute          ", RobotoRegular.fontName, "20", "#FFFFFF", {__size: cc.size(200, 23)});
            this.addSpriteStructure(layout, "sp_avatar_0", cc.p(160.00, 50.91),res_ResourceMenuTab_Profile+ "/bg_lv.png");
            this.addProgressBar(layout, "process_lv", cc.p(160.00, 51.70), cc.size(273.00, 19.00),res_ResourceMenuTab_Profile + '/process_full.png', 10).setScale(0.989, 1);
            this.process_lv.setPercentage(80);
            this.addTextStructure(layout, "lb_lv_phan_tram", cc.p(34.52, 51.44), "69%", fontRobotoBold.fontName, "16", "#FFFFFF", {
                __size: cc.size(52.00, 19.00),
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "lb_cap_vp", cc.p(8.51, 21.19), "Kim cương", RobotoRegular.fontName, "20", "#FFFA00", {
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "lb_vip_point", cc.p(310.51, 21.19), "VP: 100.000/100.000", RobotoRegular.fontName, "20", "#FFFA00", {
                anchorX: 1
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addButtonStructure(layout, "btn_camera", HoSoLayer.BTN_PROFILE_CAMERA, cc.p(61.78, 119.99), true, res_ResourceMenuTab_Profile + "/btn_camera.png");
        },

        initPnMoney: function () {

            var layout = this.addLayoutStructure(this.pn_hoso, "pn_money", cc.p(121.00, 297.32), "", cc.size(320.00, 233.00), false, {
                anchorX: 0,
                anchorY: 1
            });

            this.addSpriteStructureWithoutResourcePath(layout, "sp_vin", cc.p(28, 199.20), res_ResourceMenuTab + "/xeng.png");
            this.addSpriteStructureWithoutResourcePath(layout, "sp_xu", cc.p(28, 151.20), res_ResourceMenuTab + "/xu.png");
            this.addTextStructure(layout, "lb_money_vin", cc.p(50.20, 199.20), "", RobotoRegular.fontName, "22", "#FFFF00", {
                __size: cc.size(180.00, 30),
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.addTextStructure(layout, "lb_money_xu", cc.p(50.20, 151.20), "", RobotoRegular.fontName, "22", "#feeaca", {
                __size: cc.size(180.00, 30),
                anchorX: 0
            }).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);


            this.addButtonStructure(layout, "btn_doi_pass", HoSoLayer.BTN_PROFILE_DOIPASS, cc.p(162.00, 33.34), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(1, 1);

            this.addTextStructure(layout, "lb_Ip_0", cc.p(159.67, 33.34), "ĐỔI MẬT KHẨU", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_Ip_0.setColor(GuiUtil.color(162,105,64))

            this.addButtonStructure(layout, "btn_nap_vin", HoSoLayer.BTN_PROFILE_NAPVIN, cc.p(273.89, 199.20), true, [res_ResourceMenuTab + "/btnNap.png", res_ResourceMenuTab + "/btnNap.png"]);
            this.addButtonStructure(layout, "btn_nap_xu", HoSoLayer.BTN_PROFILE_NAPXU, cc.p(273.89, 151.20), true, [res_ResourceMenuTab+ "/btnNap.png", res_ResourceMenuTab + "/btnNap.png"]);
            if (cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false)
                    this.btn_nap_vin.setVisible(false);
                this.btn_nap_xu.setVisible(false);
            }
            this.addSpriteStructure(layout, "sp_xu_0", cc.p(160.00, 93.72),res_ResourceMenuTab_Profile+ "/bg_hoso.png");
            this.addTextStructure(layout, "lb_ngay_tham_gia", cc.p(160.00, 113.25), "Ngày tham gia: 04/04/2016", RobotoRegular.fontName, "17", "#F7EBC6", {__size: cc.size(270.00, 20.00)});
            this.addTextStructure(layout, "lb_chung_thuc", cc.p(160.00, 93.42), "Chứng thực: Chưa chứng thực", RobotoRegular.fontName, "17", "#F7EBC6", {__size: cc.size(270.00, 20.00)});
            this.addTextStructure(layout, "lb_Ip", cc.p(160.00, 72.48), "IP: 1.55.98.186", RobotoRegular.fontName, "17", "#F7EBC6", {__size: cc.size(270.00, 20.00)});
        },

        initPnTable: function () {
            var layout = this.addLayoutStructure(this.pn_hoso, "pn_table", cc.p(447.94, 554.34), "", cc.size(714.00, 490.00), false, {
                anchorX: 0,
                anchorY: 1
            });
            this.addSpriteStructure(layout, "sp_table", cc.p(0.00, 0.00), res_ResourceMenuTab_Profile+"/bg_hoso_table.png").setAnchorPoint(0, 0);
        },

        showprofileUser: function () {
            var _self = this;
            GuiUtil.changeSprite(this.sp_avatar,menutab.userManager.getlinkAvatar(userInfo.userData.avatar));
            this.lb_nickname.setString(userInfo.userData.nickname);
            this.genVipPoint(userInfo.userData.vippointSave);
            this.lb_money_vin.setString(formatMoney(0, 3, userInfo.userData.vinTotal));
            this.lb_money_xu.setString(formatMoney(0, 3, userInfo.userData.xuTotal));
            this.lb_ngay_tham_gia.setString("Ngày tham gia: " + userInfo.userData.createTime);
            if (userInfo.userData.birthday == "") {
                this.lb_chung_thuc.setString("Ngày sinh nhật: Chưa cập nhật");
            } else {
                this.lb_chung_thuc.setString("Ngày sinh nhật: " + userInfo.userData.birthday);
            }
            this.lb_Ip.setString("IP: " + userInfo.userData.ipAddress);
        },

        genVipPoint:function (value) {
            for (var i = 0; i < vipPointDefine.length; i++)
            {
                if(value > vipPointDefine[i].minVp && value <= vipPointDefine[i].maxVp)
                {
                    this.lb_cap_vp.setString(vipPointDefine[i].name);
                    this.lb_vip_point.setString("VP : " + formatMoney(0, 3, parseInt(userInfo.userData.vippointSave)) + "/" + vipPointDefine[i].maxVp);
                    this.process_lv.setPercentage(parseInt((userInfo.userData.vippointSave * 100) / vipPointDefine[i].maxVp));
                    this.lb_lv_phan_tram.setString(parseInt((userInfo.userData.vippointSave * 100) / vipPointDefine[i].maxVp)+"%")

                }
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case  HoSoLayer.BTN_PROFILE_CAMERA:
                    menutab.profileLayer.openChangeAvatarLayer();
                    menutab.profileLayer.changeAvatarLayer.addListAvatar();
                    menutab.profileLayer._btnExit.setVisible(false);
                    break;
                case HoSoLayer.BTN_PROFILE_DOIPASS:
                    menutab.profileLayer.openChangePasswordLayer();
                    break;
                case HoSoLayer.BTN_PROFILE_NAPVIN:
                    menutab.profileLayer.closeProfileLayer();
                    ConfigShopping.check_tab_shopping = 0;
                    menutab.openShoppingLayer();
                    break;
                case HoSoLayer.BTN_PROFILE_NAPXU:
                    menutab.profileLayer.closeProfileLayer();
                    ConfigShopping.check_tab_shopping = 1;
                    menutab.openShoppingLayer();

                    break;
            }
        },





    });
HoSoLayer.BTN_PROFILE_CAMERA = 1;
HoSoLayer.BTN_PROFILE_DOIPASS = 2;

HoSoLayer.BTN_PROFILE_NAPVIN = 3;
HoSoLayer.BTN_PROFILE_NAPXU =4;

