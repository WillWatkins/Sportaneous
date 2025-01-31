import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Text, Pressable, View, TouchableOpacity, Alert } from "react-native";
import Collapsible from "react-native-collapsible";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../../../contexts/UserContext";
import { db } from "../../../../utils/firestoreConfig";
import { selectEventById } from "../../../../utils/firebaseUtils";
import { truncate } from "../../../Events.screen/utils/EventListUtils";
import { styles } from "../../ProfileEvents.style";
import { confirmDelete } from "../../../../utils/ProfileUtils";
import { props, event } from "../../UserProfile.utils";
import { eventDetails } from "../../../SingleEvent.screen/singleEvent.utils";

export const MyHostedEvents = ({ user_id, navigation }: props) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hostedIsCollapsed, setHostedIsCollapsed] = useState<boolean>(true);
  const [myHostedEventIds, setMyHostedEventIds] = useState<string[]>([]);
  const [myHostedEvents, setMyHostedEvents] = useState<event[]>([
    {
      title: "",
      host_id: "",
      location: "",
      date: "",
      category: "",
      time: "",
      description: "",
      id: "",
    },
  ]);

  useEffect(() => {
    const eventPromises: any = myHostedEventIds.map((eventId) => {
      return selectEventById(eventId);
    });
    Promise.all(eventPromises).then((res: event[]) => {
      res.forEach((event: event, index: number) => {
        event.id = myHostedEventIds[index];
      });
      setMyHostedEvents(res);
    });
    setIsLoading(false);
  }, [myHostedEventIds]);

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "users", user_id), (doc: any) => {
      if (doc.data().hosted_events.length > 0) {
        setMyHostedEventIds(doc.data().hosted_events);
      } else {
        setMyHostedEventIds([]);
      }
    });
  }, [user_id]);

  if (isLoading) {
    return <Text>Loading hosted events ...</Text>;
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setHostedIsCollapsed(hostedIsCollapsed === true ? false : true);
        }}
      >
        {hostedIsCollapsed ? (
          <Text style={styles.eventHeader}>My Hosted Events ▼</Text>
        ) : (
          <Text style={styles.eventHeader}>My Hosted Events ▲</Text>
        )}
      </Pressable>
      <ScrollView>
        <Collapsible collapsed={hostedIsCollapsed}>
          {myHostedEvents.length < 1 ? (
            <Text style={styles.joinSubHeader}>You have no hosted events</Text>
          ) : (
            myHostedEvents.map((myEvent) => {
              return (
                <View style={styles.container} key={myEvent.id}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("Event", { eventId: myEvent.id });
                    }}
                  >
                    <Text style={styles.title}>{myEvent.title}</Text>
                    <Text
                      style={styles.user}
                    >{`${currentUser.first_name} ${currentUser.last_name}`}</Text>
                    <Text style={styles.location}>{myEvent.location}</Text>
                    <Text style={styles.date}>{myEvent.date}</Text>
                    <Text style={styles.category}>{myEvent.category}</Text>
                    <Text style={styles.time}>{myEvent.time}</Text>
                    <Text style={styles.description}>
                      {truncate(myEvent.description)}
                    </Text>
                  </TouchableOpacity>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? "rgba(50, 59, 118, 0.5)"
                          : "rgba(50, 59, 118, 1)",
                      },
                      styles.requestsButton,
                    ]}
                    onPress={() => {
                      navigation.navigate("AcceptReject", {
                        eventId: myEvent.id,
                        eventTitle: myEvent.title,
                      });
                    }}
                  >
                    <Text style={styles.buttonTitle}>Pending Requests</Text>
                  </Pressable>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? "rgba(108, 93, 171, 0.5)"
                          : "rgba(108, 93, 171, 1)",
                      },
                      styles.deleteButton,
                    ]}
                    onPress={() => {
                      confirmDelete(
                        myEvent.id,
                        { navigation },
                        user_id,
                        myEvent
                      );
                    }}
                  >
                    <Text style={styles.buttonTitle}>Delete Event</Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </Collapsible>
      </ScrollView>
    </View>
  );
};
