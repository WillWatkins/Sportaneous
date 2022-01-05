import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Text, Pressable, View, TouchableOpacity } from "react-native";
import { UserContext } from "../../../../contexts/UserContext";
import { db } from "../../../../utils/firestoreConfig";
import { getUsers, selectEventById } from "../../../../utils/firebaseUtils";
import {
  makeNameIdReference,
  truncate,
} from "../../../Events.screen/utils/EventListUtils";
import { styles } from "../../ProfileEvents.style";
import { confirmLeave } from "../../../../utils/ProfileUtils";
import Collapsible from "react-native-collapsible";

export const MyAcceptedRequests = ({ user_id, navigation }) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userNames, setUserNames] = useState({});
  const [acceptedRequestIds, setAcceptedRequestIds] = useState([]);
  const [acceptedIsCollapsed, setAcceptedIsCollapsed] = useState(true);
  const [acceptedRequests, setAcceptedRequests] = useState([
    {
      title: "dummy",
      host_id: "dummy",
      location: "dummy",
      date: "dummy",
      category: "dummy",
      time: "dummy",
      description: "dummy",
    },
  ]);

  useEffect(() => {
    const eventPromises: any = acceptedRequestIds.map((eventId) => {
      return selectEventById(eventId);
    });
    Promise.all(eventPromises).then((res: any) => {
      res.forEach((event, index) => {
        event.id = acceptedRequestIds[index];
      });

      setAcceptedRequests(res);
    });
    setIsLoading(false);
    (async () => {
      const nameUidReferenceObject = await getUsers();
      setUserNames(makeNameIdReference(nameUidReferenceObject));
    })();
  }, [acceptedRequestIds]);

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "users", user_id), (doc: any) => {
      if (doc.data().accepted_events.length > 0) {
        setAcceptedRequestIds(doc.data().accepted_events);
      } else {
        setAcceptedRequestIds([]);
      }
    });
  }, [user_id]);

  if (isLoading) {
    return <Text>Loading joined events ...</Text>;
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setAcceptedIsCollapsed(acceptedIsCollapsed === true ? false : true);
        }}
      >
        {acceptedIsCollapsed ? (
          <Text style={styles.eventHeader}>My Accepted Events ▼</Text>
        ) : (
          <Text style={styles.eventHeader}>My Accepted Events ▲</Text>
        )}
      </Pressable>
      <Collapsible collapsed={acceptedIsCollapsed}>
        {acceptedRequests.length < 1 ? (
          <Text style={styles.joinSubHeader}>
            You have no accepted event requests
          </Text>
        ) : (
          acceptedRequests.map((myEvent) => {
            return (
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate("Event", { eventId: myEvent.id });
                  }}
                >
                  <Text style={styles.title}>{myEvent.title}</Text>
                  <Text style={styles.user}>{userNames[myEvent.host_id]}</Text>
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
                        ? "rgba(108, 93, 171, 0.5)"
                        : "rgba(108, 93, 171, 1)",
                    },
                    styles.requestsButton,
                  ]}
                  onPress={() => {
                    const userInfo = {
                      first_name: currentUser.first_name,
                      last_name: currentUser.last_name,
                      userId: currentUser.id,
                    };
                    confirmLeave(userInfo, myEvent.id);
                  }}
                >
                  <Text style={styles.buttonTitle}>Leave Event</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </Collapsible>
    </View>
  );
};
