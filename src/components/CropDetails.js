import ExpandableComponent from "./ExpandableComponent";
import { styles } from "../styles/AppStyles";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CropDetails = ({cropData}) => {
    return (
        <View style={styles.container}>
            <ExpandableComponent title={cropData.name} >
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Crop Type</Text>
                    <Text style={styles.text}>{cropData.cropType}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Growth Stage:</Text>
                    <Text style={styles.text}>{cropData.growthStage}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Sowing Date:</Text>
                    <Text style={styles.text}>{cropData.sowingDate}</Text>
                </View>
                <View style={styles.line} />
                <ExpandableComponent title="Treatment History" backgroundColor="#BAF1BA" style={{width: '100%'}}>
                {
                    cropData.history && cropData.history.length > 0 ? (
                        cropData.history.map((entry, index) =>(
                            <>
                                <View key={index} style={styles.infoRowContainer}>
                                    <Text style={[styles.text, {fontSize: 14}]}>{entry.date}</Text>
                                    <Text style={[styles.text, {fontSize: 14}]}>{entry.description}</Text>
                                </View>
                                <View style={[styles.line, {borderColor: '#DFF6DF'}]} />
                            </>
                        ))
                    ) : (
                        <Text style={styles.text}>There is no treatment history for this crop</Text>
                    )
                }
                </ExpandableComponent>
                <ExpandableComponent title="Details" backgroundColor="#BAF1BA" style={{width: '100%'}}>
                    <View style={styles.infoRowContainer}>
                        <Text style={[styles.text]}>Area:</Text>
                        <Text style={[styles.text]}>{cropData.details.area} ha</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF'}]} />
                    <View style={styles.infoRowContainer}>
                        <Text style={[styles.text]}>Siol Type:</Text>
                        <Text style={[styles.text]}>{cropData.details.soilType}</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF'}]} />
                    <View style={styles.infoRowContainer}>
                        <Text style={[styles.text]}>Soil PH:</Text>
                        <Text style={[styles.text]}>{cropData.details.soilPH}</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF'}]} />
                </ExpandableComponent>
                <View style={[styles.rowContainer, {justifyContent: 'space-around', marginTop: '3%'}]}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#FC7F7F'}]}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>
        </View>
    )
};

export default CropDetails;