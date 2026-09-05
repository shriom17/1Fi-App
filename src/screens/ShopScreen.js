import { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  purple: '#5B21B6',
  purpleLight: '#F1EBFF',
  ink: '#141A2A',
  muted: '#687287',
  border: '#E5E7EB',
  page: '#F8F8FA',
  white: '#FFFFFF',
};

const TABS = [
  { id: 'top_brands', label: 'Top Brands' },
  { id: 'nearby_stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
];

const MOCK_PRODUCTS = [
  {
    id: 'laptop',
    name: 'MacBook Air M3',
    description: 'Supercharged by Apple silicon',
    price: 99900,
    image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=900&q=85',
    variants: ['8GB / 256GB', '16GB / 512GB'],
    emiPlans: [
      { months: 3, label: '3 months', amount: 33300 },
      { months: 6, label: '6 months', amount: 16650 },
      { months: 12, label: '12 months', amount: 8325 },
    ],
  },
  {
    id: 'phone',
    name: 'iPhone 16',
    description: 'A total powerhouse in your pocket',
    price: 79900,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&q=85',
    variants: ['128GB', '256GB', '512GB'],
    emiPlans: [
      { months: 3, label: '3 months', amount: 26634 },
      { months: 6, label: '6 months', amount: 13317 },
      { months: 12, label: '12 months', amount: 6659 },
    ],
  },
];

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`;

function ProductCard({ product, selectedPlan, selectedVariant, onPlanChange, onVariantChange }) {
  const handleProceed = () => {
    Alert.alert(
      'Plan selected',
      `${product.name} · ${selectedPlan.label} EMI\n${formatPrice(selectedPlan.amount)} / month`,
    );
  };

  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productBody}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>

        <Text style={styles.controlLabel}>Choose variant</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
          {product.variants.map((variant) => {
            const isSelected = selectedVariant === variant;
            return (
              <Pressable
                key={variant}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => onVariantChange(variant)}
                style={[styles.option, isSelected && styles.selectedOption]}
              >
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{variant}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.controlLabel}>Select a no-cost EMI plan</Text>
        <View style={styles.planGrid}>
          {product.emiPlans.map((plan) => {
            const isSelected = selectedPlan.months === plan.months;
            return (
              <Pressable
                key={plan.months}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => onPlanChange(plan)}
                style={[styles.plan, isSelected && styles.selectedPlan]}
              >
                <Text style={[styles.planLabel, isSelected && styles.selectedPlanText]}>{plan.label}</Text>
                <Text style={[styles.planAmount, isSelected && styles.selectedPlanText]}>
                  {formatPrice(plan.amount)}/mo
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable accessibilityRole="button" onPress={handleProceed} style={styles.ctaButton}>
          <Text style={styles.ctaText}>Proceed with this plan</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(
      MOCK_PRODUCTS.map((product) => [product.id, { variant: product.variants[0], plan: product.emiPlans[0] }]),
    ),
  );

  const updateSelection = (productId, key, value) => {
    setSelections((current) => ({
      ...current,
      [productId]: { ...current[productId], [key]: value },
    }));
  };

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
        {activeTab === 'marketplace' && (
          <>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionTitle}>Shop from 1Fi</Text>
              <Text style={styles.sectionSubtitle}>Pay over time, without the extra cost.</Text>
            </View>
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedPlan={selections[product.id].plan}
                selectedVariant={selections[product.id].variant}
                onPlanChange={(plan) => updateSelection(product.id, 'plan', plan)}
                onVariantChange={(variant) => updateSelection(product.id, 'variant', variant)}
              />
            ))}
          </>
        )}
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
  sectionHeading: { marginBottom: 18 },
  sectionTitle: { color: COLORS.ink, fontSize: 23, fontWeight: '800' },
  sectionSubtitle: { color: COLORS.muted, fontSize: 14, marginTop: 5 },
  productCard: { backgroundColor: COLORS.white, borderColor: COLORS.border, borderRadius: 18, borderWidth: 1, marginBottom: 18, overflow: 'hidden' },
  productImage: { backgroundColor: '#EEEAF9', height: 190, width: '100%' },
  productBody: { padding: 18 },
  productName: { color: COLORS.ink, fontSize: 20, fontWeight: '800' },
  productDescription: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  productPrice: { color: COLORS.purple, fontSize: 18, fontWeight: '800', marginTop: 13 },
  controlLabel: { color: COLORS.ink, fontSize: 13, fontWeight: '700', marginTop: 18, marginBottom: 9 },
  optionRow: { gap: 8 },
  option: { borderColor: COLORS.border, borderRadius: 9, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  selectedOption: { backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple },
  optionText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  selectedOptionText: { color: COLORS.purple },
  planGrid: { flexDirection: 'row', gap: 8 },
  plan: { borderColor: COLORS.border, borderRadius: 10, borderWidth: 1, flex: 1, paddingHorizontal: 5, paddingVertical: 10 },
  selectedPlan: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  planLabel: { color: COLORS.muted, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  planAmount: { color: COLORS.ink, fontSize: 12, fontWeight: '800', marginTop: 5, textAlign: 'center' },
  selectedPlanText: { color: COLORS.white },
  ctaButton: { alignItems: 'center', backgroundColor: COLORS.purple, borderRadius: 11, flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingVertical: 14 },
  ctaText: { color: COLORS.white, fontSize: 14, fontWeight: '800' },
  ctaArrow: { color: COLORS.white, fontSize: 20, marginLeft: 9, marginTop: -2 },
});
