import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

const COLORS = {
  purple: '#5B21B6',
  purpleLight: '#F1EBFF',
  muted: '#687287',
  border: '#E5E7EB',
  ink: '#141A2A',
};

export default function VariantSelector({ variants, selectedVariant, onChange }) {
  return (
    <>
      <Text style={styles.controlLabel}>Choose variant</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <Pressable
              key={variant.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onChange(variant)}
              style={[styles.option, isSelected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>{variant.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  controlLabel: { color: COLORS.ink, fontSize: 13, fontWeight: '700', marginTop: 18, marginBottom: 9 },
  optionRow: { gap: 8 },
  option: { borderColor: COLORS.border, borderRadius: 9, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  selectedOption: { backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple },
  optionText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  selectedOptionText: { color: COLORS.purple },
});
