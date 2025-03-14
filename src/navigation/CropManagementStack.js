import { createStackNavigator } from "@react-navigation/stack";
import CropManagementScreen from "../screens/CropManagement/CropManagementScreen";
import AddCropScreen from "../screens/CropManagement/AddCropScreen";
import EditCropScreen from "../screens/CropManagement/EditCropScreen";
import AddFertilizationScreen from "../screens/CropManagement/AddFertilizationScreen";
import EditFertilizationScreen from "../screens/CropManagement/EditFertilizationScreen";
import AddPlantProtectionScreen from "../screens/CropManagement/AddPlantProtectionScreen";
import EditPlantProtectionScreen from "../screens/CropManagement/EditPlantProtectionScreen";
import AddCultivationOperationScreen from "../screens/CropManagement/AddCultivationOperationScreen";
import EditCultivationOperationScreen from "../screens/CropManagement/EditCultivationOperationScreen";
import AddFertilizationProductScreen from "../screens/Products/AddFertilizationProductScreen";
import EditFertilizationProductScreen from "../screens/Products/EditFertilizationProductScreen";

const Stack = createStackNavigator();

const CropManagementStack = () => {
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
        name="CropManagementMain"
        component={CropManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dodaj Uprawę"
        component={AddCropScreen}
        options={{ headerShown: true, title: "Dodaj Uprawę" }}
      />
      <Stack.Screen
        name="Edytuj Uprawę"
        component={EditCropScreen}
        options={{ headerShown: true, title: "Edytuj Uprawę" }}
      />
      <Stack.Screen
        name="Dodaj Nawożenie"
        component={AddFertilizationScreen}
        options={{ headerShown: true, title: "Dodaj Nawożenie" }}
      />
      <Stack.Screen
        name="Edytuj Nawożenie"
        component={EditFertilizationScreen}
        options={{ headerShown: true, title: "Edytuj Nawożenie" }}
      />
      <Stack.Screen
        name="Dodaj Ochronę Roślin"
        component={AddPlantProtectionScreen}
        options={{ headerShown: true, title: "Dodaj Ochronę Roślin" }}
      />
      <Stack.Screen
        name="Edytuj Ochronę Roślin"
        component={EditPlantProtectionScreen}
        options={{ headerShown: true, title: "Edytuj Ochronę Roślin" }}
      />
      <Stack.Screen
        name="Dodaj Zabieg Uprawowy"
        component={AddCultivationOperationScreen}
        options={{ headerShown: true, title: "Dodaj Zabieg Uprawowy" }}
      />
      <Stack.Screen
        name="Edytuj Zabieg Uprawowy"
        component={EditCultivationOperationScreen}
        options={{ headerShown: true, title: "Edytuj Zabieg Uprawowy" }}
      />
      <Stack.Screen
        name="Dodaj Produkt Nawozenia"
        component={AddFertilizationProductScreen}
        options={{ headerShown: true, title: "Dodaj Produkt" }}
      />
            <Stack.Screen
        name="Edytuj Produkt Nawozenia"
        component={EditFertilizationProductScreen}
        options={{ headerShown: true, title: "Edytuj Produkt" }}
      />
    </Stack.Navigator>
  );
};

export default CropManagementStack;
