

import React, { Component } from 'react';
import { Table, Avatar, Input } from 'antd';
import 'antd/dist/antd.css';
import { postData } from './../../utils';
import api from './../../api';
import './Page1.scss';

const Search = Input.Search;


const columns = [{
  title: '姓名',
  dataIndex: 'login',
  key: 'login',
}, {
  title: 'avator',
  dataIndex: 'avatar_url',
  key: 'avatar_url',
  render: src => <Avatar src={src} />,
}, {
  title: 'url',
  dataIndex: 'url',
  key: 'url',
  render: a => <a href={a}>{'githup地址'}</a>,
}];



export default class Page1 extends Component {
  static displayName = 'Page1';

  constructor(props) {
    super(props);
    this.state = {
      info: '',
      list: '', // 页面信息
      status: 'default', // 这里定义个状态 default第一次进入页面默认展示  loading 加载中
    }
  }


  async  fetchJsonAsync(url) {
    try {
      const res = await fetch(url);
      const data = await res.text();
      return JSON.parse(data); // sync
    }
    catch (error) {
      console.log('错误', error)
    }


  }

  saveName = (v) => {
    this.setState(
      {
        status: 'loading'
      },
      () => {
        let url = 'https://api.github.com/search/users?q=' + v;
        this.fetchJsonAsync(url)
          .then((res) => {
            if (res) {
              this.setState({
                status: 'loading',
                list: res.items
              })
            }
          })

      }
    )
  }



  render() {
    const { list, status, } = this.state;
    let listDiv;
    switch (status) {
      case 'default':
        listDiv = '请输入信息'
        break;
      case 'loading':
        listDiv = list ? <Table dataSource={list} columns={columns} rowKey={record => record.url} /> : 'loading'
        break;
    }
    return ([
      <div className="header-page">
        <Search
          placeholder='cc' enterButton="Search"
          size="large"
          onSearch={value => this.saveName(value)}
        />
      </div>,
      <div className="content-page">
        {listDiv}
      </div>
    ]
    );
  }
}
