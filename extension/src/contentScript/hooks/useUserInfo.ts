import { useCallback, useState } from 'react';
import { User } from '../../@types/SolvedUser';

type UserInputProps = [User | null, (data: User) => void];

const useUserInfo = (initValue): UserInputProps => {
  const [userInfo, setUserInfo] = useState(initValue);

  const onChangeUserInfo = useCallback((data) => {
    setUserInfo(data);
  }, []);
  return [userInfo, onChangeUserInfo];
};
export default useUserInfo;
