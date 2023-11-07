// Importações
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  Searchbar,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import * as Animatable from "react-native-animatable";

// Estilos
import newsStyle from "./styles";

// Tipos
import News from "../../types/News";

export default function NewsPage() {
  // Estados
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [favoriteNews, setFavoriteNews] = useState<News[]>([]);
  const [buttonColors, setButtonColors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [ModalVisible, setModalVisible] = useState(false);
  const [NewsUrl, setNewsUrl] = useState("");

  // Navegação
  const navigation = useNavigation();

  // Funções
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = newsData.filter((item) => {
      return (
        (item.title &&
          item.title.toLowerCase().includes(query.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(query.toLowerCase()))
      );
    });
    setFilteredNews(filtered);
  };

  const handleFavorite = (item: News) => {
    const isFavorite = favoriteNews.some((n) => n.title === item.title);
    if (!isFavorite) {
      setFavoriteNews((prevFavorites) => [...prevFavorites, item]);
      setButtonColors((prevColors) => ({
        ...prevColors,
        [item.title]: "contained",
      }));
    } else {
      setFavoriteNews((prevFavorites) =>
        prevFavorites.filter((n) => n.title !== item.title)
      );
      setButtonColors((prevColors) => ({
        ...prevColors,
        [item.title]: "contained-tonal",
      }));
    }
  };

  const openModal = (url: string) => {
    if (ModalVisible == false) {
      setModalVisible(true);
      setNewsUrl(url);
    }
  };

  // Efeitos
  useEffect(() => {
    const apiKey = "7dd4d824ec624d2c9a5bfb6c85a662cc";
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2023-10-06&sortBy=publishedAt&apiKey=${apiKey}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setNewsData(data.articles);
          setFilteredNews(data.articles);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erro, não foi possível realizar a ação", error);
        setLoading(false);
      });
  }, []);

  // Renderização
  const renderItem = ({ item }: { item: News }) => (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={newsStyle.container}
    >
      <Modal isVisible={ModalVisible} style={{ alignSelf: "center" }}>
        <Animatable.View
          animation="wobble"
          duration={2000}
          style={newsStyle.modalContent}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(NewsUrl);
            }}
          >
            <Text style={{ color: "blue", textAlign: "justify" }}>
              {NewsUrl}
            </Text>
          </TouchableOpacity>
          <Button onPress={() => setModalVisible(false)}>Fechar</Button>
        </Animatable.View>
      </Modal>
      <Card style={{ backgroundColor: "#FFEBF7", padding: 4 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsPage", { news: item })}
        >
          <Card.Cover source={{ uri: item.urlToImage }} />
          <Card.Title
            title={item.title}
            subtitle={item.author}
            titleStyle={{ fontWeight: "bold" }}
          />
        </TouchableOpacity>
        <Card.Actions>
          <View style={newsStyle.containerButton}>
            <Button
              icon="eye"
              onPress={() => navigation.navigate("DetailsPage", { news: item })}
              mode="contained"
              compact={true}
              buttonColor="#8C0357"
              style={newsStyle.button}
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
            <Animatable.View
              animation={buttonColors[item.title] ? "pulse" : ""}
            >
              <Button
                icon="heart"
                mode={buttonColors[item.title] || "contained"}
                compact={true}
                onPress={() => handleFavorite(item)}
                buttonColor="#FDAFDF"
                labelStyle={
                  buttonColors[item.title] === "contained"
                    ? { color: "red" }
                    : { color: "white" }
                }
                style={newsStyle.button}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", paddingRight: 4 }}
                >
                  Favoritar
                </Text>
              </Button>
            </Animatable.View>
            <Button
              icon="share"
              mode="contained"
              style={newsStyle.button}
              buttonColor="#FDAFDF"
              compact={true}
              onPress={() => openModal(item.url)}
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
    </Animatable.View>
  );

  return (
    <KeyboardAvoidingView behavior="height">
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={{ backgroundColor: "#30011E" }}
      >
        {loading ? (
          <View style={{ height: "100%", justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={newsStyle.elements}>
            <View style={{ flexDirection: "row", width: "100%", height: 70 }}>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 8, width: "80%" }}
              />
              <IconButton
                icon="heart"
                mode="contained"
                style={newsStyle.favButton}
                containerColor="#FDAFDF"
                iconColor="white"
                onPress={() =>
                  navigation.navigate("FavoritesPage", {
                    favoriteNews: favoriteNews,
                  })
                }
              />
            </View>
            <FlatList
              data={filteredNews}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              initialNumToRender={10}
              windowSize={5}
            />
          </View>
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
