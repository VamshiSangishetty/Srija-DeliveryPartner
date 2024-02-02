import { NavigationContainer } from "@react-navigation/native";
import Navigation from './src/navigation';
import OrderContextProvider from "./src/contexts/OrderContext";
import '@azure/core-asynciterator-polyfill';
import { Amplify ,API,Auth} from "aws-amplify";
import awsconfig from './src/aws-exports';
import AuthStackNavigator from "./src/navigation";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
API.configure(awsconfig);

export default function App() {
  return (
      <NavigationContainer>
        <OrderContextProvider>
        <AuthStackNavigator/>
        </OrderContextProvider>
      </NavigationContainer>
  );
};
