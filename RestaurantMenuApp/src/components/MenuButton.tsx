import React from "react";
import { TouchableOpacity, Text, Image, View, ImageSourcePropType } from "react-native";
import home_styles from "../styles/homeStyles";
import { useNavigation } from "@react-navigation/native";

interface MenuButtonProps {
  title: string;
  screen?: string;
  onPress?: () => void;
  color?: string;
  icon?: ImageSourcePropType;
}

export const MenuButton = ({
  title,
  screen,
  onPress,
  color = "#2563EB",
  icon,
}: MenuButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[home_styles.menuItem, { backgroundColor: color }]}
      onPress={onPress ? onPress : () => navigation.navigate(screen as never)}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={home_styles.menuText}>{title}</Text>
        {icon && (
          <Image
            source={icon}
            style={{ width: 32, height: 32, marginTop: 8 }}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
