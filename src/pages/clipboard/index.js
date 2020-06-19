import React from 'react';
import {Button, Table, message} from 'antd';
import './style.less';
import Clipboard from 'clipboard';
import clipboardjs from 'clipboard-js';

class App extends React.Component {
  componentDidMount() {
    new Clipboard(document.getElementById('clipboardbtn'));
    new Clipboard(document.getElementById('clipboardallbtn'));
  }

  dataSource = (function () {
    let dataSource = [];
    for (let i = 1; i < 20; i++) {
      dataSource.push({
        key: i,
        name: `name${i}`,
        age: i + 10,
        address: `西湖区湖底公园${i}号`,
      });
    }
    return dataSource;
  })();

  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  state = {
    selected: {},
    clipboardData: null,
  };

  allClipboardData = (function (dataSource) {
    let content = '';
    dataSource.forEach((d) => {
      content += `${d.name} ${d.age} ${d.address} `;
      content += '\n';
    });
    return content;
  })(this.dataSource);

  copyRecordJS = () => {
    const {selected} = this.state;
    if (!selected.key) {
      message.error('尚未选择！');
      return;
    }
    let content = `${selected.name} ${selected.age} ${selected.address}`;
    clipboardjs.copy(content);
    message.success('复制成功');
  };

  copyRecordsJS = () => {
    let content = '';
    this.dataSource.forEach((d) => {
      content += `${d.name} ${d.age} ${d.address} `;
      content += '\n';
    });
    clipboardjs.copy(content);
  };
  handleRow = (record) => {
    return {
      onClick: (event) => {
        this.setState({selected: record, clipboardData: `${record.name} ${record.age} ${record.address}`});
      }, // 点击行
    };
  };

  setRowClassName = (record) => {
    if (record.key === this.state.selected.key) {
      return 'selected';
    } else {
      return '';
    }
  };

  render() {
    const {clipboardData} = this.state;
    return (
      <div>
        <div className='page-top-btns'>
          <Button id='clipboardbtn' data-clipboard-text={clipboardData}>
            复制一行by clipboard
          </Button>
          <Button id='clipboardallbtn' data-clipboard-text={this.allClipboardData}>
            复制整体 by clipboard
          </Button>
          <Button onClick={this.copyRecordJS}>复制一行by clipboard.js</Button>
          <Button onClick={this.copyRecordsJS}>复制整体 by clipboard.js</Button>
        </div>
        <Table
          rowClassName={this.setRowClassName}
          onRow={this.handleRow}
          dataSource={this.dataSource}
          columns={this.columns}
        />
        ;
      </div>
    );
  }
}

export default App;
