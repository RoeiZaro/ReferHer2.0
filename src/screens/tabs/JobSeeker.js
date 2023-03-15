import { ScrollView, View, Text,  StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Card} from 'react-native-shadow-cards';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';


function JobSeeker() {
  let template = [
    {
      title: "Connection Request Message - Generic",
      head: "Hi {First Name},",
      content:
        "I saw your profile on ReferHer and was hoping we could connect! I am really interested in the {position name} at {company name}. I was wondering if you’d be willing to refer me for the role?",
      last: "Cheers, {Your First Name}",
    },
    {
      title:
        "Connection Request Message - Referrer Marked “Call Before Referral”",
      head: "Hi {First Name},",
      content:
        "I saw your profile on ReferHer and was hoping we could connect! I am really interested in the {position name} at {company name} and was wondering if we could chat for 5 minutes tomorrow? Let me know your availability.",
      last: "Kind regards, {Your First Name}",
    },
    {
      title: "Connection Request Message - Interested in Mentoring",
      head: "Hi {First Name},",
      content:
        "I saw your profile on ReferHer! I am really interested in the {position name} at {company name} and was wondering if we could chat for 5 minutes tomorrow? I noticed you are open to mentoring candidates. I’d love to pick your brain and see if you would refer me for the position. Let me know your availability",
      last: "Thanks in advance, {Your First Name}",
    },
  ];

  return (
    <ScrollView className=" bg-referpink  min-h-full w-full flex-col m-0">
      <SafeAreaView className=" bg-referpink justify-center m-0">
        <View className="bg-referpink">
          <View className="bg-referblue">
            <Text className="font-extrabold text-3xl text-white p-1 bg-referblue">
              Job Seeker Templates
            </Text>
            <Text className="font-semibold text-m p-2 text-white bg-referblue">
              These templates will help you reach out to our referrers with
              ease. Just copy the ones you like and use them to start a
              conversation!
            </Text>
          
            <Text className="p-2 text-referwhite bg-referblue pb-5">
              ** e sure to read through the entire message to fill in blanks and
              add a more personal touch
            </Text>
          </View>
          <View>
            {template.map((data, i) => {
              return (
                
                <View
                  key={i}
                  className="p-5 pb-6 bg-referwhite rounded-lg shadow-2xl m-3 "
                >
                  <Text className="font-extrabold text-lg pb-2 text-referblue">
                    {data.title}
                  </Text>
                  <Text className="font-semibold text-m pb-2 text-referblue">
                    {data.head}
                  </Text>
                  <Text className=" text-m pb-2 text-referblue">
                    {data.content}
                  </Text>
                  <Text className=" text-m pb-2 text-referblue">
                    {data.last}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default JobSeeker;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d003e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // color:'#ff5c33',
    color: '#15172C',
    fontSize:100,
  },
  second_header: {
    color: '#15172C',
    fontSize:60,
  },
  background: {
    marginTop: 30,
  },
  subheader: {
    color:'#ff5c33',
    fontSize:50,
  },
  text: {
    color: '#DDDAEF',
    fontSize:25,
    lineHeight: 45,
  },
  second_container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  third_container: {
    flex: 1,
    backgroundColor: '#ECEEFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_text: {
    color: '#15172C',
    fontSize:25,
    lineHeight: 45,
  },
  card_header: {
    color: '#15172C',
    fontSize:30,
  },
  card_text: {
    color: '#15172C',
    fontSize:20,
    lineHeight: 35,
  },
  fourth_container: {
    flex: 1,
    backgroundColor: '#DDDAEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsable_text: {
    color: '#15172C',
    fontSize:25,
    lineHeight: 45,
    marginBottom:30,
    marginTop: 20,
    padding:20,
  },
  qa: {
    color: '#15172C',
    fontSize:45,
  },
  qaa: {
    color: '#15172C',
    fontSize:60,
  },
  qa2: {
    color: '#15172C',
    fontSize:25,
    marginBottom:30,
    marginTop:20,
  },
  last_container: {
    flex: 1,
    backgroundColor: '#000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserved: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom:25,
  },
});
