var ColumnCardMiniPoker = BaseLayer.extend({
    /*
    * Truyền vào 3 lá bài.
    * Kiểu dữ liệu: {code: number, type: number}
    * Code: 1 - 13
    * Type: 13: ro, 26: co, 39: bich, 52: tep
    * */
    ctor: function (threeCardFirst, threeCardLast) {
        this._super();
        this._threeCardFirst = threeCardFirst;
        this._threeCardLast = threeCardLast;
        
        this.size = cc.size(78, 105 * 30);
        this.arrCard = [];
        this.createColumnCard();
        return true;
    },
    createOneCard: function (code, type) {
        var card = new ccui.Layout();
        card.width = 78;
        card.height = 105;
        var _cType = null;
        var _hType = null;
        var _digital = null;
        card.setBackGroundImage("res/MiniGame/MiniPoker/card-empty.png", ccui.Widget.LOCAL_TEXTURE);

        if (code == 1) {
            _digital = new ccui.Text('A', RobotoRegular.fontName, 20);
        } else if (code <= 10) {
            _digital = new ccui.Text(code, RobotoRegular.fontName, 20);
        } else {
            var txt = null;
            switch (code) {
                case 11:
                    txt = 'J';
                    break;
                case 12:
                    txt = 'Q';
                    break;
                case 13:
                    txt = 'K';
                    break;
            }
            _digital = new ccui.Text(txt, RobotoRegular.fontName, 20);
        }
        _digital.setPosition(15, 88);
        _digital.setColor(type > 26 ? cc.color.BLACK : cc.color.RED);

        switch (type) {
            case 13:
                _hType = new ccui.ImageView("res/MiniGame/MiniPoker/ro.png", ccui.Widget.LOCAL_TEXTURE);
                break;
            case 26:
                _hType = new ccui.ImageView("res/MiniGame/MiniPoker/co.png", ccui.Widget.LOCAL_TEXTURE);
                break;
            case 39:
                _hType = new ccui.ImageView("res/MiniGame/MiniPoker/bich.png", ccui.Widget.LOCAL_TEXTURE);
                break;
            case 52:
                _hType = new ccui.ImageView("res/MiniGame/MiniPoker/tep.png", ccui.Widget.LOCAL_TEXTURE);
                break;
        }

        _hType.setScale(.08, .08);
        _hType.setPosition(14, 68);

        if (code <= 10) {
            switch (type) {
                case 13:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/ro.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
                case 26:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/co.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
                case 39:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/bich.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
                case 52:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/tep.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
            }
            _cType.setScale(.18, .18);
            _cType.setPosition(card.width / 2, card.height / 2 - 10);
        } else {
            switch (code) {
                case 11:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/j.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
                case 12:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/q.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
                case 13:
                    _cType = new ccui.ImageView("res/MiniGame/MiniPoker/k.png", ccui.Widget.LOCAL_TEXTURE);
                    break;
            }
            _cType.setScale(.7, .73);
            _cType.setAnchorPoint(1, 0);
            _cType.setPosition(74, 5);
        }

        card.addChild(_digital);
        card.addChild(_hType);
        card.addChild(_cType);
        return card;
    },
    create30CardNotLike: function () {
        var arrCheck = new Array(65).fill(0);
        
        for (var i = 0; i < this._threeCardFirst.length; i++){
            arrCheck[this._threeCardFirst[i].code + this._threeCardFirst[i].type] = 1;
            this.arrCard.push({code: this._threeCardFirst[i].code, type: this._threeCardFirst[i].type});
        }
        
        for (var i = 0; i < 24; i++) {
            var so = Math.floor(Math.random() * 13) + 1;
            var chat = Math.floor(Math.random() * 4) + 1;
            if (arrCheck[so + (chat * 13)] === 1) i--;
            else {
                arrCheck[so + (chat * 13)] = 1;
                this.arrCard.push({code: so, type: chat * 13});
            }
        }

        for (var i = 0; i < this._threeCardLast.length; i++){
            this.arrCard.push({code: this._threeCardLast[i].code, type: this._threeCardLast[i].type});
        }
    },
    createColumnCard: function () {
        this.create30CardNotLike();
        this.removeAllChildren();
        for (var i = 0; i < this.arrCard.length; i++) {
            var temp = this.createOneCard(this.arrCard[i].code, this.arrCard[i].type);
            temp.y = 105 * i;
            this.addChild(temp);
        }
        this.y = -105 / 2;
    },
    spinColumnCard: function (time_ease) {
        this.runAction(cc.sequence([cc.moveTo(.3, this.x, 0),cc.moveTo(1.5, this.x, -this.size.height + 262.5).easing(cc.easeInOut(time_ease))]));
    }
});