import React, { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { parseGML } from "../../utils/GMLProcessor";
import { parseCSV } from "../../utils/CSVProcessor";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const FilesUploadScreen = () => {
  const [gmlFileName, setGmlFileName] = useState('');
  const [csvFileName, setCsvFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const route = useRoute();
  const { farmId } = route.params;

  const handleFilePicker = async (type) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (!res.canceled && res.assets.length > 0) {
        const file = res.assets[0];
        const fileName = file.name.toLowerCase();

        if (type === "GML" && !fileName.endsWith(".gml")) {
          setError("Tylko pliki .gml są dozwolone.");
          return;
        }
        if (type === "CSV" && !fileName.endsWith(".csv")) {
          setError("Tylko pliki .csv są dozwolone.");
          return;
        }

        setError('');
        setLoading(true);

        if (type === "GML") {
          console.log(farmId);
          await parseGML(file.uri, farmId); 
          setGmlFileName(file.name);
        } else if (type === "CSV") {
          await parseCSV(file.uri, farmId);
          setCsvFileName(file.name);
        }

        Alert.alert("Sukces", `Plik ${file.name} został przetworzony.`);
      } else if (res.canceled) {
        setError("Wybór pliku anulowany.");
      }
    } catch (err) {
      console.error(`Błąd podczas przetwarzania pliku ${type}:`, err);
      setError(`Wystąpił błąd podczas przetwarzania pliku ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prześlij pliki</Text>

      <TouchableOpacity
        style={[styles.button, styles.gmlButton]}
        onPress={() => handleFilePicker("GML")}
      >
        <MaterialIcons name="file-upload" size={24} color="white" />
        <Text style={styles.buttonText}>Prześlij plik GML</Text>
      </TouchableOpacity>
      {gmlFileName ? <Text style={styles.fileText}>📂 GML: {gmlFileName}</Text> : <Text style={styles.warningText}>Plik GML nie został wybrany.</Text>}

      <TouchableOpacity
        style={[styles.button, styles.csvButton, !gmlFileName && styles.disabledButton]}
        onPress={() => handleFilePicker("CSV")}
        disabled={!gmlFileName}
      >
        <MaterialIcons name="file-upload" size={24} color="white" />
        <Text style={styles.buttonText}>Prześlij plik CSV</Text>
      </TouchableOpacity>
      {csvFileName ? <Text style={styles.fileText}>📂 CSV: {csvFileName}</Text> : <Text style={styles.warningText}>Plik CSV nie został wybrany.</Text>}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading && <ActivityIndicator size="large" color="#FF9800" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
  },
  gmlButton: {
    backgroundColor: "#4CAF50",
  },
  csvButton: {
    backgroundColor: "#2196F3",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  fileText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginVertical: 5,
  },
  warningText: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default FilesUploadScreen;