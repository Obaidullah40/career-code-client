import React, { Suspense } from 'react';
import useAuth from '../hooks/useAuth';
import ApplicationStats from './ApplicationStats';
import ApplicationList from './ApplicationList';
import useApplicationApi from '../api/useApplicationApi';

const MyApplications = () => {
    const { user } = useAuth();
    const {myApplicationsPromise} =useApplicationApi();
 
    return (
        <div>
            <ApplicationStats></ApplicationStats>
            <Suspense fallback={'loading your applications'}>
                <ApplicationList
                    myApplicationsPromise={myApplicationsPromise(user.email, user.accessToken)}
                ></ApplicationList>
            </Suspense>
        </div>
    );
};

export default MyApplications;