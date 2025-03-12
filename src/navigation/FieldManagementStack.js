import { createStackNavigator } from "@react-navigation/stack";
import FieldManagementScreen from "../screens/FieldManagement/FieldManagementScreen";
import AddFieldScreen from "../screens/FieldManagement/AddFieldScreen";
import ShowCropsScreen from "../screens/CropManagement/ShowCropsScreen";
import EditFieldScreen from "../screens/FieldManagement/EditFieldScreen";
import AddSoilMeasurementScreen from "../screens/FieldManagement/AddSoilMeasurementScreen";
import EditSoilMeasurementScreen from "../screens/FieldManagement/EditSoilMeasurementScreen";
import AddPlotNumberScreen from "../screens/FieldManagement/AddPlotNumberScreen";
import EditPlotNumberScreen from "../screens/FieldManagement/EditPlotNumberScreen";
import FilesUploadScreen from "../screens/FieldManagement/FilesUploadScreen";

const Stack = createStackNavigator();

const FieldmanagementStack = () => {
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
        name="FieldManagementMain"
        component={FieldManagementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dodaj Pole"
        component={AddFieldScreen}
        options={{ headerShown: true, title: "Dodaj Pole" }}
      />
      <Stack.Screen name="Uprawy" component={ShowCropsScreen} />
      <Stack.Screen
        name="Edytuj Pole"
        component={EditFieldScreen}
        options={{ headerShown: true, title: "Edytuj Pole" }}
      />
      <Stack.Screen
        name="Dodaj Pomiar Gleby"
        component={AddSoilMeasurementScreen}
        options={{ headerShown: true, title: "Dodaj Pomiary Gleby" }}
      />
      <Stack.Screen
        name="Edytuj Pomiar Gleby"
        component={EditSoilMeasurementScreen}
        options={{ headerShown: true, title: "Edytuj Pomiary Gleby" }}
      />
      <Stack.Screen
        name="Dodaj Numer Działki"
        component={AddPlotNumberScreen}
        options={{ headerShown: true, title: "Dodaj Numer Działki" }}
      />
      <Stack.Screen
        name="Edytuj Numer Działki"
        component={EditPlotNumberScreen}
        options={{ headerShown: true, title: "Edytuj Numer Działki" }}
      />
      <Stack.Screen
        name="Dodaj Pola z Pliku"
        component={FilesUploadScreen}
        options={{ headerShown: true, title: "Dodaj Pola z Pliku" }}
      />
    </Stack.Navigator>
  );
};

export default FieldmanagementStack;
