import penIcon from "@/assets/icons/pen.png";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import { useGetPostById } from "@/hooks/posts";
import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
interface GradeCounts {
  [key: number]: number;
}
interface GradePercentages {
  [key: number]: number;
}
export default function PostScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { id } = route.params;
  const [scrollIsActive, setScrollIsActive] = useState(false);
  const [imgActive, setimgActive] = useState(0);
  const [gradesCounts, setGradesCounts] = useState<GradePercentages>({});
  const { data: postData } = useGetPostById(id);
  const grades = postData?.grades;
  const postImages = postData?.images;
  const postComments = postData?.comments;
  console.log(id);

  // on first render, calculate the grade counts and percentages
  useEffect(() => {
    if (!grades) return setGradesCounts({});
    const initialGradeCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    const gradeCounts = grades?.reduce((acc: GradeCounts, grade) => {
      acc[grade.grade] = (acc[grade.grade] || 0) + 1;
      return acc;
    }, initialGradeCounts);
    const totalGrades = Object.values(gradeCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    const gradePercentages = Object.fromEntries(
      Object.entries(gradeCounts).map(([grade, count]) => [
        grade,
        (count / totalGrades) * 100,
      ])
    );
    setGradesCounts(gradePercentages);
  }, [grades]);

  // onImageChange function to update the active image
  const onImageChange = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <ScrollView
        style={styles.container}
        onScrollBeginDrag={() => !scrollIsActive && setScrollIsActive(true)}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
      >
        <View>
          <FlatList
            data={postImages}
            horizontal
            pagingEnabled
            onScroll={({ nativeEvent }) => onImageChange(nativeEvent)}
            renderItem={({ item }) => (
              <Image style={styles.imageHeader} source={{ uri: item.url }} />
            )}
          />
          <View style={styles.wrapDot}>
            {postImages?.map((item, index) => (
              <Text
                key={item.id}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >
                ●
              </Text>
            ))}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.arrowBackContainer,
              pressed && styles.arrowBackContainerPressed,
            ]}
            onPress={() => navigation.goBack()}
            android_ripple={{ color: "transparent" }}
          >
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color={"white"}
              style={{ padding: 10 }}
              size={28}
            />
          </Pressable>
        </View>
        <ScreenContainer>
          <View style={styles.noteContainer}>
            <Icon name="star" type="ionicon" color={"#000"} size={15} />
            <Text
              style={[
                styles.noteText,
                { fontSize: postData?.grade == 0 ? 12 : 16 },
              ]}
            >
              {postData?.grade == 0
                ? "Pas de note pour le moment"
                : postData?.grade}
            </Text>
          </View>
          <Text style={styles.title}>{postData?.title}</Text>
          <Text style={styles.price}>{postData?.price} € par personne</Text>
          <Text style={styles.location}> {postData?.location} </Text>
          <Text style={styles.description}> {postData?.description} </Text>
          <Text style={styles.noteTitle}>Notes</Text>
          <View style={styles.noteWrapper}>
            <View style={styles.left}>
              <Icon
                name="star"
                type="ionicon"
                color={COLORS.primaryColor}
                size={50}
              />
              <Text style={styles.note}>{postData?.grade}</Text>
            </View>
            <View>
              {Object.entries(gradesCounts).map(([grade, percentage]) => (
                <View style={styles.stat} key={grade}>
                  <Text style={styles.statGrade}>{grade}</Text>
                  <View style={styles.gradeBarContainer}>
                    <View
                      style={[styles.gradeBar, { width: `${percentage}%` }]}
                    ></View>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.noticeTitle}>Avis</Text>

          {postComments?.map((comment) => (
            <View key={comment.id}>
              <View style={styles.header}>
                <Image
                  source={{ uri: comment.user.profilImage }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.commentUserName}>
                    {" "}
                    {comment.user.lastname} {comment.user.firstname}
                  </Text>
                  <View style={styles.commentStarsContainer}>
                    <Icon
                      name="star"
                      type="ionicon"
                      color={COLORS.primaryColor}
                      size={20}
                    />
                    <Icon
                      name="star"
                      type="ionicon"
                      color={COLORS.primaryColor}
                      size={20}
                    />
                    <Icon
                      name="star"
                      type="ionicon"
                      color={COLORS.primaryColor}
                      size={20}
                    />
                    <Icon
                      name="star"
                      type="ionicon"
                      color={COLORS.primaryColor}
                      size={20}
                    />
                    <Icon
                      name="star"
                      type="ionicon"
                      color={COLORS.primaryColor}
                      size={20}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.comment}>{comment.content}</Text>
            </View>
          ))}
          <View style={styles.addCommentContainer}>
            <Image source={penIcon} style={styles.penIcon} />
            <TextInput cursorColor="#000" placeholder="Écrire un avis" />
          </View>
        </ScreenContainer>
      </ScrollView>
    </>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeader: {
    height: 400,
    resizeMode: "cover",
    width: width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  arrowBackContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 25,
    left: 15,
    borderRadius: 100,
  },
  arrowBackContainerPressed: {
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  arrowBack: {
    fontSize: 30,
    color: "white",
  },
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dotActive: {
    margin: 10,
    color: "white",
  },
  dot: {
    margin: 10,
    color: "grey",
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteText: {
    marginLeft: 5,
    fontFamily: FONTS.poppinsMedium,
    marginTop: 5,
  },
  title: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 20,
  },
  price: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 18,
  },
  location: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
    color: "rgba(0, 0, 0, 0.5)",
  },
  description: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 15,
    marginVertical: 10,
  },
  noteTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 20,
    marginVertical: 10,
  },
  noteWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  note: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 45,
    marginLeft: 10,
    color: COLORS.primaryColor,
    marginTop: 15,
  },

  stat: {
    flexDirection: "row",
    alignItems: "center",
  },
  statGrade: {
    fontFamily: FONTS.poppinsMedium,
    fontSize: 15,
    color: COLORS.primaryColor,
  },
  gradeBarContainer: {
    position: "relative",
    width: 100,
    height: 10,
    backgroundColor: `rgba(230, 99, 87, 0.5)`,
    borderRadius: 10,
    marginLeft: 5,
  },
  gradeBar: {
    position: "absolute",
    width: "30%",
    height: "100%",
    backgroundColor: COLORS.primaryColor,
    borderRadius: 10,
    left: 0,
  },
  noticeTitle: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 20,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },

  commentUserName: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 15,
    marginLeft: 10,
  },
  commentStarsContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  comment: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
    marginVertical: 10,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 10,
  },
  penIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
