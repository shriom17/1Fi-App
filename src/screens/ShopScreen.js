import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MarketplaceTab from '../features/marketplace/MarketplaceTab';

const COLORS = {
  purple: '#5B21B6',
  muted: '#687287',
  page: '#F8F8FA',
  white: '#FFFFFF',
};

const TABS = [
  { id: 'top_brands', label: 'Top Brands' },
  { id: 'nearby_stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerEyebrow}>1FI MARKETPLACE</Text>
        <Text style={styles.bannerTitle}>Shop today.{"\n"}Pay later with mutual funds.</Text>
        <Text style={styles.bannerSub}>No credit score required · No interest</Text>
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <Pressable key={tab.id} onPress={() => setActiveTab(tab.id)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
            {activeTab === tab.id && <View style={styles.tabIndicator} />}
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'marketplace' && <MarketplaceTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.page },
  banner: { backgroundColor: COLORS.purple, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 30 },
  bannerEyebrow: { color: '#DCD0FF', fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 },
  bannerTitle: { color: COLORS.white, fontSize: 29, fontWeight: '800', lineHeight: 35 },
  bannerSub: { color: '#E8E1FF', fontSize: 14, marginTop: 14 },
  tabContainer: { flexDirection: 'row', backgroundColor: COLORS.white, marginHorizontal: 16, marginTop: -18, borderRadius: 18, paddingHorizontal: 4, elevation: 3, shadowColor: '#24104F', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  tab: { flex: 1, minHeight: 60, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  tabText: { color: COLORS.muted, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  activeTabText: { color: COLORS.purple },
  tabIndicator: { backgroundColor: COLORS.purple, borderRadius: 3, height: 4, marginTop: 8, width: 28 },
  contentContainer: { padding: 20, paddingBottom: 36 },
});
