/**
 * Created by B150M on 3/31/2018.
 */
var ConfigSercurity = {
    type_otp : 0,
    save_phone:"",
    save_new_phone:"",
    save_email:"",
    save_cmt:""

}
var MahoaNoiDung = function (value) {
    //cc.log("value : " + value.length);
    var str = value.substr((value.length - 3), value.length);
    var str1 = value.substr(0, (value.length - 3));
    //cc.log("str : " + str);
    //cc.log("str1 : " + str1.length);
    var mahoa = "";
    for (var i = 0; i < str1.length; i++) {
        mahoa = mahoa + "*";
    }
    var noidung = mahoa + "" + str;
    //cc.log("mahoa " + noidung);
    return noidung;
};

var MahoaEmail = function (value) {
    var n = value.search("@");
    var noidung = "";
    var mahoa = "";
    var start = value.substr(0, n);
    var end = value.substr(n, value.length);
    if (start.length <= 3) {
        for (var i = 0; i < start.length; i++) {
            mahoa = mahoa + "*";
        }
        noidung = mahoa + end;
    } else if (start.length > 3 && start.length < 7) {
        var g = start.substr(0, (start.length - 3));
        noidung = g + "***" + end;
    } else {
        var g = start.substr(0, 3);
        var h = start.substr(3, start.length);
        for (var i = 0; i < h.length; i++) {
            mahoa = mahoa + "*";
        }
        noidung = g + mahoa + end;
    }
    // cc.log("noi dung cuoi: " + noidung);
    return noidung;
};