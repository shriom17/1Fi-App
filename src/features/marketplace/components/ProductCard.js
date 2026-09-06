import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import EmiPlanSelector, { getMonthlyAmount } from './EmiPlanSelector';
import VariantSelector from './VariantSelector';

const COLORS = {
  purple: '#5B21B6',
  purpleLight: '#F1EBFF',
  ink: '#141A2A',
  muted: '#687287',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

export default function ProductCard({ product, selectedPlan, selectedVariant, onPlanChange, onVariantChange, onProceed }) {
  const [imageFailed, setImageFailed] = useState(false);
  const monthlyAmount = getMonthlyAmount(selectedVariant.price, selectedPlan);

  const handleProceed = () => {
    onProceed({
      product,
      variant: selectedVariant,
      plan: selectedPlan,
      monthlyAmount,
      totalAmount: selectedVariant.price,
    });
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

        <VariantSelector variants={product.variants} selectedVariant={selectedVariant} onChange={onVariantChange} />
        <EmiPlanSelector
          plans={product.emiPlans}
          selectedPlan={selectedPlan}
          price={selectedVariant.price}
          onChange={onPlanChange}
        />

        <Pressable accessibilityRole="button" onPress={handleProceed} style={styles.ctaButton}>
          <Text style={styles.ctaText}>Proceed with this plan</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: { backgroundColor: COLORS.white, borderColor: COLORS.border, borderRadius: 18, borderWidth: 1, marginBottom: 18, overflow: 'hidden' },
  productImage: { backgroundColor: '#EEEAF9', height: 190, width: '100%' },
  imageFallback: { alignItems: 'center', justifyContent: 'center' },
  imageFallbackText: { color: COLORS.purple, fontSize: 18, fontWeight: '800' },
  productBody: { padding: 18 },
  productName: { color: COLORS.ink, fontSize: 20, fontWeight: '800' },
  productDescription: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  productPrice: { color: COLORS.purple, fontSize: 18, fontWeight: '800', marginTop: 13 },
  ctaButton: { alignItems: 'center', backgroundColor: COLORS.purple, borderRadius: 11, flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingVertical: 14 },
  ctaText: { color: COLORS.white, fontSize: 14, fontWeight: '800' },
  ctaArrow: { color: COLORS.white, fontSize: 20, marginLeft: 9, marginTop: -2 },
});
