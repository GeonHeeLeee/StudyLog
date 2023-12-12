import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

export default function RouteChangeTracker() {
  const location = useLocation();
  const [initailized, setInitialized] = useState(false);

  useEffect(() => {
    ReactGA.initialize('G-HWDPJFPTJX');
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initailized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initailized, location]);
}
