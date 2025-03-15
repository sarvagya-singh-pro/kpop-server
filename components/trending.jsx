import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TrendingScreen = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const chartData = await (await fetch('https://kpop-server-production.up.railway.app/api/melon-chart')).json();
        console.log(chartData.data);
        setSongs(chartData.data);
        setFilteredSongs(chartData.data);
      } catch (error) {
        console.error("Error fetching Melon Chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, []);

  const handleSearch = (query) => {
    setText(query);
    if (query.trim() === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top 100 Trending Songs</Text>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="white" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={text}
          onChangeText={handleSearch}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#F46788" />
      ) : (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.songItem}>
              <Text style={styles.rank}>{index + 1}.</Text>
              <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TrendingScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#09081f",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  rank: {
    fontSize: 16,
    color: "#F46788",
    fontWeight: "bold",
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: "white",
  },
  artist: {
    fontSize: 14,
    color: "gray",
  },
});
