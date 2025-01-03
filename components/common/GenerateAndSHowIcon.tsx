import { Image, ImageSourcePropType, ImageStyle } from "react-native";
import { getIcon } from "../../utils/generateIcon";

interface GenerateAndViewIconProps {
    iconName: string;
    size: number; // Use `number` for dimensions in React Native
    style?: any
};

export const GenerateAndViewIcon = ({ iconName, size, style }: GenerateAndViewIconProps) => {
    const iconSource: ImageSourcePropType = getIcon(iconName);

    if (!iconSource) {
        console.warn(`Icon with name "${iconName}" not found.`);
        return null;
    }

    return (
        <Image
            source={iconSource}
            style={[
                style,
                { width: size, height: size } as ImageStyle
            ]}
            resizeMode="contain"
        />
    );
};
