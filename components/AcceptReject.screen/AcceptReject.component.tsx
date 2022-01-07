import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { styles } from "./AcceptReject.style";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectEventById,
  removeAttendee,
  addAttendee,
} from "../../utils/firebaseUtils";
import React, { useState, useEffect } from "react";
import { props, userNameAndId } from "./AcceptReject.utils";

export const AcceptReject = ({ route, navigation }: props) => {
  const { eventId, eventTitle } = route.params;
  const [selectedId, setSelectedId] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [attendingUsers, setAttendingUsers] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    selectEventById(eventId).then((res) => {
      if (res?.pending_attendees.length > 0) {
        let pendingUsersNoEmpties = res?.pending_attendees.filter(
          (user: userNameAndId) => {
            if (user.userId !== "") return user;
          }
        );
        setPendingUsers(pendingUsersNoEmpties);
      } else {
        setPendingUsers([]);
      }

      if (res?.attendees.length > 0) {
        let usersNoEmpties = res?.attendees.filter((user: userNameAndId) => {
          if (user.userId !== "") return user;
        });
        setAttendingUsers(usersNoEmpties);
      } else {
        setAttendingUsers([]);
      }
    });
  }, [eventId, reloadTrigger]);

  const usernamecomponent = (item: userNameAndId) => {
    return (
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
    );
  };
  const navigateComponent = (item: userNameAndId) => {
    return (
      <Pressable
        style={styles.navigate}
        onPress={() => {
          navigation.navigate("ViewProfile", {
            userId: item.userId,
            eventId,
            eventTitle,
          });
        }}
      >
        <Text style={styles.buttonsText}>View profile</Text>
      </Pressable>
    );
  };

  const AttendeesItem = ({ item }: { item: userNameAndId }) => (
    <View style={styles.item}>
      {usernamecomponent(item)}
      <Pressable
        style={styles.reject}
        onPress={() => {
          removeAttendee(eventId, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            setReloadTrigger((prevState) => {
              return prevState + 1;
            });
          });
        }}
      >
        <Text style={styles.buttonsText}>Remove Attendee</Text>
      </Pressable>
      {navigateComponent(item)}
    </View>
  );

  const PendingAttendeesItem = ({ item }: { item: userNameAndId }) => (
    <View style={styles.item}>
      {usernamecomponent(item)}
      <Pressable
        style={styles.accept}
        onPress={() => {
          addAttendee(eventId, {
            userId: item.userId,
            first_name: item.first_name,
            last_name: item.last_name,
          }).then((res) => {
            setReloadTrigger((prevState) => {
              return prevState + 1;
            });
          });
        }}
      >
        <Text style={styles.buttonsText}>Add to Event</Text>
      </Pressable>
      {navigateComponent(item)}
    </View>
  );

  const renderPendingItem = ({ item }: { item: userNameAndId }) => {
    return <PendingAttendeesItem item={item} />;
  };

  const renderAttendingItem = ({ item }: { item: userNameAndId }) => {
    return <AttendeesItem item={item} />;
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation!.navigate("Profile");
        }}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>To my profile</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{eventTitle}</Text>
      {attendingUsers.length > 0 ? (
        <>
          <Text style={styles.title}>Accepted users:</Text>
          <FlatList
            data={attendingUsers}
            renderItem={renderAttendingItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Text style={styles.text}>Accepted users will appear here!</Text>
      )}
      {pendingUsers.length > 0 ? (
        <>
          <Text style={styles.title}>Requested users:</Text>
          <FlatList
            data={pendingUsers}
            renderItem={renderPendingItem}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <Text style={styles.text}>Requested users will appear here!</Text>
      )}
    </SafeAreaView>
  );
};
