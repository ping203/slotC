ItemHuGame = ccui.Layout.extend({
    _content:{
        gameKey:HuGameKey.vuongQuocVin,
        name:"Vương Quốc Vin",
        icon:"res/Lobby/IconGame/vuongquocvin.png",
        scale:0.28,
    },
    _spIcon:null,
    _txtName:null,
    _spIconMoney:null,
    _txtHu:null,
    _pots : {
        gameKey:1,
        potRoom100:500000,
        potRoom1000:5000000,
        potRoom10000:50000000
    },
    _currentRoom:100,
    _spaceRun:1,
    _potRun:500000,
    _potTotal:500000,
    isF:true,

    ctor:function(content)
    {
        this._content = content;
        this._super();
        this.setContentSize(cc.size(205,64));
        this.setTouchEnabled(true);
        this.updateContent();
    },
    updateContent:function () {
        this.addSprite(this, "_spIcon", cc.p(35, 32), this._content.icon);
        this._spIcon.setScale(this._content.scale);
        this.addText(this, "_txtName", cc.p(66, 45), this._content.name, RobotoRegular.fontName, 18);
        this._txtName.setAnchorPoint(0, 0.5);
        this.addSprite(this, "_spIconMoney", cc.p(79, 19), res_ResourceMenuTab + "/iconVin.png");
        this._spIconMoney.setScale(0.32);
        this.addText(this, "_txtHu", cc.p(93, 19), "500.000", RobotoRegular.fontName, 16);
        this._txtHu.setColor(GuiUtil.color("#FFFF00"));
        this._txtHu.setAnchorPoint(0, 0.5);
    },
    setMoneyHu:function (money) {
        this._txtHu.setText(formatMoney(0,3,money));
    },
    setCurrentRoom:function (room) {
        this._currentRoom = room;
        if(this._pots["potRoom"+room])
        {
            this._potRun = this._pots["potRoom"+room];
            this._potTotal = this._pots["potRoom"+room];
            this.setMoneyHu(this._pots["potRoom"+room]);
        }

    },
    setValuePot:function (pots) {
        this.isF = true;
        this._potRun = this._pots["potRoom" + this._currentRoom];
        this._pots = pots;
        this._potTotal = this._pots["potRoom" + this._currentRoom];
        this._spaceRun = parseInt((this._potTotal - this._potRun)/100);
        if(this._spaceRun < 1)
        {
            this._spaceRun = 1;
        }
    },
    getPots:function () {
        return this._pots;
    },
    getGameKey:function () {
        return this._content.gameKey;
    },

    runPot:function () {
        if(!this.isF)
            return;
        this._potRun = this._spaceRun + this._potRun;
        var strMoney = this._spaceRun + parseInt(StringUtility.replaceAll(this._txtHu.getString(),".",""));
        if(this._potRun < this._potTotal)
            this.setMoneyHu(formatMoney(0,3,this._potRun));
        else
        {
            this.setMoneyHu(formatMoney(0,3,this._potTotal));
            this._potRun = this._pots["potRoom" + this._currentRoom];
            menutab.huGameLayer.countRunPotDone();
            this.isF = false;
        }
    },



    addSprite:function(parent,name,position,image)
    {
        this[name] = GuiUtil.createSprite();
        this[name].setPosition(position);
        if(image)
        {
            GuiUtil.changeSprite(this[name],image);
        }

        parent.addChild(this[name]);
    },
    addLayout: function (parent, name, position, image, size, isTouch) {

        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setContentSize(size);
        this[name].setTouchEnabled(isTouch);
        this[name].setCascadeOpacityEnabled(true);
        if (image != null) {
            if (cc.spriteFrameCache.getSpriteFrame(image)) {
                this[name].setBackGroundImage(image, ccui.Widget.PLIST_TEXTURE);
            } else {
                this[name].setBackGroundImage(image, ccui.Widget.LOCAL_TEXTURE);
            }
        }
        this[name].setPosition(position);

        parent.addChild(this[name]);
    },

    addText:function(parent,name,position,string,fontName,fontSize)
    {
        this[name] = new ccui.Text(string,  fontName, fontSize);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5,0.5);
        if(cc.sys.isNative)
        {
            this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
        }
        parent.addChild(this[name]);
    },


})