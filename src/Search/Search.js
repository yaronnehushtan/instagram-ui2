import React, {useEffect, useState} from 'react';
import './Search.scss'

import config from "../config";
import SearchResult from "./SearchResult/SearchResult";
import Spinner from "../common/Spinner/Spinner";
import noResultsImage from './no_results_found.png'
import {func} from "prop-types";

function Search(props) {

    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [temp, setTemp] = useState('');

    useEffect( ()=>{

        async function getUsers() {
            setLoading(true);
            try {
                const res = await fetch(config.apiUrl + '/users/?username=' + query, {
                    credentials: 'include'
                });
                if (res.status === 400) {
                    return null;
                }
                const users = await res.json();
                setLoading(false);
                setUsers(users);
            } catch (e){
                return null;
            }
        }
        // if (user._id) {
        //     getUserPosts();
        // }
        if (query!=='') {
            getUsers();
            return
        }
        setUsers([])
    },[query])

    function check() {

        setTemp('aaa')
        return 'aaa'
    }


    return (
        <div className="Search">


            <div className="row mb-1 d-flex justify-content-center input-row">
                {/*<form className="col-3 offset-1 pl-3 form">*/}
                    <input className="form-control w-50 col-10 offset-1 col-md-3 offset-md-6 ml-2"
                           type="search"
                           placeholder="Search"
                           aria-label="Search"
                           value={query}
                           onChange= { (e)=> {setQuery(e.target.value)} }/>
                {/*</form>*/}
            </div>
            {/*{users.length===0 && query!=='' && }*/}
            {users.length===0 && query!=='' ?

            <div className="col-6 offset-3 d-flex flex-column align-items-center">

                {/*<h2 className="text-danger">No results found...</h2>*/}

                <img className="no-results"  src={noResultsImage}/>
            </div> : null}

            <div className="row d-flex flex-column justify-content-center align-items-center ">
                {isLoading && <Spinner />}
                {users.map( (user, index) => {
                    return <SearchResult key={user._id} userData={user}/>
                })}

            </div>


        </div>
    );
}

export default Search;
