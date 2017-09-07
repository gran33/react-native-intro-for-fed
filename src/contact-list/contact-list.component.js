import contacts from '../services/contacts';
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {Avatar, List30} from 'wix-react-native-ui-lib';
import {AvatarHelper} from 'react-native-ui-lib';

export default class ContactList extends PureComponent {

  constructor() {
    super();
    this.state = {contacts: []};
    this._renderItem = this._renderItem.bind(this);
    this._pushContactScreen = this._pushContactScreen.bind(this);
  }

  componentWillMount() {
    contacts.getUsers()
      .then(contacts => {
        this.setState({contacts});
      });
  }

  _pushContactScreen(userId) {
    const {navigator} = this.props;
    navigator.push({
      screen: 'com.wix.ContactPosts',
      passProps: {userId}
    });
  }

  _renderItem({item, index}) {
    const user = item;
    const initials = AvatarHelper.getInitials(user.name);
    const onPress = () => this._pushContactScreen(user.id);
    const props = {
      title: user.name,
      subtitle: user.city,
      onPress,
      avatar: <Avatar
        label={initials}
        isOnline={index % 3 === 0}
      />,
    };

    return <List30.Item {...props}/>;
  }

  render() {
    return (
      <FlatList
        data={this.state.contacts}
        keyExtractor={(user) => user.id}
        renderItem={this._renderItem}
      />
    );
  }
}