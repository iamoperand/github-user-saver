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
import {
  successNotify,
  errorNotify,
} from '../../helpers/messageNotify';
import { usersCollection } from '../../config/constants';

import Headings from '../StyledComponents/Headings';
import FlexCenteredDiv from '../StyledComponents/FlexCenteredDiv';


const { Search } = Input;
const {
  CenteredH1,
} = Headings;

class SearchUser extends Component {
  state = {
    users: [],
  }

  componentDidMount = () => {
    db.collection(usersCollection).onSnapshot((snapshot) => {
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
        await db.collection(usersCollection).add({
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
        successNotify('User saved successfully!');
      } catch (e) {
        errorNotify('Problem occurred in saving the user :(');
      }
    } catch (e) {
      errorNotify('No user found!');
    }
  }

  render() {
    const { users } = this.state;
    return (
      <FlexCenteredDiv style={{ minHeight: '100vh' }}>
        <Card style={{ width: '80vw', textAlign: 'center' }}>
          <div>
            <CenteredH1>
              Explore GitHub
            </CenteredH1>
            <Search
              placeholder="Enter username..."
              onSearch={searchQuery => this.onSearchHandler(searchQuery)}
              enterButton
              style={{ width: 500, margin: '20px 0' }}
            />
          </div>
          <div style={{ margin: '2em auto' }}>
            <Table columns={userTableColumns} dataSource={users} rowKey={record => record.id} />
          </div>
        </Card>
      </FlexCenteredDiv>
    );
  }
}


export default SearchUser;
