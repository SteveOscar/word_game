import React from 'react';
import Logo from './Logo.js'
import {
    Text,
    View,
    StyleSheet,
    Animated,
    Easing,
    LayoutAnimation,
    TouchableHighlight
} from 'react-native';

var {width, height} = require('Dimensions').get('window');

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim1: new Animated.Value(0),
      fadeAnim2: new Animated.Value(0),
      fadeAnim3: new Animated.Value(0),
      fadeAnim4: new Animated.Value(0),
      spinValue: new Animated.Value(0),
      pressed: false
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim1,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
    Animated.timing(
      this.state.fadeAnim2,
      {
        toValue: 1,
        duration: 1000,
        delay: 500
      }
    ).start();
    Animated.timing(
      this.state.fadeAnim3,
      {
        toValue: 1,
        duration: 1000,
        delay: 1000
      }
    ).start();
    Animated.timing(
      this.state.fadeAnim4,
      {
        toValue: 1,
        duration: 1000,
        delay: 1500
      }
    ).start();
    this.spin()
  }

  spin () {
    this.state.spinValue.setValue(0)
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.spring
      }
    ).start(() => this.spin())
  }

  handlePress() {
    this.setState({ pressed: true })
    this.spin()
    this.props.highScoresPage()
  }

  renderDifficulty() {
    const { difficulty } = this.props
    if(difficulty === "Easy") { return "\uD83D\uDE00" }
    if(difficulty === "Medium") { return "\uD83D\uDE10" }
    if(difficulty === "Hard") { return "\uD83D\uDE33" }
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <View>
        <View style={styles.spinner}>
          <Animated.Image
            style={{
              width: 50,
              height: 50,
              opacity: .7,
              transform: [{rotate: spin}] }}
              source={require('./gear.png')}
          />
        </View>
        {this.renderButtons()}
      </View>
    )
  }

  renderButtons() {
    let howHard = this.renderDifficulty()

    return (
      <View>
        <Logo />
        <Animated.View style={{opacity: this.state.fadeAnim1}}>
          <Text style={styles.buttonText} onPress={this.props.startGame}><Text style={{color: '#be9b7b'}}>{"\u204D"}  </Text>Start</Text>
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeAnim2}}>
          <Text style={styles.buttonText} onPress={this.props.upDifficulty}><Text style={{color: '#be9b7b'}}>{"\u204D"}  </Text>{howHard}</Text>
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeAnim3}}>
          <TouchableHighlight underlayColor="blue">
            <Text style={styles.buttonText} onPress={this.handlePress.bind(this)}><Text style={{color: '#be9b7b'}}>{"\u204D"}  </Text>High Scores</Text>
          </TouchableHighlight>
        </Animated.View>
        <Animated.View style={{opacity: this.state.fadeAnim4}}>
          <Text style={styles.buttonText} onPress={this.props.highScoresPage}><Text style={{color: '#be9b7b'}}>{"\u204D"}  </Text>???</Text>
        </Animated.View>
      </View>
    )
  }

}

var styles = StyleSheet.create({
  continer: {
    paddingBottom: 200
  },
  buttonText: {
    alignSelf: 'center',
    margin: height * .03,
    fontSize: 30,
    color: 	'#fff4e6',
    fontFamily: 'American Typewriter'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }
});

export default Menu;
