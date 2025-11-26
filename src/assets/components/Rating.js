import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Rating({ rating }) {
  // Garante que o rating fique entre 0 e 5
  const normalizedRating = Math.max(0, Math.min(rating ?? 0, 5));

  // Número de estrelas cheias
  const filledStars = Math.floor(normalizedRating);
  // Verifica se há meia estrela
  const hasHalfStar = normalizedRating - filledStars >= 0.5;
  // Número de estrelas vazias
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  // Monta o array com os tipos de ícones
  const stars = [
    ...Array(filledStars).fill('star'), // cheias
    ...(hasHalfStar ? ['star-half-full'] : []), // meia estrela
    ...Array(emptyStars).fill('star-o'), // vazias
  ];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{normalizedRating.toFixed(1)}</Text>
      {stars.map((type, index) => (
        <FontAwesome key={index} name={type} size={12} color="yellow" />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: {
    marginRight: 4,
    fontFamily: 'Menlo',
    fontSize: 14,
    color: "white"
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
});
