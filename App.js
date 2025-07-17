import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./app/(tabs)/Home";
import FormComponent from "./app/(tabs)/FormComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Notas") {
              iconName = "home";
            } else if (route.name === "Agregar") {
              iconName = "add-circle-outline";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Notas" component={Home} />
        <Tab.Screen name="Agregar" component={FormComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
