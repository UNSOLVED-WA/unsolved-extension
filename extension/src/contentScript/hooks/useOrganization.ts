import { useState, useEffect } from 'react';
import { MessageManager } from '../../utils';
import { Organization } from '../../@types';

export const useOrganization = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const changeSelectedOrganization = (selectedOrganization: Organization) => {
    MessageManager.send({ message: 'selectedOrganization', type: 'async', requestData: { selectedOrganization } }, (response) => {
      setSelectedOrganization(selectedOrganization);
    });
  };

  useEffect(() => {
    setIsLoaded(false);
    MessageManager.send({ message: 'fetchOrganization', type: 'async' }, (response) => {
      if (response.state === 'success') {
        setOrganizations(response.responseData.organizations);
        setSelectedOrganization(response.responseData.selectedOrganization);
      } else {
        setIsFailed(true);
      }
      setIsLoaded(true);
    });
  }, []);

  return { organizations, selectedOrganization, changeSelectedOrganization, isLoaded, isFailed };
};
