import React, { useState, useEffect, useMemo, useRef } from "react";
import CommentDataService from "../../services/comment.service";
import { useTable } from "react-table";

const CommentsList = ({recipeId}) => {
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  commentRef.current = comments;

  useEffect(() => {
    if (recipeId !== '') retrieveComments();
  },[recipeId]);

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('-');
}

  const retrieveComments = () => {
    CommentDataService.getCommentsByRecipe(recipeId)
      .then((response) => {
        if (response.data){
          response.data.map(element => {
            element.date = formatDate(element.date);
            return element;
          });
        }
        setComments(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Recipe",
        accessor: "recipe.name",
      },
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
        accessor: "user.username",
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