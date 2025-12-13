

import { AppRouter } from './routes/AppRouter';
import { Notification } from './components/ui/Notification';
import { useUiStore } from './store/uiStore';

/**
 * Application root component
 */
function App() {
  const { notification, hideNotification } = useUiStore();

  return (
    <>
      <AppRouter />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </>
  );
}

export default App;
