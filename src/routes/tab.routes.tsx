import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { PlantSelect } from "../screens/PlantSelect";
import { colors } from "../styles/colors";
import { MyPlantsSave } from "../screens/MyPlantsSave";
import { Platform } from "react-native";

const AppTab = createBottomTabNavigator();

export const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={
        //Criar o estilo, ou passar diretamente pelo obj
        {
          activeTintColor: colors.green,
          inactiveTintColor: colors.heading,
          labelPosition: "beside-icon",
          style: {
            ...Platform.select({
              android: {
                paddingVertical: 10,
                height: 58,
              },
              ios: {
                paddingVertical: 20,
                height: 78,
              },
            }),
          },
        }
      }
    >
      <AppTab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          //Essas infos size, color vem da onde
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <AppTab.Screen
        name="Minhas Plantas"
        component={MyPlantsSave}
        options={{
          //Essas infos size, color vem da onde
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};
