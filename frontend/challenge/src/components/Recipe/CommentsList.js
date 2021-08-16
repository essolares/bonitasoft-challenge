import React, { useState, useEffect, useMemo, useRef } from "react";
import CommentDataService from "../../services/comment.service";
import { useTable } from "react-table";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

const CommentsList = ({recipeId}) => {
  const [comments, setComments] = useState([]);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [showChefBoard, setShowChefBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const commentRef = useRef();
  commentRef.current = comments;

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.roles.some( role => role['name'] === 'USER' ));
      setShowChefBoard(user.roles.some( role => role['name'] === 'CHEF' ));
      setShowAdminBoard(user.roles.some( role => role['name'] === 'ADMIN' ));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowUserBoard(false);
    setShowChefBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


  useEffect(() => {
    retrieveComments();
  }, [recipeId]);

  const retrieveComments = () => {
    CommentDataService.getCommentsByRecipe(recipeId)
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "User",
        accessor: "id",
      }
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
    data: comments,
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
      </div>
    </div>
  );
};

export default CommentsList;