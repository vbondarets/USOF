import React from 'react'
import UserItem from './UserItem'

const UserList = ({ className, users , callback}) => {
    return (
        <div className={className}>
            <h1>Users:</h1>
            {users.map((user, index) =>
                <div key={user.id}>
                    <UserItem
                        callback={callback}
                        user={user}
                    />
                </div>

            )}
        </div>
    )
}

export default UserList