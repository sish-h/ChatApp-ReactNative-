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
  AsyncStorage
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.loadUsername();
  }

  async loadUsername() {
    const username = await AsyncStorage.getItem("@ChatStore:username");
    this.setState({
      name: username
    });
  }

  start = () => {
    AsyncStorage.setItem("@ChatStore:username", this.state.name);
    console.log("TODO: open chat screen");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Chat
        </Text>
        <Text style={styles.instructions}>
          Enter your name
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <Button
          onPress={this.start}
          title="Start"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
