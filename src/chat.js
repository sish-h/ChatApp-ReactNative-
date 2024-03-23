/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  FlatList
} from 'react-native';

import firebase from 'firebase';
import { values } from 'lodash';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    
    this.state = {
      data: [],
      username: params.username
    };

    this.listenFirebase();
  }

  listenFirebase = () => {
    // listen to data
    firebase.database().ref('all').on('value', (snapshot) => {
      this.setState({
        data: values(snapshot.val())
      });
    });
  }

  writeData = (msg) => {
    const key = this.state.data.length;
    firebase.database().ref('all').push({
      key,
      username: this.state.username,
      text: msg
    });
  }

  send = () => {
    this.writeData(this.state.input);
    this.setState({input: ''});
  }

  renderItem = (row) => {
    const { params } = this.props.navigation.state;
    const me = row.item.username === params.username;
    return (
      <View style={[styles.chatRow, me && styles.chatRowMe]}>
        <Text>
          <Text style={{fontWeight: 'bold'}}>{row.item.username}:</Text> {row.item.text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={this.renderItem}
        />
        <View style={{height: 80, flexDirection: 'row'}}>
          <TextInput
            style={{flex: 1, height: 60, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(input) => this.setState({input})}
            value={this.state.input}
          />
          <Button
            style={{width: 80}}
            onPress={this.send}
            title="Send"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chatRow: {
    width: 300,
    backgroundColor: '#ceceff',
    padding: 15,
    borderRadius: 15,
    marginTop: 5
  },
  chatRowMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#ceffce'
  }
});
