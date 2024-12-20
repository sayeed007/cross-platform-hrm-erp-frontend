import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { getEmployeeContactDetails } from '../../apis/HomeScreen';
import { BASE_URL } from '../../Server';
import { DirectoryEmployeeOption } from '../../typeInterfaces/DirectoryEmployee';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../typeInterfaces/navigationTypes';
import { colors } from '../../utils/colors';
import { textStyle } from '../../utils/textStyle';


type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const DirectorySection = () => {

    const navigation = useNavigation<NavigationProp>();

    const [loading, setLoading] = useState(true);
    const [allEmployeeOptions, setAllEmployeeOptions] = useState<DirectoryEmployeeOption[]>([]);


    const handleSeeAllPress = () => {
        navigation.navigate('SeeAllCoWorkersContact', { employees: allEmployeeOptions });
    };

    useEffect(() => {
        // Replace `any` with the actual response type
        getEmployeeContactDetails().then((employeeResponse: any) => {
            setLoading(false);
            if (employeeResponse?.[0]?.length > 0) {
                const sortedArray = [...employeeResponse?.[0]].sort((a, b) => ((a?.employeeId - b?.employeeId) && (a?.grade - b?.grade)));

                const options: DirectoryEmployeeOption[] = sortedArray.map((obj) => {
                    const temp: DirectoryEmployeeOption = {} as DirectoryEmployeeOption;
                    let dummyImage: JSX.Element;
                    let profileShowImage: JSX.Element;

                    // Conditional rendering for avatar or image
                    if (obj.thumbNailsPath01) {
                        dummyImage = (
                            <Image
                                style={{ height: 30, width: 30, borderRadius: '50%' }}
                                source={{ uri: `${BASE_URL?.baseApi}/${obj.thumbNailsPath01}` }}
                                className="c-avatar-img"
                                alt="loading"
                            />
                        );
                        profileShowImage = (
                            <Image
                                style={styles.avatar}
                                source={{ uri: `${BASE_URL?.baseApi}/${obj.thumbNailsPath01}` }}
                                className="c-avatar-img"
                                alt="loading"
                            />
                        );
                    } else {
                        dummyImage = (
                            <Avatar
                                size={30} // Size of the avatar
                                rounded   // Makes it circular
                                title={`${obj.firstName.charAt(0)}${obj.lastName.charAt(0)}`} // Fallback initials
                                overlayContainerStyle={{ backgroundColor: colors?.gray3 }} // Background color
                                titleStyle={{ color: colors?.white, fontWeight: 'bold' }} // Style for initials
                            />
                        );
                        profileShowImage = (
                            <Avatar
                                size={60} // Size of the avatar
                                rounded   // Makes it circular
                                title={`${obj.firstName.charAt(0)}${obj.lastName.charAt(0)}`} // Fallback initials
                                overlayContainerStyle={{ backgroundColor: colors?.gray3 }} // Background color
                                titleStyle={{ color: colors?.white, fontWeight: 'bold' }} // Style for initials
                            />
                        );
                    }

                    // Assign values to the temp object
                    temp.value = obj.employeeId;
                    temp.label = `${obj.firstName} ${obj.lastName}`;
                    temp.employeeId = obj.employeeId;
                    temp.designation = obj.designation;
                    temp.department = obj.department;
                    temp.phone = obj.officialContact;
                    temp.email = obj.username;
                    temp.profileShowImage = profileShowImage;
                    temp.customAbbreviation = <div>{dummyImage}</div>;

                    return temp;
                });

                // Update state
                setAllEmployeeOptions(options);
            }
        });
    }, []);

    return (
        <>
            {/* Section Title with See All */}
            <View style={styles.header}>
                <Text style={styles.title}>Directory</Text>
                <TouchableOpacity onPress={handleSeeAllPress} style={styles.seeAll}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Feather name="arrow-up-right" size={14} color={colors?.info} />
                </TouchableOpacity>
            </View>

            {/* Scrollable Avatars */}
            {loading ?
                <>
                    <View style={[styles.loadingContainer, styles.marginBottom]}>
                        <ActivityIndicator size="large" color={colors?.info} />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </>
                :
                <View style={styles.marginBottom}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {allEmployeeOptions.map((item) => (
                            <View key={item.employeeId} style={styles.avatarContainer}>
                                {item?.profileShowImage}

                                <Text style={styles.avatarName} numberOfLines={1} ellipsizeMode="tail">
                                    {item?.label}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        ...textStyle?.bold18,
        color: colors?.black,
    },
    seeAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        ...textStyle?.semibold16,
        color: colors?.info,
        marginRight: 4,
    },
    avatarContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 4,
    },
    avatarName: {
        ...textStyle?.regular12,
        color: colors?.black,
        width: 60,
        textAlign: 'center',
    },
    marginBottom: {
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 250,
        height: 100,
    },
    loadingText: {
        marginTop: 10,
        ...textStyle?.regular16,
        color: colors?.black,
    },
});

export default DirectorySection;

