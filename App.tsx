import RouteStack from './routes/RouteStack'
import { NativeBaseProvider } from "native-base";
export default function App() {
  return (
    <NativeBaseProvider>
      <RouteStack />
    </NativeBaseProvider>
  );
}
