/**
 * Created by PVC on 7/19/2017.
 */

var LayoutControlTable  = ccui.Layout.extend(
    {
        _btnBackAll:null,
        _btnBack:null,
        _btnNextAll:null,
        _btnNext:null,
        _currentPage:1,
        _totalPage:1,
        _lbPage:null,
        _bgPage:null,
        _layer:null,
        ctor: function (layer,totalPage){
            this._super();
            if(totalPage)
                this._totalPage = totalPage;
            this._layer = layer;
            this.setContentSize(cc.size(1000,40));
            this.setAnchorPoint(0.5 , 0.5);
            var texType = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame("res/MenuTab/page-number.png")) {
                texType = ccui.Widget.PLIST_TEXTURE;
            }
            this._btnBackAll = new ccui.Button();
            this._btnBackAll.loadTextures("res/MenuTab/btn-next-all.png", "", "", texType);
            this._btnBackAll.setPosition(350,30);
            this.addChild(this._btnBackAll);
            this._btnBackAll.addTouchEventListener(this.onTouchEventHandler, this);
            this._btnBackAll.setTag(0);

            this._btnBack = new ccui.Button();
            this._btnBack.loadTextures("res/MenuTab/btn-next.png", "", "", texType);
            this._btnBack.setPosition(415,30);
            this.addChild(this._btnBack);
            this._btnBack.addTouchEventListener(this.onTouchEventHandler, this);
            this._btnBack.setTag(1);

            if(texType == ccui.Widget.PLIST_TEXTURE)
            {
                this._bgPage = new cc.Sprite("res/MenuTab/page-number.png");
            }else
            {
                this._bgPage = new cc.Sprite("res/MenuTab/page-number.png");
            }

            this._bgPage.setPosition(520,30);
            this.addChild(this._bgPage);

            this._lbPage = new ccui.Text(this._currentPage + "/" + this._totalPage, RobotoRegular.fontName, 20);
            this._lbPage.setColor(GuiUtil.color("#ffe094"));

            this._lbPage.setPosition(520,30);
            this._lbPage.setAnchorPoint(0.5, 0.5);
            if (cc.sys.isNative) {
                this._lbPage.setFontName("res/Font/" + this._lbPage.getFontName() + ".ttf");
            }
            this.addChild(this._lbPage);

            this._btnNext = new ccui.Button();
            this._btnNext.loadTextures("res/MenuTab/btn-next.png", "", "", texType);
            this._btnNext.setPosition(625,30);
            this.addChild(this._btnNext);
            this._btnNext.addTouchEventListener(this.onTouchEventHandler, this);
            this._btnNext.setRotationY(180);
            this._btnNext.setTag(2);

            this._btnNextAll = new ccui.Button();
            this._btnNextAll.loadTextures("res/MenuTab/btn-next-all.png", "", "", texType);
            this._btnNextAll.setPosition(690,30);
            this.addChild(this._btnNextAll);
            this._btnNextAll.addTouchEventListener(this.onTouchEventHandler, this);
            this._btnNextAll.setRotationY(180);
            this._btnNextAll.setTag(3);

        },
        setCurrentPage:function(currentPage)
        {
            this._currentPage = currentPage;
            this._lbPage.setString(this._currentPage + "/" + this._totalPage);
        },
        setTotalPage:function(totalPage)
        {
            this._totalPage = totalPage;
            this._lbPage.setString(this._currentPage + "/" + this._totalPage);
        },
        onTouchEventHandler: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                   switch (sender.getTag())
                   {
                       case 0://back all
                           if(this._currentPage != 1)
                           {
                               this._currentPage = 1;
                               this._lbPage.setString(this._currentPage + "/" + this._totalPage);
                               this._layer.onClickControl(0, this._currentPage)
                           }
                           break;
                       case 1://back
                           if(this._currentPage > 1)
                           {
                               this._currentPage --;
                               this._lbPage.setString(this._currentPage + "/" + this._totalPage);
                               this._layer.onClickControl(1, this._currentPage)
                           }
                           break;
                       case 2://next
                           if(this._currentPage < this._totalPage)
                           {
                               this._currentPage ++;
                               this._lbPage.setString(this._currentPage + "/" + this._totalPage);
                               this._layer.onClickControl(2, this._currentPage)
                           }
                           break;
                       case 3://next all
                           if(this._currentPage != this._totalPage)
                           {
                               this._currentPage = this._totalPage;
                               this._lbPage.setString(this._currentPage + "/" + this._totalPage);
                               this._layer.onClickControl(3, this._currentPage)
                           }
                           break;
                   }


                    break;

            }
        }

    }
)