import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { styles } from "./AcceptReject.style";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectEventById,
  removeAttendee,
  addAttendee,
} from "../../utils/utils";
import React from "react";

export const AcceptReject = ({ route, navigation }) => {
  const { eventId, eventTitle } = route.params;
  const [selectedId, setSelectedId] = React.useState(null);
  const [pendingUsers, setPendingUsers] = React.useState([]);
  const [attendingUsers, setAttendingUsers] = React.useState([]);
  const [reloadTrigger, setReloadTrigger] = React.useState(0);

  React.useEffect(() => {
    selectEventById(eventId).then((res) => {
      if (res.pending_attendees.length > 0) {
        let pendingUsersNoEmpties = res.pending_attendees.filter((user) => {
          return user !== "";
        });
        setPendingUsers(pendingUsersNoEmpties);
      } else {
        setPendingUsers([]);
      }

      if (res.attendees.length > 0) {
        let usersNoEmpties = res.attendees.filter((user) => {
          return user !== "";
        });
        setAttendingUsers(usersNoEmpties);
      } else {
        setAttendingUsers([]);
      }
    });
  }, [eventId, reloadTrigger]);

  const AttendeesItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
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
        <Text style={styles.buttonsText}>View user profile</Text>
      </Pressable>
    </View>
  );

  const PendingAttendeesItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
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
        <Text style={styles.buttonsText}>Add attendee to Event!</Text>
      </Pressable>
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
        <Text style={styles.buttonsText}>Check user profile</Text>
      </Pressable>
    </View>
  );

  const renderPendingItem = ({ item }) => {
    return <PendingAttendeesItem item={item} />;
  };

  const renderAttendingItem = ({ item }) => {
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
          <Text>Attending:</Text>
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
          <Text>Requested:</Text>
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
