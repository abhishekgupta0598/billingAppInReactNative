import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AuthService } from "../service/AuthService";
import { TextInput, Button } from "react-native-paper";

class AddProduct extends Component {
  state = {
    shopId: "",
    shopName: "",
    address: "",
    mobile_no: "",
    name: "",
  };

  componentDidMount() {
    if (AuthService.get().isAuthenticated()) {
      console.log("Authenticated");
    }
  }

  submitHandler = () => {
    fetch("http://localhost:8080/createShop", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: this.state.shopId,
        shopName: this.state.shopName,
        address: this.state.address,
        shopkeeper: {
          mobile_no: this.state.mobile_no,
          name: this.state.name,
        },
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        this.setState({ list: res });
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View>
        <View>
          <TextInput
            mode="outlined"
            label="shopId"
            style={styles.input}
            placeholder="shopId"
            onChangeText={(text) => this.setState({ shopId: text })}
          />
          <TextInput
            mode="outlined"
            label="shopName"
            style={styles.input}
            placeholder="shopName"
            onChangeText={(text) => this.setState({ shopName: text })}
          />
          <TextInput
            mode="outlined"
            label="address"
            style={styles.input}
            placeholder="address"
            onChangeText={(text) => this.setState({ address: text })}
          />
          <TextInput
            mode="outlined"
            label="mobile_no"
            style={styles.input}
            placeholder="mobile_no"
            onChangeText={(text) => this.setState({ mobile_no: text })}
          />
          <TextInput
            mode="outlined"
            label="name"
            style={styles.input}
            placeholder="name"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.submitHandler}
            >
              add shop
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 5,
  },
  button: {
    marginTop: "3%",
    marginRight: "5%",
    marginLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AddProduct;
