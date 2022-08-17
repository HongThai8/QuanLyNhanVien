function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
    if (value === "") {
      //Error
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiKiTu = function (value, errorId, mess, min, max) {
    if (value.length >= min && value.length <= max) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.kiemTraKiTuChuoi = function (value, errorId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (value.match(letter)) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.checkEmail = function (value, errorId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  this.checkPassWord = function (value, errorId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  this.checkDate = function (value, errorId, mess) {
    var letter = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/

    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  this.checkLuongCB = function (value, errorId, mess) {
    var letter =
      /^[1-9][0-9][0-9][0-9][0-9][0-9][0-9]$|^[1][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$|^[2][0][0][0][0][0][0][0]$/;

    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };
  
  this.checkChucVu = function (selectId, errorId, mess) {
    if (getEle(selectId).selectedIndex !== 0) {
      //true
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    //false
    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.checkGioLam = function (value, errorId, mess) {
    var letter =
      /^[8-9][0-9]$|^[1][0-9][0-9]$|^[2][0][0]$/;

    if (value.match(letter)) {
      getEle(errorId).style.display = "none";
      getEle(errorId).innerHTML = "";
      return true;
    }

    getEle(errorId).style.display = "block";
    getEle(errorId).innerHTML = mess;
    return false;
  };

  this.checkMaNVTonTai = function (value, errorId, mess, list) {
    var status = list.some(function (nv) {
      return value === nv.taiKhoan;
    });

    if (status) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = mess;
      return false;
    }

    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
