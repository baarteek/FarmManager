import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../styles/AppStyles";
import { Entypo } from '@expo/vector-icons';

const ExpandableComponent = ({title, backgroundColor, titleColor, style, children, isExpanded = true}) => {
    const [expanded, setExpanded] = useState(isExpanded);
    const background = backgroundColor || '#DFF6DF';
    const titleColo = titleColor || '#22734D';

    return (
        <>
            <View style={expanded ? [styles.topContainer, {backgroundColor: background}, style] : [expandedStyles.topContainer, {backgroundColor: background}, style]}>
                <TouchableOpacity onPress={() => setExpanded(!expanded) } style={expandedStyles.touchableElement}>
                    <Text style={[styles.subtitle, {color: titleColo}]}>{title}</Text>
                    {
                        expanded ? <Entypo name="chevron-up" size={26} color={titleColor} style={expandedStyles.icon} /> : 
                        <Entypo name="chevron-down" size={26} color={titleColor} style={expandedStyles.icon} />
                    }
                </TouchableOpacity>
            </View>
            {
                expanded && (
                    <View style={[expandedStyles.bottomContainer, {backgroundColor: background}, style]}>
                        { children }
                    </View>
                )
            }
        </>
    );
};

const expandedStyles = StyleSheet.create({
    topContainer: {
        backgroundColor: '#DFF6DF',
        marginTop: '5%',
        marginBottom: "1%",
        width: '90%',
        padding: '4%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    bottomContainer: {
        backgroundColor: '#DFF6DF',
        width: '90%',
        padding: '4%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    touchableElement: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '2%',
    },
    icon: {
        position: 'absolute', 
        right: '5%'
    }
});

export default ExpandableComponent;
