import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import BannerSlider from './banner';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCard, setExpandedCard] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('https://kpop-server-production.up.railway.app/news');
                const datas = await response.json();
                setData(datas["data"]);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="white" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <Text style={styles.footerText}>Made with ❤️ for Kavu</Text>

            <ScrollView style={{ marginTop: 1 }}>
                <BannerSlider />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => setExpandedCard(expandedCard === index ? null : index)}
                                activeOpacity={0.8}
                            >
                                <View style={[styles.card, expandedCard === index && styles.expandedCard]}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    {expandedCard === index && (
                                        <Text style={styles.description}>{item.content}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#09081f",
        color: "#fff",
        paddingHorizontal: 20,
        paddingBottom: 80,
        height: Dimensions.get("window").height
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 50,
        paddingHorizontal: 15,
        height: 45,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: "white",
        fontSize: 16,
    },
    footerText: {
        color: "#F46788",
        fontSize: 14,
        fontWeight: "600",
        paddingLeft: 45,
        marginTop: 10,
    },
    card: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#25274d",
        borderRadius: 8,
    },
    expandedCard: {
        backgroundColor: "#1e1f3d",
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: '#ddd',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: "#bbb",
    },
});
