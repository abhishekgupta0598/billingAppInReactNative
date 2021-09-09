import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AuthService } from "../service/AuthService";
import { TextInput, Button } from "react-native-paper";

class Login extends Component {
  state = {
    username: "jg1",
    password: "jg1pass",
  };

  componentDidMount() {
    if (AuthService.get().isAuthenticated()) {
      this.props.navigation.navigate("RetailerList");
      console.log("Authenticated");
    }
  }

  submitHandler = () => {
    console.log("submit", this.state.username, this.state.password);
    fetch("https://curation-sql.appspot.com/authn/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        AuthService.get().login(res.token, res.username);
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
            label="username"
            style={styles.input}
            defaultValue={this.state.username}
            placeholder="username"
            onChangeText={(text) => this.setState({ username: text })}
          />
          <TextInput
            mode="outlined"
            label="Password"
            secureTextEntry
            right={<TextInput.Icon name="eye" onPress={() => {}} />}
            style={styles.input}
            defaultValue={this.state.password}
            placeholder="Password"
            onChangeText={(text) => this.setState({ password: text })}
          />
          <View>
            <Button
              style={styles.button}
              mode="contained"
              onPress={this.submitHandler}
            >
              login
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
export default Login;
