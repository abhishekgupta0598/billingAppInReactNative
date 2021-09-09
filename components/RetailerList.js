import React, { Component } from "react";
import { View, Button, Text, FlatList, StyleSheet, Alert } from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  FAB,
  Snackbar,
} from "react-native-paper";
import { AuthService } from "../service/AuthService";

class RetailerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
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
        console.log(this.state.list);
      })
      .catch((err) => console.log(err));
  }

  jump = (item) => {
    console.log("jump", item.index);
    let index = item.index;
    this.props.navigation.navigate("Product", { click: index });
  };
  renderItem = ({ item }) => (
    <View>
      <Card
        onPress={() => {
          this.jump(item);
        }}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={styles.flatlist}
        onLongPress={() => {
          this.props.navigation.navigate("Snackbars", { shop: item });
          console.log("long press");
        }}
      >
        <Card.Content>
          <Title>{item.shopName}</Title>
          <Title>{item.address}</Title>
          <Title>{item.shopkeeper.mobile_no}</Title>
        </Card.Content>
      </Card>
    </View>
  );

  getRetailerList = () => {
    if (this.state.list && this.state.list.length > 0) {
      return (
        <View>
          <FlatList
            data={this.state.list}
            renderItem={(item) => this.renderItem(item)}
            keyExtractor={(item) => item.shopId}
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
    console.log("render called for retailer list");

    return (
      <View>
        <View>{this.getRetailerList()}</View>
        <View>
          <FAB
            style={styles.fab}
            large
            icon="plus"
            onPress={() => this.props.navigation.navigate("AddRetailerList")}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  flatlist: {
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
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

export default RetailerList;
