import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FunctionListButton = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  const closeList = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeList}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: isExpanded ? 150 : 50,
              backgroundColor: isExpanded ? '#808080' : '#28a745',
              borderRadius: isExpanded ? 10 : 25,
            },
          ]}
          onPress={toggleList}
        >
          <Icon name="menu" size={30} color="white" />
          {isExpanded && (
            <Text style={styles.buttonText}>
                Collapse list
            </Text>
          )}
        </TouchableOpacity>

        {isExpanded && (
          <TouchableWithoutFeedback>
            <View style={styles.listContainer}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingHorizontal: '5%',
  },
  buttonText: {
    color: 'white',
    marginLeft: '5%',
    fontSize: 16,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: '5%',
    padding: '5%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default FunctionListButton;
