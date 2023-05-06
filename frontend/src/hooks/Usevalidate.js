import React, { useState } from "react";

function Usevalidate() {
  const [values, setvalues] = useState({});
  const [errors, seterrors] = useState({});
  const handelChange = (event) => {
    let name = event.target.name;
    let value;
    if ( name === "post" && values.post) {
      value = event.target.value;
    } else {
      value = event.target.value.trim();
    }

    setvalues({
      ...values,
      [name]: value,
    });

    validate(event, name, value, values);
  };
  const removevalue = ()=>{
    setvalues({})
  }
  const validate = (event, name, value, values) => {
    switch (name) {
      case "username":
        if (value.length <= 4) {
          seterrors({
            ...errors,
            username: "Username atleast have 5 letters",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.username;
          seterrors(newobj);
        }

        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          seterrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.email;
          seterrors(newobj);
        }
        break;
      case "phonenumber":
        if (!new RegExp(/^[789]\d{9}$/).test(value)) {
          seterrors({
            ...errors,
            phonenumber: "Enter a valid phonenumber",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.phonenumber;
          seterrors(newobj);
        }
        break;
      case "pass":
        if (value.length <= 4) {
          seterrors({
            ...errors,
            pass: "Password should atleast have 5 letters",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.pass;
          seterrors(newobj);
        }
        break;
      case "cpass":
        if (values.pass !== value) {
          seterrors({
            ...errors,
            cpass: "Password not match",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.cpass;
          seterrors(newobj);
        }
        break;
      case "title":
        if (value.length <= 4) {
          seterrors({
            ...errors,
            title: "project title atleast have 5 letters",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.title;
          seterrors(newobj);
        }
        break;
      case "post":
        if (value.length <= 20) {
          seterrors({
            ...errors,
            post: "notes should  atleast have 20 letters",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.post;
          seterrors(newobj);
        }
        break;
      case "budget":
        console.log(value);
        if (value < 100 || 1000000 < value) {
          console.log("error");
          seterrors({
            ...errors,
            budget: "budget should between 100 - 100000",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.budget;
          seterrors(newobj);
        }
        break;
        case "message":
        if (value.length <= 19) {
          seterrors({
            ...errors,
            message: "project description atleast have 20 letters",
          });
        } else {
          let newobj = { ...errors };
          delete newobj.message;
          seterrors(newobj);
        }
        break;
        case "link":
          if(value.length<=9){
            seterrors({
              ...errors,
              link:"link should atleast have 10 letters"
            })
          }
          else{
            let newobj = { ...errors };
            delete newobj.link;
            seterrors(newobj);

          }
          

      default:
        break;
    }
  };
  return {
    values,
    errors,
    handelChange,
    removevalue
  };
}

export default Usevalidate;