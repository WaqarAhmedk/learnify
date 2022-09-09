import React from 'react';
import { useState } from 'react';


export default function CreateNewTopic() {
    const [formcoursename, setformCoursename] = useState("");

    return (
        <>
        <form>
            <div class="form-group">
                <label for="examzpleInputEmail1">Topic Name</label>
                <input type="text" class="form-control" placeholder="Enter Course name" value={formcoursename} onChange={(e) => {
                    setformCoursename(e.target.value);
                }} />
            </div>
        </form>
         
         <button type="submit" class="btn btn-primary" onClick={(e) => {
             e.preventDefault();
             if (formcoursename !== "") {
                 axios
                     .post("/create-topic/" + courseid, {
                         title: formcoursename,
                     }, {
                         headers: {
                             'teacher-auth-token': cookies.teacherAuth,

                         }
                     })
                     .then((res) => {
                         if (res.data.success == true) {
                             getAllTopics();
                         }
                         else {
                             console.log(res.data);

                         }
                         closeform();
                     })
                     .catch(err => console.error(err));

             }
         }}>Create</button>
    </>
    );
}
