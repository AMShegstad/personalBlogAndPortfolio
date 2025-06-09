import { createContext, useContext, useState } from 'react';

const PageTrackerContext = createContext();

export function PageTrackerProvider({ children }) {
  const [visitedPages, setVisitedPages] = useState(new Set());
  const [pageViews, setPageViews] = useState({
    home: 0,
    about: 0,
    blog: 0,
    portfolio: 0,
    contact: 0,
  });

  const trackPage = (pageName) => {
    if (!visitedPages.has(pageName)) {
      setVisitedPages((prev) => new Set(prev).add(pageName));
      setPageViews((prev) => ({
        ...prev,
        [pageName]: prev[pageName] + 1,
      }));
    }
  };

  return (
    <PageTrackerContext.Provider value={{ pageViews, trackPage }}>
      {children}
    </PageTrackerContext.Provider>
  );
}

export const usePageTracker = () => useContext(PageTrackerContext);
