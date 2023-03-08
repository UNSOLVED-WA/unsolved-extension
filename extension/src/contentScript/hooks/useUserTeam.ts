import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';

export const useUserTeam = (isTeamLoaded: boolean, isTeamFailed: boolean) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [solvingCount, setSolvingCount] = useState(-1);

  useEffect(() => {
    if (!isTeamLoaded && !isTeamFailed) {
      MessageManager.send({ message: 'fetchUnsolvedUser', type: 'async' }, (response) => {
        if (response.state === 'success') {
          // user exists
          setSolvingCount(response.responseData.unsolvedUser.solvingCount);
        } else {
          // user does not exist
          MessageManager.send({ message: 'createUnsolvedUser', type: 'async' }, (response) => {
            if (response.state === 'success') {
              setSolvingCount(response.responseData.unsolvedUser.solvingCount);
            } else {
              console.log('fail createUnsolvedUser : ', response.errorMessage);
              setIsFailed(true);
            }
          });
          setIsLoaded(true);
        }
      });
    }
  }, [isTeamLoaded, isTeamFailed]);

  return { solvingCount, isLoaded, isFailed };
};
