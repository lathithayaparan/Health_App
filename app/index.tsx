import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ClickCountContext } from "./Click_Count_Context";

export default function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    age?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const { setUserEmail, setUserPassword, setYourName } =
    useContext(ClickCountContext);
  const router = useRouter();

  const handleSignUp = () => {
    setYourName(name);
    let isValid = true;
    const newErrors: {
      name?: string;
      age?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(Number(age)) || Number(age) <= 0) {
      newErrors.age = "Please enter a valid age";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setUserEmail(email);
      setUserPassword(password);
      console.log("Successfully Signed Up");

      // Clear all input fields
      setName("");
      setAge("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.push("/login"); // Navigate to login page after successful sign up
    }
  };

  return (
    <ImageBackground
      source={require("./../assets/images/health.avif")} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.headerText}>Sign Up</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#A9A9A9"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          placeholder="Age"
          placeholderTextColor="#A9A9A9"
          keyboardType="numeric"
          style={styles.input}
          value={age}
          onChangeText={setAge}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.linkText}>
            Login Here
          </Link>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Increased transparency
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E2022", // Dark gray
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3F4F6", // Soft background
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB", // Light border
    color: "#1E2022",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4F46E5", // Blue
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#4B5563",
    marginTop: 20,
  },
  linkText: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
  errorText: {
    color: "#EF4444", // Red for errors
    fontSize: 12,
    marginBottom: 8,
  },
});
