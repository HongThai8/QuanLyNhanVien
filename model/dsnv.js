function DanhSachNhanVien(){
    this.arr = [];

    this.themNV = function(nv){
        this.arr.push(nv);
    };
    this._timViTriNV = function (taiKhoan){
        var index = -1 ;

        this.arr.forEach(function(nv, i){
            if(nv.taiKhoan === taiKhoan){
                index = i;
            }
        });
        return index;
    };

    this._xoaNV = function(taiKhoan){
        var index = this._timViTriNV(taiKhoan);

        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this._layThongTinNV = function(taiKhoan){
        var nv = null;
        var index = this._timViTriNV(taiKhoan);

        if(index !== -1){
            nv = this.arr[index];
        }
        return nv;
    };

    this._capNhatNV = function(nv){
        var index = this._timViTriNV(nv.taiKhoan);

        if(index !== -1){
            this.arr[index]= nv;
        }
    };
    this._timKiemNV = function(keyword){
        var mangTimKiem = [];

        this.arr.forEach(function(nv){
            var nameLowerCase = nv.hang.toLowerCase();
            var keywordLowerCase = keyword.toLowerCase();
            if (nameLowerCase.indexOf(keywordLowerCase) !== -1){
                mangTimKiem.push(nv);
            }
        });
        return mangTimKiem;
    }
}