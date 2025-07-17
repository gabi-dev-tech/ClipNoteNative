import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { FlatList } from "react-native";
import { homeStyle } from "../../styles/homeStyle";

export default function Home() {
  const URL = process.env.EXPO_PUBLIC_API_URL;
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data.slice(1)))
      .catch((err) => console.error("Error al obtener la data", err));
  };

  const handleDelete = (itemId) => {
    Alert.alert("¿Estás seguro?", "No puedes revertir estos cambios!", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Si, eliminar",
        style: "destructive",
        onPress: () => {
          fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=delete&ID=${itemId}`,
          })
            .then(() => {
              getData();
            })
            .catch(() => {
              Alert.alert("Error", "Error al eliminar");
            });
        },
      },
    ]);
  };

  const renderItem = ({ item, drag }) => (
    <View style={homeStyle.cardContainer}>
      <View style={homeStyle.headCard}>
        <Text style={homeStyle.labels}>{`Nota ${item[0]}`}</Text>
        <Button title="Eliminar" onPress={() => handleDelete(item[0])} />
      </View>
      <View style={homeStyle.bodyCard}>
        <Text style={homeStyle.labels}>Titulo</Text>
        <Text>{item[1]}</Text>
        <Text style={homeStyle.labels}>Contenido</Text>
        <Text>{item[2]}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.titulo}>ClipNote...</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item[0].toString()}
          onDragEnd={({ data }) => setData(data)}
          contentContainerStyle={homeStyle.containerLista}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
