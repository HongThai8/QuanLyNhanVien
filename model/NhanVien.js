function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.tongLuong = 0;

  this.xepLoai = function () {
    
    if (_gioLam >= 192) {
      return (this.hang = "Nhân viên xuất sắc");
    } else if (_gioLam >= 176) {
      return (this.hang = "Nhân viên giỏi");
    } else if (_gioLam >= 160) {
      return (this.hang = "Nhân viên khá");
    } else {
      return (this.hang = "Nhân viên trung bình ");
    }
  };
  this.tinhTongLuong = function () {
    
    if (this.chucVu === "Sếp") {
      this.tongLuong = this.luongCB * 3;
    } else if (this.chucVu === "Trưởng phòng") {
        this.tongLuong = this.luongCB * 2;
    } else {
      this.tongLuong = this.luongCB;
    }
    // return tongLuong;
  };
}
