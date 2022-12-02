import { FC } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
const width = Dimensions.get("screen").width;
export const VideoItem: FC<ItemProps> = ({
  thumbnail,
  channelTitle,
  title,
  publishedAt,
}) => {
  const isMobile = Platform.OS !== "web";
  const createdAt = new Date(publishedAt);
  return (
    <View style={styles.item}>
      <Image
        style={{
          ...styles.thumbnail,
        }}
        source={{ uri: thumbnail.url }}
      />
      <View style={styles.footer}>
        <Image style={styles.avatar} source={{ uri: thumbnail.url }} />
        <View style={styles.ml}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="clip">
            {title}
          </Text>
          <Text style={styles.channel}>{channelTitle}</Text>
          <View style={[styles.mt, styles.viewDate]}>
            <Text>34k views</Text>
            <Text>
              {" "}
              . {createdAt.getMonth()}/{createdAt.getDate()}/
              {createdAt.getFullYear()}{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

interface ThumbNailProps {
  url: string;
  width: number;
  height: number;
}
interface ItemProps {
  thumbnail: ThumbNailProps;
  title: string;
  channelTitle: string;
  publishedAt: Date;
}

const styles = StyleSheet.create({
  viewDate: {
    flexDirection: "row",
  },
  ml: {
    marginLeft: 10,
    width: "80%",
  },
  mt: {
    marginTop: 5,
  },
  channel: {
    marginTop: 5,
    width: width - 80,
  },
  title: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  item: {
    marginVertical: 20,
    marginHorizontal: 5,
    ...Platform.select({
      web: {
        width: "24%",
      },
      default: {
        width: width - 20,
      },
    }),
  },
  thumbnail: {
    height: 200,
    ...Platform.select({
      web: {
        borderRadius: 10,
      },
      default: {
        borderRadius: 10,
        width: "100%",
      },
    }),
  },
});
