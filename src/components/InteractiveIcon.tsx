import { Icon } from "@rneui/themed";
import { Pressable, StyleSheet } from "react-native";

interface InteractiveIconProps {
  style?: any;
  onPress: () => void;
  size: number;
  name: string;
  type: string;
  color?: string;
  padding?: number;
}
export default function InteractiveIcon(props: InteractiveIconProps) {
  const { style, onPress, size, name, type, color, padding } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.arrowBackContainerPressed,
        style,
      ]}
      onPress={onPress}
      android_ripple={{ color: "transparent" }}
    >
      <Icon
        name={name}
        type={type}
        color={color ? color : "#fff"}
        style={{ padding: padding ? padding : 10 }}
        size={size}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrowBackContainerPressed: {
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
