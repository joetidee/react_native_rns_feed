import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    ListView,
    View
} from 'react-native';
import Api from './api/rnsFeed.js';
var parseString = require("react-native-xml2js").parseString;


export default class RNSList extends Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
        isLoading: false,
        stockCode: 'UKOG',
        ds: ['Apple','Bramble'],
        dataSource: ds
    };
  }

  componentDidMount(){
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
      });
  }

  getRows(){
    let items = ['Apricot','Banana'];
    return items;
  }

  rnsFeed(){
      var self = this;
      Api.fetchRss(this.state.stockCode).then((res) => {
        if(res.status == 200){

            let newDs = self.state.dataSource.cloneWithRows(['plum','fig']);
            self.setState({
                dataSource: newDs
            });

            parseString(res._bodyText, function(err, result){
                let channel = result.channel;
                let items = channel.filter((block, i) => {
                    return block.item.title;
                });
                self.setState({
                    dataSource: self.state.dataSource.cloneWithRows(items)
                });
            });
        }
        else{
          Alert.alert("Failed to get data feed: " + res.responseStatus);
        }
      }).catch((err) => {
          Alert.alert("Could not update the list: " + err);
      });
  }

  doRenderRow(rowData){
    return (
        <View>
          <Text>
              { rowData }
          </Text>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({stockCode: text})} value={this.state.stockCode} />
            <TouchableHighlight style={styles.button} onPress={this.rnsFeed.bind(this)} >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
          <ListView dataSource={this.state.dataSource} renderRow={this.doRenderRow.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        backgroundColor: '#f5fcff',
    },
    input: {
        height: 40,
        padding: 5,
        margin: 10,
        backgroundColor: '#eaeaea',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    },
    button : {
        height: 45,
        flexDirection: 'row',
        backgroundColor: '#183E63',
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

module.exports = RNSList;