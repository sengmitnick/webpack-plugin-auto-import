import React from "react";
import { View, Text } from "@tarojs/components";

function Container<T>(Component: React.ComponentType<T>) {
  const FunctionComponent: React.FC<T> = props => {
    return (
      <View>
        <Text>Hello Container!</Text>
        <Component {...props} />;
      </View>
    );
  };
  return FunctionComponent;
}

export default Container;
