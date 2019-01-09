var deCheLaMaTheLeX2 = null;
var deCheLaMaTheLeX2Appear = false;

var DeCheLaMaTheLeX2Layer = BaseLayerSlots.extend(
    {
        ctor: function () {

            this.pTheLeX2 = null;
            this.btn_close = null;
            this._super("DeCheLaMaTheLeX2Layer");
            this.content = {
                strSuKien:"Sự kiện",
                strX2QuyThuong:"X2 quỹ thưởng",
                strGame:"của Vương Quốc "+GameManager.config.moneyName+"",
                strTimeSuKien:"Bắt đầu từ 10h30 ngày thứ tư hàng tuần, để tri ân người chơi,\n"+
                "Vương Quốc "+GameManager.config.moneyName+" sẽ xuất hiện 10 hũ phòng 100 và 1 hũ phòng 1.000 được",
                strX2:"X2(nhân đôi) giá trị hũ",
                strLuat:"ở thời điểm nổ hũ (không tính trả thưởng payline).",
                strViDu1:"Ví dụ",
                strViDu2:"Tại thời điểm ăn hũ x2, giá trị hũ là 6.000.000 "+GameManager.config.moneyName+", trả thưởng payline là\n"+
                "100.000 "+GameManager.config.moneyName+" thì giải thưởng người chơi nhận được là \n" +
                "6.000.000 x 2 + 100.000 = 12.100.000 "+GameManager.config.moneyName+" \n" +
                "Chú ý:\n"+
            "- Phòng 100: hũ được X2 tiếp theo sẽ cách 3 hũ bình thường đối với hũ X2\n"+
            "trước đó (vd: 1,5,9...).\n"+
            "- Phòng 1.000 hũ thứ 3 sẽ được X2 tính từ thời điểm khung giờ vàng.\n"+
            "- Giờ vàng X2 thứ tư hàng tuần sẽ bắt đầu lúc 10h30 và kết thúc\n"+
            "khi trao thưởng đủ 10 hũ X2 phòng 100 và 1 hũ X2 phòng 1.000\n"
            }
            return true;
        },

        customizeGUI: function() {

            if(cc.sys.isNative)
            {
                this.positionCenter = cc.p(640,360);
                this.positionCenterBG = cc.p(640,360);
            }else
            {
                this.positionCenterBG = cc.p(640,270);
                this.positionCenter = cc.p(640,317);

            }

            this.addLayout(this,"pTheLeX2",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",cc.size(1280,720),true);
            this.pTheLeX2.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pTheLeX2.setBackGroundColor(cc.color.BLACK);
            this.pTheLeX2.setBackGroundColorOpacity(200);

            this.addText(this.pTheLeX2,"lb_title_the_le",cc.p(640,635),"X2 QUỸ THƯỞNG",SeagullBold.fontName,60);
            this.lb_title_the_le.setColor(cc.color(227,204,11));
            this.lb_title_the_le.enableOutline(cc.color.BLACK,3);

            this.addButton("btn_close",DeCheLaMaTheLeX2Layer.BTN_CLOSE,this.pTheLeX2,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close.png","res/DeCheThanhRome/btn_close.png");

            this.addText1(this.pTheLeX2,"strSuKien",cc.p(233,520),this.content.strSuKien,SeagullBold.fontName,22,cc.color.WHITE);
            this.addText1(this.pTheLeX2,"strX2QuyThuong",cc.p(370,520),this.content.strX2QuyThuong,SeagullBold.fontName,22,cc.color.YELLOW);
            this.addText1(this.pTheLeX2,"strGame",cc.p(571,520),this.content.strGame,SeagullBold.fontName,22,cc.color.WHITE);
            this.addText1(this.pTheLeX2,"strTimeSuKien",cc.p(585,472),this.content.strTimeSuKien,SeagullBold.fontName,22,cc.color.WHITE);
            this.addText1(this.pTheLeX2,"strX2",cc.p(314,427),this.content.strX2,SeagullBold.fontName,22,cc.color.YELLOW);
            this.addText1(this.pTheLeX2,"strLuat",cc.p(726,427),this.content.strLuat,SeagullBold.fontName,22,cc.color.WHITE);
            this.addText1(this.pTheLeX2,"strViDu1",cc.p(220,396),this.content.strViDu1,SeagullBold.fontName,22,cc.color.YELLOW);
            this.addText1(this.pTheLeX2,"strViDu2",cc.p(592.5,230),this.content.strViDu2,SeagullBold.fontName,22,cc.color.WHITE);

        },
        onButtonRelease: function(button,id) {
            vuongQuocVin.audioVuongQuocVin.soundEffectKhoBau(vuongQuocVin.audioVuongQuocVin.button);
            switch (id) {
                case DeCheLaMaTheLeX2Layer.BTN_CLOSE:
                    closedeCheLaMaTheLeX2();
                    break;

            }
        },
        addText1:function(parent,name,position,string,fontName,fontSize,color)
        {
            this[name] = new ccui.Text(string,  fontName, fontSize);
            this[name].setPosition(position);
            this[name].setAnchorPoint(0.5,0.5);
            this[name].setColor(color);
            //this.lb_prize.ignoreContentAdaptWithSize(false);
            parent.addChild(this[name]);
        },


    });

DeCheLaMaTheLeX2Layer.BTN_CLOSE = 1;

opendeCheLaMaTheLeX2 = function () {
    if (deCheLaMaTheLeX2 == null) {
        deCheLaMaTheLeX2 = new DeCheLaMaTheLeX2Layer();
        vuongQuocVin.addChild(deCheLaMaTheLeX2);
    }else
    {
        deCheLaMaTheLeX2.setVisible(true);
    }
    deCheLaMaTheLeX2Appear = true;
};
closedeCheLaMaTheLeX2 = function () {
    if (deCheLaMaTheLeX2 == null) {
        return;
    }
    deCheLaMaTheLeX2.removeFromParent();
    deCheLaMaTheLeX2 = null;
    deCheLaMaTheLeX2Appear = false;

};