import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import styles from "./EventList.style";
import Filter from "./Filter.component";
import { getUsers, selectAllEvents } from "../../utils/firebaseUtils";
import { makeNameIdReference, truncate } from "./utils/EventListUtils";
import { RefreshEvents } from "./RefreshEvents.component";
import EventCategories from "./utils/EventCategories.json";
import { categoryIsChecked, props, eventDetails } from "./EventLits.utils";

export const EventList = ({ navigation }: props) => {
  const [categoryIsChecked, setCategoryIsChecked] =
    useState<categoryIsChecked>(EventCategories);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userNames, setUserNames] = useState({});
  const [events, setEvents] = useState<eventDetails[]>([
    {
      attendees: [],
      category: "",
      date: "",
      description: "",
      host_id: "",
      location: "",
      max_capacity: "",
      pending_attendees: [],
      title: "",
      time: "",
      id: "",
    },
  ]);

  useEffect(() => {
    selectAllEvents().then((res) => {
      setEvents(res);
      setIsLoading(false);
    });
    getUsers().then((res) => {
      setUserNames(makeNameIdReference(res));
      console.log(userNames);
    });
  }, []);

  const Item = ({
    item,
    onPress,
  }: {
    item: eventDetails;
    onPress: () => {};
  }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.user]}>{userNames[item.host_id]}</Text>
      <Text style={[styles.location]}>{item.location}</Text>
      <Text style={[styles.date]}>{item.date}</Text>
      <Text style={[styles.category]}>{item.category}</Text>
      <Text style={[styles.time]}>{item.time}</Text>
      <Text style={[styles.description]}>{truncate(item.description)}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: eventDetails }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate("Event", { eventId: item.id });
        }}
      />
    );
  };

  if (isLoading) {
    return <Text>Loading events ...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Filter
        setEvents={setEvents}
        categoryIsChecked={categoryIsChecked}
        setCategoryIsChecked={setCategoryIsChecked}
      />
      <RefreshEvents
        setEvents={setEvents}
        setCategoryIsChecked={setCategoryIsChecked}
      />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
