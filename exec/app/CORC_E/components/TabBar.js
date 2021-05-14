import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/Colors';

const tabLabel = ['상세 이용 내역', '통계'];
const focusedColor = (focused) =>
  focused ? Colors.primary.backgroundColor : '#a5a5a8';

const TabBar = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        {state.routes.map((route, index) => {
          const label = tabLabel[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
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
    backgroundColor: 'white',
    paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight,
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderTopWidth: 3,
    borderBottomWidth: 3.3,
    color: 'white',
  },
  tabText: {
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});
