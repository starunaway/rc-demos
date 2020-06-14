import React, {Component} from 'react';
import {Table, Button} from 'antd';
import data from './data';

class ExportExcel extends Component {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, row, index) => {
        if (index < 4) {
          return <a>{text}</a>;
        }
        return {
          children: <a>{text}</a>,
          props: {
            colSpan: 5,
          },
        };
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'Home phone',
      colSpan: 2,
      dataIndex: 'tel',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 2) {
          obj.props.rowSpan = 2;
        }
        // // These two are merged into above cell
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'Phone',
      colSpan: 0,
      dataIndex: 'phone',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index === 4) {
          obj.props.colSpan = 0;
        }
        return obj;
      },
    },
  ];

  render() {
    return (
      <div>
        <div className='page-top-btns'>
          <Button>导出excel</Button>
        </div>
        <Table columns={this.columns} dataSource={data} bordered />
      </div>
    );
  }
}

export default ExportExcel;
