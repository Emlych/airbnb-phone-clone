import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is the SignUpScreen component</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
        <Text>Go to Sign In page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignUpScreen;
