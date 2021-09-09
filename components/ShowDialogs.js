import React from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

const ShowDialogs = () => {
  const navigation = useNavigation();

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={true}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>YOUR PAYMENT IS SUCCESSFULLY DONE</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigation.navigate("RetailerList")}>
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default ShowDialogs;
