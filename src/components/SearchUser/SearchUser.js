import React, { Component } from 'react';
import {
  Input,
  // Table,
  Card,
} from 'antd';
import axios from 'axios';
// import isEmpty from 'lodash/isEmpty';
// import moment from 'moment';

import { githubApiRoutes } from '../../config/apiRoutes';
import db from '../../config/firebase';


const { Search } = Input;


// const columns = [{
//   title: 'Username',
//   dataIndex: 'username',
//   key: 'username',
// }, {
//   title: 'Username',
//   dataIndex: 'login',
//   key: 'login',
// }];


class SearchUser extends Component {
  onSearchHandler = async (searchQuery) => {
    try {
      const axiosConfig = {
        method: 'GET',
      };

      const { data } = await axios(`${githubApiRoutes.SearchUsers}/${searchQuery}`, axiosConfig);
      const {
        login: username,
        name,
        url,
        public_repos: publicRepos,
        public_gists: publicGuests,
        followers,
        following,
        created_at: createdAt,
      } = data;

      try {
        await db.collection('users').add({
          username,
          name,
          url,
          publicRepos,
          publicGuests,
          followers,
          following,
          createdAt,
        });
        console.log('saved successfully!');
      } catch (e) {
        console.log('failed to save');
      }
    } catch (e) {
      console.log('error');
    }
  }

  render() {
    return (
      <div>
        <div>
          <Card style={{ width: '80vw' }}>
            <div>
              <h1>
                Explore GitHub
              </h1>
              <Search
                placeholder="Enter username..."
                onSearch={searchQuery => this.onSearchHandler(searchQuery)}
                enterButton
              />
            </div>
            {/* <div style={{ margin: '2em auto' }}>
              <Table columns={columns} dataSource={users} rowKey={record => record.id} />
            </div> */}
          </Card>
        </div>
      </div>
    );
  }
}


export default SearchUser;
