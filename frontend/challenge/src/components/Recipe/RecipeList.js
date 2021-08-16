import React, { useState, useEffect, useMemo, useRef } from "react";
import RecipeDataService from "../../services/recipe.service";
import { useTable } from "react-table";
import Modal from '../Modal'
import { useModal } from '../../Hooks/useModal'
import AddComment from "./AddComment.js";
import AddRecipe from "./AddRecipe";
import AuthService from "../../services/auth.service";
import RecipeComments from "./RecipeComments.js"

const RecipesList = () => {
  const currentUser = AuthService.getCurrentUser();
  const [recipes, setRecipes] = useState([]);
  const [isOpen1, openModal1, closeModal1] = useModal(false);
  const [isOpen2, openModal2, closeModal2] = useModal(false);
  const [isOpen3, openModal3, closeModal3] = useModal(false);
  const [selectedId, setSelectedId] = useState('');
  const [showUserBoard, setShowUserBoard] = useState(currentUser.roles.some(role => role['name'] === 'USER') || false);
  const [showChefBoard, setShowChefBoard] = useState(currentUser.roles.some(role => role['name'] === 'CHEF') || false);
  const [showAdminBoard, setShowAdminBoard] = useState(currentUser.roles.some(role => role['name'] === 'ADMIN') || false);
  const [searchIngredient, setSearchIngredient] = useState("");
  const recipesRef = useRef();
  recipesRef.current = recipes;

  useEffect(() => {
    retrieveRecipes();
  },[]);
  

  const retrieveRecipes = () => {  
    if (showUserBoard || showAdminBoard) {
      RecipeDataService.getAll()
        .then((response) => {
          setRecipes(response.data);
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (showChefBoard) {
      RecipeDataService.getAllByUser()
        .then((response) => {
          setRecipes(response.data);
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e);
        });
    } 
  };

  const refreshList = () => {
    retrieveRecipes();
  };

  const openRecipeComments = (rowIndex) => {
    const id = recipesRef.current[rowIndex].id;
    setSelectedId(id);
    openModal2();
  };

  const openAddComments = (rowIndex) => {
    const id = recipesRef.current[rowIndex].id;
    setSelectedId(id);
    openModal3();
  };

  const openRecipe = (rowIndex) => {
    //const id = recipesRef.current[rowIndex].id;
    //props.history.push("/recipes/" + id);
  };

  const deleteRecipe = (rowIndex) => {
    //const id = recipesRef.current[rowIndex].id;
  };

  const onChangeSearchIngredient = (e) => {
    const searchIngredient = e.target.value;
    setSearchIngredient(searchIngredient);
  };

  const findByIngredient = () => {
    RecipeDataService.findByIngredient(searchIngredient)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Ingredients",
        accessor: "ingredients",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              {(showChefBoard || showAdminBoard) && (
                <span onClick={() => openRecipe(rowIdx)} className='px-2'>
                  <i className="far fa-edit action mr-2">
                  </i>
                </span>)}
              {(showChefBoard || showAdminBoard) && (
                <span onClick={() => deleteRecipe(rowIdx)} className='px-2'>
                  <i className="fas fa-trash action mr-2">
                  </i>
                </span>
              )}
              <span onClick={() => openAddComments(rowIdx)} className='px-2'>
                <i className="fas fa-comment-medical action mr-2">
                </i>
              </span>
              <span onClick={() => openRecipeComments(rowIdx)} className='px-2'>
                <i className="fas fa-comment action mr-2">
                </i>
              </span>
              
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
    data: recipes,
  });
  return (
    <div className="">
        { showUserBoard && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Ingredient"
            value={searchIngredient}
            onChange={onChangeSearchIngredient}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={findByIngredient}
            >
              Search
            </button>
          </div>
        </div>
      )}
      {showChefBoard && (
        <div>
          <button className="btn btn-outline-info btn-block" onClick={openModal1}>Add Recipe</button>
          <Modal isOpen={isOpen1} closeModal={closeModal1}>
            <AddRecipe refreshList={refreshList} />
          </Modal>
        </div>)}

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

      <Modal isOpen={isOpen2} closeModal={closeModal2}>
        <RecipeComments className="mt-4" selectedId={selectedId} />
      </Modal>

      <Modal isOpen={isOpen3} closeModal={closeModal3}>
        <AddComment className="mt-4" selectedId={selectedId} refreshList={refreshList} />
      </Modal>

    </div>
  );
};

export default RecipesList;