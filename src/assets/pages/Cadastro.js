import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

export default function Cadastro() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setFullData(json.results);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = fullData.filter((user) =>
      user.name.first.toLowerCase().includes(query.toLowerCase()) ||
      user.name.last.toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
  };

  const goToCodigo = () => {
    navigation.navigate('Codigo');
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Erro ao buscar dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerForm}>
      <StatusBar style="auto" />
      <Image
        source={require("../images/docinhomusculosa.png")}
        style={{ width: 50, height: 75, marginBottom: 20, position: 'absolute', left: 20, top: 30 }}
      />

      <View style={{ flexDirection: "row", width: "100%", alignItems: "center", gap: 10, marginTop: 70 }}>
        <TouchableOpacity>
          <FontAwesome name="arrow-circle-left" size={40} color="rgb(10, 146, 11)" />
        </TouchableOpacity>
        <Text style={{ color: "rgb(10, 146, 11)", fontSize: 25 }}>Verifique sua empresa</Text>
      </View>

      <Text style={{ color: "#fff", fontSize: 18, textAlign: "center", marginBottom: 10, marginTop: 5 }}>
        Busque a empresa que oferece o SuperPass para você!
      </Text>

      <View style={{ position: "relative", marginTop: 10, width: "100%" }}>
        <TextInput
          placeholder="Buscar empresa..."
          placeholderTextColor={"#aaa"}
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={{ position: "absolute", top: 20, right: 30 }}>
        </TouchableOpacity>
      </View>

      {/* Lista rolável */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.login.username}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: item.picture.thumbnail }}
              style={{ width: 40, height: 40, borderRadius: 10, marginRight: 110 }}
            />
            <Text style={{ color: "white" }}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        style={{ marginTop: 10, maxHeight: 420 }} // 👈 limita a rolagem
      />

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={goToCodigo}>
        <Text style={{ color: "white", fontSize: 16 }}>Seguir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
  },
  searchBox: {
    color: "white",
    backgroundColor: "#262626",
    height: 50,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingLeft: 15,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: "green",
    borderRadius: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",

  },
});
