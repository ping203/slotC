/**
 * Created by PVC on 1/19/2018.
 */
var loginBy = {
    LOGIN_FB : "fb",
    LOGIN_GG : "gg",
    LOGIN_THUONG : ""
}
var userInfo = {
    loginBy:loginBy.LOGIN_THUONG,
    accessTokenFBGG:"",
    userName:"",
    passWord:"",
    passWordLD:"",
    userData:null,
    _isLogged : false
}
userInfo.isLogged = function () {
    return _isLogged;
}

userInfo.listNickNameInclude = "Admin,Master,Vinplay,19006697,daily,rik,zdo,tip," + GameManager.webViewLink.productName;
userInfo.listCheckDB = "~,`,!,@,#,$,%,^,&,*,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ," +
    "ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ, ";

userInfo.listNickNameBegin = "Gamemaster,GM,Bot,Mod,Bocongan,HCM,hochiminh,DCS,Dangcongsan,dmcs,Nhacai,Hethong,Mas_ter,Game_master,Daily,Dai_ly,Fuck,matlon,12lieugiai,19006697";
userInfo.listCheckVN = "~,`,!,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ,ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ ";

var checkNickNameNhayCam = function (value) {
    value = value.toLowerCase();
    var strInclude = userInfo.listNickNameInclude.split(',');
    for (var i = 0; i < strInclude.length; i++) {
        if (value.search(strInclude[i].toLowerCase()) != -1) {
            return false;
        }
    }

    var strBegin = userInfo.listNickNameBegin.split(',');
    for (var j = 0; j < strBegin.length; j++) {
        var str = strBegin[j].toLowerCase();
        if (value.length >= str.length) {
            if (value.substr(0, str.length) == str) {
                return false;
            }
        }
    }
    return true;
};
var checkKyTuSpecial = function (value, nickname) {
    value = value.toLowerCase();
    for (var i = 0; i < value.length; i++) {
        var kt = value[i];
        var str = userInfo.listCheckDB.split(',');
        for (j = 0; j < str.length; j++) {
            if (kt == str[j]) {
                return false;
            }
        }
        if (kt == ",") {
            return false;
        }
        if (kt == "\\") {
            return false;
        }
        if (nickname == false) {
            if (kt == "_") {
                return false;
            }
        }
    }
    return true;
};



var checkKyTuVN = function (value) {
    value = value.toLowerCase();
    for (var i = 0; i < value.length; i++) {
        var kt = value[i];
        var str = userInfo.listCheckVN.split(',');
        for (j = 0; j < str.length; j++) {
            if (kt == str[j]) {
                return false;
            }
        }
        if (kt == ",") {
            return false;
        }
        if (kt == "\\") {
            return false;
        }
    }
    return true;
};

var checkNoiDungEmail = function (str) {
    str = str.toLowerCase();
    if (str.search("@") == -1) {
        return false;
    }
    return true;
};