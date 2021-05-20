import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const tabLabel = ["상세 판매 내역", "통계"];
const focusedColor = (focused) => (focused ? "#7986FF" : "#a5a5a8");

const TabBar = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        {state.routes.map((route, index) => {
          const label = tabLabel[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              style={{
                ...styles.tabButton,
                borderColor: focusedColor(isFocused),
              }}
              onPress={onPress}
              key={`tab_${index}`}
              activeOpacity={1}
            >
              <Text
                style={{
                  ...styles.tabText,
                  color: focusedColor(isFocused),
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    backgroundColor: "white",
  },
  tabWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderTopWidth: 3.5,
    borderBottomWidth: 3.5,
    color: "white",
  },
  tabText: {
    fontWeight: "bold",
    letterSpacing: 2.5,
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
