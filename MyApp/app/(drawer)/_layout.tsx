import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { CardSizeProvider } from './theme';

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} />}
        onPress={() => {
          router.push('/(tab)');
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerRoot = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
          screenOptions={{
            drawerItemStyle: {
              paddingVertical: 8,
              marginHorizontal: 0,
            },
            drawerLabelStyle: {
              fontSize: 14,
              color: '#333',
            },
            headerShown: false,  // Hide all default headers
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}
        >
        {/* Home screen that renders tabs */}
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => <MaterialIcons name="home" size={20} color={color} />,
            drawerLabel: 'Home',
            headerShown: false,
          }}
        />
        {/* Hide default Dashboard item, only show in custom drawerContent */}
        <Drawer.Screen
          name="product/index"
          options={{
            title: 'Products',
            drawerIcon: ({ color }) => <MaterialIcons name="inventory" size={20} color={color} />,
            drawerLabel: 'Products',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="category/index"
          options={{
            title: 'Categories',
            drawerIcon: ({ color }) => <MaterialIcons name="category" size={20} color={color} />,
            drawerLabel: 'Categories',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="order/index"
          options={{
            title: 'Orders',
            drawerIcon: ({ color }) => <MaterialIcons name="receipt-long" size={20} color={color} />,
            drawerLabel: 'Orders',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="return/index"
          options={{
            title: 'Returns',
            drawerIcon: ({ color }) => <MaterialIcons name="keyboard-return" size={20} color={color} />,
            drawerLabel: 'Returns',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="setting/index"
          options={{
            title: 'Settings',
            drawerIcon: ({ color }) => <MaterialIcons name="settings" size={20} color={color} />,
            drawerLabel: 'Settings',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="theme/index"
          options={{
            title: 'Theme',
            drawerIcon: ({ color }) => <MaterialIcons name="palette" size={20} color={color} />,
            drawerLabel: 'Theme',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            title: 'About',
            drawerIcon: ({ color }) => <MaterialIcons name="info" size={20} color={color} />,
            drawerLabel: 'About',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
            drawerIcon: ({ color }) => <MaterialIcons name="person" size={20} color={color} />,
            drawerLabel: 'Profile',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            drawerIcon: ({ color }) => <MaterialIcons name="favorite" size={20} color={color} />,
            drawerLabel: 'Wishlist',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="cart"
          options={{
            title: 'Cart',
            drawerIcon: ({ color }) => <MaterialIcons name="shopping-cart" size={20} color={color} />,
            drawerLabel: 'Cart',
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerRoot;
