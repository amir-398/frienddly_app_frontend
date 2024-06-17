import penIcon from "@/assets/icons/pen.png";
import ScreenContainer from "@/components/ScreenContainer";
import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import {
  S3ENDPOINTPOSTIMAGES,
  S3ENDPOINTUSERIMAGES,
} from "@/constants/S3Endpoint";
import { useGetPostById, useSendCommentToPost } from "@/hooks/posts";
import { setBottomBarIsVisible } from "@/redux/Slices/bottomBarIsVisible";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Icon } from "@rneui/themed";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Stars from "react-native-stars";
import * as Yup from "yup";
import AddGradeModal from "./components/modals/AddGradeModal";
interface GradeCounts {
  [key: number]: number;
}
interface GradePercentages {
  [key: number]: number;
}
const validationSchema = Yup.object().shape({
  commentText: Yup.string().required("Champ requis").trim(),
});
export default function PostScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authSlice.userData.id);
  const { id } = route.params;
  const [scrollIsActive, setScrollIsActive] = useState(false);
  const [imgActive, setimgActive] = useState(0);
  const [gradesCounts, setGradesCounts] = useState<GradePercentages>({});
  const [addGradeModalVisible, setAddGradeModalVisible] = useState(false);

  // get post by id
  const {
    data: postData,
    refetch,
    isPending: postDataIsLoading,
  } = useGetPostById(id);

  const grades = postData?.grades;
  const postImages = postData?.images;
  const postComments = postData?.comments;

  // hide bottom bar on first render
  useEffect(() => {
    dispatch(setBottomBarIsVisible(false));
    return () => {
      dispatch(setBottomBarIsVisible(true));
    };
  }, []);

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

  // useSendCommentToPost hook
  const { mutate: addComment, isPending } = useSendCommentToPost();

  //handle comment input
  const handleCommentInput = (values: { commentText: string }) => {
    const content = values.commentText.trim();
    addComment(
      {
        postId: id,
        content: content,
      },
      {
        onSuccess: () => {
          setAddGradeModalVisible(true);
        },
        onError: (error) => {
          console.error("Error adding comment", error);
        },
      }
    );
  };

  // verify if the user has already commented the post
  const userHasCommented = postComments?.some(
    (comment) => comment.userId === userId
  );
  // get user grade
  const usersCommentGrades = (userId: number) => {
    const userGrade = grades?.find((grade) => grade.userId === userId)?.grade;
    return userGrade;
  };

  return (
    <>
      {postDataIsLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        </View>
      ) : (
        <>
          <AddGradeModal
            isVisible={addGradeModalVisible}
            setIsVisible={setAddGradeModalVisible}
            postId={id}
            refetch={refetch}
          />
          <StatusBar backgroundColor="transparent" translucent />
          <KeyboardAwareScrollView
            style={styles.container}
            onScrollBeginDrag={() => !scrollIsActive && setScrollIsActive(true)}
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll={true}
            extraHeight={150}
          >
            <View>
              <FlatList
                data={postImages}
                horizontal
                pagingEnabled
                onScroll={({ nativeEvent }) => onImageChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    style={styles.imageHeader}
                    source={{ uri: S3ENDPOINTPOSTIMAGES + item.url }}
                  />
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
              {!userHasCommented && (
                <Formik
                  initialValues={{
                    commentText: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleCommentInput}
                >
                  {({ handleSubmit, handleChange, handleBlur, values }) => (
                    <>
                      <View style={styles.addCommentContainer}>
                        <Image source={penIcon} style={styles.penIcon} />
                        <TextInput
                          style={styles.commentInput}
                          cursorColor="#000"
                          placeholder="Écrire un avis"
                          onChangeText={handleChange("commentText")}
                          onBlur={handleBlur("commentText")}
                          value={values.commentText}
                          readOnly={isPending}
                        />
                        {!isPending && (
                          <TouchableOpacity onPress={() => handleSubmit()}>
                            <Icon name="send" type="font-awesome" size={20} />
                          </TouchableOpacity>
                        )}
                        {isPending && (
                          <ActivityIndicator color="#000" size={30} />
                        )}
                      </View>
                    </>
                  )}
                </Formik>
              )}
              {postComments?.length ?? 0 > 0 ? (
                postComments?.map((comment) => (
                  <View key={comment.id} style={styles.commentContainer}>
                    <View style={styles.header}>
                      <Image
                        source={{
                          uri: S3ENDPOINTUSERIMAGES + comment.user.profilImage,
                        }}
                        style={styles.avatar}
                      />
                      <View>
                        <Text style={styles.commentUserName}>
                          {comment.user.lastname} {comment.user.firstname}
                        </Text>
                        <Stars
                          default={usersCommentGrades(comment.userId)}
                          count={5}
                          disabled
                          fullStar={
                            <Icon
                              name={"star"}
                              type="ionicon"
                              size={20}
                              color={COLORS.primaryColor}
                            />
                          }
                          emptyStar={
                            <Icon
                              name={"star-outline"}
                              type="ionicon"
                              color={COLORS.primaryColor}
                              size={20}
                            />
                          }
                        />
                      </View>
                    </View>
                    <Text style={styles.comment}>{comment.content}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.nonCommentText}>
                  Il n'y a pas d'avis pour le moment
                </Text>
              )}
            </ScreenContainer>
          </KeyboardAwareScrollView>
        </>
      )}
    </>
  );
}
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    height: 300,
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
  commentContainer: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  commentUserName: {
    fontFamily: FONTS.poppinsBold,
    fontSize: 13,
  },
  comment: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
    marginVertical: 10,
  },
  nonCommentText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 15,
    marginBottom: 15,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  penIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    fontFamily: FONTS.poppinsMedium,
    fontSize: 15,
    paddingTop: 6,
  },
});
