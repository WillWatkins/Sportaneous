import { View, Text, Pressable, Dimensions, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./chat.style";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { addChatMessage, deleteChatMessage } from "../../utils/firebaseUtils";
import { db } from "../../utils/firestoreConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { UserContext } from "../../contexts/UserContext";
import { useKeyboard } from "@react-native-community/hooks";
import { formatTimestamp } from "../../utils/utils";
import { ChatItem, props } from "./Chat.utils";

export const Chat = ({ route }: props) => {
  const { chat_id, eventName } = route.params;
  const { currentUser } = useContext(UserContext);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState<string>("");
  const [isMessagesEmpty, setIsMessagesEmpty] = useState<boolean>(true);
  const windowHeight = Dimensions.get("window").height;
  const keyboard = useKeyboard();

  useEffect(() => {
    setMessages([]);
    const unsub = onSnapshot(doc(db, "chats", chat_id), (doc: any) => {
      if (doc.data().messages.length > 0) {
        setMessages(doc.data().messages);
        setIsMessagesEmpty(false);
      } else {
        setMessages([]);
        setIsMessagesEmpty(true);
      }
    });
  }, [chat_id]);

  const Item = ({ item }: { item: ChatItem }) => (
    <View style={styles.item}>
      <View style={styles.topRowContainer}>
        <Text style={styles.name}>{item.first_name}:</Text>

        <Pressable
          disabled={currentUser.id !== item.userId}
          style={
            currentUser.id === item.userId ? styles.deleteButton : styles.hidden
          }
          onPress={() => {
            deleteChatMessage(
              {
                userId: currentUser.id,
                first_name: item.first_name,
                message_body: item.message_body,
                timestamp: item.timestamp,
              },
              chat_id
            );
          }}
        >
          <Text style={styles.delete}>
            {currentUser.id === item.userId ? "X" : null}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.message}>{item.message_body}</Text>
      <Text style={styles.time}>{formatTimestamp(item.timestamp.seconds)}</Text>
    </View>
  );
  const renderItem = ({ item }: { item: ChatItem }) => {
    return <Item item={item} />;
  };

  const [size, setSize] = useState(windowHeight);
  useEffect(() => {
    keyboard.keyboardShown
      ? setSize(windowHeight * 0.78 - keyboard.keyboardHeight)
      : setSize(windowHeight * 0.78);
    setSize;
  }, [keyboard.keyboardShown]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{eventName}</Text>
      <View style={{ height: size }}>
        <ScrollView contentContainerStyle={[styles.spacing]}>
          {isMessagesEmpty ? (
            <Text style={styles.noMessages}>No messages</Text>
          ) : null}
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </ScrollView>
        <View style={styles.sendMessagecontainer}>
          <TextInput
            style={styles.inputMessage}
            placeholder="Message..."
            placeholderTextColor={"black"}
            onChangeText={setText}
            multiline={true}
            value={text}
          ></TextInput>
          <Pressable
            onPress={() => {
              if (text !== "") {
                addChatMessage(
                  {
                    userId: currentUser.id,
                    first_name: currentUser.first_name,
                    message_body: text,
                    timestamp: new Date(),
                  },
                  chat_id
                ).then(() => {
                  setText("");
                });
              }
            }}
            style={styles.sendContainer}
          >
            <Text style={styles.sendText}>SEND</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
