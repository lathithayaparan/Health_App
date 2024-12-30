import { useState, useContext } from "react";
import { useRouter } from "expo-router"; // Ensure expo-router is used for routing
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ClickCountContext } from "./Click_Count_Context";
import { Link } from "expo-router";  // Correct import for expo-router

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleLogin = () => {
    let formValid = true;
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    const sanitizedEmail = email.trim();
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
      formValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      newErrors.email = "Email address is invalid";
      formValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formValid = false;
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true);
        console.log("Login successful");
        router.push("/home");
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" });
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/health.avif")} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.8)", "rgba(200, 200, 200, 0.8)"]}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <Text style={styles.headerText}>Welcome Back!</Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#8C8C8C"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8C8C8C"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            {/* Link to the /signup route */}
            <Link href="/"> {}
              <Text style={styles.signUpText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E2022", // Dark gray
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#F3F4F6", // Light gray
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#1E2022", // Dark text
    borderWidth: 1,
    borderColor: "#D1D5DB", // Light border
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4F46E5", // Professional blue
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotContainer: {
    alignSelf: "flex-end",
  },
  forgotText: {
    color: "#6B7280", // Muted gray
    fontSize: 14,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#4B5563", // Neutral gray
    fontSize: 14,
  },
  signUpText: {
    color: "#4F46E5", // Blue
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
  errorText: {
    color: "#EF4444", // Red for errors
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
});
