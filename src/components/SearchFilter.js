import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchFilter = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by crop name..."
        value={searchQuery}
        onChangeText={text => onSearchQueryChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default SearchFilter;