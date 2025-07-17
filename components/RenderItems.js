import { homeStyle } from "../styles/homeStyle";
import { View, Text, Button } from "react-native";

export default function RenderItems({ item }) {
  return (
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
}
