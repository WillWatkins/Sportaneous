import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState, useContext, useEffect } from "react";
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
import { props, event } from "../../UserProfile.utils";

export const MyPendingRequests = ({ user_id, navigation }: props) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userNames, setUserNames] = useState({});
  const [pendingRequestIds, setPendingRequestIds] = useState<string[]>([]);
  const [requestedIsCollapsed, setRequestedIsCollapsed] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<event[]>([
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
    const eventPromises: any = pendingRequestIds.map((eventId) => {
      return selectEventById(eventId);
    });
    Promise.all(eventPromises).then((res: event[]) => {
      res.forEach((event: event, index: number) => {
        event.id = pendingRequestIds[index];
      });

      setPendingRequests(res);
    });
    setIsLoading(false);
    (async () => {
      const nameUidReferenceObject = await getUsers();
      setUserNames(makeNameIdReference(nameUidReferenceObject));
    })();
  }, [pendingRequestIds]);

  React.useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(doc(db, "users", user_id), (doc: any) => {
      if (doc.data().requested_events.length > 0) {
        setPendingRequestIds(doc.data().requested_events);
      } else {
        setPendingRequestIds([]);
      }
    });
  }, [user_id]);

  if (isLoading) {
    return <Text>Loading event requests ...</Text>;
  }
  return (
    <View>
      <Pressable
        onPress={() => {
          setRequestedIsCollapsed(requestedIsCollapsed === true ? false : true);
        }}
      >
        {requestedIsCollapsed ? (
          <Text style={styles.eventHeader}>My Requested Events ▼</Text>
        ) : (
          <Text style={styles.eventHeader}>My Requested Events ▲</Text>
        )}
      </Pressable>
      <Collapsible collapsed={requestedIsCollapsed}>
        {pendingRequests.length < 1 ? (
          <Text style={styles.joinSubHeader}>
            You have no pending event requests.
          </Text>
        ) : (
          pendingRequests.map((myEvent) => {
            return (
              <View style={styles.container} key={myEvent.id}>
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
                  <Text style={styles.buttonTitle}>Cancel Request</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </Collapsible>
    </View>
  );
};
