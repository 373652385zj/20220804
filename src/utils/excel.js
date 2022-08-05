/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 16:54:23
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-04 17:28:38
 * @FilePath: /person/20220804/src/utils/excel.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FileSaver from "file-saver";
import * as XLSX from 'xlsx/xlsx.js'
console.log('111', XLSX, FileSaver)

const  toExcel= {
    getExcel(dom,title='默认标题',){
        var excelTitle = title;
        var table = document.querySelector(dom)
        console.log(table.children)
        if (table.querySelector(".el-table__fixed-right")) {
          table.removeChild(table.querySelector(".el-table__fixed-right"));
        }
        if (table.querySelector(".el-table__fixed")) {
          table.removeChild(table.querySelector(".el-table__fixed"));
        }
        var wb = XLSX.utils.table_to_book(table);
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {bookType: "xlsx",bookSST: true,type: "array"});
        console.log(333, wbout)
        try {
            FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                excelTitle + ".xlsx"
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
    }
};

export default  toExcel;
