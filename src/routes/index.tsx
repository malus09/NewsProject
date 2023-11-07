import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NewsPage from "../pages/home";
import DetailsPage from "../pages/details";
import FavoritesPage from "../pages/favorites";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notícias"
        component={NewsPage}
        options={{
          title: "Notícias",
          headerTransparent: true,
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="DetailsPage"
        component={DetailsPage}
        options={{ title: "Detalhes da Notícia" }}
      />
      <Stack.Screen
        name="FavoritesPage"
        component={FavoritesPage}
        options={{
          title: "Favoritos",
          headerTransparent: true,
          headerTitleStyle: { color: "white" },
        }}
        initialParams={{ favoriteNews: []}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
