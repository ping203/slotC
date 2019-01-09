
/**
 * Created by B150M on 3/23/2018.
 */
var InformationLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this.sercurity = parent;
            this.ischangeEmail = false;
            this.ischangePhone = false;
            this.isClickActiveMail = false;
            return true;
        },

        customizeGUI: function () {

            this.createPnTTBM();
        },
        createPnTTBM: function () {
            this.addLayout(this, "pn_thong_tin_bao_mat", cc.p(640, 311.5), null, cc.size(1035, 469), true);
            this.addText(this.pn_thong_tin_bao_mat, "txt1", cc.p(240, 425.75), "THÔNG TIN BẢO MẬT", RobotoRegular.fontName, 30);
            this.txt1.setColor(GuiUtil.color("#FFDF58"));
            this.addText(this.pn_thong_tin_bao_mat, "lb1", cc.p(150, 397.5), "Tên tài khoản", RobotoRegular.fontName, 18);
            this.addText(this.pn_thong_tin_bao_mat, "lb2", cc.p(330, 397.5), "Tên nhân vật", RobotoRegular.fontName, 18);
            this.addSprite(this.pn_thong_tin_bao_mat, "bg3", cc.p(150, 358), res_ResourceMenuTab_Mail + "/maxacnhan.png");
            this.bg3.setScaleX(0.8);
            this.addText(this.pn_thong_tin_bao_mat, "lb_account_bm", cc.p(150, 357.5), "", RobotoRegular.fontName, 18);
            this.lb_account_bm.setColor(GuiUtil.color("#F100FF"));
            this.lb_account_bm.ignoreContentAdaptWithSize(false);
            this.lb_account_bm.setContentSize(cc.size(166, 21));
            this.lb_account_bm.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_account_bm.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addSprite(this.pn_thong_tin_bao_mat, "bg3_0", cc.p(330, 358), res_ResourceMenuTab_Mail + "/maxacnhan.png");
            this.bg3_0.setScaleX(0.8);
            this.addText(this.pn_thong_tin_bao_mat, "lb_nickname_bm", cc.p(330, 357.5), "", RobotoRegular.fontName, 18);
            this.lb_nickname_bm.setColor(GuiUtil.color("#F100FF"));
            this.lb_nickname_bm.ignoreContentAdaptWithSize(false);
            this.lb_nickname_bm.setContentSize(cc.size(163, 21));
            this.lb_nickname_bm.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_nickname_bm.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addSprite(this.pn_thong_tin_bao_mat, "bg2", cc.p(240, 295.5), res_ResourceMenuTab_Shopping + "/bg_2.png");

            this.addText(this.pn_thong_tin_bao_mat, "lb_save_cmt", cc.p(236, 295), "", RobotoRegular.fontName, 22);
            this.lb_save_cmt.setColor(GuiUtil.color("#666666"));
            this.lb_save_cmt.ignoreContentAdaptWithSize(false);
            this.lb_save_cmt.setContentSize(cc.size(330, 40));
            this.lb_save_cmt.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_save_cmt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.lb_save_cmt.setVisible(false);
            this.addEditBox(this.pn_thong_tin_bao_mat, "tf_cmtnd", cc.p(236, 295), "", "CMTND", RobotoRegular.fontName, 22, cc.size(330, 40), null, cc.TEXT_ALIGNMENT_LEFT, 12);
            this.tf_cmtnd.setName("tf_cmtnd");
            this.tf_cmtnd.setFontColor(cc.color("#666666"));
            this.tf_cmtnd.setFontSize(22);
            this.tf_cmtnd.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
            this.addButton(this.pn_thong_tin_bao_mat, "btn_clear_cmt", InformationLayer.BTN_CLEAR_CMT, cc.p(438, 295), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.addSprite(this.pn_thong_tin_bao_mat, "bg2_0", cc.p(240, 226.5), res_ResourceMenuTab_Shopping + "/bg_2.png");

            this.addText(this.pn_thong_tin_bao_mat, "lb_save_email", cc.p(236, 225), "", RobotoRegular.fontName, 22);
            this.lb_save_email.setColor(GuiUtil.color("#666666"));
            this.lb_save_email.ignoreContentAdaptWithSize(false);
            this.lb_save_email.setContentSize(cc.size(330, 40));
            this.lb_save_email.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_save_email.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addEditBox(this.pn_thong_tin_bao_mat, "tf_email", cc.p(235, 225), "", "Email", RobotoRegular.fontName, 22, cc.size(330, 40), null, cc.TEXT_ALIGNMENT_LEFT, 200);
            this.tf_email.setName("tf_email");
            this.tf_email.setFontColor(cc.color("#666666"));
            this.tf_email.setFontSize(22);
            this.addButton(this.pn_thong_tin_bao_mat, "btn_clear_email", InformationLayer.BTN_CLEAR_EMAIL, cc.p(438, 225), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");
            this.addSprite(this.pn_thong_tin_bao_mat, "bg2_0", cc.p(240, 160.5), res_ResourceMenuTab_Shopping + "/bg_2.png");
            this.addText(this.pn_thong_tin_bao_mat, "lb_save_phone", cc.p(236, 157), "", RobotoRegular.fontName, 22);
            this.lb_save_phone.setColor(GuiUtil.color("#666666"));
            this.lb_save_phone.ignoreContentAdaptWithSize(false);
            this.lb_save_phone.setContentSize(cc.size(330, 40));
            this.lb_save_phone.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_save_phone.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addEditBox(this.pn_thong_tin_bao_mat, "tf_phone_bm", cc.p(236, 157), "", "Số điện thoại", RobotoRegular.fontName, 22, cc.size(330, 40), null, cc.TEXT_ALIGNMENT_LEFT, 15);
            this.tf_phone_bm.setName("tf_phone_bm");
            this.tf_phone_bm.setFontColor(cc.color("#666666"));
            this.tf_phone_bm.setFontSize(22);
            this.tf_phone_bm.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

            this.addButton(this.pn_thong_tin_bao_mat, "btn_clear_phone", InformationLayer.BTN_CLEAR_PHONE, cc.p(438, 157), true, res_ResourceMenuTab_BaoMat + "/closetf.png", res_ResourceMenuTab_BaoMat + "/closetf.png");

            this.addButtonStructure(this.pn_thong_tin_bao_mat, "btn_cap_nhat_bm", InformationLayer.BTN_CAPNHAT_TTBM, cc.p(240, 92), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail+ "/xbutton.png"]).setScale(1, 1);
            this.addTextStructure(this.btn_cap_nhat_bm, "lb_22", cc.p(this.btn_cap_nhat_bm.width/2, this.btn_cap_nhat_bm.height/2), "CẬP NHẬT", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_22.setColor(GuiUtil.color(162,105,64));
            this.addLayout(this.pn_thong_tin_bao_mat, "pn_noidung", cc.p(518, 1), null, cc.size(0, 0), true);
            this.addText(this.pn_noidung, "lb_notice_0", cc.p(237, 358.5), "Cập nhật chính xác thông tin bảo mật để đảm bảo \n" +
                "các quyền lợi", fontRobotoBold.fontName, 22);
            this.addText(this.pn_noidung, "lb_notice", cc.p(242.5, 275.5), "_Xác thực tài khoản \n" +
                "_Hỗ trợ giải quyết khiếu nại nhanh chóng \n" +
                "_Kích hoạt sử dụng các tính năng bảo mật (Bảo mật đăng \n" +
                "nhập, đóng băng "+GameManager.config.moneyName+", bảo mật thiết bị ...)", RobotoRegular.fontName, 18);
            this.addText(this.pn_noidung, "lb_notice_0_0", cc.p(181.5, 189), "Các bước thực hiện cập nhật thông tin", fontRobotoBold.fontName, 22);
            this.addText(this.pn_noidung, "lb_notice_1", cc.p(259, 124), "_Cập nhật thông tin (số CMND, số điện thoại, Email) \n" +
                "_Nhắn tin lấy mã bảo mật (số điện thoại) \n" +
                "_Nhập mã bảo mật để xác thực hoặc làm các thủ tục bảo mật \n" +
                "bằng Email gửi đến", RobotoRegular.fontName, 18);
            this.pn_noidung.setVisible(false);
            this.addLayout(this.pn_thong_tin_bao_mat, "pn_noidung_xacthuc", cc.p(518, 1), null, cc.size(0, 0), true);
            this.pn_noidung_xacthuc.setVisible(false);
            this.addButton(this.pn_noidung_xacthuc, "btn_kichhoat_email", InformationLayer.BTN_KICHHOAT_EMAIL, cc.p(154, 225.5), true, res_ResourceMenuTab_Profile + "/bg_hoso.png", res_ResourceMenuTab_Profile + "/bg_hoso.png");
            this.btn_kichhoat_email.setTitleText("Kích hoạt bảo mật bằng email");
            this.btn_kichhoat_email.setTitleFontSize(20);
            this.btn_kichhoat_email.ignoreContentAdaptWithSize(false);
            this.btn_kichhoat_email.setContentSize(cc.size(350, 51));

            this.addButtonStructure(this.pn_noidung_xacthuc, "btn_thaydoi_email", InformationLayer.BTN_THAYDOI_EMAIL, cc.p(420.00, 225.5), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.7, 1);

            this.addTextStructure(this.btn_thaydoi_email, "lb_doi_email", cc.p(this.btn_thaydoi_email.width/2, this.btn_thaydoi_email.height/2), "Thay đổi", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_doi_email.setColor(GuiUtil.color(162,105,64));

            this.addButton(this.pn_noidung_xacthuc, "btn_kichhoat_phone", InformationLayer.BTN_KICHHOAT_PHONE, cc.p(154, 159.5), true, res_ResourceMenuTab_Profile + "/bg_hoso.png", res_ResourceMenuTab_Profile + "/bg_hoso.png");
            this.btn_kichhoat_phone.setTitleText("Kích hoạt bảo mật bằng điện thoại");
            this.btn_kichhoat_phone.ignoreContentAdaptWithSize(false);
            this.btn_kichhoat_phone.setTitleFontSize(20);
            this.btn_kichhoat_phone.setContentSize(cc.size(350, 51));

            this.addButtonStructure(this.pn_noidung_xacthuc, "btn_thaydoi_phone", InformationLayer.BTN_THAYDOI_PHONE, cc.p(420, 156.5), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.7, 1);
            this.addTextStructure(this.btn_thaydoi_phone, "lb_doi_phone", cc.p(this.btn_thaydoi_phone.width/2, this.btn_thaydoi_phone.height/2), "Thay đổi", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_doi_phone.setColor(GuiUtil.color(162,105,64));

            this.pn_noidung_xacthuc.setVisible(false);
            this.addLayout(this.pn_thong_tin_bao_mat, "pn_nhap_ma_xac_thuc", cc.p(518, 1), null, cc.size(0, 0), true);
            this.pn_nhap_ma_xac_thuc.setVisible(false);
            this.addText(this.pn_nhap_ma_xac_thuc, "lb_notice_0", cc.p(239, 359), "Mã xác thực", RobotoRegular.fontName, 30);
            this.addSprite(this.pn_nhap_ma_xac_thuc, "sp", cc.p(239, 278), res_ResourceMenuTab_Profile + "/bg_hoso.png");
            this.addEditBox(this.pn_nhap_ma_xac_thuc, "tf_nhap_ma_xac_thuc", cc.p(239, 278), "", " _ _ _ _ _", fontRobotoBold.fontName, 26, cc.size(269, 51), null, cc.VERTICAL_TEXT_ALIGNMENT_CENTER, 5);

            if(lobby.is_otp == 1){
                this.addButtonStructure(this.pn_nhap_ma_xac_thuc, "btn_get_otp", InformationLayer.BTN_GET_OTHER_OTP, cc.p(439, 278), true,
                    [res_ResourceMenuTab_Mail + "/xbutton.png", res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.5, 1);
                this.addTextStructure(this.pn_nhap_ma_xac_thuc, "lb_otp", cc.p(439, 278), "GỬI LẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
                this.lb_otp.setColor(GuiUtil.color(162,105,64));
            }

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(720, 100));
            uiRichGold.setPosition(310, 150);

            if(lobby.is_otp == 1){
                var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255,"Vui lòng nhập mã xác thực hệ thống đã gửi vào số điện thoại!", RobotoRegular.fontName, 20);
                uiRichGold.pushBackElement(lbgold1);
            }else {
                var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255," Vui lòng soạn tin", RobotoRegular.fontName, 20);
                var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255,GameManager.webViewLink.OTPMessage, RobotoRegular.fontName, 20);
                var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255," gửi", RobotoRegular.fontName, 20);
                var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," "+ lobby.sms_otp, RobotoRegular.fontName, 20);
                var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để nhận mã xác thực", RobotoRegular.fontName, 20);

                uiRichGold.pushBackElement(lbgold1);
                uiRichGold.pushBackElement(lbgold2);
                uiRichGold.pushBackElement(lbgold3);
                uiRichGold.pushBackElement(lbgold4);
                uiRichGold.pushBackElement(lbgold5);
            }
            this.pn_nhap_ma_xac_thuc.addChild(uiRichGold);

            this.addButtonStructure(this.pn_nhap_ma_xac_thuc, "btn_quaylai_ttbm", InformationLayer.BTN_QUAYLAI_TTBM, cc.p(136, 90), true,
                [res_ResourceMenuTab_Mail+ "/xbutton.png",res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.7, 1);
            this.addTextStructure(this.btn_quaylai_ttbm, "lb_ql", cc.p(this.btn_quaylai_ttbm.width/2, this.btn_quaylai_ttbm.height/2), "QUAY LẠI", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_ql.setColor(GuiUtil.color(162,105,64));

            this.addButtonStructure(this.pn_nhap_ma_xac_thuc, "btn_hoantat_ttbm", InformationLayer.BTN_HOANTAT_TTBM, cc.p(341, 90), true,
                [res_ResourceMenuTab_Mail + "/xbutton.png",res_ResourceMenuTab_Mail + "/xbutton.png"]).setScale(0.7, 1);
            this.addTextStructure(this.btn_hoantat_ttbm, "lb_ht", cc.p(this.btn_hoantat_ttbm.width/2, this.btn_hoantat_ttbm.height/2), "HOÀN TẤT", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_ht.setColor(GuiUtil.color(162,105,64));

            this.pn_nhap_ma_xac_thuc.setVisible(false);

            this.addLayout(this.pn_thong_tin_bao_mat, "pn_thongbao_ttbm", cc.p(518, 1), null, cc.size(0, 0), true);
            this.pn_thongbao_ttbm.setVisible(false);
            this.addText(this.pn_thongbao_ttbm, "lb_thongbao_ttbm", cc.p(249, 261.5), "Chúng tôi đã gửi link kích hoạt bảo mật đến email bạn \n" +
                "đăng ký. Bạn vui lòng truy cập email để kích hoạt", RobotoRegular.fontName, 19);
            this.addButton(this.pn_thongbao_ttbm, "btn_quaylai_notice", InformationLayer.BTN_QUAYLAI_NOTICE_TTBM, cc.p(249, 90), true, res_ResourceMenuTab_Mail + "/button.png", res_ResourceMenuTab_Mail + "/button_s.png");
            this.btn_quaylai_notice.ignoreContentAdaptWithSize(false);
            this.btn_quaylai_notice.setTitleFontSize(30);
            this.btn_quaylai_notice.setScaleX(0.55);
            this.addText(this.pn_thongbao_ttbm, "lb_thongbao_ttbm_0", cc.p(247, 93.5), "QUAY LẠI", RobotoRegular.fontName, 30);
            this.lb_save_email.setVisible(false);
            this.lb_save_phone.setVisible(false);
            this.btn_clear_cmt.setVisible(false);
            this.btn_clear_email.setVisible(false);
            this.btn_clear_phone.setVisible(false);
            this.pn_thong_tin_bao_mat.setVisible(true);
            this.ShowInformation();
        },

        ShowInformation: function () {

            this.lb_account_bm.setString(userInfo.userData.username);
            this.lb_nickname_bm.setString(userInfo.userData.nickname);
            this.btn_kichhoat_email.setEnabled(true);
            this.btn_kichhoat_phone.setEnabled(true);

            if (userInfo.userData.mobile == null || userInfo.userData.mobile == "") {
                this.btn_cap_nhat_bm.setVisible(true);
                this.pn_noidung.setVisible(true);
                this.pn_noidung_xacthuc.setVisible(false);
                this.pn_nhap_ma_xac_thuc.setVisible(false);
                this.pn_thongbao_ttbm.setVisible(false);
                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_cmtnd.setVisible(true);
                this.tf_email.setVisible(true);
                this.tf_phone_bm.setVisible(true);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(false);
                this.lb_save_email.setVisible(false);
                this.lb_save_phone.setVisible(false);

            } else {
                this.btn_cap_nhat_bm.setVisible(false);
                this.pn_noidung.setVisible(false);
                this.pn_noidung_xacthuc.setVisible(true);
                this.pn_nhap_ma_xac_thuc.setVisible(false);
                this.pn_thongbao_ttbm.setVisible(false);

                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_cmtnd.setVisible(false);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(true);
                this.lb_save_cmt.setString(MahoaNoiDung(userInfo.userData.identification));
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(MahoaEmail(userInfo.userData.email));
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(MahoaNoiDung(userInfo.userData.mobile));

                ConfigSercurity.save_cmt = userInfo.userData.identification;
                ConfigSercurity.save_email = userInfo.userData.email;
                ConfigSercurity.save_phone = userInfo.userData.mobile;
            }

            if (userInfo.userData.mobileSecure == 0) {
                this.btn_kichhoat_phone.setTitleText("Kích hoạt bảo mật bằng điện thoại");
                this.btn_thaydoi_phone.setVisible(true);
            } else {
                this.btn_kichhoat_phone.setEnabled(false);
                this.btn_kichhoat_phone.setTitleText("Đã kích hoạt bảo mật bằng điện thoại");
                this.btn_thaydoi_phone.setVisible(false);
            }

            if (userInfo.userData.emailSecurity == 0) {
                this.btn_kichhoat_email.setTitleText("Kích hoạt bảo mật bằng email");
                if (this.isClickActiveMail == false)
                    this.btn_thaydoi_email.setVisible(true);
                else
                    this.btn_kichhoat_email.setTitleText("Đang kích hoạt bảo mật!");
            } else {
                this.btn_kichhoat_email.setEnabled(false);
                this.btn_kichhoat_email.setTitleText("Đã kích hoạt bảo mật bằng email");
                this.btn_thaydoi_email.setVisible(false);
            }
        },


        resetThongTin_Baomat: function () {
            this.pn_noidung.setVisible(true);
            this.pn_noidung_xacthuc.setVisible(false);
            this.pn_nhap_ma_xac_thuc.setVisible(false);
            this.pn_thongbao_ttbm.setVisible(false);
            this.btn_cap_nhat_bm.setVisible(true);
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case InformationLayer.BTN_CAPNHAT_TTBM:
                    this.funUpdateUserInfo();
                    break;
                case InformationLayer.BTN_CLEAR_CMT:
                    cc.log("CMT");
                    this.tf_cmtnd.setString("");
                    this.tf_cmtnd.setPlaceHolder("CMTND");
                    this.btn_clear_cmt.setVisible(false);
                    this.tf_cmtnd.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_cmtnd.runAction(cc.scaleTo(0.225, 1));
                    break;
                case InformationLayer.BTN_CLEAR_EMAIL:
                    cc.log("MAIL");
                    this.tf_email.setString("");
                    this.tf_email.setPlaceHolder("Email");
                    this.btn_clear_email.setVisible(false);
                    this.tf_email.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_email.runAction(cc.scaleTo(0.225, 1));
                    break;
                case InformationLayer.BTN_CLEAR_PHONE:
                    cc.log("PHONE");
                    this.tf_phone_bm.setString("");
                    this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                    this.btn_clear_phone.setVisible(false);
                    this.tf_phone_bm.setColor(GuiUtil.color("#FFFFFF"));
                    this.tf_phone_bm.runAction(cc.scaleTo(0.225, 1));
                    break;
                case InformationLayer.BTN_KICHHOAT_EMAIL:
                    if (gI.mainSocket.listener.isLogged) {
                        menutab.sercurityLayer.createLoadingSercurity();
                        var sercurity = new CmdSendActiveEmail();
                        sercurity.putActiveEmail();
                        gI.mainSocket.send(sercurity);
                        sercurity.clean();
                        this.btn_kichhoat_email.setEnabled(false);
                    } else {
                        menutab.sercurityLayer.hideLoadingSercurity();
                        gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                        gI.mainSocket.connectSocket();
                    }
                    break;
                case InformationLayer.BTN_THAYDOI_EMAIL:
                    this.resetThongTin_Baomat();
                    this.tf_email.setVisible(true);
                    this.lb_save_email.setVisible(false);
                    this.tf_email.setColor(GuiUtil.color("#FFFFFF"));
                    this.ischangeEmail = true;
                    break;
                case InformationLayer.BTN_KICHHOAT_PHONE:
                    this.funAutoSendActivePhone();
                    break;
                case InformationLayer.BTN_THAYDOI_PHONE:
                    this.resetThongTin_Baomat();
                    this.tf_phone_bm.setVisible(true);
                    this.lb_save_phone.setVisible(false);
                    this.ischangePhone = true;
                    this.tf_phone_bm.setColor(GuiUtil.color("#FFFFFF"));
                    break;
                case InformationLayer.BTN_QUAYLAI_TTBM:
                    this.pn_nhap_ma_xac_thuc.setVisible(false);
                    this.pn_noidung_xacthuc.setVisible(true);
                    this.ischangePhone = false;
                    this.btn_kichhoat_phone.setEnabled(true);
                    this.tf_nhap_ma_xac_thuc.setString("");
                    this.tf_nhap_ma_xac_thuc.setPlaceHolder(" _ _ _ _ _");
                    break;
                case InformationLayer.BTN_HOANTAT_TTBM:
                    this.funSendOTP(false);
                    break;

                case InformationLayer.BTN_QUAYLAI_NOTICE_TTBM:
                    this.resetThongTin_Baomat();
                    this.lb_thongbao_ttbm.setString("");
                    this.ischangeEmail = false;
                    this.pn_thongbao_ttbm.setVisible(false);
                    this.pn_noidung.setVisible(false);
                    this.pn_noidung_xacthuc.setVisible(true);
                    this.btn_cap_nhat_bm.setVisible(false);
                    break;
                case InformationLayer.BTN_GET_OTHER_OTP:
                    menutab.GetOtherOtp(1);
                    break;
            }
        },

        funUpdateUserInfo: function () {
            if (this.ischangeEmail == false && this.ischangePhone == false) {
                var cmt = this.tf_cmtnd.getString();
                var email = this.tf_email.getString();
                var phone = this.tf_phone_bm.getString();

                if (cmt == "" || email == "" || phone == "") {
                    gI.popUp.openPanel_Alert_Lobby("Thông tin nhập chưa đầy đủ!");
                } else if (phone.length < 10 || phone.length > 15 || parseInt(phone.substr(0, 1)) != 0) {
                    gI.popUp.openPanel_Alert_Lobby("Số điện thoại phải bắt đầu bằng 0 và độ dài từ 10 - 15 số!");
                } else if (cmt.length != 9 && cmt.length != 12) {
                    gI.popUp.openPanel_Alert_Lobby("Số CMTND phải có độ dài bằng 9 hoặc 12 số!");
                } else if (!checkNoiDungEmail(email)) {
                    gI.popUp.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
                } else {
                    if (gI.mainSocket.listener.isLogged) {
                        var sercurity = new CmdSendUpdateUserInfo();
                        sercurity.putUpdateUserInfo(cmt, email, phone);
                        gI.mainSocket.send(sercurity);
                        sercurity.clean();
                        this.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                        gI.mainSocket.connectSocket();
                    }
                }
            } else if (this.ischangeEmail == true) {
                var email = this.tf_email.getString();
                if (email == "") {
                    gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập thông tin Email!");
                } else if (email == ConfigSercurity.save_email) {
                    gI.popUp.openPanel_Alert_Lobby("Thông tin Email không thay đổi!");
                } else {
                    if (gI.mainSocket.listener.isLogged) {
                        //cc.log("send update email");
                        var sercurity = new CmdSendUpdateEmail();
                        sercurity.putUpdateEmail(email);
                        gI.mainSocket.send(sercurity);
                        sercurity.clean();
                        this.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                        gI.mainSocket.connectSocket();
                    }
                }
            } else if (this.ischangePhone == true) {
                var phone = this.tf_phone_bm.getString();
                if (phone == "") {
                    gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập thông tin số điện thoại!");
                } else if (phone == ConfigSercurity.save_phone) {
                    gI.popUp.openPanel_Alert_Lobby("Thông tin Số điện thoại không thay đổi!");
                } else {
                    if (gI.mainSocket.listener.isLogged) {
                        var sercurity = new CmdSendUpdatePhone();
                        sercurity.putUpdatePhone(phone);
                        gI.mainSocket.send(sercurity);
                        sercurity.clean();
                        this.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
                        gI.mainSocket.connectSocket();
                    }
                }
            }
        },
        responseUpdateUserInfo: function (error) {
            //cc.log("save_phone : " + this.save_phone);
            this.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                ConfigSercurity.save_cmt = this.tf_cmtnd.getString();
                ConfigSercurity.save_email = this.tf_email.getString();
                ConfigSercurity.save_phone = this.tf_phone_bm.getString();

                this.btn_cap_nhat_bm.setVisible(false);
                this.pn_noidung.setVisible(false);
                this.pn_noidung_xacthuc.setVisible(true);
                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_cmtnd.setVisible(false);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(true);
                this.lb_save_cmt.setString(MahoaNoiDung(ConfigSercurity.save_cmt));
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(MahoaEmail(ConfigSercurity.save_email));
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(MahoaNoiDung(ConfigSercurity.save_phone));

                userInfo.userData.identification = ConfigSercurity.save_cmt;
                userInfo.userData.email = ConfigSercurity.save_email;
                userInfo.userData.mobile = ConfigSercurity.save_phone;

                this.funAutoSendActivePhone();
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Số CMTND phải có độ dài bằng 9 hoặc 12 số!");
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
            } else if (error == 4) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 5) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            } else if (error == 6) {
                gI.popUp.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            }
        },

        responseActiveEmail: function (error) {
            menutab.sercurityLayer.hideLoadingSercurity();
            if (error == 0) {
                this.pn_noidung_xacthuc.setVisible(false);
                this.pn_thongbao_ttbm.setVisible(true);
                this.lb_thongbao_ttbm.setString("Chúng tôi đã gửi link kích hoạt bảo mật đến email bạn\nđăng ký. Bạn vui lòng truy cập email để kích hoạt.");
                this.btn_kichhoat_email.setEnabled(false);
                this.btn_kichhoat_email.setTitleText("Đang kích hoạt bảo mật!");
                this.btn_thaydoi_email.setVisible(false);
                this.isClickActiveMail = true;
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Email đăng ký không tồn tại!");
            }
        },

        responseUpdateEmail: function (error) {
            //cc.log("error update email : " + error);
            this.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                ConfigSercurity.save_email = this.tf_email.getString();
                this.ischangeEmail = false;
                this.btn_cap_nhat_bm.setVisible(false);
                this.pn_noidung.setVisible(false);
                this.pn_noidung_xacthuc.setVisible(true);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(MahoaEmail(ConfigSercurity.save_email));

                userInfo.userData.email = ConfigSercurity.save_email;
                //this.btn_kichhoat_email.setEnabled(true);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Email không hợp lệ!");
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            }
        },
        responseUpdatePhone: function (error) {
            this.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                this.ischangePhone = false;
                ConfigSercurity.save_phone = this.tf_phone_bm.getString();
                this.btn_cap_nhat_bm.setVisible(false);
                this.pn_noidung.setVisible(false);
                this.pn_noidung_xacthuc.setVisible(true);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(MahoaNoiDung(ConfigSercurity.save_phone));

                userInfo.userData.mobile = ConfigSercurity.save_phone;
                cc.log("save_phone2 : " + userInfo.userData.mobile);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 3) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            }
        },

        funAutoSendActivePhone: function () {
            if (gI.mainSocket.listener.isLogged) {
                var sercurity = new CmdSendActivePhone();
                sercurity.putActivePhone();
                gI.mainSocket.send(sercurity);
                sercurity.clean();
                this.btn_kichhoat_phone.setEnabled(false);
            } else {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                gI.mainSocket.connectSocket();
            }
        },

        responseActivePhone: function (error) {
            //cc.log("error : " + error);
            if (error == 0) {
                this.pn_noidung_xacthuc.setVisible(false);
                this.pn_nhap_ma_xac_thuc.setVisible(true);
                this.btn_kichhoat_phone.setEnabled(false);
                if(lobby.is_otp == 1)
                    menutab.GetOtherOtp(1);
            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                this.btn_kichhoat_phone.setEnabled(true);
            } else if (error == 2) {
                gI.popUp.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
                this.btn_kichhoat_phone.setEnabled(true);
            }
        },

        responseResultActivePhone: function (error) {
            //cc.log("error : " + error);
            if (error == 0) {
                gI.popUp.openPanel_Alert_Lobby("Kích hoạt bảo mật thành công!\nHệ thống tạm khóa game bài, để mở vui lòng vào Quản Lý Game.");
                userInfo.userData.mobileSecure = 1;
                if (this.sercurity._pTab != null) {
                    this.sercurity._pTab.removeFromParent(true);
                }
                if (this.sercurity.informationLayer != null) {
                    this.sercurity.informationLayer.removeFromParent(true);
                }
                this.sercurity.funGetInformation();

            } else if (error == 1) {
                gI.popUp.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }

            this.tf_nhap_ma_xac_thuc.setString("");
            this.tf_nhap_ma_xac_thuc.setPlaceHolder(" _ _ _ _ _");
        },
        funSendOTP: function (value) {
            if (value == false)
                var otp = this.tf_nhap_ma_xac_thuc.getString();
            else
                var otp = this.tf_otp_sms.getString();

            if (otp == "" || otp.length != 5) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else if (!checkKyTuSpecial(otp, false)) {
                gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            } else {
                if (gI.mainSocket.listener.isLogged) {
                    var sendOtp = new CmdSendOTP();
                    sendOtp.putSendOTP(otp, 0);
                    gI.mainSocket.send(sendOtp);
                    sendOtp.clean();
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },

        editBoxEditingDidBegin: function (editBox) {
            var str = editBox.getString();
            if (editBox.getName() == "tf_cmtnd") {
                if (str != "")
                    this.btn_clear_cmt.setVisible(true);
                else
                    this.btn_clear_cmt.setVisible(false);
            } else if (editBox.getName() == "tf_email") {
                if (str != "")
                    this.btn_clear_email.setVisible(true);
                else
                    this.btn_clear_email.setVisible(false);
            } else if (editBox.getName() == "tf_phone_bm") {
                if (str != "")
                    this.btn_clear_phone.setVisible(true);
                else
                    this.btn_clear_phone.setVisible(false);
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if (editBox.getName() == "tf_cmtnd" || editBox.getName() == "tf_phone_bm") {
                if (str != "") {
                    str = replaceAll(".", "", str);
                }
                if (!isNumeric(str)) {
                    str = str.substr(0, str.length - 1);
                }
                if (!isNumeric(str)) {
                    str = "";
                }

                editBox.setString(str);
            }
            if (editBox.getName() == "tf_cmtnd") {
                if (str != "")
                    this.btn_clear_cmt.setVisible(true);
                else
                    this.btn_clear_cmt.setVisible(false);
            } else if (editBox.getName() == "tf_email") {
                if (str != "")
                    this.btn_clear_email.setVisible(true);
                else
                    this.btn_clear_email.setVisible(false);
            } else if (editBox.getName() == "tf_phone_bm") {
                if (str != "")
                    this.btn_clear_phone.setVisible(true);
                else
                    this.btn_clear_phone.setVisible(false);
            }
        },

        editBoxTextChanged: function (editBox, text) {

        },

        editBoxReturn: function (editBox) {
            return;
        },




    });


InformationLayer.BTN_CAPNHAT_TTBM = 1;
InformationLayer.BTN_CLEAR_CMT = 2;
InformationLayer.BTN_CLEAR_EMAIL = 3;
InformationLayer.BTN_CLEAR_PHONE = 4;
InformationLayer.BTN_KICHHOAT_EMAIL = 5;
InformationLayer.BTN_THAYDOI_EMAIL = 6;
InformationLayer.BTN_KICHHOAT_PHONE = 7;
InformationLayer.BTN_THAYDOI_PHONE = 8;
InformationLayer.BTN_QUAYLAI_TTBM = 9;
InformationLayer.BTN_HOANTAT_TTBM =10;
InformationLayer.BTN_QUAYLAI_NOTICE_TTBM =11;
InformationLayer.BTN_GET_OTHER_OTP =12;



