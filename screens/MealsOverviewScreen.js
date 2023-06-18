import { useLayoutEffect } from 'react';

import MealsList from '../components/MealsList/MealsList';
import { MEALS, CATEGORIES } from "../data/Dummy-data";


//route and navigation can be used as props as these comes with screen automatically used in stack navigator and stack.screen

function MealsOverviewScreen({ route, navigation }) {

    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        //return all meals which have categoryId
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    //setting headers dynamically different for each page based on categoryId

    //useEffect/useLayoutEffect is used to remove the warning (cannot update a component while rendering a different component) so that the componebt renders dynamically

    //useEffect(() => {
        //we removed useEffect and use useLayoutEffect because by using useEffect there is some delay in coming of title

    useLayoutEffect(() => {
        //finding categoryTitle find function will return true if category.id === catId

        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;

        navigation.setOptions({
            title: categoryTitle
        });
        //these are external dependencies which are not part of component these are imported from external component
    }, [catId, navigation]);

    return <MealsList items={displayedMeals}/>

};

export default MealsOverviewScreen;


    