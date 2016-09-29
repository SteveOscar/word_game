import React from 'react';
const DeviceInfo = require('react-native-device-info');

import {
    Text,
    View,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

var {width, height} = require('Dimensions').get('window');
const CELL_SIZE = Math.floor(width * .15); // 15% of the screen width
const CELL_PADDING = Math.floor(CELL_SIZE * .07); // 5% of the cell size
const BORDER_RADIUS = CELL_PADDING * 1;
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
const LETTER_SIZE = Math.floor(TILE_SIZE * .6);

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.makeBoard(),
      fadeAnim: new Animated.Value(0),
      numbers: ['N', 'U', 'M', 'E', 'R', 'Y']
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();

    setTimeout(() => { this.moveTile(1) }, 400)
    setTimeout(() => { this.moveTileBack(1) }, 1200);

    setTimeout(() => { this.moveTile(4) }, 1000)
    setTimeout(() => { this.moveTileBack(4) }, 1800);
  }

  makeBoard() {
    var tilt = new Array(6)
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0)
    }
    return {tilt}
  }

  render() {
    const dimension = CELL_SIZE * 6
    return (
      <Animated.View style={{opacity: this.state.fadeAnim}}>
        <View style={[styles.container, {width: dimension, height: CELL_SIZE }]}>
          {this.renderTiles()}
        </View>
      </Animated.View>
    )
  }

  renderTiles() {
    var result = []
    for (var row = 0; row < 6; row++) {
        var id = row
        var letter = this.state.numbers[id]
        var tilt = this.state.board.tilt[id].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-180deg']
        })
        var style = {
          left: row * CELL_SIZE + CELL_PADDING,
          top: CELL_SIZE + CELL_PADDING,
          transform: [{perspective: CELL_SIZE * .9},
                       {rotateX: tilt}]
        }
        result.push(this.renderTile(id, style, letter))
    }
    return result
  }

  renderTile(id, style, letter) {
    return (
      <Animated.View key={id} style={[styles.tile, style]}>
        <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
    )
  }

  moveTile(id) {
    // setTimeout(() => { this.setState({ numbers: this.hiddenValue(id) }, this.checkSelection(id)) }, 200);
    var tilt = this.state.board.tilt[id];
    tilt.setValue(0);
    Animated.timing(tilt, {
      toValue: .3,
      duration: 800,
      easing: Easing.spring
    }).start();
  }

  moveTileBack(id) {
    // setTimeout(() => { this.setState({ numbers: this.hiddenValue(id) }, this.checkSelection(id)) }, 200);
    var tilt = this.state.board.tilt[id];
    tilt.setValue(.3);
    Animated.timing(tilt, {
      toValue: 0,
      duration: 400,
      easing: Easing.spring
    }).start();
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff4e6',
    borderColor: '#be9b7b',
    borderWidth: 3
  },
  letter: {
    color: '#854442',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
    fontFamily: 'American Typewriter'
  },
});

export default Logo;