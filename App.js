import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import Login from "./components/Login";
import RetailerList from "./components/RetailerList";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import AddRetailerList from "./components/AddRetailerList";
import ShowDialogs from "./components/ShowDialogs";
import Snackbars from "./components/Snackbars";
import ProductDialog from "./components/ProductDialog";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  state = {
    load: false,
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RetailerList" component={RetailerList} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="AddRetailerList" component={AddRetailerList} />
          <Stack.Screen name="ShowDialogs" component={ShowDialogs} />
          <Stack.Screen name="Snackbars" component={Snackbars} />
          <Stack.Screen name="ProductDialog" component={ProductDialog} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
