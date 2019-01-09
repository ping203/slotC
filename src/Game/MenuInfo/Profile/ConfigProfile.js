var getlinkAvatar = function (value) {
    for (var i = 0; i < 21; i++) {
        if (value == i) {
            return "res/common/avatar/Avatar_" + (i + 1) + ".png";
        }
    }
};


var ConfigProfile = {
    save_password: ""
};

var guilHuongDanVQV = function () {
    var array = [

        [
            ["  I/ THỂ LỆ", "#F1C72F"]
        ],

        [
            ["  1.Vòng quay VIP áp dụng cho khách hàng có cấp độ VIP Vàng trở lên (Vàng, Bạch Kim và Kim Cương) đã xác", "#FFFFFF"]
        ],
        [
             ["  thực thông tin hỗ trợ chăm sóc khách hàng với ", "#FFFFFF"],
                [GameManager.webViewLink.gameLink,"#FFFF00"]
        ],
        [
            ["  2. Với cấp độ VIP Vàng trở lên, vào ngày sinh của mình trong tháng, mỗi khách hàng sẽ được tặng số lượt", "#FFFFFF"],
        ],
        [
            ["  quay tương ứng với cấp độ VIP", "#FFFFFF"],
        ],
        [
            ["  - Vàng 01 lượt quay", "#FFFFFF"],
        ],
        [
            ["  - Bạch Kim 02 lượt quay", "#FFFFFF"],
        ],
        [
            ["  - Kim Cương 03 lượt quay", "#FFFFFF"],
        ],
        [
            ["  3. Thời hạn nhận lượt quay và sử dụng lượt quay của Vòng quay VIP chỉ có giá trị đến hết 24h00 ngày sinh", "#FFFFFF"],
        ],
        [
            ["  của khách hàng, quá thời hạn trên lượt quay sẽ không còn giá trị.", "#FFFFFF"],
        ],

        [
            ["  *Ghi chú", "FFFF00"],
        ],
        [
            ["  - Đối với những khách hàng có ngày sinh 29, 30, 31 mà tháng hiện tại không có thì sẽ được nhận vào ngày", "#FFFFFF"],
        ],
        [
            ["  cuối cùng của tháng đó.", "#FFFFFF"],
        ],
        [],
        [],
        [
            ["  II/ HƯỚNG DẪN", "#F1C72F"],
        ],
        [
            ["  1. Hằng tháng, vào ngày sinh của bạn đăng nhập vào ", "#FFFFFF"],
            [GameManager.webViewLink.gameLink, "#FFFF00"],
            [" để nhận lượt quay.", "#FFFFFF"]
        ],
        [
            ["  2. Chọn tab \"Vòng Quay VIP\" để nhận thưởng.", "#FFFFFF"],
        ],
        [
            ["  3. Giải thưởng từ 200.000 " + GameManager.config.moneyName + "– 250.000.000 " + GameManager.config.moneyName, "#FFFFFF"],
        ],
        [],
        [],
        [],
        [
            ["  III/ CƠ CẤU GIẢI THƯỞNG:", "#F1C72F"],
        ],
        [
            ["  Vòng quay lớn", "#F1C72F"],
        ],
        [
            ["  o Giải thưởng " + GameManager.config.moneyName + " với các mệnh giá 100.000, 200.000, 500.000, 1.000.000, 5.000.000, 10.000.000,", "#FFFFFF"],
        ],
        [
            ["  20.000.000, 50.000.000 " + GameManager.config.moneyName, "#FFFFFF"],
        ],
        [
            ["  Vòng quay nhỏ", "#F1C72F"],
        ],
        [
            ["  o Giải thưởng: X2, X3, X4, X5", "#FFFFFF"]
        ],
    ];
    return array;
}