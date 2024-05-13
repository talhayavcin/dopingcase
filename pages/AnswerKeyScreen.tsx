import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import questionsData from "../questionData.json"

export const AnswerKeyScreen = ({ route, navigation }: any) => {
  const { selectedOptions } = route.params;

  const handleQuestionPress = (questionIndex: number) => {
    navigation.navigate('QuestionScreen', { questionIndex });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity key={index} style={styles.questionItem} onPress={() => handleQuestionPress(index)}>
      <Text style={styles.questionLabel}>{index + 1}. Soru</Text>
      <View style={styles.optionsContainer}>
        {['A', 'B', 'C', 'D', 'E'].map((answerOption) => (
          <View key={answerOption} style={[
            styles.optionCircle,
            selectedOptions[index] === answerOption && styles.selectedOption
          ]}>
            <Text style={styles.optionText}>{answerOption}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/dersIcon.png')} style={styles.image} />
        <View style={styles.headerTextPart}>
          <Text style={styles.headerText}>Temel Kavramlar</Text>
          <Text style={styles.headerQuestionNumberText}>15 Soru</Text>
        </View>
      </View>
      <FlatList
        data={questionsData.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#305B83',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 20,
  },
  headerTextPart: {
    flexDirection: 'column',
    gap: 5,
  },
  headerText: {
    fontSize: 16,
    color: '#DCF5FF',
    fontFamily: 'Nunito-Bold',
  },
  headerQuestionNumberText: {
    fontSize: 12,
    color: '#97BDE0',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionItem: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#285178',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionLabel: {
    fontSize: 16,
    color: '#97BDE0',
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6C8EAE',
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#359ECE',
  },
  optionText: {
    color: '#97BDE0',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});

