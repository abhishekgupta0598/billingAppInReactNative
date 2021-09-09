import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Snackbar,
  Dialog,
  Provider,
  Portal,
  Paragraph,
  Button,
} from "react-native-paper";
import { AuthService } from "../service/AuthService";

class ProductDialog extends Component {
  state = {
    list: [],
    id: "",
    visible: true,
    shopId: "",
  };
  componentDidMount() {
    if (!AuthService.get().isAuthenticated()) {
      this.props.navigation.navigate("Login");
    }
    this.setState({ id: this.props.route.params.product.id });
    this.setState({ shopId: this.props.route.params.shopId });
  }

  submitHandler = () => {
    console.log(this.props.route.params.product.id);
    console.log(this.props.route.params.shopId);
    const config = {
      method: "DELETE",
      headers: {
        Authorization: "Token jg1/" + AuthService.get().getAuthToken(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8080/getShop/${this.state.shopId}/shopkeeper/deleteProduct/${this.state.id}`,
      config
    )
      .then(this.props.navigation.navigate("RetailerList"))
      .then(console.log("deleteProduct"))
      .catch((err) => console.log(err));
  };

  visibleHandler = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate("Product");
  };

  render() {
    return (
      <Provider>
        <View>
          <Portal>
            <Dialog visible={this.state.visible}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Delete product?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={this.visibleHandler}>CANCLE</Button>
                <Button onPress={this.submitHandler}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//     // display: "none",
//   },
// });

export default ProductDialog;
