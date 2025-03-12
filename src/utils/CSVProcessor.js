import * as FileSystem from 'expo-file-system';
import * as Papa from 'papaparse';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const parseCSV = async (fileUri, farmId) => {
  try {
    const csvString = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });

    const parsedData = Papa.parse(csvString, { 
      header: true, 
      skipEmptyLines: true, 
      delimiter: ","
    });

    if (!parsedData || !parsedData.data || parsedData.data.length === 0) {
      console.error("Nie udało się sparsować pliku CSV lub plik jest pusty");
      return [];
    }

    console.log("Nagłówki CSV:", Object.keys(parsedData.data[0]));

    const extractedData = parsedData.data.map(row => ({
      oznaczenie: row["Oznaczenie Uprawy / działki rolnej"]?.trim() || "Nieznane",
      nr_dzialki: row["Nr działki ewidencyjnej"]?.trim() || "Brak",
      powierzchnia: row["Powierzchnia uprawy w granicach działki ewidencyjnej - ha"]
        ? parseFloat(row["Powierzchnia uprawy w granicach działki ewidencyjnej - ha"].replace(",", ".")) 
        : 0
    }));

    updateReferenceParcels(farmId, extractedData);

  } catch (error) {
    console.error("Błąd podczas przetwarzania pliku CSV:", error);
    return [];
  }
};

const updateReferenceParcels = async (farmId, csvData) => {
  try {
    const storedData = await AsyncStorage.getItem('farms');
    let farms = storedData ? JSON.parse(storedData) : [];

    let farm = farms.find(f => f.id === farmId);

    if (!farm) {
      console.error(`Farma o ID ${farmId} nie została znaleziona.`);
      return;
    }

    if (!farm.fields) {
      console.error(`Farma o ID ${farmId} nie posiada pól.`);
      return;
    }

    csvData.forEach(({ oznaczenie, nr_dzialki, powierzchnia }) => {
      let field = farm.fields.find(f => f.identifier === oznaczenie);
      
      if (!field) {
        console.warn(`Nie znaleziono pola z identyfikatorem uprawy: ${oznaczenie}`);
        return;
      }

      const existingParcel = field.plotNumbers.find(parcel => parcel.parcelNumber === nr_dzialki);
      if (!existingParcel) {
        const newParcel = {
          id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          parcelNumber: nr_dzialki,
          area: powierzchnia.toString()
        };

        field.plotNumbers.push(newParcel);
        console.log(`Dodano działkę ${nr_dzialki} do pola ${field.name}`);
      }
    });

    await AsyncStorage.setItem('farms', JSON.stringify(farms));
    console.log(`Działki referencyjne dla farmy ${farmId} zostały zaktualizowane.`);

  } catch (error) {
    console.error('Błąd podczas aktualizacji działek referencyjnych:', error);
  }
};