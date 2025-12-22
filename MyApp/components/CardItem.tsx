import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { useCardSize } from '../app/(drawer)/theme';

interface CardItemProps {
  image: string;
  title: string;
  price: number;
  id: number;
  page: 'home' | 'shop' | 'blog';
  onToggleWishlist: (item: { id: number; name: string; price: number; image: string }) => void;
  isInWishlist: (id: number) => boolean;
  onAddToCart: (item: { id: number; title: string; price: number; image: string }) => void;
}

const CardItem: React.FC<CardItemProps> = ({ image, title, price, id, page, onToggleWishlist, isInWishlist, onAddToCart }) => {
  const { colors } = useColorTheme();
  const { cardSizeForPage } = useCardSize();
  const cardSize = cardSizeForPage(page);

  const getContrastColor = (hexColor: string): string => {
    try {
      const c = hexColor.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16) / 255;
      const g = parseInt(c.substring(2, 4), 16) / 255;
      const b = parseInt(c.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance > 0.6 ? "#000" : "#fff";
    } catch (e) {
      return "#fff";
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ id, title, price, image });
    Alert.alert("Success", `${title} added to cart!`);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist({ id, name: title, price, image });
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.background, width: cardSize.width, minHeight: cardSize.minHeight }]}>
      <View style={[styles.imageContainer, { height: cardSize.imageHeight }]}>
        <TouchableOpacity style={styles.wishlistBtn} onPress={handleToggleWishlist}>
          <Heart
            size={22}
            color={isInWishlist(id) ? "red" : "#ccc"}
            fill={isInWishlist(id) ? "red" : "none"}
          />
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.accent }]} numberOfLines={2}>{title}</Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.accent }]}>₹{price}</Text>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.secondary }]} onPress={handleAddToCart}>
            <Text style={[styles.addBtnText, { color: getContrastColor(colors.secondary) }]}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  addBtn: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CardItem;