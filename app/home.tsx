import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./Click_Count_Context";

type HealthItem = {
  id: number;
  activity: string;
  calories_burned_per_hour: number;
  imageUrl: string; // Add imageUrl to health item type
};

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  const [healthItems, setHealthItems] = useState<HealthItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthItems = async () => {
      try {
        const activity = "running"; // Example activity; you can replace this dynamically
        const apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`;
        const response = await fetch(apiUrl, {
          headers: {
            "X-Api-Key": "r0kFPQwynpchwzA1h3grFA==S6AvfIsMdwHhkpuc", // Replace with your actual API key
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Transform the API response to fit the HealthItem type
        const transformedHealthItems = data.map((item: any, index: number) => ({
          id: index + 1,
          activity: item.name || "Unknown Activity",
          calories_burned_per_hour: item.calories_per_hour || 0,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150", // Add a placeholder image URL if not provided
        }));

        setHealthItems(transformedHealthItems);
      } catch (error: any) {
        console.error("Error fetching health items:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthItems();
  }, []);

  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Welcome !! {yourName}</Text>
      </View>

      {/* Health Items List */}
      <FlatList
        data={healthItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image
              source={{
                uri: item.imageUrl, // Dynamically set the image URL
              }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.activity}</Text>
              <Text style={styles.cardDescription}>
                Calories Burned Per Hour: {item.calories_burned_per_hour} kcal
              </Text>
              <Text style={styles.statusTag}>
                {item.calories_burned_per_hour > 300
                  ? "High Burn"
                  : "Moderate Burn"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Light background for contrast
  },
  topBar: {
    height: 70,
    backgroundColor: "#3498db", // A cool blue color for the top bar
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  topBarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 8, // Shadow for the card
    overflow: "hidden",
    flexDirection: "row", // Align image and text in a row
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20, // Adds more space between the cards
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 12, // Rounded corners on the image
    marginRight: 20, // Spacing between image and text
  },
  cardContent: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  statusTag: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27ae60", // Green color for high burn
    marginTop: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
