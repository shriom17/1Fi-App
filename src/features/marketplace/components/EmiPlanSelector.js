import { Pressable, StyleSheet, Text, View } from 'react-native';

const COLORS = {
  purple: '#5B21B6',
  muted: '#687287',
  border: '#E5E7EB',
  ink: '#141A2A',
  white: '#FFFFFF',
};

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

const getMonthlyAmount = (price, plan) => Number((price / plan).toFixed(2));

export default function EmiPlanSelector({ plans, selectedPlan, price, onChange }) {
  return (
    <>
      <Text style={styles.controlLabel}>Select a no-cost EMI plan</Text>
      <View style={styles.planGrid}>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan;
          return (
            <Pressable
              key={plan}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onChange(plan)}
              style={[styles.plan, isSelected && styles.selectedPlan]}
            >
              <Text style={[styles.planLabel, isSelected && styles.selectedPlanText]}>{plan}-month EMI</Text>
              <Text style={[styles.planAmount, isSelected && styles.selectedPlanText]}>
                {formatPrice(getMonthlyAmount(price, plan))}/mo
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

export { getMonthlyAmount };

const styles = StyleSheet.create({
  controlLabel: { color: COLORS.ink, fontSize: 13, fontWeight: '700', marginTop: 18, marginBottom: 9 },
  planGrid: { flexDirection: 'row', gap: 8 },
  plan: { borderColor: COLORS.border, borderRadius: 10, borderWidth: 1, flex: 1, paddingHorizontal: 5, paddingVertical: 10 },
  selectedPlan: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  planLabel: { color: COLORS.muted, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  planAmount: { color: COLORS.ink, fontSize: 12, fontWeight: '800', marginTop: 5, textAlign: 'center' },
  selectedPlanText: { color: COLORS.white },
});
