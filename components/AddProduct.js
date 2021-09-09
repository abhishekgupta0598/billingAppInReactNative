import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AuthService } from "../service/AuthService";
import { TextInput, Button } from "react-native-paper";

class AddProduct extends Component {
  state = {
    name: "",
    quantity: 0,
    price: 0,
    amount: 0,
    status: "pending",
    shopId: "",
    list: [],
  };

  componentDidMount() {
    if (AuthService.get().isAuthenticated()) {
      //   this.props.navigation.navigate("RetailerList");
      this.setState({ shopId: this.props.route.params.shopId });
      this.setState({ amount: this.state.price * this.state.quantity });
      console.log("Authenticated", this.state.shopId);
    }
  }

  submitHandler = () => {
    // console.log("submit", this.state.username, this.state.password);
    // let id = this.props.route.params.shopId;
    fetch(
      `http://localhost:8080/getShopById/${this.state.shopId}/shopkeeper/product`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: this.state.name,
            quantity: this.state.quantity,
            price: this.state.price,
            payment: {
              amount: this.state.amount,
              status: this.state.status,
            },
          },
        ]),
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        this.setState({ list: res });
        this.props.navigation.navigate("RetailerList");
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
            label="name"
            style={styles.input}
            placeholder="name"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextInput
            mode="outlined"
            // label="quantity"
            style={styles.input}
            placeholder="quantity"
            defaultValue={this.state.quantity}
            onChangeText={(text) => this.setState({ quantity: text })}
          />
          <TextInput
            mode="outlined"
            // label="price"
            style={styles.input}
            placeholder="price"
            defaultValue={this.state.price}
            onChangeText={(text) => {
              this.setState({ price: text });
            }}
          />
          <TextInput
            mode="outlined"
            // label="amount"
            style={styles.input}
            placeholder="amount"
            defaultValue={this.state.quantity * this.state.price}
            onChangeText={(text) => this.setState({ amount: text })}
          />
          <TextInput
            mode="outlined"
            label="status"
            style={styles.input}
            placeholder="status"
            defaultValue={this.state.status}
            onChangeText={(text) => this.setState({ status: text })}
          />
          <View>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.submitHandler}
            >
              add product
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
