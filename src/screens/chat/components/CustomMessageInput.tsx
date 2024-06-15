import COLORS from "@/constants/COLORS";
import FONTS from "@/constants/FONTS";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MessageInput, useMessageInputContext } from "stream-chat-expo";

const CustomMessageInputInner = () => {
  const {
    text,
    setText,
    sendMessage,
    openAttachmentPicker,
    ImageUploadPreview,
    imageUploads,
  } = useMessageInputContext();

  const handleSend = () => {
    if (text.trim() || imageUploads.length > 0) {
      sendMessage();
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        onPress={openAttachmentPicker}
        style={styles.attachmentButton}
      >
        <Icon name="attach" size={24} color={COLORS.secondaryColor} />
      </TouchableOpacity>
      <ImageUploadPreview />
      {imageUploads.length === 0 && (
        <TextInput
          style={styles.textInput}
          placeholder="Tapez un message"
          value={text}
          onChangeText={setText}
          cursorColor={COLORS.secondaryColor}
        />
      )}
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Icon name="send" size={24} color={COLORS.secondaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const CustomMessageInput = () => (
  <MessageInput Input={CustomMessageInputInner} />
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  attachmentButton: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: FONTS.poppinsMedium,
  },
  sendButton: {
    marginLeft: 5,
    borderRadius: 20,
    padding: 10,
  },
});

export default CustomMessageInput;
