import React, { Component } from 'react';
import {
  Input,
  Table,
  Card,
} from 'antd';
import axios from 'axios';

import { githubApiRoutes } from '../../config/apiRoutes';
import db from '../../config/firebase';
import userTableColumns from '../../helpers/userTableColumns';


const { Search } = Input;

class SearchUser extends Component {
  state = {
    users: [],
  }

  componentDidMount = () => {
    db.collection('users').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.setState(prevState => ({
            users: [...prevState.users, change.doc.data()],
          }));
        }
      });
    });
  }

  onSearchHandler = async (searchQuery) => {
    try {
      const axiosConfig = {
        method: 'GET',
      };

      const { data } = await axios(`${githubApiRoutes.SearchUsers}/${searchQuery}`, axiosConfig);
      const {
        id,
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
          id,
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
    const { users } = this.state;
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
            <div style={{ margin: '2em auto' }}>
              <Table columns={userTableColumns} dataSource={users} rowKey={record => record.id} />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}


export default SearchUser;
