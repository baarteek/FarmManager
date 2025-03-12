import { createStackNavigator } from "@react-navigation/stack";
import FarmManagementScreen from "../screens/FarmManagement/FarmManagementScreen";
import AddFarmScreen from "../screens/FarmManagement/AddFarmScreen";
import FarmEditScreen from "../screens/FarmManagement/FarmEditScreen";
import AddFieldScreen from "../screens/FieldManagement/AddFieldScreen";
import EditFieldScreen from "../screens/FieldManagement/EditFieldScreen";

const Stack = createStackNavigator();

const FarmManagementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 2,
        },
        headerTintColor: "#276e33",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        drawerActiveBackgroundColor: "#276e33",
        drawerActiveTintColor: "#276e33",
      }}
    >
      <Stack.Screen
        name="FarmManagementMain"
        component={FarmManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Dodaj Gospodarstwo" component={AddFarmScreen} />
      <Stack.Screen name="Edytuj Gospodarstwo" component={FarmEditScreen} />
      <Stack.Screen name="Dodaj Pole" component={AddFieldScreen} />
      <Stack.Screen name="Edytuj Pole" component={EditFieldScreen} />
    </Stack.Navigator>
  );
};

export default FarmManagementStack;
