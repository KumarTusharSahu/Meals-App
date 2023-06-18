import { View, Text, StyleSheet } from 'react-native';
function MealDetails({ duration, complexity, affordability, style, textStyle  }) {
    // style and textstyle props above are used for cascading styles which are used in MealDetailScreen
    return (
        <View style={[styles.details, style ]}>
            <Text style={[styles.detailItem, textStyle]}>{duration}Min</Text>
            <Text style={[styles.detailItem, textStyle]}>{complexity.toUpperCase()}</Text>
            <Text style={[styles.detailItem, textStyle]}>{affordability.toUpperCase()}</Text>
        </View>
    );
};

export default MealDetails;

const styles=StyleSheet.create({
    details:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
    },
    detailItem:{
        marginHorizontal:8,
        fontSize:12,
    },
});