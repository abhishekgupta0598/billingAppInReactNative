import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import { Card, Title, Paragraph, FAB } from "react-native-paper";
import { AuthService } from "../service/AuthService";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      listCopy: [],
      id: "",
      productId: "",
      index: "",
    };
  }
  componentDidMount() {
    if (!AuthService.get().isAuthenticated()) {
      this.props.navigation.navigate("Login");
    }
    const config = {
      method: "GET",
      headers: {
        Authorization: "Token jg1/" + AuthService.get().getAuthToken(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8080/getShop", config)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.map((item, index) => {
            return { index: index, ...item };
          }),
        });
        this.setState({
          listCopy: this.state.list[
            this.props.route.params.click
          ].shopkeeper.product.map((item, index) => {
            return { index: index, ...item };
          }),
        });
        this.setState({
          id: this.state.list[this.props.route.params.click].shopId,
        });
        console.log(this.state.id);
        console.log(this.state.listCopy);
      })
      .catch((error) => console.log(error));
  }

  statusHandler = (item) => {
    let index = item.index;
    let productId = this.state.listCopy.filter((items) => {
      if (items.index == index) {
        return items;
      }
    });
    let id = productId[0].id;
    console.log("index", item.index);
    if (!AuthService.get().isAuthenticated()) {
      this.props.navigation.navigate("Login");
    }
    console.log("index", item.index);
    console.log("shopId", this.state.id);
    console.log("productId", productId);
    fetch(
      `http://localhost:8080/getShop/${this.state.id}/shopkeeper/product/${id}/status/success`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(this.props.navigation.navigate("ShowDialogs"))
      .then(console.log("showDialogs"))
      .catch((error) => console.log(error));
  };

  renderItem = ({ item }) => (
    <View>
      <Card
        onPress={() => {
          console.log("filter list", item);
        }}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.flatlist}
        onLongPress={() =>
          this.props.navigation.navigate("ProductDialog", {
            product: item,
            shopId: this.state.id,
          })
        }
      >
        <Card.Content>
          <Title>Name - {item.name}</Title>
          <Title>Quantity - {item.quantity}</Title>
          <Title>Price - {item.price}</Title>
          <Title>
            Total Amount - {item.payment.amount}
            {"    "}
            {item.payment.status} {"  "}{" "}
          </Title>
          <Paragraph>
            <Button
              title="pay"
              onPress={() => {
                this.statusHandler(item);
              }}
            />
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );

  getProductList = () => {
    if (this.state.listCopy) {
      console.log("render product list", this.state.listCopy);
      return (
        <View>
          <FlatList
            data={this.state.listCopy}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      );
    }
  };
  render = () => {
    return (
      <View>
        <View>{this.getProductList()}</View>
        <View>
          <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() =>
              this.props.navigation.navigate("AddProduct", {
                shopId: this.state.id,
              })
            }
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    justifyContent: "center",
    // fontSize: "35px",
    margin: "30%",
  },
  fab: {
    position: "fixed",
    margin: 16,
    marginTop: 20,
    right: 0,
    bottom: 0,
  },
});

export default Product;
