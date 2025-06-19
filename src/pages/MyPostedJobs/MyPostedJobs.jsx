import React, { Suspense } from 'react';
import useAuth from '../../hooks/useAuth';
import { jobsCreatedByPromise } from '../../api/jobsApi';
import JobLists from './JobLists';

const MyPostedJobs = () => {
      const { user } = useAuth();

    return (
        <div>
            <h2>My posted Jobs: </h2>
            <Suspense>
                <JobLists
                    jobsCreatedByPromise={jobsCreatedByPromise(user.email)}
                ></JobLists>
            </Suspense>
        </div>
    );
};

export default MyPostedJobs;