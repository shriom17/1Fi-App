import { useState } from 'react';
import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

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
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85',
    variants: [
      { id: 'base', label: '8GB / 256GB', price: 99900 },
      { id: 'pro', label: '16GB / 512GB', price: 124900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'phone',
    name: 'iPhone 16',
    description: 'A total powerhouse in your pocket',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&q=85',
    variants: [
      { id: '128gb', label: '128GB', price: 79900 },
      { id: '256gb', label: '256GB', price: 89900 },
      { id: '512gb', label: '512GB', price: 109900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'television',
    name: 'Samsung Smart TV',
    description: 'Immersive 4K entertainment at home',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85',
    variants: [
      { id: '43inch', label: '43 inch / 4K', price: 34990 },
      { id: '55inch', label: '55 inch / 4K', price: 52990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'smartwatch',
    name: 'Apple Watch Series 10',
    description: 'A healthier, more active you',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=900&q=85',
    variants: [
      { id: 'aluminium', label: 'Aluminium / 42mm', price: 46900 },
      { id: 'titanium', label: 'Titanium / 46mm', price: 79900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'tablet',
    name: 'iPad Air',
    description: 'Powerful creativity, wherever you go',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=85',
    variants: [
      { id: 'wifi128', label: 'Wi-Fi / 128GB', price: 59900 },
      { id: 'cellular256', label: 'Cellular / 256GB', price: 84900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'headphones',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=85',
    variants: [
      { id: 'black', label: 'Black', price: 29990 },
      { id: 'silver', label: 'Silver', price: 31990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'gaming-console',
    name: 'PlayStation 5',
    description: 'Lightning-fast gaming with immersive play',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=900&q=85',
    variants: [
      { id: 'digital', label: 'Digital Edition', price: 44990 },
      { id: 'disc', label: 'Disc Edition', price: 54990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'camera',
    name: 'Canon EOS R50',
    description: 'Capture your stories in stunning detail',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85',
    variants: [
      { id: 'body', label: 'Body Only', price: 67990 },
      { id: 'kit', label: '18-45mm Kit', price: 74990 },
    ],
    emiPlans: [3, 6, 12],
  },
];

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`;

function ProductCard({ product, selectedPlan, selectedVariant, onPlanChange, onVariantChange, onProceed }) {
  const [imageFailed, setImageFailed] = useState(false);
  const monthlyAmount = Math.ceil(selectedVariant.price / selectedPlan);

  const handleProceed = () => {
    onProceed({ product, variant: selectedVariant, plan: selectedPlan, monthlyAmount });
  };

  return (
    <View style={styles.productCard}>
      {imageFailed ? (
        <View style={[styles.productImage, styles.imageFallback]}>
          <Text style={styles.imageFallbackText}>{product.name}</Text>
        </View>
      ) : (
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
        />
      )}
      <View style={styles.productBody}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>{formatPrice(selectedVariant.price)}</Text>

        <Text style={styles.controlLabel}>Choose variant</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
          {product.variants.map((variant) => {
            const isSelected = selectedVariant.id === variant.id;
            return (
              <Pressable
                key={variant.id}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => onVariantChange(variant)}
                style={[styles.option, isSelected && styles.selectedOption]}
              >
                <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{variant.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.controlLabel}>Select a no-cost EMI plan</Text>
        <View style={styles.planGrid}>
          {product.emiPlans.map((plan) => {
            const isSelected = selectedPlan === plan;
            return (
              <Pressable
                key={plan}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => onPlanChange(plan)}
                style={[styles.plan, isSelected && styles.selectedPlan]}
              >
                <Text style={[styles.planLabel, isSelected && styles.selectedPlanText]}>{plan}-month EMI</Text>
                <Text style={[styles.planAmount, isSelected && styles.selectedPlanText]}>
                  {formatPrice(Math.ceil(selectedVariant.price / plan))}/mo
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
  const [confirmation, setConfirmation] = useState(null);
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(
      MOCK_PRODUCTS.map((product) => [product.id, { variantId: product.variants[0].id, plan: product.emiPlans[0] }]),
    ),
  );

  const updateSelection = (productId, key, value) => {
    setSelections((current) => ({
      ...current,
      [productId]: {
        variantId: current[productId]?.variantId || MOCK_PRODUCTS.find((product) => product.id === productId).variants[0].id,
        plan: current[productId]?.plan || MOCK_PRODUCTS.find((product) => product.id === productId).emiPlans[0],
        ...current[productId],
        [key]: value,
      },
    }));
  };

  const handleConfirm = (summary) => {
    if (!summary) {
      return;
    }

    const productName = summary.product.name;
    setConfirmation(null);
    Alert.alert('Application started', `${productName} EMI plan is ready to apply.`);
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
            {MOCK_PRODUCTS.map((product) => {
              const productSelection = selections[product.id] || {
                variantId: product.variants[0].id,
                plan: product.emiPlans[0],
              };
              const selectedVariant =
                product.variants.find((variant) => variant.id === productSelection.variantId) || product.variants[0];

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedPlan={productSelection.plan || product.emiPlans[0]}
                  selectedVariant={selectedVariant}
                  onPlanChange={(plan) => updateSelection(product.id, 'plan', plan)}
                  onVariantChange={(variant) => updateSelection(product.id, 'variantId', variant.id)}
                  onProceed={setConfirmation}
                />
              );
            })}
          </>
        )}
      </ScrollView>

      <Modal
        visible={Boolean(confirmation)}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmation(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalEyebrow}>REVIEW YOUR PLAN</Text>
                <Text style={styles.modalTitle}>Confirm purchase</Text>
              </View>
              <Pressable
                accessibilityLabel="Close confirmation"
                accessibilityRole="button"
                onPress={() => setConfirmation(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>

            {confirmation && (
              <>
                <View style={styles.summaryProduct}>
                  <Image source={{ uri: confirmation.product.image }} style={styles.summaryImage} />
                  <View style={styles.summaryProductInfo}>
                    <Text style={styles.summaryProductName}>{confirmation.product.name}</Text>
                    <Text style={styles.summaryVariant}>{confirmation.variant.label}</Text>
                  </View>
                </View>

                <View style={styles.summaryRows}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Selected price</Text>
                    <Text style={styles.summaryValue}>{formatPrice(confirmation.variant.price)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>EMI duration</Text>
                    <Text style={styles.summaryValue}>{confirmation.plan} months</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                    <Text style={styles.summaryTotalLabel}>Monthly payment</Text>
                    <Text style={styles.summaryTotalValue}>{formatPrice(confirmation.monthlyAmount)} / month</Text>
                  </View>
                </View>

                <Text style={styles.modalNote}>No-cost EMI. No interest will be charged.</Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => handleConfirm(confirmation)}
                  style={styles.confirmButton}
                >
                  <Text style={styles.confirmButtonText}>Confirm & Apply</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: COLORS.purple, fontSize: 18, fontWeight: '800' },
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
  modalBackdrop: { backgroundColor: 'rgba(20, 26, 42, 0.56)', flex: 1, justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: COLORS.white, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 30 },
  modalHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  modalEyebrow: { color: COLORS.purple, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  modalTitle: { color: COLORS.ink, fontSize: 24, fontWeight: '800', marginTop: 5 },
  closeButton: { alignItems: 'center', backgroundColor: COLORS.purpleLight, borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  closeButtonText: { color: COLORS.purple, fontSize: 28, fontWeight: '300', lineHeight: 30, marginTop: -2 },
  summaryProduct: { alignItems: 'center', backgroundColor: '#FAF9FF', borderRadius: 14, flexDirection: 'row', padding: 12 },
  summaryImage: { backgroundColor: '#EEEAF9', borderRadius: 10, height: 64, width: 64 },
  summaryProductInfo: { flex: 1, marginLeft: 12 },
  summaryProductName: { color: COLORS.ink, fontSize: 16, fontWeight: '800' },
  summaryVariant: { color: COLORS.muted, fontSize: 13, marginTop: 5 },
  summaryRows: { marginTop: 18 },
  summaryRow: { alignItems: 'center', borderBottomColor: COLORS.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13 },
  summaryLabel: { color: COLORS.muted, fontSize: 14 },
  summaryValue: { color: COLORS.ink, fontSize: 14, fontWeight: '700' },
  summaryTotalRow: { borderBottomWidth: 0, paddingBottom: 4 },
  summaryTotalLabel: { color: COLORS.ink, fontSize: 15, fontWeight: '800' },
  summaryTotalValue: { color: COLORS.purple, fontSize: 16, fontWeight: '800' },
  modalNote: { color: COLORS.muted, fontSize: 12, marginTop: 14, textAlign: 'center' },
  confirmButton: { alignItems: 'center', backgroundColor: COLORS.purple, borderRadius: 12, marginTop: 20, paddingVertical: 15 },
  confirmButtonText: { color: COLORS.white, fontSize: 15, fontWeight: '800' },
});
