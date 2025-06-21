export const myApplicationsPromise = (email, accessToken) => {
    return fetch(`https://career-code-server-flame.vercel.app/applications?email=${email}`,{
        headers:{
             authorization: `Bearer ${accessToken}`
        }
    })
    .then(res => res.json());
}