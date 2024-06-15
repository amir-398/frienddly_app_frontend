import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import ROUTES from "@/constants/ROUTES";
import cities from "@/content/cities.json";
import { useGetCategories } from "@/hooks/categories";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FilterModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const navigation = useNavigation();
  const cardHeight1 = useRef(new Animated.Value(50)).current;
  const textOpacity1 = useRef(new Animated.Value(1)).current;
  const inputOpacity1 = useRef(new Animated.Value(0)).current;
  const textHeight1 = useRef(new Animated.Value(20)).current;
  const titleSize1 = useRef(new Animated.Value(18)).current;
  const cardHeight2 = useRef(new Animated.Value(50)).current;
  const textOpacity2 = useRef(new Animated.Value(1)).current;
  const inputOpacity2 = useRef(new Animated.Value(0)).current;
  const textHeight2 = useRef(new Animated.Value(20)).current;
  const titleSize2 = useRef(new Animated.Value(18)).current;
  const [card1IsOpen, setCard1IsOpen] = useState(false);
  const [card2IsOpen, setCard2IsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{
    [key: string]: string | number | null;
  } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    [key: string]: string | number | null;
  } | null>(null);
  const { data: categories } = useGetCategories();

  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  useEffect(() => {
    if (selectedCity || selectedCategory) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
    if (selectedCity) {
      setCard1IsOpen(false);
    }
    if (selectedCategory) {
      setCard2IsOpen(false);
    }
  }, [selectedCity, selectedCategory]);
  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardHeight1, {
        toValue: card1IsOpen ? 150 : 50,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacity1, {
        toValue: card1IsOpen ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(inputOpacity1, {
        toValue: card1IsOpen ? 1 : 0,
        duration: 250,
        delay: card1IsOpen ? 250 : 0,
        useNativeDriver: false,
      }),
      Animated.timing(textHeight1, {
        toValue: card1IsOpen ? 0 : 20,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(titleSize1, {
        toValue: card1IsOpen ? 25 : 18,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    card1IsOpen && setCard2IsOpen(false);
  }, [card1IsOpen]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardHeight2, {
        toValue: card2IsOpen ? 150 : 50,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacity2, {
        toValue: card2IsOpen ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(inputOpacity2, {
        toValue: card2IsOpen ? 1 : 0,
        duration: 250,
        delay: card2IsOpen ? 250 : 0,
        useNativeDriver: false,
      }),
      Animated.timing(textHeight2, {
        toValue: card2IsOpen ? 0 : 20,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(titleSize2, {
        toValue: card2IsOpen ? 25 : 18,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    card2IsOpen && setCard1IsOpen(false);
  }, [card2IsOpen]);

  const handleCardPress1 = () => {
    setCard1IsOpen(!card1IsOpen);
  };

  const handleCardPress2 = () => {
    setCard2IsOpen(!card2IsOpen);
  };

  const handleSubmit = () => {
    setVisible(false);
    navigation.navigate(ROUTES.PostsScreen, {
      ltd: selectedCity ? selectedCity.latitude : "",
      lgt: selectedCity ? selectedCity.longitude : "",
      categoryId: selectedCategory ? selectedCategory.id : "",
      title: "Résultats de la recherche",
    });
  };

  const handleCancel = () => {
    setSelectedCategory(null);
    setSelectedCity(null);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <ScreenContainer>
        <View style={styles.header}>
          <InteractiveIcon
            name="close"
            type="ionicon"
            color="#000"
            padding={5}
            size={30}
            onPress={() => setVisible(false)}
          />
        </View>
        <View style={styles.main}>
          <Pressable onPress={handleCardPress1}>
            <Animated.View style={[styles.card, { height: cardHeight1 }]}>
              <View style={styles.cardContent}>
                <Animated.Text
                  style={[styles.leftText, { fontSize: titleSize1 }]}
                >
                  Destination
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.rightText,
                    { opacity: textOpacity1, height: textHeight1 },
                  ]}
                >
                  {selectedCity
                    ? selectedCity.city + ",France"
                    : "Aucune sélection"}
                </Animated.Text>
              </View>

              <Animated.View
                style={[styles.inputContainer, { opacity: inputOpacity1 }]}
              >
                <Icon name="search" type="ionicon" />

                <Picker
                  selectedValue={selectedCity}
                  style={styles.picker}
                  onValueChange={(itemIndex) => setSelectedCity(itemIndex)}
                >
                  <Picker.Item label="Aucun séléction" value={null} />
                  {cities.map((city) => (
                    <Picker.Item key={city.id} label={city.city} value={city} />
                  ))}
                </Picker>
              </Animated.View>
            </Animated.View>
          </Pressable>

          <Pressable onPress={handleCardPress2}>
            <Animated.View style={[styles.card, { height: cardHeight2 }]}>
              <View style={styles.cardContent}>
                <Animated.Text
                  style={[styles.leftText, { fontSize: titleSize2 }]}
                >
                  Catégorie
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.rightText,
                    { opacity: textOpacity2, height: textHeight2 },
                  ]}
                >
                  {selectedCategory
                    ? selectedCategory.name
                    : "Aucune sélection"}
                </Animated.Text>
              </View>

              <Animated.View
                style={[styles.inputContainer, { opacity: inputOpacity2 }]}
              >
                <Icon name="search" type="ionicon" />
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.picker}
                  onValueChange={(itemIndex) => setSelectedCategory(itemIndex)}
                >
                  <Picker.Item label="Aucune sélection" value={null} />
                  {categories?.map((categoty) => (
                    <Picker.Item
                      key={categoty.id}
                      label={categoty.name}
                      value={categoty}
                    />
                  ))}
                </Picker>
              </Animated.View>
            </Animated.View>
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <Pressable style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelText}>Annuler</Text>
          </Pressable>
          <TouchableOpacity
            style={[styles.searchBtn, { opacity: btnIsDisabled ? 0.5 : 1 }]}
            disabled={btnIsDisabled}
            onPress={handleSubmit}
          >
            <Text style={styles.searchText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    </Modal>
  );
}

const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  main: {
    height: height - 160,
  },
  card: {
    borderRadius: 8,
    marginVertical: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 2,
    overflow: "hidden",
    width: "100%",
    alignSelf: "center",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  leftText: {
    fontFamily: FONTS.poppinsBold,
  },
  rightText: {
    fontSize: 13,
    fontFamily: FONTS.poppinsRegular,
    color: "rgba(0, 0, 0, 0.6)",
  },
  picker: {
    fontSize: 16,
    fontFamily: FONTS.poppinsMedium,
    width: "90%",
    marginLeft: 10,
    marginTop: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  cancelBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cancelText: {
    fontFamily: FONTS.poppinsMedium,
    color: "rgba(0, 0, 0, 0.6)",
  },
  searchBtn: {
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  searchText: {
    fontFamily: FONTS.poppinsMedium,
    color: "#fff",
  },
});
