import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Card } from "react-native-shadow-cards";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import lingrad from "../../../assets/lingrad.png";
import referherhome from "../../../assets/referherhome.png";
import referherposts from "../../../assets/referherposts.png";
import dreamjob from "../../../assets/dreamjob.png";
import { useNavigation } from "@react-navigation/native";

export default function HomeTab() {
  const navigation = useNavigation();

  const { removeItem } = useContext(UserContext);

  return (
    <>
      <SafeAreaView className="bg-pink-600 justify-center">
        <StatusBar style="light" />
      </SafeAreaView>

      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={lingrad} style={styles.background}>
            <Text style={styles.header}>ReferHer</Text>
          </ImageBackground>
          <Text style={styles.subheader}>
            Hi-tech Internal Referral Network For Women
          </Text>
          <Image source={referherhome} style={{ width: 300, height: 300 }} />

          <Text style={styles.text}>
            The first step to getting more women into hi-tech is making sure
            they have the opportunity to interview for the role. ReferHer
            connects job seekers to professionals, allowing them to easily get
            internal referrals for the positions they want, build their network,
            and create valuable relationships. All while ensuring that women are
            getting the credit for referring candidates to their companies.
          </Text>
        </View>

        <View style={styles.second_container}>
          <Text style={styles.subheader}>Easy to find a job with ReferHer</Text>
          <Image source={referherposts} style={{ width: 300, height: 300 }} />
          <Text style={styles.second_text}>
            An internal referral is just the first step. ReferHer offers the
            opportunity for referrers to help mentor job seekers through the
            interview process at their companies. We also host monthly webinars
            for our members on best practices throughout the job search.This and
            our community will help make landing your dream job easier. So, what
            are you waiting for?
          </Text>
        </View>

        <View style={styles.third_container}>
          <ImageBackground source={lingrad} style={styles.background}>
            <Text style={styles.second_header}>Why ReferHer?</Text>
          </ImageBackground>

          <Text style={styles.second_text}>
            We make it easy for women to empower women
          </Text>

          <Card style={{ padding: 10, margin: 10 }}>
            <Text style={styles.card_header}>Easy to use</Text>
            <Text style={styles.card_text}>
              We have an intuitive interface that makes finding a referrer quick
              and pain-free.
            </Text>
          </Card>

          <Card style={{ padding: 10, margin: 10 }}>
            <Text style={styles.card_header}>Fast Signup</Text>
            <Text style={styles.card_text}>
              To get started, take 60 seconds to create a profile. Once you’re a
              member you can start referring job seekers or asking for referrals
              immediately.{" "}
            </Text>
          </Card>

          <Card style={{ padding: 10, margin: 10 }}>
            <Text style={styles.card_header}>Templates</Text>
            <Text style={styles.card_text}>
              To make sure your experience is stress-free, we have pre-built
              message templates for you to use. It’s as easy as copying and
              pasting!
            </Text>
          </Card>

          <Card style={{ padding: 10, margin: 10 }}>
            <Text style={styles.card_header}>Community</Text>
            <Text style={styles.card_text}>
              ReferHer is more than just an internal referral network. We will
              be rolling out monthly webinars for job seekers to learn tips and
              tricks to landing their dream job, we will have face-to-face
              networking events, and even set up workshops for members to
              upskill themselves.{" "}
            </Text>
          </Card>
        </View>

        <View style={styles.fourth_container}>
          <ImageBackground source={lingrad} style={styles.background}>
            <Text style={styles.qaa}>How It Works</Text>
          </ImageBackground>
          <Image source={dreamjob} style={{ width: 300, height: 300 }} />

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#ECEEFA",
                  }}
                >
                  <Text style={styles.card_header}>1. Signing Up</Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={styles.collapsable_text}>
                Our sign up process is easy. Whether you already have a hi-tech
                job and are looking to become a referrer. Or you are a job
                seeker looking for a referral. Signing up takes 60 seconds.
              </Text>
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#ECEEFA",
                  }}
                >
                  <Text style={styles.card_header}>
                    2. Posting/Looking for a referral
                  </Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={styles.collapsable_text}>
                If you are a referrer, you create your profile upon signing up.
                Once you’ve created a profile, job seekers can start reaching
                out to you on LinkedIn! If you are looking for a referral. Once
                you sign up as a job seeker, you’ll see the ReferHer Posts with
                all the referrers’ profiles. When you find a referrer at the
                company you are interested in applying to. Reach out on Linkedin
                and have them submit your CV for you!
              </Text>
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#ECEEFA",
                  }}
                >
                  <Text style={styles.card_header}>
                    3. Connecting on linkedin
                  </Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={styles.collapsable_text}>
                There’s no better place to network with professionals than on
                LinkedIn. But asking for a referral can be intimidating. That’s
                why we’ve created templates for you! Job Seekers and Referrers
                have their own templates to choose from. If it’s your first time
                reaching out, you are shy, or this feels awkward, we’ve got you
                covered. #nostress
              </Text>
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#ECEEFA",
                  }}
                >
                  <Text style={styles.card_header}>
                    4. I’ve Accepted an Offer!
                  </Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Text style={styles.collapsable_text}>
                Congratulations!! We ask that when you accept an offer you
                update us and become a referrer. #payitforward When a member has
                accepted an offer we love to celebrate! Check out our “Members
                Monthly Update” on our ReferHer LinkedIn page to see which
                members have signed where and wish them good luck!
              </Text>
            </CollapseBody>
          </Collapse>
        </View>

        <View style={styles.second_container}>
          <ImageBackground source={lingrad} style={styles.background}>
            <Text style={styles.qa}>Most Asked Questions</Text>
          </ImageBackground>
          <Text style={styles.qa2}>Check out the answers below</Text>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#FF7550",
                  }}
                >
                  <Text style={styles.card_header}>
                    Can men sign up to be “referrers”?
                  </Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Card style={{ padding: 10, margin: 10 }}>
                <Text style={styles.card_text}>
                  We limit referrers to women to ensure they are getting credit
                  from their companies. Many companies have incentives for
                  “referring a friend.” We want to see these incentives going to
                  more women 💸 Additionally, job seekers may not feel
                  comfortable asking certain questions about a company’s
                  culture, etc. to a male referrer. Finally, we hope to help job
                  seekers find female role models at companies they are applying
                  to.
                </Text>
              </Card>
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#FF7550",
                  }}
                >
                  <Text style={styles.card_header}>Is ReferHer free?</Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Card style={{ padding: 10, margin: 10 }}>
                <Text style={styles.card_text}>
                  Yes! We only ask if you are a job seeker that you pay it
                  forward and become a “referrer” once you have found a job.
                </Text>
              </Card>
            </CollapseBody>
          </Collapse>

          <Collapse>
            <CollapseHeader>
              <View>
                <Card
                  style={{
                    padding: 10,
                    margin: 10,
                    borderRadius: 30,
                    backgroundColor: "#FF7550",
                  }}
                >
                  <Text style={styles.card_header}>
                    How do I ask a referrer to refer me?
                  </Text>
                </Card>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <Card style={{ padding: 10, margin: 10 }}>
                <Text style={styles.card_text}>
                  If you have created an account as a job seeker you will have a
                  tab filled with templates to use. It’s as easy as copying and
                  pasting! For more tips join our monthly webinar where we share
                  the best practices for getting your dream job.
                </Text>
              </Card>
            </CollapseBody>
          </Collapse>
        </View>

        <View style={styles.last_container}>
          <Text style={styles.reserved}>
            © 2023 ReferHer. All Rights Reserved.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
            <Text style={styles.reserved}>Privacy Policy</Text>
          </TouchableOpacity>

          <Text style={styles.reserved}>Terms of Service</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d003e",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    // color:'#ff5c33',
    color: "#15172C",
    fontSize: 95,
  },
  second_header: {
    color: "#15172C",
    fontSize: 60,
  },
  background: {
    marginTop: 30,
  },
  subheader: {
    color: "#ff5c33",
    fontSize: 50,
  },
  text: {
    color: "#DDDAEF",
    fontSize: 25,
    lineHeight: 45,
  },
  second_container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  third_container: {
    flex: 1,
    backgroundColor: "#ECEEFA",
    justifyContent: "center",
    alignItems: "center",
  },
  second_text: {
    color: "#15172C",
    fontSize: 25,
    lineHeight: 45,
  },
  card_header: {
    color: "#15172C",
    fontSize: 30,
  },
  card_text: {
    color: "#15172C",
    fontSize: 20,
    lineHeight: 35,
  },
  fourth_container: {
    flex: 1,
    backgroundColor: "#DDDAEF",
    justifyContent: "center",
    alignItems: "center",
  },
  collapsable_text: {
    color: "#15172C",
    fontSize: 25,
    lineHeight: 45,
    marginBottom: 30,
    marginTop: 20,
    padding: 20,
  },
  qa: {
    color: "#15172C",
    fontSize: 45,
  },
  qaa: {
    color: "#15172C",
    fontSize: 60,
  },
  qa2: {
    color: "#15172C",
    fontSize: 25,
    marginBottom: 30,
    marginTop: 20,
  },
  last_container: {
    flex: 1,
    backgroundColor: "#000080",
    justifyContent: "center",
    alignItems: "center",
  },
  reserved: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 25,
  },
});
