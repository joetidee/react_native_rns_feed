import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNSList from './app/rnsList.js';


export default class AwesomeProject extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <RNSList />
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
