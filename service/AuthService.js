import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService {
  static instance = null;

  authToken = null;
  user = null;

  static get() {
    if (AuthService.instance == null) {
      console.log("AuthService initializing");
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  login = (authToken, user) => {
    this.authToken = authToken;
    this.user = user;
    // console.log('User', user);
    // console.log('authToken', authToken);
    AsyncStorage.setItem("token", authToken);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  logout = () => {
    AsyncStorage.clear().then(() => console.log("Cleared"));
    if (AsyncStorage.getItem("token") === null) {
      console.log("clear");
    }
    console.log("logout");
  };

  isAuthenticated() {
    if (this.authToken == null) {
      try {
        const authTokenFromStorage = AsyncStorage.getItem("token");
        if (authTokenFromStorage) {
          this.authToken = authTokenFromStorage;
          this.user = JSON.parse(AsyncStorage.getItem("user"));
        }
      } catch (e) {
        console.log(e);
        this.authToken = null;
        this.user = null;
      }
    }
    console.log("Auth token", this.authToken);
    return this.authToken;
  }

  getAuthToken() {
    if (!this.isAuthenticated()) {
      throw Error("not authenticated");
    }
    return this.authToken;
  }

  getUser() {
    if (!this.isAuthenticated()) {
      throw Error("not authenticated");
    }
    return this.user;
  }
}
