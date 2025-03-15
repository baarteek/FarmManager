import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import { printToFileAsync } from 'expo-print';

const getAgrotechnicalActivitiesReportData = async (farmId) => {
    try {
        const farmsData = await AsyncStorage.getItem('farms');
        if (!farmsData) {
            throw new Error("Brak danych o gospodarstwach w pamięci AsyncStorage");
        }

        const farms = JSON.parse(farmsData);
        const selectedFarm = farms.find(farm => farm.id === farmId);

        const fertilizationProducts = await AsyncStorage.getItem('fertilizationProducts');
        const fertilizationProductsJson = JSON.parse(fertilizationProducts);

        const plantProtectionProducts = await AsyncStorage.getItem('plantProtectionProducts');
        const plantProtectionProductsJson = JSON.parse(plantProtectionProducts);

        if (!selectedFarm) {
            throw new Error(`Nie znaleziono gospodarstwa o ID: ${farmId}`);
        }

        let agrotechnicalActivities = [];

        selectedFarm.fields.forEach(field => {
            let referenceParcels = field.plotNumbers;
            let activeCrop = field.crops.find(crop => crop.isActive);

            if (activeCrop) {
                activeCrop.cultivationOperations.forEach(operation => {
                    referenceParcels.forEach(parcel => {
                        agrotechnicalActivities.push({
                            cropIdentifier: activeCrop.identifier,
                            plotNumber: parcel.parcelNumber,
                            date: new Date(operation.date).toLocaleDateString(),
                            area: parcel.area,
                            typeOfUse: activeCrop.name,
                            typeOfActivity: operation.name,
                            plantProtectionProduct: "nd",
                            amount: "nd",
                            packageNumber: operation.agrotechnicalIntervention || "",
                            comments: operation.description || ""
                        });
                    });
                });

                activeCrop.plantProtections.forEach(protection => {
                    let plantProtectionProduct = plantProtectionProductsJson.find(prod => prod.id === protection.productId);
                    referenceParcels.forEach(parcel => {
                        agrotechnicalActivities.push({
                            cropIdentifier: activeCrop.identifier,
                            plotNumber: parcel.parcelNumber,
                            date: new Date(protection.date).toLocaleDateString(),
                            area: parcel.area,
                            typeOfUse: activeCrop.name,
                            typeOfActivity: "Oprysk",
                            plantProtectionProduct: plantProtectionProduct.productName,
                            amount: `${plantProtectionProduct.quantityPerUnit} ${plantProtectionProduct.unit}`,
                            packageNumber: protection.agrotechnicalIntervention || "",
                            comments: protection.description || ""
                        });
                    });
                });

                activeCrop.fertilizations.forEach(fertilization => {
                    let fertilizationProduct = fertilizationProductsJson.find(prod => prod.id === fertilization.productId);
                    console.log(fertilizationProduct)
                    referenceParcels.forEach(parcel => {
                        agrotechnicalActivities.push({
                            cropIdentifier: activeCrop.identifier,
                            plotNumber: parcel.parcelNumber,
                            date: new Date(fertilization.date).toLocaleDateString(),
                            area: parcel.area,
                            typeOfUse: activeCrop.name,
                            typeOfActivity: "Nawożenie",
                            plantProtectionProduct: fertilizationProduct.productName || "",
                            amount: `${fertilizationProduct.quantityPerUnit} ${fertilizationProduct.unit}` || "",
                            packageNumber: fertilization.agrotechnicalIntervention || "",
                            comments: fertilization.description || ""
                        });
                    });
                });
            }
        });

        return agrotechnicalActivities;
    } catch (error) {
        console.error("Błąd podczas pobierania danych raportu:", error);
        return [];
    }
};

const generateAgrotechnicalActivitiesReportHtml = async (farmId) => {
    const activities = await getAgrotechnicalActivitiesReportData(farmId);

    let html = `<html>
<head>
    <meta charset="UTF-8">
    <title>Report</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 2px solid black; padding: 8px; text-align: center; vertical-align: middle; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <table>
        <tr>
            <th colspan="10">WYKAZ DZIAŁAŃ AGROTECHNICZNYCH</th>
        </tr>
        <tr>
            <th>Oznaczenie działki (literowe)</th>
            <th>Numer działki ewidencyjnej</th>
            <th>Data wykonania czynności [dd/mm/rrrr]</th>
            <th>Powierzchnia działki/uprawy [ha,a]</th>
            <th>Rodzaj użytkowania (uprawa w plonie głównym/uprawa w poplonie)</th>
            <th>Rodzaj wykonywanej czynności*</th>
            <th>Nazwa środka ochrony roślin</th>
            <th>Zastosowana ilość środka ochrony roślin/nawozu</th>
            <th>Działanie/interwencja/praktyka Nummer pakietu lub wariantu**</th>
            <th>Uwagi/powierzchnia wykonywanej czynności***</th>
        </tr>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
        </tr>`;

    activities.forEach(activity => {
        html += `<tr>
            <td>${activity.cropIdentifier}</td>
            <td>${activity.plotNumber}</td>
            <td>${activity.date}</td>
            <td>${activity.area}</td>
            <td>${activity.typeOfUse}</td>
            <td>${activity.typeOfActivity}</td>
            <td>${activity.nameOfPlantProtectionProduct || activity.plantProtectionProduct || "nd"}</td>
            <td>${activity.amountOfPlantProtectionProduct || activity.amount || "nd"}</td>
            <td>${activity.packageNumber}</td>
            <td>${activity.comments}</td>
        </tr>`;
    });

    html += `<tr>
        <td colspan="10" style="padding: 10px; text-align: left;">
            * należy umieścić zapisy dotyczące: zabiegów agrotechnicznych, pielęgnacyjnych i zabiegów wykonanych środkami ochrony roślin, nawożenia i innych zabiegów wykonywanych na danej działce (rolnej)<br>
            ** wpisć działanie/ interwencję odpowiednią dla oznaczenia wpisanego w kolumnie "Pakiety/warianty/ interwencje realizowane w gospodarstwie" , przy czym dla Działania rolno-środowiskowo-klimatycznego PROW 2014-2020 wpisać PRSK1420, dla Rolnictwa ekologicznego wpisać RE1420, dla Płatnosci rolno-środowiskowo-klimatycznych WPR PS wpisać ZRSK2327, dla Rolnictwa ekologicznego WPR PS wpisać RE2327, praktyka Międzyplony ozime lub wsiewki środplonowe wpisac E_MPW, praktyka Opracowanie i przestrzeganie planu nawożenia: wariant podstawowy lub wariant z wapnowaniem wpisać E_OPN, Uproszczone systemy uprawy wpisać E_USU, Wymieszanie słomy z glebą  wpisać E_WSG, Biologiczna ochrona upraw wpisać E_BOU<br>
            ***należy wypełnić, gdy dana czynność lub zabieg nie są wykonywane na całej powierzchni działki (np. gdy koszeniu podlega 20% pow. działki), bądź w celu uszczegółowienia zapisów znajdujących się w innych kolumnach tego wiersza np. wskazanie sposobu realizacji integrowanej ochrony roślin (podanie co najmniej przyczyny wykonania zabiegu środkiem ochrony roślin)
        </td>
    </tr>
    <tr>
        <td rowspan="3" style="vertical-align: top; padding: 15px; background-color: lightgray;">Pole wypełniane podczas kontroli na miejscu</td>
        <td colspan="2" style="height: 40px; background-color: lightgray;">Data kontroli</td>
        <td colspan="2" style="height: 40px; background-color: lightgray;">Nazwisko i imię inspektora</td>
        <td colspan="2" style="height: 40px; background-color: lightgray;">Podpis inspektora terenowego</td>
        <td colspan="2" style="height: 40px; background-color: lightgray;">Nazwisko i imię osoby obecnej przy kontroli</td>
        <td colspan="2" style="height: 40px; background-color: lightgray;">Podpis osoby obecnej przy kontroli</td>
    </tr>
    <tr>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
    </tr>
    <tr>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
        <td colspan="2" style="height: 40px; background-color: lightgray;"></td>
    </tr>
    </table>
</body>
</html>`;

    return html;
};

const generatePdfReport = async () => {
    try {
        const htmlContent = await generateAgrotechnicalActivitiesReportHtml();

        const file = await printToFileAsync({
            html: htmlContent,
            base64: false
        });

        console.log("Plik PDF zapisany w:", file.uri);

        await Sharing.shareAsync(file.uri);
    } catch (error) {
        console.error("Błąd generowania PDF:", error);
    }
};

export { generatePdfReport, generateAgrotechnicalActivitiesReportHtml, getAgrotechnicalActivitiesReportData };