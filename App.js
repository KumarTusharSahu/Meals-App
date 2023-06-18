import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavouritesScreen from './screens/FavoritesScreen';
// import FavouritesContextProvider from './store/context/favorites-context';

import { store } from './store/redux/store';


//drawer navigator doesn't work so see and install from this site  ->> https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        //contentStyle: { backgroundColor: '#3f2f25' }    it doesn't work in drawer navigator we have to use below code to change color
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1'
      }}>
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (<Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (<Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavouritesContextProvider>       this was used at the time of context */}

      {/* Above is configuring FavoritesScreen using context and this one is using Redux */}


      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25' }
            }}>
            <Stack.Screen
              name="Drawer"
              // component={CategoriesScreen}
              component={DrawerNavigator}
              options={{
                //title: 'All Categories',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
            //setting headers dynamically different for each page based on categoryId

            //Method-1

            // options={({ route, navigation }) => {
            //   const catId = route.params.categoryId;
            //   return {
            //     title: catId,
            //   };
            // }}

            //Method-2
            //used in MealsOverviewScreen

            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}

              //Method 1 of adding button on header but not good as we write it in App.js this will not useful when we want to render items from other screen Method-2 in MealDetailScreen.js

              // options={{headerRight: ()=>{
              //   return <Button title='Tap me!'/>
              // }
              // }}

              options={{ title: "About the Meal" }}
            />
          </Stack.Navigator>
          {/* <CategoriesScreen /> */}
        </NavigationContainer>
      </Provider>
      {/* </FavouritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({

});