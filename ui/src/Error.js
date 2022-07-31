import React from 'react';

function Error(props) {
    var path="assets/images/error.jpg";
  var style ={
    backgroundImage: "url(" + path + ")",
    height:"100%",
     backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat',
     backgroundSize:'cover'
  }
    return (
        <div style={style}> 
        </div>
    );
}

export default Error;