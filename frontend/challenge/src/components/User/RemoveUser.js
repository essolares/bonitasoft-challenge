import React, { useState } from 'react'
import UserDataService from '../../services/user.service';

const RemoveUser = ({ selectedId, refreshList}) => {
    const [submitted, setSubmitted] = useState(false);

    const deleteUser = () => {
        console.log(selectedId)
        UserDataService.remove(selectedId)
            .then((response) => {
                console.log(response)
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className="submit-form mt-5">
            {submitted ? (
                <div>
                    <h4>The user was deleted!</h4>
                    <button className="btn btn-outline-success mt-2" onClick={refreshList}>
                        Close
                    </button>
                </div>
            ) : (
                <div container>
                    <h4>Do you want to confirm?</h4>
                    <div className="form-group">
                        <label htmlFor="commentText">Delete User</label>
                        <button onClick={deleteUser} className="btn btn-outline-danger mt-3">
                            Submit
                        </button>
                        <button onClick={refreshList} className="btn btn-outline-success mt-3">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RemoveUser;
