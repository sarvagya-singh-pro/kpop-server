import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function LoveNote() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>To the Love of My Life 💖</Text>
            <Text style={styles.message}>
                Every single day, I find new reasons to love you even more. 
                Your smile brightens my world, your kindness warms my heart, 
                and your presence makes everything feel just right. 

                No words can truly capture how much you mean to me. 
                You are my happiness, my strength, and my forever. 
                No matter where life takes us, my love for you will always remain. 

                You are my dream come true, my greatest gift, and my heart's greatest joy. 
                I love you more than words can say. 💕
            </Text>
            <Text style={styles.footer}>Forever Yours, Always. 💞</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#09081f',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F46788',
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#ddd',
        textAlign: 'center',
        lineHeight: 28,
    },
    footer: {
        fontSize: 16,
        color: '#F46788',
        textAlign: 'center',
        marginTop: 20,
    },
});
