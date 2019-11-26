import React from 'react';
import {connect} from 'react-redux';
class Home extends React.Component{

constructor(){
  super();
}

render(){
  console.log("the prop list is ",this.props.users.data);
  return (
    <div>
The User List :

<table>
<th>Name</th><th>Email</th>
{
  this.props.users.data.map((user,i)=>{
    return (
      <tr key={i}>
<td>{user.name}</td>
<td>{user.email}</td>
      </tr>
    )
  })
}
</table>
    </div>
  )
}

}

const mapStateToProps = (state)=>{
  console.log('The net state is ',state)
return {
  users : state
}
}

export default connect(mapStateToProps)(Home);