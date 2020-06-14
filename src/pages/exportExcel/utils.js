import xlsx from 'better-xlsx';
import saveAs from 'file-saver';

function ExcelExport() {
  this.file = new xlsx.File();
}

ExcelExport.prototype.setFileName = function (fileName) {
  this.fileName = fileName;
  return this;
};

ExcelExport.prototype.export = function () {
  const fileName = this.fileName;
  this.file.saveAs('blob').then(function (content) {
    saveAs(content, `${fileName}.xlsx`);
  });
  return this;
};

ExcelExport.prototype.addSheet = function (sheetNameOrCallback, data, header) {
  if (typeof sheetNameOrCallback === 'function') {
    sheetNameOrCallback(this.file);
  } else {
    let sheetName = sheetNameOrCallback;
    let sheetHeader = initSheetHeader(header);

    let sheet = this.file.addSheet(sheetName);
    setSheetHeader(sheetHeader, sheet);
    insertRowData(sheet, data, sheetHeader.length > 1 ? sheetHeader[sheetHeader.length - 1] : sheetHeader[0]);
  }
  return this;
};

export default ExcelExport;

//  最多可处理2级表头
function initSheetHeader(header) {
  let headerRow1 = [];
  let headerRow2 = [];
  let hasSecondRow = false;
  header.forEach((h) => {
    let headerCell = {
      key: h.dataIndex,
      text: typeof h.title === 'string' ? h.title : '',
    };

    if (!h.children) {
      headerCell.vMerge = 1; // 2级表头，向下合并一个
      headerRow1.push(headerCell);
      headerRow2.push(headerCell); //如果有二级表头，二级表头肯定是一级表头的细分，以细分dataIndex为准
    } else {
      hasSecondRow = true;
      let hMerge = 0; // 如果是有子表头，需要向右合并格子
      h.children.forEach((child, index) => {
        headerRow1.push({...headerCell}); // 上面一行表头需要向右占位
        headerRow2.push({
          key: child.dataIndex,
          text: child.title,
        });
        hMerge = index; //
      });
      headerRow1[headerRow1.length - h.children.length].hMerge = hMerge;
    }
  });

  if (hasSecondRow) {
    return [headerRow1, headerRow2];
  } else {
    return [
      headerRow1.map((h) => {
        delete h.vMerge;
        return h;
      }),
    ];
  }
}

//  最多可处理2级表头
function setSheetHeader(sheetHeader, sheet) {
  if (sheetHeader.length === 2) {
    sheetHeader.forEach((row, rowIndex) => {
      let header = sheet.addRow();
      header.setHeightCM(0.8);
      row.forEach((item, index) => {
        let headCell = header.addCell();
        headCell.value = item.text;
        if (rowIndex === 0) {
          //    一级表头向右向下合并
          headCell.vMerge = item.vMerge || 0;
          headCell.hMerge = item.hMerge || 0;
        } else {
          let colWidth = item.text.length * 2.1;
          sheet.col(index).width = colWidth > 14 ? colWidth : 14;
        }
        headCell.style.align.h = 'center';
        headCell.style.align.v = 'center';
      });
    });
  } else {
    let header = sheet.addRow();
    header.setHeightCM(0.8);
    sheetHeader[0].forEach((item, index) => {
      let headCell = header.addCell();
      headCell.value = item.text;
      headCell.style.align.h = 'center';
      headCell.style.align.v = 'center';

      let colWidth = item.text.length * 2.1;
      sheet.col(index).width = colWidth > 14 ? colWidth : 14;
    });
  }
}

function insertRowData(sheet, data, sheetHeader) {
  // 数据需要一行一行插入
  //  生成一个和data对应的二维数组，如果当前格子被使用，则跳过;
  let cellStatus = new Array(data.length).fill(' ').map((a) => []);
  data.forEach((d, vIndex) => {
    //   数据按行 纵向合并
    let row = sheet.addRow();
    sheetHeader.forEach((item, hIndex) => {
      //  数据字段横向合并
      let cell = row.addCell();
      if (!cellStatus[vIndex][hIndex]) {
        cell.style.align.v = 'center';
        cell.style.align.h = 'center';
        cellStatus[vIndex][hIndex] = 1;
        if (d[item.key].value) {
          cell.setString(d[item.key].value || '');

          if (d[item.key].vMerge) {
          }

          for (let v = 0; v <= d[item.key].vMerge; v++) {
            if (cellStatus[vIndex + v]) {
              cellStatus[vIndex + v][hIndex] = 1;
            }
          }
          for (let h = 0; h <= d[item.key].hMerge; h++) {
            cellStatus[vIndex][hIndex + h] = 1;
          }
        } else {
          cell.setString(d[item.key] || '');
        }
      }
    });
  });
}
