import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id)=>{},
    removeFavorite: (id)=>{},    
});

function FavoritesContextProvider({children}){
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id){
        //updating state array with current & previous objects
        setFavoriteMealIds((currentFavIds)=> [...currentFavIds, id]);
    }

    function removeFavorite(id){
        //if mealId=>mealId!=id then it will keep it
        setFavoriteMealIds((currentFavIds)=>
         currentFavIds.filter((mealId)=>mealId!==id)
         );
    }

    const value={
        ids: favoriteMealIds,
         //front one is attribute of object and last one is addFavourite Function
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    };

    return (
    <FavoritesContext.Provider value={value}>
        {children}
    </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;