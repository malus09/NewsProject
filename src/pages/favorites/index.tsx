import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";


import favoriteStyles from "../home/styles";
import News from "../../types/News";

interface RouteParams {
  favoriteNews: News[];
}

export default function FavoritesPage() {
  const route = useRoute();
  const { favoriteNews} = route.params as RouteParams;

  const navigation = useNavigation();



  const renderItem = ({ item }: { item: News }) => (
    <View style={favoriteStyles.container}>

      <Card>

        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsPage", { news: item })}>

          <Card.Cover source={{ uri: item.urlToImage }} />

          <Card.Title
            title={item.title}
            subtitle={item.author}
            titleStyle={{ fontWeight: "bold" }}
          />
        </TouchableOpacity>

        <Card.Actions>
          <View style={favoriteStyles.containerButton}>

            <Button
              icon="eye"
              onPress={() => navigation.navigate("DetailsPage", { news: item })}
              mode="contained"
              compact={true}
              buttonColor="#8C0357"
              style={favoriteStyles.button}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white",
                  paddingRight: 4,
                }}
              >
                Ver Detalhes
              </Text>
            </Button>



            <Button
              icon="share"
              mode="contained"
              style={favoriteStyles.button}
              buttonColor="#FDAFDF"
              compact={true}
              onPress={() => {}}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", paddingRight: 4 }}
              >
                Compartilhar
              </Text>
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#30011E", height:'100%' }}>
      <View style={favoriteStyles.elements}>
        <FlatList
          data={favoriteNews}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}
