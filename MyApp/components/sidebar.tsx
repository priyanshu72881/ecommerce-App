import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Home', route: '/(tab)', icon: 'dashboard' },
  { label: 'Products', route: '/(drawer)/product', icon: 'inventory' },
  { label: 'Categories', route: '/(drawer)/category', icon: 'category' },
  { label: 'Orders', route: '/(drawer)/order', icon: 'receipt-long' },
  { label: 'Returns', route: '/(drawer)/return', icon: 'keyboard-return' },
  { label: 'Settings', route: '/(drawer)/setting', icon: 'settings' },
  { label: 'Theme', route: '/(drawer)/theme', icon: 'palette' },
  { label: 'About', route: '/(drawer)/about', icon: 'info' },
  { label: 'Profile', route: '/(drawer)/profile', icon: 'person' },
  { label: 'Wishlist', route: '/(drawer)/wishlist', icon: 'favorite' },
  { label: 'Cart', route: '/(drawer)/cart', icon: 'shopping-cart' },
  { label: 'Contact', route: '/(drawer)/contact', icon: 'phone' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>('/(tab)');
  const slideAnim = React.useRef(new Animated.Value(isOpen ? 0 : -300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, slideAnim]);

  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    router.push(route as any);
    onClose?.();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.sidebarContent}>
          {/* Header */}
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Navigation Items */}
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            {sidebarItems.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.sidebarItem,
                  activeRoute === item.route && styles.sidebarItemActive,
                ]}
                onPress={() => handleNavigate(item.route)}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={20}
                  color={activeRoute === item.route ? '#007AFF' : '#666'}
                />
                <Text
                  style={[
                    styles.sidebarItemText,
                    activeRoute === item.route && styles.sidebarItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  sidebarItemActive: {
    borderLeftColor: '#007AFF',
    backgroundColor: '#f5f5f5',
  },
  sidebarItemText: {
    marginLeft: 16,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sidebarItemTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
