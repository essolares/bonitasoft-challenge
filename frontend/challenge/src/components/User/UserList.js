import React, { useState, useEffect, useMemo, useRef } from "react";
import AuthService from "../../services/auth.service";
import { useTable } from "react-table";
import Modal from '../Modal'
import { useModal } from '../../Hooks/useModal'
import UserDataService from "../../services/user.service";

const UserList = () => {
    const currentUser = AuthService.getCurrentUser();
    const [users, setUsers] = useState([]);
    const [isOpen1, openModal1, closeModal1] = useModal(false);
    const [selectedId, setSelectedId] = useState('');
    const [showUserBoard, setShowUserBoard] = useState(currentUser.roles.some(role => role['name'] === 'USER') || false);
    const [showChefBoard, setShowChefBoard] = useState(currentUser.roles.some(role => role['name'] === 'CHEF') || false);
    const [showAdminBoard, setShowAdminBoard] = useState(currentUser.roles.some(role => role['name'] === 'ADMIN') || false);
    const recipesRef = useRef();
    recipesRef.current = users;

    useEffect(() => {
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        if (showAdminBoard) {
            UserDataService.getAll()
                .then((response) => {
                    setUsers(response.data);
                    console.log(response.data)
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const refreshList = () => {
        retrieveUsers();
    };

    const deleteUser = (rowIndex) => {
        //const id = recipesRef.current[rowIndex].id;
    };
    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Phone",
                accessor: "phone",
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            {(showAdminBoard) && (
                                <span onClick={() => deleteUser(rowIdx)} className='px-2'>
                                    <i className="fas fa-trash action mr-2">
                                    </i>
                                </span>
                            )}
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: users,
    });
    return (
        <div className="">
      <div className="col-md-12 list mt-4">
                <table
                    className="table table-striped table-bordered recipe-table"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
        <span><i className="far fa-edit"></i> Edit&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span><i className="fas fa-trash"></i> Delete&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span><i className="fas fa-comment-medical"></i> Add Comment&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span><i className="fas fa-comment"></i> View Comments&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
            </div>
        </div>
    )
}

export default UserList
