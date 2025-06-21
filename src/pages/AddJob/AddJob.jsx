import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJob = () => {
    const { user } = useAuth();

    const handleAddAJob = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);``
        const data = Object.fromEntries(formData.entries());

        // process salary range data
        const { min, max, currency, ...newJob } = data;
        newJob.salaryRange = { min, max, currency }

        // process requirements
        const requirementsString = newJob.requirements;
        const requirementsDirty = requirementsString.split(',')
        const requirementsClean = requirementsDirty.map(req => req.trim());
        newJob.requirements = requirementsClean;

        // process responsibilities
        newJob.responsibilities = newJob.responsibilities.split(',').map(res => res.trim())

        newJob.status = "active";

        console.log(newJob)

        // save job to the database
        axios.post('https://career-code-server-flame.vercel.app/jobs', newJob)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This new Job has been saved and published.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <h2 className='text-4xl text-center my-4'>Please add a job</h2>
            <form onSubmit={handleAddAJob}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                        <legend className="fieldset-legend">Basic Info</legend>

                        <label className="label">Job Title</label>
                        <input type="text" name='title' className="input" placeholder="Job Title" />

                        <label className="label">Company</label>
                        <input type="text" name='company' className="input" placeholder="Company Name" />

                        <label className="label">Location</label>
                        <input type="text" name='location' className="input" placeholder="Company Location" />


                        <label className="label">Company logo</label>
                        <input type="text" name='company_logo' className="input" placeholder="Company Logo URL" />
                    </fieldset>

                    <div className="">
                        {/* Job Type */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Job Type</legend>
                            <div className="filter">
                                <input className="btn filter-reset" type="radio" name="jobType" aria-label="All" />
                                <input className="btn" type="radio" name="jobType" value="On-Site" aria-label="On-Site" />
                                <input className="btn" type="radio" name="jobType" value="Remote" aria-label="Remote" />
                                <input className="btn" type="radio" name="jobType" value="Hybrid" aria-label="Hybrid" />
                            </div>

                        </fieldset>
                        {/* Job Category */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Job Category</legend>

                            <select defaultValue="Job Category" name='category' className="select">
                                <option disabled={true}>Job Category</option>
                                <option>Engineering</option>
                                <option>Marketing</option>
                                <option>Finance</option>
                            </select>

                        </fieldset>
                        {/* Application Deadline */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Application Deadline</legend>

                            <input type="date" name='deadline' className="input" />

                        </fieldset>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="">
                        {/* Job Requirements  */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Job Requirements</legend>

                            <textarea className="textarea h-24" name='requirements' placeholder="Requirements (separate by comma)"></textarea>

                        </fieldset>

                        {/* Job Responsibilities  */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Job Responsibilities</legend>

                            <textarea className="textarea h-24" name='responsibilities' placeholder="Responsibilities (separate by comma)"></textarea>

                        </fieldset>
                    </div>
                    <div className="">

                        {/* Job Description  */}
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                            <legend className="fieldset-legend">Job Description</legend>
                            <textarea className="textarea" name='description' placeholder="Job Description"></textarea>

                        </fieldset>

                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border my-auto p-4">
                            <legend className="fieldset-legend">HR Related Info</legend>

                            <label className="label">HR Name</label>
                            <input type="text" name='hr_name' className="input" placeholder="HR Name" />

                            <label className="label">HR Email</label>
                            <input type="email" name='hr_email' defaultValue={user.email} className="input" placeholder="HR Email" />
                        </fieldset>
                    </div>
                </div>
                
                {/* Salary Range */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                    <legend className="fieldset-legend">Salary Range</legend>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        <div>
                            <label className="label">Minimum Salary</label>
                            <input type="text" name='min' className="input" placeholder="Minimum Salary" />
                        </div>

                        <div>
                            <label className="label">Maximum Salary</label>
                            <input type="text" name='max' className="input" placeholder="Maximum Salary" />
                        </div>

                        <div>
                            <label className="label">Currency</label>
                            <select defaultValue="Select a Currency" name='currency' className="select">
                                <option disabled={true}>Select a Currency</option>
                                <option>BDT</option>
                                <option>USD</option>
                                <option>EU</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center my-10">
                    <input type="submit" className='btn btn-outline btn-wide' value="Add Job" />
                </div>
                </fieldset>
            </form>
        </div>
    );
};

export default AddJob;