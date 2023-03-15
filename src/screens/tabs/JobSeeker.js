import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
