/**
 * Created by PVC on 7/18/2017.
 */

var itemList = {
    name: "",
    width: 0,
    color: cc.color.WHITE,
    apiName: "",
    action: false
}

var LayoutListView = ccui.Layout.extend(
    {
        _bgImg: null,
        _listView: null,
        _size: null,
        _arrInfoColom: null,
        _layer: null,
        _pTitle: null,
        _cellHeight: 40,
        _datas: null,

        ctor: function (layer, size, arrInfoColom) {
            this._super();
            this._layer = layer;
            this._size = size;
            this._arrInfoColom = arrInfoColom;
            this.scaleColumn();
            this.setContentSize(size);

            this._bgImg = new ccui.ImageView("res/Minigame/ImageChung/bg_title.png",
                cc.spriteFrameCache.getSpriteFrame("res/Minigame/ImageChung/bg_title.png") ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE);
            this._bgImg.setScale9Enabled(false);
            this._bgImg.ignoreContentAdaptWithSize(false);
            this._bgImg.setPosition(this._size.width / 2, this._size.height - 28);
            this._bgImg.setAnchorPoint(0.5, 0.5);
            this._bgImg.setContentSize(1029,46);
            this.addChild(this._bgImg);

            this._listView = new ccui.ListView();
            this.addChild(this._listView);
            this._listView.setContentSize(cc.size(this._size.width, this._size.height - 50));
            this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._listView.setTouchEnabled(false);
            this._listView.setBounceEnabled(true);
            this._listView.setClippingEnabled(true);
            this._listView.setAnchorPoint(cc.p(0.0, 0.0));
            this._listView.setPosition(cc.p(0, 0));
            this._listView.setScrollBarEnabled(0);

            this._pTitle = new ccui.Layout();
            this._pTitle.setAnchorPoint(0.5, 0.5);
            this._pTitle.setContentSize(this._size.width, 50);
            this._pTitle.setTouchEnabled(false);
            this._pTitle.setCascadeOpacityEnabled(true);
            this._pTitle.setPosition(cc.p(this._size.width / 2, this._size.height - 25));
            this._pTitle.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);

            this._pTitle.setBackGroundColor(GuiUtil.color("#17171a"));
            this._pTitle.setBackGroundColorOpacity(255);
            this.addChild(this._pTitle);
            this.initPTitle();

        },
        scaleColumn: function () {
            var totalWidth = this._size.width;
            var sumWidth = 0;
            this._arrInfoColom.forEach(function (item, index) {
                sumWidth += item.width;
            });
            var ratio = totalWidth / sumWidth;
            this._arrInfoColom.forEach(function (item, index) {
                item.width *= ratio;
            });
        },
        initPTitle: function () {
            for (var i = 0; i < this._arrInfoColom.length; i++) {
                var titleName = new ccui.Text(this._arrInfoColom[i].name, fontArial.fontName, 18);
                //titleName.setPosition(position);
                titleName.setAnchorPoint(0.5, 0.5);
                if (cc.sys.isNative) {
                    titleName.setFontName("res/Font/" + titleName.getFontName() + ".ttf");
                }
                titleName.ignoreContentAdaptWithSize(false);
                titleName.setContentSize(cc.size(this._arrInfoColom[i].width, 50));
                titleName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                titleName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                titleName.setColor(cc.color(255, 223, 88));
                titleName.setTag(i);
                var position = cc.p(0, 0);
                if (i == 0) {
                    position = cc.p(this._arrInfoColom[i].width / 2, 25);

                } else {
                    var positionW = this._pTitle.getChildByTag(i - 1).getPosition().x + this._pTitle.getChildByTag(i - 1).getContentSize().width / 2 + this._arrInfoColom[i].width / 2;
                    position = cc.p(positionW, 25);
                }
                titleName.setPosition(position);
                this._pTitle.addChild(titleName);

                if (i != this._arrInfoColom.length - 1) {
                    //var spNganCot = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");//new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    //spNganCot.setScaleY(0.80);

                    //spNganCot.setPosition(cc.p(position.x + this._arrInfoColom[i].width / 2, 25));
                    //spNganCot.setScaleY(50 / 41);
                    //this._pTitle.addChild(spNganCot);
                }
            }

        },

        createItemListView: function (data, index) {
            var marginCell = 10;
            var cell = new ccui.Layout();
            cell.height = this._cellHeight;
            cell.width = this._size.width;
            //cell.setPosition(cc.p(378,0));
            cell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            cell.setClippingEnabled(true);
            cell.setBackGroundColor(GuiUtil.color("#212126"));
            if (index % 2 == 1) {
                cell.setBackGroundColorOpacity(255);
            } else {
                cell.setBackGroundColorOpacity(150);
            }


            for (var i = 0; i < this._arrInfoColom.length; i++) {
                var text = "";
                if (this._arrInfoColom[i].apiName == 1) {
                    text = (index + 1).toString();
                } else
                    text = data[this._arrInfoColom[i].apiName];
                var titleName = new ccui.Text(text, fontArial.fontName, 17);
                //titleName.setPosition(position);
                titleName.setAnchorPoint(0.5, 0.5);
                if (cc.sys.isNative) {
                    titleName.setFontName("res/Font/" + titleName.getFontName() + ".ttf");
                }
                titleName.ignoreContentAdaptWithSize(false);
                titleName.setContentSize(cc.size(this._arrInfoColom[i].width - marginCell, 40));
                titleName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                titleName.setTextHorizontalAlignment(this._arrInfoColom[i].textAlignment);
                titleName.setColor(data._color ? data._color : this.genColor(this._arrInfoColom[i].color, index, this._layer._moneyType));
                titleName.setTag(i);
                if (this._arrInfoColom[i].fontSize)
                    titleName.setFontSize(this._arrInfoColom[i].fontSize);
                var position = cc.p(0, 0);
                if (i == 0) {
                    position = cc.p(this._arrInfoColom[i].width / 2, 20);

                } else {
                    var positionW = cell.getChildByTag(i - 1).getPosition().x + cell.getChildByTag(i - 1).getContentSize().width / 2 + this._arrInfoColom[i].width / 2 + marginCell/2;
                    position = cc.p(positionW, 20);
                }
                titleName.setPosition(position);

                var action = this._arrInfoColom[i].action;
                if (action || action === 0) {
                    titleName.setTouchEnabled(true);
                    titleName.cell = index;
                    titleName.column = i;
                    titleName._rowData = data;
                    titleName._action = action;
                    titleName.addTouchEventListener(this.onTouchEventHandler, this);
                }
                cell.addChild(titleName);

                if (i != this._arrInfoColom.length - 1) {
                    var spNganCot = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot.setPosition(cc.p(position.x + this._arrInfoColom[i].width / 2, 20));
                    cell.addChild(spNganCot);
                }

            }
            return cell;
        },
        genColor: function (color, index, moneyType) {
            if (color == LayoutListView.COLOR_NORMAL) {
                return cc.color(247,235,198);
            }
            if (color == LayoutListView.COLOR_TOP) {
                if (index == 0)
                    return cc.color(255, 223, 88);
                else
                    return cc.color(232, 218, 173);
            }
            if (color == LayoutListView.COLOR_MONEY) {
                if (moneyType == MONEY_VIN)
                    return GuiUtil.color("#FFFF00");
                else
                    return cc.color(192, 193, 195);
            }

            if (color == LayoutListView.COLOR_MONEY_LSGD) {
                if (moneyType == 1 || moneyType == 3 || moneyType == 5) {
                    return GuiUtil.color("#FFFF00");
                } else {
                    return cc.color(192, 193, 195);
                }
            }

            if(color == LayoutListView.COLOR_MONEY_VQV)
            {
                return cc.color(192,193,195);
            }


            return color;
        },
        reloadData: function () {
            this._listView.removeAllItems();
            for (var i = 0; i < this._datas.length; i++) {
                this._listView.pushBackCustomItem(this.createItemListView(this._datas[i], i));
            }
        },
        setData: function (datas) {
            this._datas = datas;
            this.reloadData();
        },

        onTouchEventHandler: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    this._layer.onClickCell(sender.cell, sender.column);
                    break;
            }
        },
        setInfoColumn: function (arrInfoColom) {
            this._arrInfoColom = arrInfoColom;
            this._pTitle.removeAllChildren(true);
            this.initPTitle();
        }

    }
);
LayoutListView.COLOR_NORMAL = 0;
LayoutListView.COLOR_TOP = 1;
LayoutListView.COLOR_MONEY = 2;
LayoutListView.COLOR_MONEY_LSGD = 3;
LayoutListView.COLOR_MONEY_VQV = 4;




