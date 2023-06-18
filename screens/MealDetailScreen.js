import { useContext, useLayoutEffect } from 'react';
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/Dummy-data';
// import { FavoritesContext } from '../store/context/favorites-context';
import { addFavorite,removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
    // const favoriteMealsCtx = useContext(FavoritesContext);         this was used at the time of context 

    const favoriteMealIds = useSelector((state)=>state.favoriteMeals.ids);
    const dispatch=useDispatch();

    //route give access to params
    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    //Method-2 of adding button in header m-1 in app.js

    function changeFavoritesStatusHandler() {
        //favourite the meal if it is not and vice versa
        if(mealIsFavorite){
            // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({id:mealId}));
        }
        else{
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({id:mealId}));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                //using default button
                //return <Button title='Tap me!' onPress={headerButtonPressedHandler}/>

                //using custom button
                return (
                <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline' }
                    color="white"
                    onPress={changeFavoritesStatusHandler}
                />
                );
            },
        });
    }, [navigation, changeFavoritesStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            {/* always set width and height while fetching image from web otherwise the image will be not not shown this is not necessary while taking image from the system */}
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>

        </ScrollView>
    )


};

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: 'white',
    },
    listContainer: {
        width: '80%',
    },
    listOuterContainer: {
        alignItems: 'center',
    },

});