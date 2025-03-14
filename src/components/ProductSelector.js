import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/AppStyles';

const ProductSelector = ({ 
  products = [], 
  selectedProduct, 
  onSelect, 
  onAdd, 
  onEdit, 
  onDelete 
}) => {

  const productCardStyle = {
    width: 120,
    height: 140,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz produkt nawozowy</Text>
      {products.length === 0 ? (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={styles.largeText}>Brak dodanych produktów</Text>
          <TouchableOpacity 
            style={[styles.button, { marginVertical: 10, width: '80%', backgroundColor: '#62C962' }]} 
            onPress={onAdd}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#fff' }}>
              Dodaj nowy produkt
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
          style={{ marginVertical: 10 }}
        >
          {products.map(product => (
            <TouchableOpacity 
              key={product.id}
              style={[
                productCardStyle, 
                selectedProduct && selectedProduct.id === product.id && { borderColor: '#62C962' }
              ]}
              onPress={() => onSelect(product)}
            >
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{product.productName}</Text>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>{product.manufacturer}</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {onEdit && (
                  <TouchableOpacity 
                    onPress={() => onEdit(product)}
                    style={{ marginRight: 5 }}
                  >
                    <Text style={{ fontSize: 12, color: '#007BFF' }}>Edytuj</Text>
                  </TouchableOpacity>
                )}
                {onDelete && (
                  <TouchableOpacity onPress={() => onDelete(product)}>
                    <Text style={{ fontSize: 12, color: '#FF0000' }}>Usuń</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={[productCardStyle, { justifyContent: 'center', alignItems: 'center' }]}
            onPress={onAdd}
          >
            <Text style={{ fontSize: 30 }}>➕</Text>
            <Text style={{ fontSize: 12, textAlign: 'center' }}>Dodaj nowy</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default ProductSelector;