/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Pressable } from "react-native";

import Colors from "../constants/Colors";
import AddNewCardScreen from "../screens/AddNewCardScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import LatestScreen from "../screens/LatestScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MyCardListScreen from "../screens/MyCardListScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import CardDetailScreen from "../screens/CardDetailScreen";

export default function Navigation({}: {}) {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="AddNewCard"
          component={AddNewCardScreen}
          options={{ title: "Add Card" }}
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetailScreen}
          options={({ navigation }: RootTabScreenProps<"CardDetails">) => ({
            title: "Card Details",
            tabBarIcon: () => <TabBarIcon name="list" color={Colors.text} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="close"
                  size={25}
                  color={Colors.text}
                  style={{ marginRight: 0 }}
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Latest"
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
      }}
    >
      <BottomTab.Screen
        name="Latest"
        component={LatestScreen}
        options={({ navigation }: RootTabScreenProps<"Latest">) => ({
          title: "Latest",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="MyCardList"
        component={MyCardListScreen}
        options={({ navigation }: RootTabScreenProps<"MyCardList">) => ({
          title: "My Card List",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("AddNewCard")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="plus"
                size={25}
                color={Colors.text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }: RootTabScreenProps<"Settings">) => ({
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
