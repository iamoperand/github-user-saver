import React from 'react';
import moment from 'moment';


const userTableColumns = [{
  title: 'Username',
  dataIndex: 'username',
  render: (text, record) => <a href={record.url}>{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Public Repos',
  dataIndex: 'publicRepos',
}, {
  title: 'Public Guests',
  dataIndex: 'publicGuests',
}, {
  title: 'Followers',
  dataIndex: 'followers',
}, {
  title: 'Following',
  dataIndex: 'following',
}, {
  title: 'Created At',
  dataIndex: 'createdAt',
  render: timestamp => moment(timestamp).format('MM/DD/YYYY'),
}];


export default userTableColumns;
