import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  Searchbar,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import newsStyle from "./styles";
import News from "../../types/News";
import Modal from "react-native-modal";
import { Linking } from "react-native";

export default function NewsPage() {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredNews, setFilteredNews] = useState<News[]>([]); // Estado para notícias filtradas
  const [favoriteNews, setFavoriteNews] = useState<News[]>([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);

    // Filtrar notícias com base na consulta
    const filtered = newsData.filter((item) => {
      return (
        (item.title &&
          item.title.toLowerCase().includes(query.toLowerCase())) ||
        (item.description &&
          item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(query.toLowerCase()))
        // Adicione outras propriedades da notícia que deseja pesquisar
      );
    });

    setFilteredNews(filtered);
  };

  const navigation = useNavigation();
  const [modo, setModo] = useState("");
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>(
    {}
  );
  const [ModalVisible, setModalVisible] = useState(false);
  const [NewsUrl, setNewsUrl] = useState("");

  const handleFavorite = (item: News) => {
    const isFavorite = favoriteNews.some((n) => n.title === item.title);

    if (!isFavorite) {
      setFavoriteNews((prevFavorites) => [...prevFavorites, item]);
      setButtonColors((prevColors) => ({
        ...prevColors,
        [item.title]: "contained",
      }));
      console.log("Notícias favoritadas", favoriteNews);
    } else {
      setFavoriteNews((prevFavorites) =>
        prevFavorites.filter((n) => n.title !== item.title)
      );
      setButtonColors((prevColors) => ({
        ...prevColors,
        [item.title]: "contained-tonal",
      }));
      console.log("Notícias favoritadas", favoriteNews);
    }
  };

  const openModal = (url) => {
    if (ModalVisible == false) {
      setModalVisible(true);
      setNewsUrl(url);
    }
  };

  // Efeito para carregar as notícias da API
  useEffect(() => {
    // Substitua 'YOUR_API_KEY' pela sua chave de API
    const apiKey = "7dd4d824ec624d2c9a5bfb6c85a662cc";
    const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2023-10-06&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setNewsData(data.articles);
          setFilteredNews(data.articles); // Inicialmente, mostre todas as notícias
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Erro, não foi possível realizar a ação", error);
        setLoading(false);
      });
  }, []);

  // Função para renderizar cada item da lista de notícias
  const renderItem = ({ item }: { item: News }) => (
    <View style={newsStyle.container}>
      <Modal isVisible={ModalVisible} style={{ alignSelf: "center" }}>
        <View style={newsStyle.modalContent}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(NewsUrl); // Abre a URL com Linking.openURL
            }}
          >
            <Text
              style={[
                newsStyle.modalText,
                { color: "blue", textAlign: "justify" },
              ]}
            >
              {NewsUrl}
            </Text>
          </TouchableOpacity>
          <Button onPress={() => setModalVisible(false)}>Fechar</Button>
        </View>
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

            <Button
              icon="heart"
              mode={buttonColors[item.title] || "contained"} // Use a cor do estado, padrão para "contained"
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
    </View>
  );

  return (
    <KeyboardAvoidingView behavior="height">
      <View style={{ backgroundColor: "#30011E" }}>
        {loading ? (<View style={{height:'100%', justifyContent:'center'}}>
          <ActivityIndicator size="large" /></View>
        ) : (
          <View style={newsStyle.elements}>
            <View
              style={{ flexDirection: "row", width: "100%", height:70 }}
            >
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 8, width: "80%" }}
              />

              <Button
                icon="heart"
                mode="contained"
                style={newsStyle.favButton}
                buttonColor="#FDAFDF"
                compact={true}
                onPress={() =>
                  navigation.navigate("FavoritesPage", {
                    favoriteNews: favoriteNews,
                  })
                }
                children={undefined}
              />
            </View>

            <FlatList
              data={filteredNews} // Renderize as notícias filtradas
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
