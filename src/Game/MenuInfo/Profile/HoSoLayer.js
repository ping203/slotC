var HoSoLayer = BaseLayer.extend({
    ctor: function (parent) {
        this._super();
        this.pn_hoso = null;
        this.btnChangeAvatar = null;
        return true;
    },
    customizeGUI: function () {
        var texType = ccui.Widget.LOCAL_TEXTURE;
        if (false) //
            texType = ccui.Widget.PLIST_TEXTURE;
        this.addLayoutStructure(this, "pn_hoso", cc.p(0, 0), "", cc.size(0.00, 0.00), true);
        this.addImage(this.pn_hoso, 'avatar', cc.p(257, 380), "res/MenuTab/resProfile/avatar-img.png", cc.size(180, 178));
        this.addImage(this.pn_hoso, 'box-avatar', cc.p(257, 380), "res/MenuTab/resProfile/avatar-border.png", cc.size(196, 194));
        this.addButton(this.pn_hoso, 'btn-camera', HoSoLayer.BTN_CAMERA, cc.p(324, 311), false, "res/MenuTab/resProfile/camera.png", "", texType);
        this.addButton(this.pn_hoso, 'btnChangeAvatar', HoSoLayer.BTN_CHANGE_AVATAR, cc.p(258, 200), true, "res/MenuTab/bg-btn-sliver.png", "", texType);
        this.btnChangeAvatar.setTitleText("ĐỔI AVATAR");
        this.btnChangeAvatar.setTitleFontSize(22);
        this.btnChangeAvatar.setTitleFontName(RobotoRegular.fontName);
        this.btnChangeAvatar.setTitleColor(GuiUtil.color("#000000"));

        this.createContent();
    },
    createContent: function () {
        var texType = ccui.Widget.LOCAL_TEXTURE;

        this.addImage(this.pn_hoso, 'content', cc.p(842, 296), "res/MenuTab/resProfile/bg-content.png", cc.size(729, 357));

        var arrInfoColumn = [
            ["Ngày tham gia", "26/03/2018"],
            ["Đăng nhập lần gần nhất", "26/03/2018"],
            ["Chứng thực", "chưa chứng thực"],
            ["IP", "123.125.227.223"]
        ];
        arrInfoColumn.reverse();

        for (var i = 0; i < 4; i++) {
            var cell = new ccui.Layout();
            cell.setContentSize(this['content'].width, 70);
            cell.y = 70 * i;
            cell.setBackGroundImage("res/MenuTab/resProfile/cell-light.png", ccui.Widget.LOCAL_TEXTURE);

            var lbColumn1 = new ccui.Text(arrInfoColumn[i][0], RobotoRegular.fontName, 20);
            lbColumn1._setAnchorX(0);
            lbColumn1.x = 30;
            lbColumn1.y = cell.height / 2;

            var lbColumn2 = new ccui.Text(arrInfoColumn[i][1], RobotoRegular.fontName, 20);
            lbColumn2._setAnchorX(0);
            lbColumn2.x = 280;
            lbColumn2.y = cell.height / 2;


            if (i === 1) {
                lbColumn2.setColor(GuiUtil.color("#cc2224"));
                var minus = new ccui.ImageView("res/MenuTab/resProfile/minus.png", ccui.Widget.LOCAL_TEXTURE);
                minus._setAnchorX(0);
                minus.y = cell.height / 2;
                minus.x = 450;
                cell.addChild(minus);
            }

            cell.addChild(lbColumn1);
            cell.addChild(lbColumn2);


            this['content'].addChild(cell);
        }

        var cellTitle = new ccui.Layout();
        cellTitle.setContentSize(this['content'].width, 70);
        cellTitle.y = 280;

        var lbUsername = new ccui.Text("buzzdesignvn", RobotoRegular.fontName, 26);
        lbUsername._setAnchorX(0);
        lbUsername.x = 30;
        lbUsername.y = 35;

        var lbMoney = new ccui.Text("9,888,999,666", RobotoRegular.fontName, 34);
        lbMoney._setAnchorX(1);
        lbMoney.setColor(GuiUtil.color("#ffd000"));
        lbMoney.x = cellTitle.width - 100;
        lbMoney.y = 35;

        var iconMoney = new ccui.ImageView("res/MenuTab/coin-money.png", ccui.Widget.LOCAL_TEXTURE);
        iconMoney._setAnchorX(1);
        iconMoney.x = cellTitle.width - 30;
        iconMoney.y = 35;

        cellTitle.addChild(lbUsername);
        cellTitle.addChild(lbMoney);
        cellTitle.addChild(iconMoney);

        this["content"].addChild(cellTitle);

    },

    onButtonRelease: function (btn, id) {
        switch (id) {
            case HoSoLayer.BTN_CAMERA:
                break;
            case HoSoLayer.BTN_CHANGE_AVATAR:
                break;
        }
    }
});

HoSoLayer.BTN_CAMERA = 0;
HoSoLayer.BTN_CHANGE_AVATAR = 1;