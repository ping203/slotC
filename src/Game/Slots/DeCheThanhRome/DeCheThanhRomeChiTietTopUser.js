/**
 * Created by Admin on 5/4/2017.
 */
var deCheThanhRomeChiTietTopUser = null;
var deCheThanhRomeChiTietTopUserX = 0;
var deCheThanhRomeChiTietTopUserY = 0;
var deCheThanhRomeChiTietTopUserAppear = false;

var DeCheThanhRomeChiTietTopUserLayer = BaseLayerSlots.extend(
    {
        ctor: function () {
            this.resultTopUser = {
                rf : 20509,
                nn : "phamcanh",
                bv : 100,
                pz : 1087180,
                mx : "2,1,0,3,0,0,0,0,0,0,1,4,6,0,0",
                lw : "1,4,5,7,8,11,12,13,14,15,16,17,18,20",
                pl : "534340,534340,3000,500,500,3000,500,500,3000,3000,3000,500,500,500",
                ts : "14:42:01 11-05-2017",
                rs : 3
            };
            this.btnClose = null;

            this.pChiTietTopUser = null;
            this.btn_xem_lai = null;
            this.pItem = null;
            this.lb_phien = null;
            this.lv_chi_tiet = null;
            this.mapLine = [
                [ 5, 6, 7, 8, 9],//1
                [ 0, 1, 2, 3, 4],//2
                [10,11,12,13,14],//3
                [ 5, 6, 2, 8, 9],//4
                [ 5, 6,12, 8, 9],//5
                [ 0, 1, 7, 3, 4],//6
                [10,11, 7,13,14],//7
                [ 0,11, 2,13, 4],//8
                [10, 1,12, 3,14],//9
                [ 5, 1,12, 3, 9],//10
                [10, 6, 2, 8,14],//11
                [ 0, 6,12, 8, 4],//12
                [ 5,11, 7, 3, 9],//13
                [ 5, 1, 7,13, 9],//14
                [10, 6, 7, 8,14],//15
                [ 0, 6, 7, 8, 4],//16
                [ 5, 1, 2, 3, 9],//17
                [ 5,11,12,13, 9],//18
                [10,11, 7, 3, 4],//19
                [ 0, 1, 7,13,14]//20

            ];
            this._super("DeCheThanhRomeChiTietTopUserLayer");
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

            this.addLayout(this,"pChiTietTopUser",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",cc.size(1280,720),true);
            this.pChiTietTopUser.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pChiTietTopUser.setBackGroundColor(cc.color.BLACK);
            this.pChiTietTopUser.setBackGroundColorOpacity(200);


            /*this.addText(this.pChiTietTopUser,"lb_title_chi_tiet_top",cc.p(640,635),"CHI TIẾT",SeagullBold.fontName,60);
            this.lb_title_chi_tiet_top.setColor(cc.color(227,204,11));
            this.lb_title_chi_tiet_top.enableOutline(cc.color.BLACK,3);*/

            this.addText(this.pChiTietTopUser,"lb_title_chi_tiet_top",cc.p(640,610),"CHI TIẾT",UTMAlexander.fontName,50);
            this.lb_title_chi_tiet_top.setColor(cc.color(248,237,52));
            this.lb_title_chi_tiet_top.enableOutline(cc.color.GRAY,2);


            this.addSprite(this.pChiTietTopUser,"spNen",cc.p(640,326),"res/DeCheThanhRome/lsth/chi_tiet_no_hu.png");

            this.addButton("btn_close",DeCheThanhRomeChiTietTopUserLayer.BTN_CLOSE,this.pChiTietTopUser,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close_game.png","res/DeCheThanhRome/btn_close_game.png");
            //this.addButton("btn_xem_lai",DeCheThanhRomeChiTietTopUserLayer.BTN_XEM_LAI,this.pChiTietTopUser,cc.p(640,110),false,"res/DeCheThanhRome/chon_dong/btn_chon_dong.png","res/DeCheThanhRome/chon_dong/btn_chon_dong_s.png");
            //this.btn_xem_lai.setTitleText("XEM LẠI");

            this.addLayout(this.pChiTietTopUser,"pItem",cc.p(468,327),null,cc.size(566,359),true);

            this.addLayout(this.pItem,"pKhungItem",cc.p(310,179),null,cc.size(940,510),false);
            this.pKhungItem.setScale(0.6);

            this.addText(this.pChiTietTopUser,"lb_phien",cc.p(468,532),"Phiên: #" + this.resultTopUser.rf,UTMAlexander.fontName,24);
            this.lb_phien.setColor(cc.color(254,115,29));

            this.addText(this.pChiTietTopUser,"lb_txt_dat",cc.p(861,532),"Dòng đặt",UTMAlexander.fontName,24);
            this.lb_txt_dat.setColor(cc.color(254,115,29));

            this.addText(this.pChiTietTopUser,"lb_txt_thang",cc.p(1008,532),"GEM thắng" ,UTMAlexander.fontName,24);
            this.lb_txt_thang.setColor(cc.color(254,115,29));


            this.lv_chi_tiet = new ccui.ListView();
            this.lv_chi_tiet.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_chi_tiet.setTouchEnabled(true);
            this.lv_chi_tiet.setBounceEnabled(true);
            this.lv_chi_tiet.setClippingEnabled(true);
            this.lv_chi_tiet.setContentSize(cc.size(340, 350));
            this.lv_chi_tiet.setAnchorPoint(cc.p(0.5,0.5));
            this.lv_chi_tiet.setPosition(cc.p(927,323));
            this.pChiTietTopUser.addChild(this.lv_chi_tiet);

        },

        initItem:function()
        {
            var khoangCach = 188;
            var khoangCachX = 188;
            var viTriDauY = 68;
            var viTriDauX = 94;
            var arrMatrix = this.resultTopUser.mx.split(",");

            for(var j= 2; j >= 0; j--)
            {
                for(var i= 1; i< 6; i++)
                {
                    this["spItem"+ i.toString() + j.toString()] = new cc.Sprite();
                    this["spItem"+ i.toString() + j.toString()].initWithFile("res/DeCheThanhRome/item/item"+arrMatrix[(i-1) + ((2-j)*5)]+".png",cc.rect(0,0,161,161));
                    this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX + (i-1) * khoangCachX,viTriDauY + khoangCach*j));
                    this.pKhungItem.addChild(this["spItem"+ i.toString() + j.toString()]);
                }
            }
        },
        loadData:function(obj)
        {

            this.resultTopUser = obj;
            this.lb_phien.setString("Phiên: #" + this.resultTopUser.rf);
            this.initItem();
            this.runEffectItemInLine();
            this.reloadTopUser();

        },
        onButtonRelease: function(button,id) {
            //deCheThanhRome.audioDeCheThanhRome.soundEffectKhoBau(deCheThanhRome.audioDeCheThanhRome.button);
            switch (id) {
                case DeCheThanhRomeChiTietTopUserLayer.BTN_CLOSE:
                    closeDeCheThanhRomeChiTietTopUser(false);
                    break;

                case DeCheThanhRomeChiTietTopUserLayer.BTN_XEM_LAI:

                    break;

            }
        },

        runEffectItemInLine: function(indexInLine)
        {
            var arrMatrix = this.resultTopUser.mx.split(",");
            var countLine = 0;
            var arrLine = [];
            var arrItem = [];
            var arrJackPot = [];
            for(var l = 0; l < 20; l++ )
            {
                //for(var i = 0; i< 5; i++)
                //{
                    var i = 0;
                    if(arrMatrix[this.mapLine[l][i]] == 0)
                    {
                        arrLine.push(this.mapLine[l][i]);
                        var daCo = false;
                        for(var n = 0; n < arrItem.length; n++)
                        {
                            if(arrMatrix[this.mapLine[l][i]] == arrItem[n])
                            {
                                daCo = true;
                            }
                        }
                        if(daCo)
                        {
                            continue;
                        }else
                            for(var j = 0; j < 5; j++)
                            {
                                if(i == j)
                                {
                                }
                                else
                                {
                                    if(arrMatrix[this.mapLine[l][i]] == arrMatrix[this.mapLine[l][j]])
                                        arrLine.push(this.mapLine[l][j]);
                                }
                            }
                        if(arrLine.length >= 5 )
                        {
                            countLine++;
                            arrJackPot.push(l);
                            arrLine = [];

                        }
                        else
                        {
                            arrLine = [];
                        }
                    }

            }
            for(var i = 0; i< arrJackPot.length; i ++)
            {
                this.addSprite(this.pKhungItem,"spShowLine"+i,cc.p(470,255),"res/DeCheThanhRome/line/line"+(arrJackPot[i]+1)+".png");
            }
            return arrJackPot;


        },
        reloadTopUser:function()
        {
            var arrLine = this.resultTopUser.lw.split(",");
            var arrPrize = this.resultTopUser.pl.split(",");
            this.lv_chi_tiet.removeAllItems();
            var cellHeight = 36;
            var positionY = 19;
            var  fonts = UTMAlexander;
            var fontSize = 20;

            for(var i = 0; i<arrLine.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_chi_tiet.width;
                var lbLine =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLine.setAnchorPoint(0.5,0.5);
                lbLine.setPosition(cc.p(75,positionY));
                lbLine.setString(arrLine[i]);
                lbLine.setColor(cc.color(0,89,175));

                var lbPrize =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(190,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbPrize.setPosition(cc.p(245,positionY));
                lbPrize.setString(formatMoney(0,3,arrPrize[i]));
                lbPrize.setColor(colorMoneyVin);
                lbPrize.enableStroke(cc.color.BLACK,1);
                // lbPrize.enableOutline(cc.color.BLACK,1);



                cellList.addChild(lbLine);
                cellList.addChild(lbPrize);

                this.lv_chi_tiet.pushBackCustomItem(cellList);

            }
        },


    });

DeCheThanhRomeChiTietTopUserLayer.BTN_CLOSE = 1;
DeCheThanhRomeChiTietTopUserLayer.BTN_XEM_LAI = 2;

openDeCheThanhRomeChiTietTopUser = function () {
    if (deCheThanhRomeChiTietTopUser == null) {
        deCheThanhRomeChiTietTopUser = new DeCheThanhRomeChiTietTopUserLayer();
        deCheThanhRome.addChild(deCheThanhRomeChiTietTopUser);
    }else
    {
        deCheThanhRomeChiTietTopUser.setVisible(true);
    }
    deCheThanhRomeChiTietTopUserAppear = true;
};
closeDeCheThanhRomeChiTietTopUser = function () {
    if (deCheThanhRomeChiTietTopUser == null) {
        return;
    }
        deCheThanhRomeChiTietTopUser.removeFromParent();
        deCheThanhRomeChiTietTopUser = null;
        deCheThanhRomeChiTietTopUserAppear = false;
};