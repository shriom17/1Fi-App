import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ProductCard from './components/ProductCard';
import { getProducts } from './data/marketplaceService';

const COLORS = {
  purple: '#5B21B6',
  purpleLight: '#F1EBFF',
  ink: '#141A2A',
  muted: '#687287',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export default function MarketplaceTab() {
  const [products, setProducts] = useState([]);
  const [selections, setSelections] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyProducts = (loadedProducts) => {
    setProducts(loadedProducts);
    setSelections(
      Object.fromEntries(
        loadedProducts.map((product) => [product.id, { variantId: product.variants[0].id, plan: product.emiPlans[0] }]),
      ),
    );
  };

  const loadProducts = () => {
    setIsLoading(true);
    setError(null);
    getProducts()
      .then(applyProducts)
      .catch(() => setError('We could not load marketplace products. Please try again.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProducts()
      .then(applyProducts)
      .catch(() => setError('We could not load marketplace products. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const updateSelection = (productId, key, value) => {
    setSelections((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        [key]: value,
      },
    }));
  };

  const handleConfirm = (summary) => {
    if (!summary) {
      return;
    }

    setConfirmation(null);
    Alert.alert('Application started', `${summary.product.name} EMI plan is ready to apply.`);
  };

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator color={COLORS.purple} size="large" />
        <Text style={styles.stateText}>Loading marketplace products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.errorTitle}>Marketplace unavailable</Text>
        <Text style={styles.stateText}>{error}</Text>
        <Pressable accessibilityRole="button" onPress={loadProducts} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Shop from 1Fi</Text>
        <Text style={styles.sectionSubtitle}>Pay over time, without the extra cost.</Text>
      </View>
      {products.map((product) => {
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
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total payable</Text>
                    <Text style={styles.summaryValue}>{formatPrice(confirmation.totalAmount)}</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                    <Text style={styles.summaryTotalLabel}>Monthly payment</Text>
                    <Text style={styles.summaryTotalValue}>{formatPrice(confirmation.monthlyAmount)} / month</Text>
                  </View>
                </View>

                <Text style={styles.modalNote}>No-cost EMI. No interest will be charged.</Text>
                <Pressable accessibilityRole="button" onPress={() => handleConfirm(confirmation)} style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Confirm & Apply</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  stateContainer: { alignItems: 'center', justifyContent: 'center', minHeight: 260, paddingHorizontal: 24 },
  stateText: { color: COLORS.muted, fontSize: 14, marginTop: 12, textAlign: 'center' },
  errorTitle: { color: COLORS.ink, fontSize: 18, fontWeight: '800' },
  retryButton: { backgroundColor: COLORS.purple, borderRadius: 11, marginTop: 18, paddingHorizontal: 24, paddingVertical: 12 },
  retryButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '800' },
  sectionHeading: { marginBottom: 18 },
  sectionTitle: { color: COLORS.ink, fontSize: 23, fontWeight: '800' },
  sectionSubtitle: { color: COLORS.muted, fontSize: 14, marginTop: 5 },
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
