import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { selectAllEvents, getUsers } from "../../utils/firebaseUtils";
import { makeNameIdReference } from "../Events.screen/utils/EventListUtils";
import { styles } from "./Chatroom.style";
import { eventDetails, props, userDetails } from "./Chatroom.utils";

const Chatroom = ({ navigation }: props) => {
  const { currentUser } = useContext(UserContext);
  const [events, setEvents] = useState<eventDetails[]>();
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    selectAllEvents().then((res) => {
      const filteredEvents = res.filter((event: eventDetails) => {
        let attendeeList = event.attendees;
        let returnValue = false;
        if (attendeeList.length > 0) {
          if (event.host_id === currentUser.id) {
            returnValue = true;
          }
          attendeeList.forEach((personDetails: userDetails) => {
            if (personDetails.userId === currentUser.id) {
              returnValue = true;
            }
          });
          return returnValue;
        }
      });
      setEvents(filteredEvents);
      getUsers().then((res) => {
        setUserNames(makeNameIdReference(res));
      });
    });
  }, []);

  const Item = ({ item, onPress }: { item: eventDetails; onPress: any }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Image style={styles.image} source={require("./images/chat.png")} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {item.date} @ {item.time}
        </Text>
        <Text style={styles.host}>Hosted by: {userNames[item.host_id]}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: eventDetails }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Chat", {
            chat_id: item.id,
            eventName: item.title,
          });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>discuss event details</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Chatroom;
