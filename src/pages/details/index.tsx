import React from "react";
import { View, ScrollView, Image, SafeAreaView, FlatList, Linking, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";

import detailsStyle from "./style";
import News from "../../types/News";

type RootStackParamList = {
  NewsDetail: { news: News };
};

type NewsDetailScreenRouteProp = RouteProp<RootStackParamList, "NewsDetail">;

export default function DetailsPage() {
  const route = useRoute<NewsDetailScreenRouteProp>();
  const { news } = route.params;

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#FFEBF7" }}>
      <ScrollView>
        <Image source={{ uri: news.urlToImage }} style={detailsStyle.img} />

        <View>
          <Text style={[detailsStyle.title, { margin: 12 }]}>{news.title}</Text>
        </View>

        <View style={detailsStyle.container}>
          <View>
            <Text
              style={[
                detailsStyle.label,
                { fontStyle: "italic", fontWeight: "100" },
              ]}
            >
              Autor:
            </Text>
            <Text style={detailsStyle.text}>{news.author}</Text>
          </View>

          <View>
            <Text style={detailsStyle.label}>Descrição:</Text>
            <Text style={detailsStyle.text}>{news.description}</Text>
          </View>

          <View>
            <Text style={detailsStyle.label}>Conteúdo:</Text>
            <Text style={detailsStyle.text}>{news.content}</Text>
          </View>

          <View>
            <Text style={detailsStyle.label}>Publicado em:</Text>
            <Text style={detailsStyle.text}>{news.publishedAt}</Text>
          </View>

          <View>
            <Text style={detailsStyle.label}>Fonte:</Text>
            <Text style={detailsStyle.text}>{news.source.name}</Text>
          </View>

          <View>
            <Text style={detailsStyle.label}>URL para a notícia completa:</Text>
            <TouchableOpacity
            onPress={() => {
              Linking.openURL(news.url);
            }}
          >
            <Text style={[detailsStyle.text, {color:'blue'}]}>{news.url}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
