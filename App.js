import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from "react-native";

export default function App() {
  const [animation] = useState(() => new Animated.Value(0));
  const { height } = Dimensions.get("window");

  const background = animation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      "rgba(255,255,255,0)",
      "rgba(255,255,255,.3)",
      "rgba(255,255,255,.3)",
      "rgba(255,255,255,0)",
    ],
    extrapolate: "clamp",
  });

  const display = animation.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const success = animation.interpolate({
    inputRange: [1.1, 2],
    outputRange: [0, -height],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Animated.spring(animation, {
            toValue: 1,
          }).start();
        }}
      >
        <Text>Open</Text>
      </TouchableOpacity>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.background,
          {
            backgroundColor: background,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.background,
            {
              transform: [
                {
                  scale: display,
                },
                {
                  translateY: success,
                },
              ],
            },
          ]}
        >
          <View style={styles.wrap}>
            <View style={styles.modalHeader}></View>
            <Text style={styles.headerText}>Hello!</Text>
            <Text style={styles.regularText}>This modal is wonderful ain't it!</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  Animated.spring(animation, {
                    toValue: 0,
                  }).start();
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Animated.spring(animation, {
                    toValue: 2,
                  }).start(() => {
                    animation.setValue(0);
                  });
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    borderRadius: 8,
    backgroundColor: "#FFF",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
  },
  regularText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 16,
  },
  button: {
    backgroundColor: "#007ffe",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
});
