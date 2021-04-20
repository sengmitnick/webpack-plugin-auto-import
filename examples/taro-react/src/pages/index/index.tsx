import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Container from "@/components/Container";
import "./index.less";

class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}

export default Container(Index);
