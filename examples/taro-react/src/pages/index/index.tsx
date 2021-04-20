import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.less";

class Index extends Component {
  componentWillMount() {
    console.log("componentWillMount");
  }

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

export default Index;
// export default require('@/components/Container').default(Index);
