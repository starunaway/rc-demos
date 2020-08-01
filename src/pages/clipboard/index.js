import React, {useState, useEffect} from 'react';
import {Button, Table, message} from 'antd';
import './style.less';
import Clipboard from 'clipboard';
import clipboardjs from 'clipboard-js';

export default () => {
  const dataSource = (function () {
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

  const columns = [
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

  const [selected, setSelected] = useState({});
  const [clipboardData, setClipboardData] = useState(null);

  useEffect(() => {
    new Clipboard(document.getElementById('clipboardbtn'));
    new Clipboard(document.getElementById('clipboardallbtn'));
  }, [0]);

  const allClipboardData = (function (dataSource) {
    let content = '';
    dataSource.forEach((d) => {
      content += `${d.name} ${d.age} ${d.address} `;
      content += '\n';
    });
    return content;
  })(dataSource);

  const copyRecordJS = () => {
    if (!selected.key) {
      message.error('尚未选择！');
      return;
    }
    let content = `${selected.name} ${selected.age} ${selected.address}`;
    clipboardjs.copy(content);
    message.success('复制成功');
  };

  const copyRecordsJS = () => {
    let content = '';
    dataSource.forEach((d) => {
      content += `${d.name} ${d.age} ${d.address} `;
      content += '\n';
    });
    clipboardjs.copy(content);
  };

  const handleRow = (record) => {
    return {
      onClick: (event) => {
        setSelected((x) => record);
        setClipboardData((x) => `${record.name} ${record.age} ${record.address}`);
        // this.setState({selected: record, clipboardData: `${record.name} ${record.age} ${record.address}`});
      }, // 点击行
    };
  };

  const setRowClassName = (record) => {
    if (record.key === selected.key) {
      return 'selected';
    } else {
      return '';
    }
  };

  return (
    <div>
      <div className='page-top-btns'>
        <Button id='clipboardbtn' data-clipboard-text={clipboardData}>
          复制一行by clipboard
        </Button>
        <Button id='clipboardallbtn' data-clipboard-text={allClipboardData}>
          复制整体 by clipboard
        </Button>
        <Button onClick={copyRecordJS}>复制一行by clipboard.js</Button>
        <Button onClick={copyRecordsJS}>复制整体 by clipboard.js</Button>
      </div>
      <Table rowClassName={setRowClassName} onRow={handleRow} dataSource={dataSource} columns={columns} />;
    </div>
  );
};
