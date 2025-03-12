import * as FileSystem from 'expo-file-system';
import { parseString } from 'xml2js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const parseGML = async (fileUri, farmId) => {
  try {
    const xmlString = await FileSystem.readAsStringAsync(fileUri);

    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error("Błąd parsowania XML:", err);
        return;
      }

      console.log(JSON.stringify(result, null, 2));

      if (!result.elements || !result.elements.featureMembers || !result.elements.featureMembers.uprawa) {
        console.error("Brak danych o uprawach w pliku GML");
        return;
      }

      const uprawy = Array.isArray(result.elements.featureMembers.uprawa)
        ? result.elements.featureMembers.uprawa
        : [result.elements.featureMembers.uprawa];

      const uprawyData = uprawy.map(uprawa => {
        const posListObj = uprawa.geometry?.Polygon?.exterior?.LinearRing?.posList;
        const posList = posListObj && posListObj._ ? posListObj._ : null;

        return {
          oznaczenie: uprawa.oznaczenie_uprawy || null,
          powierzchnia: parseFloat(uprawa.powierzchnia) || 0,
          roslina: uprawa.roslina_uprawna || "Nieznana",
          geometry: posList ? posList.split(" ").map(Number) : [] 
        };
      });

      updateLocalData(farmId, uprawyData);
      console.log(uprawyData);
    });
  } catch (error) {
    console.error("Błąd odczytu pliku:", error);
  }
};


export const updateLocalData = async (farmId, uprawyData) => {
  try {
    const storedData = await AsyncStorage.getItem('farms');
    let farms = storedData ? JSON.parse(storedData) : [];

    let farm = farms.find(f => f.id === farmId);

    if (!farm) {
      console.error(`Farma o ID ${farmId} nie została znaleziona.`);
      return;
    }

    if (!farm.fields) {
      farm.fields = [];
    }

    let lastFieldId = farm.fields.length > 0
      ? Math.max(...farm.fields.map(f => parseInt(f.id))) + 1
      : 1;

    let lastCropId = farm.fields.flatMap(f => f.crops).length > 0
      ? Math.max(...farm.fields.flatMap(f => f.crops).map(c => parseInt(c.id))) + 1
      : 1;

    uprawyData.forEach(uprawa => {
      const { id, oznaczenie, powierzchnia, roslina, geometry } = uprawa;

      let existingField = farm.fields.find(field =>
        JSON.stringify(field.geometry) === JSON.stringify(geometry)
      );

      if (!existingField) {
        const newField = {
          id: lastFieldId.toString(),
          name: `Pole ${lastFieldId}`,
          area: powierzchnia.toString(),
          soilType: null,
          identifier: oznaczenie,
          soilMeasurements: [],
          plotNumbers: [],
          crops: [],
          geometry
        };

        farm.fields.push(newField);
        existingField = newField;
        lastFieldId++;
      }

      let existingCrop = existingField.crops.find(crop => crop.name === roslina);

      if (!existingCrop) {
        const newCrop = {
          id: lastCropId.toString(),
          name: roslina,
          type: null,
          isActive: true,
          identifier: oznaczenie.toString(),
          cultivationOperations: [],
          fertilizations: [],
          plantProtections: []
        };

        existingField.crops.push(newCrop);
        lastCropId++;
      }
    });

    await AsyncStorage.setItem('farms', JSON.stringify(farms));
    console.log(`Dane dla farmy ${farmId} zostały zaktualizowane w AsyncStorage.`);

  } catch (error) {
    console.error('Błąd podczas aktualizacji lokalnych danych:', error);
  }
};