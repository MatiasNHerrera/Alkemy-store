import axios from 'axios';

export const getDeveloperCategories = (id , set) => {
    axios(`http://localhost:8000/category/${id}`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getDeveloperApps = (id, set) => {
    axios(`http://localhost:8000/apps/${id}`)
                 .then(({data}) => {
                     set(data);
                 })
}

export const getFavoritesCategories = (id, set) => {
    axios(`http://localhost:8000/favorites/categories/${id}`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getFavorites = (id, set) => {
    axios(`http://localhost:8000/favorites/${id}`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getBuysCategories = (id, set) => {
    axios(`http://localhost:8000/buys/categories/${id}`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getBuys = (id, set) => {
    axios(`http://localhost:8000/buys/${id}`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getAllCategories = (set) => {
    axios(`http://localhost:8000/categories`)
                 .then(({data}) => {
                    set(data);
                 })
}

export const getAllApps = (set) => {
    axios(`http://localhost:8000/apps`)
                 .then(({data}) => {
                     set(data);
                 })
}