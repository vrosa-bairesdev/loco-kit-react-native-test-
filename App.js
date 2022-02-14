import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, NativeEventEmitter, ScrollView } from 'react-native';
import LocoKitModule from 'react-native-loco-kit';

export default class App extends Component {
  state = {
    status: 'starting',
    locationStatus: '...',
    activity: '...',
    item: '...',
  };
  componentDidMount() {
    if (LocoKitModule){
      const bus = new NativeEventEmitter(LocoKitModule)
      bus.addListener('LocationStatusEvent', (data) => this.setState({ locationStatus: data }))
      bus.addListener('TimeLineStatusEvent', (data) => {this.setState({ item: data }); console.log(data); })
      bus.addListener('ActivityTypeEvent', (data) => this.setState({ activity: data }))
      LocoKitModule.isAvailable((available) => {
        console.log(available)
        if (available) {
          LocoKitModule.setup("<API Key Goes Here>", (result) => {
            this.setState({ status: result })
            LocoKitModule.start()
          });
        } else {
          this.setState({ status: "LocoKit not available" })
        }
      })
    }
  }
  render(){
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={styles.container}>STATUS: {this.state.status}</Text>
      <Text style={styles.container}>Location Status: {this.state.locationStatus}</Text>
      <Text style={styles.container}>Activity: {this.state.activity}</Text>
      <ScrollView>
        <Text style={styles.container}>TimelineItem: {this.state.item}</Text>
      </ScrollView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
