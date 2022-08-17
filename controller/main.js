//Khoi tao doi tuong dsnv tu lop doi tuong DSNV
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  /**
   * Dom tới các thẻ input lấy value
   */
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  //isValid la true => form hop le
  var isValid = true;

  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        taiKhoan,
        "tbTKNV",
        "(*)  Vui lòng nhập Tài khoản"
      ) &&
      validation.kiemTraDoDaiKiTu(
        taiKhoan,
        "tbTKNV",
        "(*)  Vui lòng nhập kí số 4 - 6",
        4,
        6
      ) &&
      validation.checkMaNVTonTai(
        taiKhoan,
        "tbTKNV",
        "(*) taiKhoan da ton tai!",
        dsnv.arr
      );
  }
  //TenSV
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*)  Vui lòng nhập Tên ") &&
    validation.kiemTraKiTuChuoi(
      tenNV,
      "tbTen",
      "(*)  Vui lòng nhập chuỗi ki tự"
    );

  //Email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*)  Vui lòng nhập email") &&
    validation.checkEmail(
      email,
      "tbEmail",
      "(*)  Vui lòng nhập email đúng định dạng !"
    );

  //Mat khau
  isValid &=
    validation.checkPassWord(
      matKhau,
      "tbMatKhau",
      "(*)  Mật khẩu 6 - 10 (chứa ít nhất 1 ký tự số , 1 ký tự in hoa , 1 ký tự đặt biệt)"
    ) &&
    validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "(*)  Vui lòng mật khẩu 6 - 10 (chứa ít nhất 1 ký tự số , 1 ký tự in hoa , 1 ký tự đặt biệt) ",
      6,
      10
    );
  //Ngay lam
  isValid &= validation.checkDate(
    ngayLam,
    "tbNgay",
    "(*)  Kiểm tra lại Ngày làm"
  );
  //LuongCB
  isValid &= validation.checkLuongCB(
    luongCB,
    "tbLuongCB",
    "(*)  Vui lòng nhập lương cơ bản từ 1.000.000 - 20.000.000"
  );
  //Chuc Vu
  isValid &= validation.checkChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui long chon Chức vụ!"
  );

  //Gio lam
  isValid &= validation.checkGioLam(
    gioLam,
    "tbGiolam",
    "(*) Giờ làm từ 80 - 200 "
  );

  if (!isValid) return null;

  var nhanVien = new NhanVien(
    taiKhoan,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  //tinh tổng lương
  nhanVien.tinhTongLuong();
  nhanVien.xepLoai();
  return nhanVien;
}
/**
 * Add NV
 */
getEle("btnThem").onclick = function () {
  getEle("btnThemNV").style.display = "block";
  document.getElementById("tknv").disabled = false;
  getEle("btnCapNhat").style.display = "none";
  resetForm();
};
function resetForm() {
  getEle("tknv").value = "";
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("datepicker").value = "";
  getEle("luongCB").value = "";
  // getEle("chucvu").value = "Chọn chức vụ" ;
  getEle("gioLam").value = "";
}

getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNV(true);

  if (nhanVien) {
    //Thêm nv vào mảng arr
    dsnv.themNV(nhanVien);
    getEle("btnDong").click();

    //gọi hàm setLocalStorage để lưu data
    setLocalStorage();

    renderTable(dsnv.arr);
    resetForm();
  }
});

function renderTable(data) {
  var content = "";

  data.forEach(function (nv) {
    content += `
              <tr>
                  <td>${nv.taiKhoan}</td>
                  <td>${nv.tenNV}</td>
                  <td>${nv.email}</td>
                  <td>${nv.ngayLam}</td>
                  <td>${nv.chucVu}</td>
                  <td>${nv.tongLuong}</td>
                  <td>${nv.hang}</td>

                  <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal"  onclick="suaNV('${nv.taiKhoan}')">Sửa</button>
                      <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xoá</button>

                  </td>
              </tr>
          `;
  });

  getEle("tableDanhSach").innerHTML = content;
}

/**
 * Cập nhật NV
 */
getEle("btnCapNhat").addEventListener("click", function () {
  //lấy value từ các thẻ input
  var nhanVien = layThongTinNV(false);

  dsnv._capNhatNV(nhanVien);
  getEle("btnDong").click();
  renderTable(dsnv.arr);
  setLocalStorage();
});

/**
 * Sua NV
 */
function suaNV(taiKhoan) {
  var nv = dsnv._layThongTinNV(taiKhoan);
  if (nv) {
    //Dom tới các thẻ input show value
    
    getEle("tknv").disabled = true;
    getEle("btnThemNV").style.display = "none";
    getEle("btnCapNhat").style.display = "block";

    getEle("tknv").value = nv.taiKhoan;
    getEle("name").value = nv.tenNV;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;
  }
}
/**
 * Xoa NV
 */
function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
}

/**
 * Tim kiem nhan vien
 */
getEle("searchName").addEventListener("keyup", function () {
  //dom lấy value input#txtKeyword
  var keyword = getEle("searchName").value;

  var mangTimKiem = dsnv._timKiemNV(keyword);
  renderTable(mangTimKiem);
});

function setLocalStorage() {
  //Convert JSON => string
  var dataString = JSON.stringify(dsnv.arr);
  //Luu xuong localStorage
  localStorage.setItem("DanhSachNhanVien", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("DanhSachNhanVien")) {
    var dataString = localStorage.getItem("DanhSachNhanVien");
    //Convet string => JSON
    var dataJson = JSON.parse(dataString);
    //backup lại dự liệu cho dsnv.arr từ dataJson
    dsnv.arr = dataJson;
    //hiển thị dsnv ra ngoài table
    renderTable(dataJson);
  }
}
