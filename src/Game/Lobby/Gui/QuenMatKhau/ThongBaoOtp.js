/**
 * Created by B150M on 3/16/2018.
 */
var ThongBaoOtpLayer = BaseLayer.extend({
    ctor: function (parent){
        this._super();
        this.pn_otp_thongbao = null;
        this.pn_forget_pass = parent;
    },

    customizeGUI: function () {
        this.addLayout(this.pn_forget_pass,"pn_otp_thongbao",cc.p(640,360),null,cc.size(1280,720),true);

        this.addLayout(this.pn_otp_thongbao,"content_bm",cc.p(640,360),null,cc.size(1280,720),true);
        this.addText(this.content_bm,"lb_txt_otp_thongbao1",cc.p(640,360),"Hệ thống đã ghi nhận thông báo của quý khách."
            +"\nHệ thống đang tiến hành kiểm tra và hỗ trợ trong vòng 24h."

            +"\n\nVui lòng kiểm tra Email và số điện thoại đã kích hoạt bảo mật!",RobotoRegular.fontName,24);
        this.lb_txt_otp_thongbao1.ignoreContentAdaptWithSize(false);
        this.lb_txt_otp_thongbao1.setContentSize(cc.size(700,150));
        this.lb_txt_otp_thongbao1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_otp_thongbao1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.content_bm,"txt_content_td_1_0",cc.p(515,102),GameManager.webViewLink.cskh,RobotoRegular.fontName,20);
        this["txt_content_td_1_0"].setColor(cc.color(243,13,241));
        this["txt_content_td_1_0"].setSkewX(15);
        this.addText(this.content_bm,"txt_content_td_fo_1_0",cc.p(459,102),"*** Mọi thắc mắc xin liên hệ tổng đài                              để được hỗ trợ trực tiếp!",RobotoRegular.fontName,20);
        this["txt_content_td_fo_1_0"].setSkewX(15);

    },



});


NhapUsernameLayer.BTN_REFRESH_CAPTCHA_FORGET = 1;
NhapUsernameLayer.BTN_SEND_INFORMATION_FORGET = 2;