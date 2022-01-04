import React, { useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  TextInput,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  addNewEvent,
  addNewChatroom,
  addNewEventToCurrentUserProfile,
} from "../../utils/utils";
import { UserContext } from "../../contexts/UserContext";
import { styles } from "./AddEvent.style";
import { Picker } from "@react-native-picker/picker";
import categories from "../Events.screen/utils/EventCategories.json";

type AddEventProps = {
  navigation: {
    navigate: (component: string, {}) => {};
  };
};

export const AddEvent = ({ navigation }: AddEventProps) => {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Date>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [category, setCategory] = useState("");

  const changeSelectedDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(false);
    setDate(currentDate);
  };
  const changeSelectedTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setTimePickerVisibility(false);
    setTime(currentTime);
  };

  const resetEventData = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setLocation("");
    setMaxCapacity("");
    setDate(undefined);
    setTime(undefined);
  };

  const handlePress = async () => {
    const eventId = await addNewEvent({
      title: title,
      category: category,
      description: description,
      location: location,
      max_capacity: maxCapacity,
      date: date?.toDateString(),
      time: time?.toTimeString().slice(0, 5),
      host_id: currentUser.id,
      attendees: [],
      pending_attendees: [],
    });
    addNewChatroom(
      { host_id: currentUser.id, attendees_id: [], messages: [] },
      eventId
    );
    addNewEventToCurrentUserProfile(currentUser.id, eventId);
    resetEventData();
    navigation.navigate("Event", { eventId });
  };

  const isDisabled = !(
    title &&
    description &&
    location &&
    maxCapacity &&
    date &&
    time
  );

  const numberPicker = () => {
    const nums = [];
    for (let index = 1; index <= 100; index++) {
      nums.push(index.toString());
    }
    if (nums.length === 100)
      return nums.map((num) => {
        return <Picker.Item label={num} value={num} />;
      });
  };

  const pickerCategories = Object.keys(categories);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>please fill the details</Text>
      <ScrollView style={{ backgroundColor: "red" }}>
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                onChangeText={setTitle}
                value={title}
                placeholder="Title"
                placeholderTextColor="grey"
              />
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>Categories:</Text>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  itemStyle={styles.catPicker}
                >
                  {pickerCategories.map((category) => {
                    return <Picker.Item label={category} value={category} />;
                  })}
                </Picker>
              </View>
              <TextInput
                style={styles.inputField}
                onChangeText={setDescription}
                value={description}
                placeholder="Description"
                placeholderTextColor="grey"
                multiline={true}
              />
              <TextInput
                style={styles.inputField}
                onChangeText={setLocation}
                value={location}
                placeholder="City"
                placeholderTextColor="grey"
              />
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>Number of attendees:</Text>
                <Picker
                  selectedValue={maxCapacity}
                  onValueChange={(itemValue) => setMaxCapacity(itemValue)}
                  itemStyle={styles.capacityPicker}
                >
                  {numberPicker()}
                </Picker>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.datetime}>
          <TouchableOpacity
            onPress={() => {
              setDatePickerVisibility(true);
            }}
          >
            <Text style={styles.inputField}>
              SELECT DATE: {date?.toDateString()}
            </Text>
          </TouchableOpacity>
        </View>
        {isDatePickerVisible && (
          <DateTimePicker
            value={date || new Date()}
            mode={"date"}
            display="default"
            onChange={changeSelectedDate}
            style={styles.picker}
          />
        )}
        <View style={styles.datetime}>
          <TouchableOpacity
            onPress={() => {
              setTimePickerVisibility(true);
            }}
          >
            <Text style={styles.inputField}>
              SELECT TIME: {time?.toTimeString().slice(0, 5)}
            </Text>
          </TouchableOpacity>
        </View>
        {isTimePickerVisible && (
          <DateTimePicker
            value={time || new Date()}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={changeSelectedTime}
            style={styles.picker}
          />
        )}
        <View style={styles.post}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text style={styles.postText}>POST</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
