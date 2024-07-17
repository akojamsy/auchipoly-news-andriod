import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation';
import { store , persistor} from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation/>
      </PersistGate>
    </Provider>
  );
}
