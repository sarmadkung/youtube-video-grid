import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { YOUTUBE_API_KEY } from "../../metrics";
import { VideoItem } from "../video-item";

export const List = () => {
  const [data, setData] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>("");
  const getVideos = (nextPageToken: string) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=programming&key=${YOUTUBE_API_KEY}${
        nextPageToken ? "&pageToken=" + nextPageToken : ""
      }`
    )
      .then((data) => data.json())
      .then((response) => {
        setNextPageToken(response.nextPageToken);
        setData((old: any) => {
          return [...old, ...response.items];
        });
      });
  };

  useEffect(() => {
    getVideos(nextPageToken);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {data.map((video) => {
          return (
            <VideoItem
              thumbnail={video.snippet.thumbnails.high}
              channelTitle={video.snippet.channelTitle}
              title={video.snippet.title}
              publishedAt={video.snippet.publishedAt}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      default: {
        flexDirection: "column",
      },
    }),
  },
});
