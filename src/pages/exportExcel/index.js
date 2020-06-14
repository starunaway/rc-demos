import React, {Component} from 'react';
import {Table, Button} from 'antd';
import data, {exportData} from './data';
import columns from './columns';
import ExcelExport from './utils';
class ExportExcel extends Component {
  handleExport = () => {
    let excel = new ExcelExport();
    excel.setFileName('测试').addSheet('sheet1', exportData, columns).export();
  };
  render() {
    return (
      <div>
        <div className='page-top-btns'>
          <Button onClick={this.handleExport}>导出excel</Button>
        </div>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    );
  }
}

export default ExportExcel;
