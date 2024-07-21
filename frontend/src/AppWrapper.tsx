import App from 'App';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import getRouterBasename from 'utils/router';

import {
  useApi,
  useAuth,
  useChatInteract,
  useConfig
} from '@chainlit/react-client';

export default function AppWrapper() {
  const { isAuthenticated, isReady } = useAuth();
  const { language: languageInUse } = useConfig();
  const { i18n } = useTranslation();
  const { windowMessage } = useChatInteract();

  function handleChangeLanguage(languageBundle: any): void {
    i18n.addResourceBundle(languageInUse, 'translation', languageBundle);
    i18n.changeLanguage(languageInUse);
  }

  const { data: translations } = useApi<any>(
    `/project/translations?language=${languageInUse}`
  );

  if (
    isReady &&
    !isAuthenticated &&
    window.location.pathname !== getRouterBasename() + '/login' &&
    window.location.pathname !== getRouterBasename() + '/login/callback'
  ) {
    window.location.href = getRouterBasename() + '/login';
  }

  useEffect(() => {
    if (!translations) return;
    handleChangeLanguage(translations.translation);
  }, [translations]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      windowMessage(event.data);
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return <App />;
}
