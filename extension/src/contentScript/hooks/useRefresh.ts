import { useState } from 'react';

export const useRefresh = () => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const refresh = () => setIsRefresh((prev) => !prev);

  return { isRefresh, refresh };
};
