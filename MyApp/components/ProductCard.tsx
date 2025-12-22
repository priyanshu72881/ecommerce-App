import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCardSize } from '../app/(drawer)/theme';

interface ProductCardProps {
  item: {
    id: number;
    name?: string;
    title?: string;
    price: number | string;
    image?: any;
    img?: any;
    discount?: number;
    brand?: string;
    off?: number;
    old?: number;
  };
  onPress?: () => void;
}

export default function ProductCard({ item, onPress }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { cardSize } = useCardSize();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title || item.name || '',
      price: item.price,
      image: item.image || item.img,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: item.id,
      name: item.name || item.title,
      price: item.price,
      image: item.image || item.img,
    });
  };

  return (
    <View style={[styles.card, { width: cardSize.width, minHeight: cardSize.minHeight }]}>
      <View style={styles.imageContainer}>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount} OFF</Text>
          </View>
        )}
        {item.off && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.off}% Off</Text>
          </View>
        )}

        <TouchableOpacity style={styles.wishlistBtn} onPress={handleToggleWishlist}>
          <Heart
            size={22}
            color={isInWishlist(item.id) ? 'red' : '#ccc'}
            fill={isInWishlist(item.id) ? 'red' : 'none'}
          />
        </TouchableOpacity>

        <Image
          source={item.image || item.img}
          style={[styles.image, { height: cardSize.imageHeight }]}
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Plus size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name || item.title}
        </Text>
        {item.brand && <Text style={styles.brand}>By {item.brand}</Text>}

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.old && <Text style={styles.oldPrice}>₹{item.old}</Text>}
        </View>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 6,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#10b981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  addBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#10b981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#10b981',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  addToCartBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 8,
    borderRadius: 6,
    width: '100%',
  },
  addToCartText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});