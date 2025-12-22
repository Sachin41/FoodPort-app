import React from 'react'
class User extends React.Component{
    render(){
        return (
            <div>Profile: {this.props.name} </div>
        )
    }
}
// function User({name}) {
//   return (
//     <div>Profile: {name} </div>
//   )
// }

export default User