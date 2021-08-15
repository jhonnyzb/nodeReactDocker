import React, { useEffect } from 'react'
import Item from './Item'

const List = ({ users }) => {

       useEffect(() => {
              console.log('list render')
       })


       return (
              <ul>
                     {users.map((user, index) => {
                            return <Item key={index} user={user} />
                     })}
              </ul>

       )
}

export default List
