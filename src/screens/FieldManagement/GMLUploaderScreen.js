import React, { useState } from "react";
import { Button, View, Text, ActivityIndicator } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { uploadGMLFileToServer } from "../../utils/FileUtils";
import { useAuth } from "../../context/AuthContext";
import { useRoute } from "@react-navigation/native";

const GMLUploaderScreen = () => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const route = useRoute();
  const { farmId } = route.params;

  const handleFilePicker = async (farmId) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });


      if (!res.canceled && res.assets && res.assets.length > 0) {
        const file = res.assets[0];

        if (!file.name.toLowerCase().endsWith('.gml')) {
          setError('Only .gml files are allowed.');
          setFileName('');
          return;
        }

        setFileName(file.name);
        setError('');
        setLoading(true);

        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        });

        await uploadGMLFileToServer(formData, token, farmId);
      } else if (res.canceled) {
        setError('User cancelled file picker');
        console.log('File picker cancelled');
      }
    } catch (err) {
      console.log('Error picking document', err);
      setError(err.message || 'Unknown error occurred while picking the document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="Pick GML File" onPress={() => handleFilePicker(farmId)} />
      {fileName ? <Text>Selected File: {fileName}</Text> : null}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default GMLUploaderScreen;
