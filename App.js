import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import { CartProvider, useCart } from './src/utils/CartContext';
import { COLORS } from './src/data/menu';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import InfoScreen from './src/screens/InfoScreen';
import FloatingBubbles from './src/components/FloatingBubbles';

// Keep splash visible while we set up
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

// ─── Tab Navigator ────────────────────────────────────────────────────────────
function AppTabs() {
  const { cartCount } = useCart();
  const insets = useSafeAreaInsets();
  const TAB_H = 60 + insets.bottom;

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: TAB_H,
            paddingBottom: insets.bottom,
            backgroundColor: COLORS.card,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            elevation: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 12,
          },
          tabBarActiveTintColor: COLORS.brand,
          tabBarInactiveTintColor: COLORS.textLight,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginBottom: 4 },
          tabBarIcon: ({ focused, color }) => {
            const icons = {
              Home:  focused ? 'home'        : 'home-outline',
              Menu:  focused ? 'restaurant'  : 'restaurant-outline',
              Cart:  focused ? 'cart'        : 'cart-outline',
              Info:  focused ? 'information-circle' : 'information-circle-outline',
            };
            const icon = icons[route.name] || 'ellipse';
            return <Ionicons name={icon} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: cartCount > 0 ? cartCount : undefined,
            tabBarBadgeStyle: {
              backgroundColor: COLORS.brand,
              color: '#fff',
              fontSize: 10,
              fontWeight: '800',
              minWidth: 18,
              height: 18,
              lineHeight: 18,
            },
          }}
        />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>

      {/* Floating Bubbles — always above tabs but below nothing */}
      <FloatingBubbles bottomOffset={TAB_H + 16} />
    </View>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function AnimatedSplash({ onFinish }) {
  const opacity = React.useRef(new Animated.Value(1)).current;
  const scale   = React.useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    // Pop in
    Animated.spring(scale, {
      toValue: 1, useNativeDriver: true,
      tension: 50, friction: 6,
    }).start();
    // Then fade out after 2s
    const t = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0, duration: 500, useNativeDriver: true,
      }).start(onFinish);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View style={[styles.splash, { opacity }]}>
      <Animated.Text style={[styles.splashEmoji, { transform: [{ scale }] }]}>
        🔥
      </Animated.Text>
      <Animated.Text style={[styles.splashBrand, { transform: [{ scale }] }]}>
        Love n' Grill
      </Animated.Text>
      <Text style={styles.splashTagline}>FRESH  •  HOT  •  DELIVERED</Text>
    </Animated.View>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  // Hide Expo splash once component mounts
  const onLayoutRootView = useCallback(async () => {
    if (appReady) await SplashScreen.hideAsync();
  }, [appReady]);

  useEffect(() => {
    // Simulate resource loading (fonts, data, etc.)
    const t = setTimeout(() => setAppReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!appReady) return null;

  return (
    <SafeAreaProvider>
      <CartProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.brand} />
          {!splashDone ? (
            <AnimatedSplash onFinish={() => setSplashDone(true)} />
          ) : (
            <NavigationContainer>
              <AppTabs />
            </NavigationContainer>
          )}
        </View>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: COLORS.brand,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  splashEmoji: { fontSize: 80, marginBottom: 8 },
  splashBrand: {
    fontSize: 38, fontWeight: '900', color: '#fff', letterSpacing: -1,
  },
  splashTagline: {
    fontSize: 12, color: 'rgba(255,255,255,0.75)',
    letterSpacing: 3, fontWeight: '600', marginTop: 8,
  },
});
