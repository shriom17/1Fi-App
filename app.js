import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace'); // 'top_brands' | 'nearby_stores' | 'marketplace'

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Shop today, Pay later using Mutual funds.</Text>
        <Text style={styles.bannerSub}>No credit score required. No interest.</Text>
      </View>

      {/* 3 Tabs Container */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'top_brands' && styles.activeTab]} 
          onPress={() => setActiveTab('top_brands')}
        >
          <Text style={[styles.tabText, activeTab === 'top_brands' && styles.activeTabText]}>Top Brands</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'nearby_stores' && styles.activeTab]} 
          onPress={() => setActiveTab('nearby_stores')}
        >
          <Text style={[styles.tabText, activeTab === 'nearby_stores' && styles.activeTabText]}>Nearby Stores</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'marketplace' && styles.activeTab]} 
          onPress={() => setActiveTab('marketplace')}
        >
          <Text style={[styles.tabText, activeTab === 'marketplace' && styles.activeTabText]}>1Fi Marketplace</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {activeTab === 'top_brands' && (
          <View style={styles.blankView}>
            <Text style={styles.blankText}>Top Brands (No implementation required / Blank)</Text>
          </View>
        )}

        {activeTab === 'nearby_stores' && (
          <View style={styles.blankView}>
            <Text style={styles.blankText}>Nearby Stores (No implementation required / Blank)[cite: 1]</Text>
          </View>
        )}

        {activeTab === 'marketplace' && (
          <View style={styles.marketplaceView}>
            <Text style={styles.sectionTitle}>1Fi Marketplace</Text>
            
            {/* Sample Product Card */}
            <View style={styles.productCard}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>Product Image</Text>
              </View>
              <Text style={styles.productName}>Premium Tech Laptop (Variant: 16GB/512GB)</Text>
              <Text style={styles.productPrice}>₹65,000</Text>
              
              <Text style={styles.emiTitle}>Select EMI Plan:</Text>
              <View style={styles.emiRow}>
                <TouchableOpacity style={styles.emiChip}>
                  <Text style={styles.emiText}>3 Mos No-Cost</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.emiChip, styles.selectedEmi]}>
                  <Text style={styles.selectedEmiText}>6 Mos No-Cost</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaText}>Proceed with Selected Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  banner: { backgroundColor: '#5B21B6', padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  bannerSub: { color: '#E2E8F0', fontSize: 12, marginTop: 4 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', margin: 15, borderRadius: 25, padding: 4, elevation: 2 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 20 },
  activeTab: { backgroundColor: '#EDE9FE' },
  tabText: { color: '#64748B', fontWeight: '600', fontSize: 12 },
  activeTabText: { color: '#5B21B6', fontWeight: 'bold' },
  contentContainer: { padding: 15 },
  blankView: { height: 250, justifyContent: 'center', alignItems: 'center' },
  blankText: { color: '#94A3B8', fontStyle: 'italic', fontSize: 13 },
  marketplaceView: { width: '100%' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#1E293B' },
  productCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 1 },
  imagePlaceholder: { height: 140, backgroundColor: '#F1F5F9', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  imageText: { color: '#94A3B8', fontSize: 12 },
  productName: { fontSize: 15, fontWeight: 'bold', color: '#1E293B' },
  productPrice: { fontSize: 14, color: '#059669', fontWeight: '600', marginTop: 4 },
  emiTitle: { fontSize: 13, fontWeight: '600', marginTop: 12, color: '#475569' },
  emiRow: { flexDirection: 'row', marginTop: 8, gap: 8 },
  emiChip: { borderWidth: 1, borderColor: '#CBD5E1', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  selectedEmi: { backgroundColor: '#5B21B6', borderColor: '#5B21B6' },
  emiText: { fontSize: 12, color: '#334155' },
  selectedEmiText: { fontSize: 12, color: '#FFF', fontWeight: '600' },
  ctaButton: { backgroundColor: '#5B21B6', marginTop: 15, padding: 12, borderRadius: 8, alignItems: 'center' },
  ctaText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 }
});