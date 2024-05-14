import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image, RefreshControl } from 'react-native';
import questionsData from "../questionData.json"

type Question = {
  questionIntro: string;
  questionText: string;
  options: string[];
  answer: string;
};

export const AnswerKeyScreen = ({ route, navigation }: any) => {
  const { selectedOptions } = route.params;
  const questionCount = questionsData.data.length;
  const [refreshing, setRefreshing] = useState(false);

  const handleQuestionPress = (questionIndex: number) => {
    navigation.navigate('QuestionScreen', { questionIndex, selectedOptions });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item, index }: { item: Question, index: number}) => {

    const selectedOption = selectedOptions[index];

    return (
      <TouchableOpacity activeOpacity={0.8} key={index} style={styles.questionItem} onPress={() => handleQuestionPress(index)}>
        <Text style={styles.questionLabel}>{index + 1}. Soru</Text>
        <View style={styles.optionsContainer}>
          {['A', 'B', 'C', 'D', 'E'].map((answerOption) => {
            const isSelected = selectedOption && selectedOption.startsWith(answerOption);
            return (
              <View key={answerOption} style={[
                styles.optionCircle,
                isSelected && styles.selectedOption
              ]}>
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                  {answerOption}
                </Text>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/dersIcon.png')} style={styles.image} />
        <View style={styles.headerTextPart}>
          <Text style={styles.headerText}>Temel Kavramlar</Text>
          <Text style={styles.headerQuestionNumberText}>{questionCount} Soru</Text>
        </View>
      </View>
      <FlatList
        data={questionsData.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    width: '95%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
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
  questionItem: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#285178',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  questionLabel: {
    fontSize: 16,
    color: '#97BDE0',
    marginBottom: 0,
    marginLeft: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8 
  },
  optionCircle: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6C8EAE',
    borderWidth: 1,
    marginLeft: 10,
  },
  selectedOption: {
    backgroundColor: '#359ECE',
    borderWidth: 0
  },
  optionText: {
    color: '#97BDE0',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
});

