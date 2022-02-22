import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const SignInScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const ApiUrl = "https://express-airbnb-api.herokuapp.com/";
  return (
    <KeyboardAwareScrollView>
      {isLoading ? (
        <View style={[styles.loading]}>
          <ActivityIndicator size="large" color="#EB5A62" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleH1}>Sign In</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChange={(email) => setEmail(email)}
              value={email}
              placeholder="email"
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              onChange={(password) => setPassword(password)}
              value={password}
              placeholder="password"
              secureTextEntry={true}
              editable={!isLoading}
            />
          </View>

          {isValid ? (
            <Text></Text>
          ) : (
            <Text style={styles.warning}>Please fill all fields</Text>
          )}

          <TouchableOpacity
            title="Sign in"
            onPress={async () => {
              if (!email || !password) {
                alert("Name or Email is invalid");
                setIsValid(false);
                return;
              }
              setIsLoading(true);
              try {
                const response = await axios.post(`${ApiUrl}/user/log_in`, {
                  email,
                  password,
                });
                if (response.status === 201) {
                  alert(
                    `You have been registered : ${JSON.stringify(
                      response.data
                    )}`
                  );
                  setIsLoading(false);
                  setEmail("");
                  setPassword("");
                  const userToken = "secret-token";
                  setToken(userToken);
                } else {
                  throw new Error("An error has occured");
                }
              } catch (error) {
                alert("An error has occured");
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            style={styles.button}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 25,
    paddingRight: 25,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  titleH1: {
    fontSize: 24,
    marginTop: 60,
    marginBottom: 70,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 44,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    marginBottom: 40,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 22,
    borderWidth: 3,
    borderColor: "#EB5A62",
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 25,
  },
  warning: {
    color: "red",
    marginBottom: 15,
  },
});

export default SignInScreen;
