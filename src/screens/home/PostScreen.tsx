import COLORS from "@/constants/COLORS";
import { Icon } from "@rneui/themed";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostScreen() {
  const data = {
    id: 1,
    title: "Post 1",
    category: "Restaurant",
    adress: "Paris 75000",
    price: "45",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image:
      "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Icon name="star" type="ionicon" color={"#fff"} size={15} />
        <Text>4.5</Text>
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.price}>{data.price}</Text>
      <Text style={styles.adress}> {data.adress} </Text>
      <Text style={styles.description}> {data.description} </Text>
      <Text>Notes</Text>
      <View>
        <Icon
          name="star"
          type="ionicon"
          color={COLORS.primaryColor}
          size={30}
        />
        <Text>4.5</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statGrade}>5</Text>
            <View style={styles.gradeBarContainer}>
              <View style={styles.gradeBar}></View>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statGrade}>4</Text>
            <View style={styles.gradeBarContainer}>
              <View style={styles.gradeBar}></View>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statGrade}>3</Text>
            <View style={styles.gradeBarContainer}>
              <View style={styles.gradeBar}></View>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statGrade}>2</Text>
            <View style={styles.gradeBarContainer}>
              <View style={styles.gradeBar}></View>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statGrade}>1</Text>
            <View style={styles.gradeBarContainer}>
              <View style={styles.gradeBar}></View>
            </View>
          </View>
        </View>
        <Text>Avis</Text>
        <View style={styles.commentContainer}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/image_lp.png")}
              style={styles.avatar}
            />
            <View style={styles.left}>
              <Text>Jhon do</Text>
              <View>
                <Icon
                  name="star"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={15}
                />
                <Icon
                  name="star"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={15}
                />
                <Icon
                  name="star"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={15}
                />
                <Icon
                  name="star"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={15}
                />
                <Icon
                  name="star"
                  type="ionicon"
                  color={COLORS.primaryColor}
                  size={15}
                />
              </View>
            </View>
          </View>
          <Text style={styles.comment}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste
            ipsum sit laboriosam nostrum alias et, adipisci, tenetur incidunt
            tempora unde. Nihil iste, quo doloribus aperiam vel esse mollitia
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
