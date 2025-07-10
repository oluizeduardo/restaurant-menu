import { TouchableOpacity, Text } from "react-native";
import { button_styles } from "../styles/button";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
}: ButtonProps) => {
  const backgroundColor = variant === "primary" ? "#2563EB" : "#6B7280"; // azul ou cinza

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[button_styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={button_styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
