import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, Dimensions, Easing, Image } from 'react-native';

let heartCount = 1;

const SCREEN_HEIGHT = Dimensions.get('window').height;
const animationEndY = Math.ceil(SCREEN_HEIGHT * 0.7);
const negativeEndY = animationEndY * -1;

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

const Heart = ({
  color,
  heartStyle,
}) => (
  <Image
    source={require('../../heart.png')}
    style={[styles.heart, { tintColor: color }, heartStyle]}
    resizeMode="contain"
  />
);

const FloatingHeart = ({
  count,
  style,
  color,
  heartStyle,
  renderCustomIcon,
}) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (count !== 0) {
      const newHeartArr = [...hearts, {
        id: heartCount++,
        right: getRandomNumber(50, 150),
      }]
      setHearts(newHeartArr);
    }
  }, [count]);

  return (
    <View style={[styles.container, style]}>
      {hearts.map(({ id, right }) => (
        <AnimatedIcon
          key={id}
          color={color}
          heartWrapperStyle={{ right }}
          heartStyle={heartStyle}
          renderCustomIcon={renderCustomIcon}
        />
      ))}
    </View>
  )
}

FloatingHeart.propTypes = {
  count: PropTypes.number.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  heartStyle: PropTypes.object,
  renderCustomIcon: PropTypes.func,
}

FloatingHeart.defaultProps = {
  count: 0,
  color: 'red',
}

const AnimatedIcon = ({
  color,
  onComplete,
  heartStyle,
  renderCustomIcon,
  heartWrapperStyle,
}) => {
  const [position] = useState(new Animated.Value(0));
  const yAnimation = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });

  const opacityAnimation = yAnimation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0],
  });

  const scaleAnimation = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.4, 1],
    extrapolate: 'clamp',
  });

  const xAnimation = yAnimation.interpolate({
    inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
    outputRange: [0, 25, 15, 0, 10],
  });

  const rotateAnimation = yAnimation.interpolate({
    inputRange: [0, animationEndY / 6, animationEndY / 3, animationEndY / 2, animationEndY],
    outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
  });

  useEffect(() => {
    Animated.timing(position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(onComplete)
  }, []);

  const getHeartStyle = () => ({
    transform: [
      { translateY: position },
      { scale: scaleAnimation },
      { translateX: xAnimation },
      { rotate: rotateAnimation },
    ],
    opacity: opacityAnimation,
  });

  return (
    <Animated.View style={[styles.heartContainer, getHeartStyle(), heartWrapperStyle]}>
      {renderCustomIcon ? renderCustomIcon() : <Heart color={color} heartStyle={heartStyle}/>}
    </Animated.View>
  );
}

export default FloatingHeart;

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  heartContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent',
  },
  heart: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})
